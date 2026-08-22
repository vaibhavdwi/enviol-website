import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const value = searchParams.get("value");
    const visitorId = searchParams.get("visitor_id");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!type) {
      return Response.json(
        { error: "type is required" },
        { status: 400 }
      );
    }

    if (!from || !to) {
      return Response.json(
        { error: "from and to are required" },
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
            "Invalid type. Use page, country, region, city or visitor.",
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