import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(
      "SELECT * FROM orders WHERE id = $1",
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order: result.rows[0] });

  } catch (error) {
    console.error("Fetch order error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}