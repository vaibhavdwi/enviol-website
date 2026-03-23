import { NextResponse } from "next/server";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { message: "Missing id or status" },
        { status: 400 }
      );
    }

    // ✅ UPDATE QUERY
    const result = await pool.query(
      `UPDATE quotations
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Quotation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error("❌ UPDATE STATUS ERROR:", error);

    return NextResponse.json(
      {
        message: "Error updating status",
        error: error.message,
      },
      { status: 500 }
    );
  }
}