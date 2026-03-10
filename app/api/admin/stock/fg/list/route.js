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

    let query = `SELECT * FROM fg_stock`;
    let values = [];

    if (from && to) {

      query += ` WHERE stock_date BETWEEN $1 AND $2`;
      values = [from, to];

    }

    query += ` ORDER BY stock_date DESC`;

    const result = await pool.query(query, values);

    return NextResponse.json({
      stocks: result.rows
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Error fetching stock" },
      { status: 500 }
    );

  }

}