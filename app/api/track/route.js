import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const event = await req.json();

    // ============================================================
    // BASIC VALIDATION
    // ============================================================

    if (!event || !event.event) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid event payload",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // SERVER-SIDE REQUEST INFORMATION
    // ============================================================

    const ipRaw =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "";

    const ip = ipRaw.split(",")[0].trim();

    const country =
      req.headers.get("x-vercel-ip-country") ||
      "Unknown";

    const region =
      req.headers.get("x-vercel-ip-country-region") ||
      "Unknown";

    const city =
      req.headers.get("x-vercel-ip-city") ||
      "Unknown";

    const userAgent =
      req.headers.get("user-agent") || null;

    // ============================================================
    // SERVER TIMESTAMP
    // ============================================================

    const serverTimestamp = new Date().toISOString();

    // ============================================================
    // BUILD METADATA
    //
    // Everything specific to the event is stored here.
    //
    // This is especially important for ENY chat analytics:
    //
    // chat_id
    // duration_seconds
    // duration_ms
    // extension_count
    // extension_number
    // extension_seconds
    // automatic_submission
    // message_length
    // reason
    // action
    // ============================================================

    const {
      event: eventName,
      visitor_id,
      session_id,
      page,
      full_url,
      referrer,
      timestamp,

      // Existing optional metadata object
      metadata,

      // Everything else remains available
      ...additionalEventData
    } = event;

    const eventMetadata = {
      ...additionalEventData,

      ...(metadata &&
      typeof metadata === "object" &&
      !Array.isArray(metadata)
        ? metadata
        : {}),
    };

    // ============================================================
    // INSERT EVENT INTO POSTGRES
    // ============================================================

    await pool.query(
      `
      INSERT INTO events (
        event,
        visitor_id,
        session_id,
        page,
        full_url,
        referrer,
        event_timestamp,
        server_timestamp,
        user_agent,
        ip,
        country,
        region,
        city,
        metadata
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14
      )
      `,
      [
        eventName,

        visitor_id || null,

        session_id || null,

        page || null,

        full_url || null,

        referrer || null,

        timestamp || null,

        serverTimestamp,

        userAgent,

        ip || null,

        country,

        region,

        city,

        JSON.stringify(eventMetadata),
      ]
    );

    // ============================================================
    // SUCCESS
    // ============================================================

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Tracking API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}