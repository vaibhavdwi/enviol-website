import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {

  try {

    const result = await pool.query(`
      SELECT DISTINCT item_name
      FROM fg_stock
      ORDER BY item_name
    `);

    return NextResponse.json({
      products: result.rows
    });

  } catch (error) {

    console.error("Products fetch error:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );

  }

}