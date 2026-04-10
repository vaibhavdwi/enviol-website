import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // ✅ Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 25;
    const offset = (page - 1) * limit;

    // ✅ Filters (IMPORTANT: trim to avoid " " issues)
    const search = searchParams.get("search")?.trim();
    const category = searchParams.get("category")?.trim();
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");

    // 🔍 DEBUG (remove later)
    console.log({ search, category, fromDate, toDate });

    // ✅ Dynamic conditions
    let conditions = [];
    let values = [];
    let index = 1;

    // 🔎 Search by company (case-insensitive)
    if (search) {
      conditions.push(`company ILIKE $${index}`);
      values.push(`%${search}%`);
      index++;
    }

    // 🧩 Category filter (case-insensitive FIX)
    if (category) {
      conditions.push(`LOWER(category) = LOWER($${index})`);
      values.push(category);
      index++;
    }

    // 📅 FROM DATE
    if (fromDate) {
      conditions.push(`created_at >= $${index}`);
      values.push(fromDate);
      index++;
    }

    // 📅 TO DATE (FULL DAY FIX)
    if (toDate) {
      conditions.push(`created_at < ($${index}::date + interval '1 day')`);
      values.push(toDate);
      index++;
    }

    // 🧱 WHERE clause
    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // ✅ Data Query
    const dataQuery = `
      SELECT * FROM contacts
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${index} OFFSET $${index + 1}
    `;

    const dataValues = [...values, limit, offset];

    const dataResult = await pool.query(dataQuery, dataValues);

    // ✅ Count Query (same filters, no limit/offset)
    const countQuery = `
      SELECT COUNT(*) FROM contacts
      ${whereClause}
    `;

    const countResult = await pool.query(countQuery, values);

    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      enquiries: dataResult.rows,
      total,
      page,
      totalPages,
    });

  } catch (err) {
    console.error("Error fetching enquiries:", err);

    return NextResponse.json(
      { message: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}