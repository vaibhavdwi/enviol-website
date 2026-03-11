import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT DISTINCT group_name FROM expense_categories WHERE group_name IS NOT NULL ORDER BY group_name`
    );

    // Flatten array of objects to simple array
    const groups = result.rows.map(r => r.group_name);

    return NextResponse.json(groups);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}