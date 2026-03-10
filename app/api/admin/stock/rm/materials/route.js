import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {

  try {

    const result = await pool.query(
      `SELECT DISTINCT item_name 
       FROM rm_stock
       ORDER BY item_name`
    );

    return NextResponse.json({
      items: result.rows
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Error fetching raw materials" },
      { status: 500 }
    );
  }

}