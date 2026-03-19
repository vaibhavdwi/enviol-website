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

    const search = searchParams.get("search") || "";
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");

    // Build dynamic WHERE clause
    const whereClauses = [];
    const values = [];

    if (search) {
      values.push(`%${search}%`);
      whereClauses.push(`(o.company_name ILIKE $${values.length} OR i.invoice_number ILIKE $${values.length})`);
    }

    if (fromDate) {
      values.push(fromDate);
      whereClauses.push(`i.invoice_date >= $${values.length}`);
    }

    if (toDate) {
      values.push(toDate);
      whereClauses.push(`i.invoice_date <= $${values.length}`);
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) 
      FROM invoices i
      LEFT JOIN orders o ON i.order_id = o.id
      ${whereSQL}
    `;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    // Fetch invoices with order info
    const dataQuery = `
      SELECT i.*, o.company_name, o.contact_person, o.email, o.phone
      FROM invoices i
      LEFT JOIN orders o ON i.order_id = o.id
      ${whereSQL}
      ORDER BY i.invoice_date DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;
    values.push(limit, offset);
    const dataResult = await pool.query(dataQuery, values);
    const invoices = dataResult.rows;

    // Fetch order items for each invoice
    for (let inv of invoices) {
      if (inv.order_id) {
        const itemsResult = await pool.query(
          `SELECT * FROM order_items WHERE order_id = $1`,
          [inv.order_id]
        );
        inv.items = itemsResult.rows;
      } else {
        inv.items = [];
      }
    }

    return NextResponse.json({ invoices, totalPages, page, total });
  } catch (err) {
    console.error("Error fetching invoices:", err);
    return NextResponse.json(
      { message: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}