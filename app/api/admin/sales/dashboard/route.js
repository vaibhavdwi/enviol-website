import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req) {

  try {

    const { searchParams } = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let filter = "";
    let values = [];

    if (from && to) {
      filter = "WHERE sale_date BETWEEN $1 AND $2";
      values = [from, to];
    }

    const result = await pool.query(
      `
      SELECT
        COUNT(DISTINCT order_id) AS total_orders,
        COALESCE(SUM(revenue),0) AS revenue,
        COALESCE(SUM(gst_collected),0) AS gst,
        COALESCE(SUM(net_profit),0) AS profit,
        COALESCE(AVG(revenue),0) AS avg_order_value
      FROM sales
      ${filter}
      `,
      values
    );

    const data = result.rows[0];

    return NextResponse.json({
      total_orders: Number(data.total_orders),
      revenue: Number(data.revenue),
      gst: Number(data.gst),
      profit: Number(data.profit),
      avg_order_value: Number(data.avg_order_value),
    });

  } catch (error) {

    console.error("Sales dashboard error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }

}