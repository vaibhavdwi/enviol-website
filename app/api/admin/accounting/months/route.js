import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    if (!year) return NextResponse.json([]);

    const result = await pool.query(
      `SELECT DISTINCT EXTRACT(MONTH FROM expense_date) AS month, EXTRACT(YEAR FROM expense_date) AS year
       FROM expenses
       WHERE EXTRACT(YEAR FROM expense_date) = $1
       ORDER BY month ASC`,
      [year]
    );

    return NextResponse.json(result.rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}