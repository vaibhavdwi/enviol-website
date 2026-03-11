import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT DISTINCT EXTRACT(YEAR FROM expense_date) AS year FROM expenses ORDER BY year DESC"
    );
    const years = result.rows.map(r => r.year);
    return NextResponse.json(years);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}