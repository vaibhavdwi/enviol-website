// D:\enviol-enterprise-nextjs\app\api\admin\accounting\categories\route.js
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET() {
  try {
    const result = await pool.query(`SELECT id, name, group_name FROM expense_categories ORDER BY name`);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, group } = await req.json();

    if (!name) {
      return NextResponse.json({ success: false, message: "Category name is required" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO expense_categories (name, group_name)
       VALUES ($1, $2)
       RETURNING id, name, group_name`,
      [name, group || null]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error creating category" }, { status: 500 });
  }
}