import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");
    const monthsParam = searchParams.get("months"); // comma-separated months
    const months = monthsParam ? monthsParam.split(",").map(Number) : [];

    if (!year || months.length === 0) {
      return NextResponse.json([]);
    }

    const result = await pool.query(
      `SELECT e.id, e.amount, e.expense_date, e.incurred_for, e.reason, e.notes,
              c.name AS category,
              c.group_name AS "group"
       FROM expenses e
       JOIN expense_categories c ON e.category_id = c.id
       WHERE EXTRACT(YEAR FROM e.expense_date) = $1
         AND EXTRACT(MONTH FROM e.expense_date) = ANY($2::int[])
       ORDER BY e.expense_date ASC`,
      [year, months]
    );

    return NextResponse.json(result.rows || []);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}