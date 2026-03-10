import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {

    const result = await pool.query(`
      SELECT 
        o.id,
        o.order_number,
        o.company_name,
        o.total_amount,
        o.order_status,
        o.created_at,
        STRING_AGG(oi.product_name, ', ') AS products,
        SUM(oi.quantity) AS quantities
      FROM orders o
      LEFT JOIN order_items oi
      ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);

    return NextResponse.json({
      orders: result.rows,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}