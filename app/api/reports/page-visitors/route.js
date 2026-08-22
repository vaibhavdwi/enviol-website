import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!page || !from || !to) {
      return Response.json(
        {
          error: "page, from and to are required",
        },
        { status: 400 }
      );
    }

    /*
     * We use the raw events table here.
     *
     * Top Pages uses analytics_page_views_daily,
     * but the visitor popup needs individual events.
     *
     * India timezone is used for the selected date range.
     */

    const result = await pool.query(
      `
      SELECT
        id,
        event,
        page,
        full_url,
        referrer,
        event_timestamp,
        server_timestamp,
        user_agent,
        region,
        city,
        visitor_id,
        country,
        session_id,
        metadata
      FROM events
      WHERE event = 'page_view'
        AND page = $1
        AND server_timestamp >= (
          $2::date AT TIME ZONE 'Asia/Kolkata'
        )
        AND server_timestamp < (
          ($3::date + INTERVAL '1 day')
          AT TIME ZONE 'Asia/Kolkata'
        )
      ORDER BY server_timestamp DESC
      `,
      [page, from, to]
    );

    const visitors = result.rows.map((row) => ({
      id: row.id,
      event: row.event,
      page: row.page,
      full_url: row.full_url,
      referrer: row.referrer,
      event_timestamp: row.event_timestamp,
      server_timestamp: row.server_timestamp,
      user_agent: row.user_agent,
      region: row.region,
      city: row.city,
      visitor_id: row.visitor_id,
      country: row.country,
      session_id: row.session_id,
      metadata: row.metadata,
      device: getDevice(row.user_agent),
    }));

    return Response.json({
      page,
      total: visitors.length,
      visitors,
    });
  } catch (err) {
    console.error("[PAGE VISITORS ERROR]", err);

    return Response.json(
      {
        error: "Failed to fetch page visitors",
      },
      { status: 500 }
    );
  }
}

function getDevice(userAgent) {
  if (!userAgent) {
    return "Unknown";
  }

  const ua = userAgent.toLowerCase();

  if (
    ua.includes("iphone") ||
    ua.includes("ipad") ||
    ua.includes("android")
  ) {
    return "Mobile";
  }

  if (
    ua.includes("windows") ||
    ua.includes("macintosh") ||
    ua.includes("linux")
  ) {
    return "Desktop";
  }

  return "Unknown";
}