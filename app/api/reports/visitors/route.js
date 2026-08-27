import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const value = searchParams.get("value");
    const visitorId = searchParams.get("visitor_id");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    // ============================================================
    // BASIC DATE VALIDATION
    // ============================================================

    if (!from || !to) {
      return Response.json(
        { error: "from and to are required" },
        { status: 400 }
      );
    }

    // ============================================================
    // VISITORS KPI
    //
    // Returns total unique visitors during the selected period.
    //
    // Example:
    // /api/reports/visitors?type=visitors&from=2026-08-01&to=2026-08-22
    // ============================================================

    if (type === "visitors") {
      const result = await pool.query(
        `
        SELECT
          COUNT(DISTINCT visitor_id) AS total_visitors
        FROM events
        WHERE DATE(server_timestamp) BETWEEN $1 AND $2
          AND visitor_id IS NOT NULL
        `,
        [from, to]
      );

      return Response.json({
        type: "visitors",
        from,
        to,
        total_visitors: Number(result.rows[0]?.total_visitors || 0),
      });
    }

    // ============================================================
    // TOTAL EVENTS KPI
    //
    // Counts ALL events independently from page views.
    //
    // Example:
    // /api/reports/visitors?type=total_events&from=2026-08-01&to=2026-08-22
    // ============================================================

    if (type === "total_events") {
      const result = await pool.query(
        `
        SELECT
          COUNT(*) AS total_events
        FROM events
        WHERE DATE(server_timestamp) BETWEEN $1 AND $2
        `,
        [from, to]
      );

      return Response.json({
        type: "total_events",
        from,
        to,
        total_events: Number(result.rows[0]?.total_events || 0),
      });
    }

    // ============================================================
    // PAGE VIEWS KPI
    //
    // Counts ONLY page_view events.
    // This is intentionally independent from total events.
    //
    // Example:
    // /api/reports/visitors?type=page_views&from=2026-08-01&to=2026-08-22
    // ============================================================

    if (type === "page_views") {
      const result = await pool.query(
        `
        SELECT
          COUNT(*) AS page_views
        FROM events
        WHERE event = 'page_view'
          AND DATE(server_timestamp) BETWEEN $1 AND $2
        `,
        [from, to]
      );

      return Response.json({
        type: "page_views",
        from,
        to,
        page_views: Number(result.rows[0]?.page_views || 0),
      });
    }

    // ============================================================
    // VISITOR EVENTS KPI DETAIL
    //
    // Returns event-wise breakdown for the selected date range.
    //
    // Example:
    // /api/reports/visitors?type=visitor_events&from=2026-08-01&to=2026-08-22
    // ============================================================

    if (type === "visitor_events") {
      const result = await pool.query(
        `
        SELECT
          event,
          COUNT(*) AS count
        FROM events
        WHERE DATE(server_timestamp) BETWEEN $1 AND $2
        GROUP BY event
        ORDER BY count DESC
        `,
        [from, to]
      );

      return Response.json({
        type: "visitor_events",
        from,
        to,
        events: result.rows.map((row) => ({
          event: row.event,
          count: Number(row.count),
        })),
      });
    }

    // ============================================================
    // TYPE IS REQUIRED FOR ALL REMAINING REQUESTS
    // ============================================================

    if (!type) {
      return Response.json(
        { error: "type is required" },
        { status: 400 }
      );
    }

    // ============================================================
    // VISITOR JOURNEY
    //
    // Example:
    // /api/reports/visitors?type=visitor&visitor_id=abc123&from=2026-08-01&to=2026-08-22
    // ============================================================

    if (type === "visitor") {
      if (!visitorId) {
        return Response.json(
          { error: "visitor_id is required" },
          { status: 400 }
        );
      }

      const result = await pool.query(
        `
        SELECT
          id,
          event,
          page,
          full_url,
          referrer,
          session_id,
          visitor_id,
          country,
          region,
          city,
          user_agent,
          event_timestamp,
          server_timestamp,
          metadata
        FROM events
        WHERE visitor_id = $1
          AND DATE(server_timestamp) BETWEEN $2 AND $3
        ORDER BY server_timestamp ASC
        `,
        [visitorId, from, to]
      );

      return Response.json({
        type: "visitor",
        visitor_id: visitorId,
        events: result.rows,
      });
    }

    // ============================================================
    // VALIDATE TYPES
    // ============================================================

    const allowedTypes = [
      "page",
      "country",
      "region",
      "city",
    ];

    if (!allowedTypes.includes(type)) {
      return Response.json(
        {
          error:
            "Invalid type. Use page, country, region, city, visitor, visitors, total_events, page_views or visitor_events.",
        },
        { status: 400 }
      );
    }

    if (!value) {
      return Response.json(
        { error: "value is required" },
        { status: 400 }
      );
    }

    // ============================================================
    // PAGE VISITORS
    //
    // Returns unique visitors who generated page_view events
    // for the selected page.
    // ============================================================

    if (type === "page") {
      const result = await pool.query(
        `
        SELECT DISTINCT ON (visitor_id)
          visitor_id,
          country,
          region,
          city,
          MAX(server_timestamp) OVER (
            PARTITION BY visitor_id
          ) AS last_seen,
          MIN(server_timestamp) OVER (
            PARTITION BY visitor_id
          ) AS first_seen,
          COUNT(*) OVER (
            PARTITION BY visitor_id
          ) AS page_views
        FROM events
        WHERE event = 'page_view'
          AND page = $1
          AND DATE(server_timestamp) BETWEEN $2 AND $3
          AND visitor_id IS NOT NULL
        ORDER BY visitor_id, server_timestamp DESC
        `,
        [value, from, to]
      );

      return Response.json({
        type,
        value,
        visitors: result.rows,
      });
    }

    // ============================================================
    // GEO VISITORS
    //
    // Country / Region / City
    //
    // Returns unique visitors for the selected location.
    // ============================================================

    let column;

    if (type === "country") {
      column = "country";
    }

    if (type === "region") {
      column = "region";
    }

    if (type === "city") {
      column = "city";
    }

    const query = `
      SELECT DISTINCT ON (visitor_id)
        visitor_id,
        country,
        region,
        city,
        MAX(server_timestamp) OVER (
          PARTITION BY visitor_id
        ) AS last_seen,
        MIN(server_timestamp) OVER (
          PARTITION BY visitor_id
        ) AS first_seen,
        COUNT(*) OVER (
          PARTITION BY visitor_id
        ) AS event_count
      FROM events
      WHERE event = 'page_view'
        AND ${column} = $1
        AND DATE(server_timestamp) BETWEEN $2 AND $3
        AND visitor_id IS NOT NULL
      ORDER BY visitor_id, server_timestamp DESC
    `;

    const result = await pool.query(
      query,
      [value, from, to]
    );

    return Response.json({
      type,
      value,
      visitors: result.rows,
    });
  } catch (err) {
    console.error("[VISITORS API ERROR]", err);

    return Response.json(
      {
        error: "Visitor analytics fetch failed",
      },
      { status: 500 }
    );
  }
}