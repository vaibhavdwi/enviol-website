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

    let query = `
      SELECT i.*, o.company_name, o.contact_person, o.email, o.phone, o.order_status
      FROM invoices i
      JOIN orders o ON o.id = i.order_id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND o.company_name ILIKE $${params.length}`;
    }
    if (fromDate) {
      params.push(fromDate);
      query += ` AND i.invoice_date >= $${params.length}`;
    }
    if (toDate) {
      params.push(toDate);
      query += ` AND i.invoice_date <= $${params.length}`;
    }

    query += ` ORDER BY i.invoice_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    const countQuery = `
      SELECT COUNT(*) as total
      FROM invoices i
      JOIN orders o ON o.id = i.order_id
      WHERE 1=1
      ${search ? ` AND o.company_name ILIKE '%${search}%'` : ""}
      ${fromDate ? ` AND i.invoice_date >= '${fromDate}'` : ""}
      ${toDate ? ` AND i.invoice_date <= '${toDate}'` : ""}
    `;
    const countResult = await pool.query(countQuery);

    return NextResponse.json({
      invoices: result.rows,
      totalPages: Math.ceil(countResult.rows[0].total / limit),
      page,
    });
  } catch (err) {
    console.error("Fetch invoices error:", err);
    return NextResponse.json({ message: "Failed to fetch invoices" }, { status: 500 });
  }
}