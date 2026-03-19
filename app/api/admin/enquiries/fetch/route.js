import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const contactId = searchParams.get("contactId");

    if (!contactId) {
      return NextResponse.json(
        { message: "Missing contactId" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT id, subject, message, attachment_name, email_status, created_at
       FROM contact_replies
       WHERE contact_id = $1
       ORDER BY created_at DESC`,
      [contactId]
    );

    return NextResponse.json({
      replies: result.rows,
    });

  } catch (err) {
    console.error("Fetch replies error:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}