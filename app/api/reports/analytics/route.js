import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return Response.json(
        { error: "from and to are required" },
        { status: 400 }
      );
    }

    // ================================================================
    // PAGE VIEWS
    // ================================================================

    const pagesResult = await pool.query(
      `
      SELECT
        page,
        SUM(total_views) AS views
      FROM analytics_page_views_daily
      WHERE date BETWEEN $1 AND $2
      GROUP BY page
      ORDER BY views DESC
      `,
      [from, to]
    );

    // ================================================================
    // GEO - COUNTRY
    // ================================================================

    const geoCountry = await pool.query(
      `
      SELECT
        country,
        SUM(visitors) AS visitors
      FROM analytics_geo_country
      WHERE date BETWEEN $1 AND $2
      GROUP BY country
      ORDER BY visitors DESC
      `,
      [from, to]
    );

    // ================================================================
    // GEO - REGION
    // ================================================================

    const geoRegion = await pool.query(
      `
      SELECT
        region,
        SUM(visitors) AS visitors
      FROM analytics_geo_region
      WHERE date BETWEEN $1 AND $2
      GROUP BY region
      ORDER BY visitors DESC
      `,
      [from, to]
    );

    // ================================================================
    // GEO - CITY
    // ================================================================

    const geoCity = await pool.query(
      `
      SELECT
        city,
        SUM(visitors) AS visitors
      FROM analytics_geo_city
      WHERE date BETWEEN $1 AND $2
      GROUP BY city
      ORDER BY visitors DESC
      `,
      [from, to]
    );

    // ================================================================
    // GENERAL KPIs
    // ================================================================

    const kpiResult = await pool.query(
      `
      SELECT *
      FROM analytics_daily
      WHERE date BETWEEN $1 AND $2
      `,
      [from, to]
    );

    const summary = kpiResult.rows.reduce(
      (acc, row) => {
        acc.total_events += Number(row.total_events || 0);
        acc.unique_visitors += Number(row.unique_visitors || 0);
        acc.sessions += Number(row.sessions || 0);
        acc.page_views += Number(row.page_views || 0);
        acc.cta_clicks += Number(row.cta_clicks || 0);
        acc.form_submits += Number(row.form_submits || 0);

        return acc;
      },
      {
        total_events: 0,
        unique_visitors: 0,
        sessions: 0,
        page_views: 0,
        cta_clicks: 0,
        form_submits: 0,
      }
    );

    // ================================================================
    // ENY AI CHAT ANALYTICS
    //
    // Existing aggregate metrics + NEW visitor-level interaction data.
    //
    // Important:
    // "Chat Interacted" means a UNIQUE visitor who generated at least
    // one chat_message_sent event.
    // ================================================================

    const chatResult = await pool.query(
      `
      SELECT
        COUNT(*) FILTER (
          WHERE event = 'chat_window_hit'
        ) AS chat_opens,

        COUNT(*) FILTER (
          WHERE event = 'chat_message_sent'
        ) AS chat_messages,

        COUNT(*) FILTER (
          WHERE event = 'chat_enquiry_submitted'
        ) AS chat_enquiries,

        COUNT(*) FILTER (
          WHERE event = 'chat_session_extended'
        ) AS chat_extensions,

        COUNT(*) FILTER (
          WHERE event = 'chat_window_minimized'
        ) AS chat_minimizations,

        COUNT(*) FILTER (
          WHERE event = 'chat_session_ended'
        ) AS chat_sessions_ended,

        COUNT(*) FILTER (
          WHERE event = 'chat_window_duration'
        ) AS duration_events,

        COALESCE(
          SUM(
            CASE
              WHEN event = 'chat_window_duration'
              THEN COALESCE(
                (metadata->>'duration_seconds')::numeric,
                0
              )
              ELSE 0
            END
          ),
          0
        ) AS total_chat_active_seconds,

        COALESCE(
          AVG(
            CASE
              WHEN event = 'chat_window_duration'
              THEN COALESCE(
                (metadata->>'duration_seconds')::numeric,
                0
              )
              ELSE NULL
            END
          ),
          0
        ) AS average_chat_duration_seconds

      FROM events
      WHERE event IN (
        'chat_window_hit',
        'chat_message_sent',
        'chat_enquiry_submitted',
        'chat_session_extended',
        'chat_window_minimized',
        'chat_session_ended',
        'chat_window_duration'
      )
      AND DATE(server_timestamp) BETWEEN $1 AND $2
      `,
      [from, to]
    );

    // ================================================================
    // ENY - UNIQUE INTERACTED USERS
    //
    // A user is considered "interacted" when they have sent at least
    // one chat_message_sent event.
    //
    // We aggregate by visitor_id so 10 messages from one visitor
    // still count as ONE interacted user.
    //
    // Duration is calculated from chat_window_duration events.
    // ================================================================

    const interactedUsersResult = await pool.query(
      `
      WITH chat_events AS (
        SELECT
          id,
          visitor_id,
          session_id,
          event,
          server_timestamp,
          city,
          region,
          country,
          metadata
        FROM events
        WHERE event IN (
          'chat_window_hit',
          'chat_message_sent',
          'chat_enquiry_submitted',
          'chat_session_extended',
          'chat_window_minimized',
          'chat_session_ended',
          'chat_window_duration'
        )
        AND DATE(server_timestamp) BETWEEN $1 AND $2
      ),

      interacted_visitors AS (
        SELECT DISTINCT visitor_id
        FROM chat_events
        WHERE event = 'chat_message_sent'
          AND visitor_id IS NOT NULL
      ),

      visitor_stats AS (
        SELECT
          ce.visitor_id,

          MIN(
            CASE
              WHEN ce.event = 'chat_message_sent'
              THEN ce.server_timestamp
              ELSE NULL
            END
          ) AS first_interaction,

          MAX(
            CASE
              WHEN ce.event = 'chat_message_sent'
              THEN ce.server_timestamp
              ELSE NULL
            END
          ) AS last_interaction,

          COUNT(*) FILTER (
            WHERE ce.event = 'chat_message_sent'
          ) AS messages,

          COUNT(*) FILTER (
            WHERE ce.event = 'chat_session_extended'
          ) AS extensions,

          COUNT(*) FILTER (
            WHERE ce.event = 'chat_enquiry_submitted'
          ) AS enquiries_submitted,

          COALESCE(
            SUM(
              CASE
                WHEN ce.event = 'chat_window_duration'
                THEN COALESCE(
                  (ce.metadata->>'duration_seconds')::numeric,
                  0
                )
                ELSE 0
              END
            ),
            0
          ) AS chat_duration_seconds,

          (
            ARRAY_AGG(
              ce.session_id
              ORDER BY ce.server_timestamp DESC
            ) FILTER (
              WHERE ce.session_id IS NOT NULL
            )
          )[1] AS session_id,

          (
            ARRAY_AGG(
              ce.city
              ORDER BY ce.server_timestamp DESC
            ) FILTER (
              WHERE ce.city IS NOT NULL
            )
          )[1] AS city,

          (
            ARRAY_AGG(
              ce.region
              ORDER BY ce.server_timestamp DESC
            ) FILTER (
              WHERE ce.region IS NOT NULL
            )
          )[1] AS region,

          (
            ARRAY_AGG(
              ce.country
              ORDER BY ce.server_timestamp DESC
            ) FILTER (
              WHERE ce.country IS NOT NULL
            )
          )[1] AS country

        FROM chat_events ce
        INNER JOIN interacted_visitors iv
          ON iv.visitor_id = ce.visitor_id

        GROUP BY ce.visitor_id
      )

      SELECT
        visitor_id,
        session_id,
        city,
        region,
        country,
        first_interaction,
        last_interaction,
        messages,
        extensions,
        enquiries_submitted,
        chat_duration_seconds,
        CASE
          WHEN enquiries_submitted > 0
          THEN true
          ELSE false
        END AS submitted

      FROM visitor_stats

      ORDER BY first_interaction DESC
      `,
      [from, to]
    );

    // ================================================================
    // CHAT RESPONSE
    // ================================================================

    const chatRow = chatResult.rows[0] || {};

    const interactedUsers =
      interactedUsersResult.rows || [];

    const chat = {
      chat_opens: Number(
        chatRow.chat_opens || 0
      ),

      chat_messages: Number(
        chatRow.chat_messages || 0
      ),

      chat_enquiries: Number(
        chatRow.chat_enquiries || 0
      ),

      chat_extensions: Number(
        chatRow.chat_extensions || 0
      ),

      chat_minimizations: Number(
        chatRow.chat_minimizations || 0
      ),

      chat_sessions_ended: Number(
        chatRow.chat_sessions_ended || 0
      ),

      duration_events: Number(
        chatRow.duration_events || 0
      ),

      total_chat_active_seconds: Number(
        chatRow.total_chat_active_seconds || 0
      ),

      average_chat_duration_seconds: Number(
        chatRow.average_chat_duration_seconds || 0
      ),

      // ============================================================
      // NEW
      // ============================================================

      interacted_user_count:
        interactedUsers.length,

      interacted_users:
        interactedUsers.map((user) => ({
          visitor_id:
            user.visitor_id || null,

          session_id:
            user.session_id || null,

          city:
            user.city || null,

          region:
            user.region || null,

          country:
            user.country || null,

          first_interaction:
            user.first_interaction || null,

          last_interaction:
            user.last_interaction || null,

          messages:
            Number(user.messages || 0),

          extensions:
            Number(user.extensions || 0),

          enquiries_submitted:
            Number(
              user.enquiries_submitted || 0
            ),

          chat_duration_seconds:
            Number(
              user.chat_duration_seconds || 0
            ),

          submitted:
            Boolean(user.submitted),
        })),
    };

    // ================================================================
    // RESPONSE
    // ================================================================

    return Response.json({
      summary,

      topPages:
        pagesResult.rows,

      topCountries:
        geoCountry.rows,

      topRegions:
        geoRegion.rows,

      topCities:
        geoCity.rows,

      daily:
        kpiResult.rows,

      // ENY AI CHAT ANALYTICS
      chat,
    });
  } catch (err) {
    console.error(
      "[ANALYTICS ERROR]",
      err
    );

    return Response.json(
      {
        error:
          "Analytics fetch failed",
      },
      {
        status: 500,
      }
    );
  }
}