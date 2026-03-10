import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {

  try {

    const result = await pool.query(
      `SELECT DISTINCT product_id, product_name 
       FROM bom
       ORDER BY product_name`
    );

    return NextResponse.json({
      products: result.rows
    });

  } catch (error) {

    console.error("BOM Products API Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch BOM products" },
      { status: 500 }
    );

  }

}