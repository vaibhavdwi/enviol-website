import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {
    const { orderIds, status } = await req.json();

    if (!orderIds || orderIds.length === 0) {
      return NextResponse.json(
        { message: "No orders selected" },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE orders 
       SET order_status = $1 
       WHERE id = ANY($2::int[])`,
      [status, orderIds]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 }
    );
  }
}