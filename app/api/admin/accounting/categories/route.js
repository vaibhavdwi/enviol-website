import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET() {
  try {
    // Fetch all categories with their group
    const result = await pool.query(`
      SELECT id, name, group_name
      FROM expense_categories
      ORDER BY group_name, name
    `);

    // Extract unique groups for filters
    const groups = [...new Set(result.rows.map(r => r.group_name).filter(Boolean))];

    // Categories as objects: id, name, group_name
    const categories = result.rows;

    return NextResponse.json({ groups, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ groups: [], categories: [] }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, group } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Category name is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO expense_categories (name, group_name)
       VALUES ($1, $2)
       RETURNING id, name, group_name`,
      [name, group || null]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, message: "Error creating category" },
      { status: 500 }
    );
  }
}