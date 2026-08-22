import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const visitorId = searchParams.get("visitorId");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!visitorId || !from || !to) {
      return Response.json(
        {
          error: "visitorId, from and to are required",
        },
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
        event_timestamp,
        server_timestamp,
        user_agent,
        ip,
        metadata,
        region,
        city,
        visitor_id,
        country,
        session_id
      FROM events
      WHERE visitor_id = $1
        AND server_timestamp >= (
          $2::date AT TIME ZONE 'Asia/Kolkata'
        )
        AND server_timestamp < (
          ($3::date + INTERVAL '1 day')
          AT TIME ZONE 'Asia/Kolkata'
        )
      ORDER BY
        COALESCE(event_timestamp, server_timestamp) ASC,
        id ASC
      `,
      [visitorId, from, to]
    );

    const events = result.rows.map((row) => ({
      id: row.id,
      event: row.event,
      page: row.page,
      full_url: row.full_url,
      referrer: row.referrer,
      event_timestamp: row.event_timestamp,
      server_timestamp: row.server_timestamp,
      user_agent: row.user_agent,
      metadata: row.metadata,
      region: row.region,
      city: row.city,
      visitor_id: row.visitor_id,
      country: row.country,
      session_id: row.session_id,
    }));

    return Response.json({
      visitorId,
      total: events.length,
      events,
    });
  } catch (err) {
    console.error("[VISITOR JOURNEY ERROR]", err);

    return Response.json(
      {
        error: "Failed to fetch visitor journey",
      },
      { status: 500 }
    );
  }
}