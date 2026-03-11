import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function POST(req) {
  try {
    const { category_id, amount, expense_date, incurred_for, reason, notes } = await req.json();

    if (!category_id || !amount || !expense_date) {
      return NextResponse.json({ success: false, message: "Category, amount, and date are required" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO expenses (category_id, amount, expense_date, incurred_for, reason, notes)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [category_id, amount, expense_date, incurred_for || null, reason || null, notes || null]
    );

    return NextResponse.json({ success: true, expense: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error adding expense" }, { status: 500 });
  }
}