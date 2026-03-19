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
    const groupFilter = searchParams.get("group"); // optional
    const categoryFilter = searchParams.get("category"); // optional

    const months = monthsParam ? monthsParam.split(",").map(Number) : [];

    if (!year || months.length === 0) {
      return NextResponse.json([]);
    }

    // Build dynamic WHERE clauses
    const filters = [
      `EXTRACT(YEAR FROM e.expense_date) = $1`,
      `EXTRACT(MONTH FROM e.expense_date) = ANY($2::int[])`
    ];
    const values = [year, months];
    let paramIndex = 3;

    if (groupFilter) {
      filters.push(`c.group_name = $${paramIndex}`);
      values.push(groupFilter);
      paramIndex++;
    }

    if (categoryFilter) {
      filters.push(`c.name = $${paramIndex}`);
      values.push(categoryFilter);
      paramIndex++;
    }

    const query = `
      SELECT e.id, e.amount, e.expense_date, e.incurred_for, e.reason, e.notes,
             c.name AS category,
             c.group_name AS "group"
      FROM expenses e
      JOIN expense_categories c ON e.category_id = c.id
      WHERE ${filters.join(" AND ")}
      ORDER BY e.expense_date ASC
    `;

    const result = await pool.query(query, values);

    return NextResponse.json(result.rows || []);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}