import { NextResponse } from "next/server";
import pool from "@/lib/db";


export async function POST(req) {
try {
const event = await req.json();

const ipRaw =
  req.headers.get("x-forwarded-for") ||
  req.headers.get("x-real-ip") ||
  "";

const ip = ipRaw.split(",")[0].trim();

const geo = null;

const enrichedEvent = {
  ...event,

  server_timestamp: new Date().toISOString(),

  user_agent: req.headers.get("user-agent") || null,

  ip,

  region: "Unknown",
  city: "Unknown"
};
// -----------------------------
// BASIC VALIDATION
// -----------------------------
if (!event || !event.event) {
  return NextResponse.json(
    {
      success: false,
      error: "Invalid event payload"
    },
    { status: 400 }
  );
}



// -----------------------------
// INSERT INTO POSTGRES
// -----------------------------
await pool.query(
  `
  INSERT INTO events (
    event,
    session_id,
    page,
    full_url,
    referrer,
    event_timestamp,
    server_timestamp,
    user_agent,
    ip,
	region,
	city,
    metadata
  )
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
  `,
  [
    enrichedEvent.event,
    enrichedEvent.session_id || null,
    enrichedEvent.page || null,
    enrichedEvent.full_url || null,
    enrichedEvent.referrer || null,
    enrichedEvent.timestamp || null,
    enrichedEvent.server_timestamp,
    enrichedEvent.user_agent,
    enrichedEvent.ip,
	enrichedEvent.region || "Unknown",
	enrichedEvent.city || "Unknown",

    JSON.stringify(
      enrichedEvent.metadata || {}
    )
  ]
);

return NextResponse.json({
  success: true
});


} catch (error) {
console.error("Tracking API Error:", error);


return NextResponse.json(
  {
    success: false,
    error: "Internal server error"
  },
  { status: 500 }
);


}
}
