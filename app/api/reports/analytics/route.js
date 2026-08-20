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

    // ----------------------------------
    // PAGE VIEWS (EXISTING)
    // ----------------------------------
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

    // ----------------------------------
    // GEO - COUNTRY (EXISTING)
    // ----------------------------------
    const geoCountry = await pool.query(
      `
      SELECT country, SUM(visitors) AS visitors
      FROM analytics_geo_country
      WHERE date BETWEEN $1 AND $2
      GROUP BY country
      ORDER BY visitors DESC
      `,
      [from, to]
    );

    // ----------------------------------
    // GEO - REGION (EXISTING)
    // ----------------------------------
    const geoRegion = await pool.query(
      `
      SELECT region, SUM(visitors) AS visitors
      FROM analytics_geo_region
      WHERE date BETWEEN $1 AND $2
      GROUP BY region
      ORDER BY visitors DESC
      `,
      [from, to]
    );

    // ----------------------------------
    // GEO - CITY (EXISTING)
    // ----------------------------------
    const geoCity = await pool.query(
      `
      SELECT city, SUM(visitors) AS visitors
      FROM analytics_geo_city
      WHERE date BETWEEN $1 AND $2
      GROUP BY city
      ORDER BY visitors DESC
      `,
      [from, to]
    );

    // ----------------------------------
    // KPIs (EXISTING)
    // ----------------------------------
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

    // ============================================================
    // ENY AI CHAT ANALYTICS (NEW)
    //
    // This reads directly from the existing events table.
    // It does NOT modify your existing analytics tables.
    // ============================================================

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

    // ============================================================
    // ENY CHAT RESPONSE
    // ============================================================

    const chat = chatResult.rows[0] || {
      chat_opens: 0,
      chat_messages: 0,
      chat_enquiries: 0,
      chat_extensions: 0,
      chat_minimizations: 0,
      chat_sessions_ended: 0,
      duration_events: 0,
      total_chat_active_seconds: 0,
      average_chat_duration_seconds: 0,
    };

    // ----------------------------------
    // RESPONSE
    // ----------------------------------
    return Response.json({
      summary,

      topPages: pagesResult.rows,

      topCountries: geoCountry.rows,

      topRegions: geoRegion.rows,

      topCities: geoCity.rows,

      daily: kpiResult.rows,

      // NEW - ENY AI CHAT ANALYTICS
      chat,
    });
  } catch (err) {
    console.error("[ANALYTICS ERROR]", err);

    return Response.json(
      { error: "Analytics fetch failed" },
      { status: 500 }
    );
  }
}