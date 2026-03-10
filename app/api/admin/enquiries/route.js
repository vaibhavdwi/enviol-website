import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT * FROM contacts
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM contacts`;

    const dataResult = await pool.query(dataQuery, [limit, offset]);
    const countResult = await pool.query(countQuery);

    return NextResponse.json({
      enquiries: dataResult.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      totalPages: Math.ceil(countResult.rows[0].count / limit),
    });

  } catch (err) {
    console.error("Error fetching enquiries:", err);
    return NextResponse.json(
      { message: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}