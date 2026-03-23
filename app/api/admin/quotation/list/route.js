import { NextResponse } from "next/server";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export async function GET() {
  try {

    // ✅ 1. FETCH QUOTATIONS
    const quotationsRes = await pool.query(`
      SELECT * FROM quotations
      ORDER BY created_at DESC
    `);

    const quotations = quotationsRes.rows;

    // ✅ 2. FETCH ITEMS
    const itemsRes = await pool.query(`
      SELECT * FROM quotation_items
    `);

    const items = itemsRes.rows;

    // ✅ 3. MAP ITEMS TO QUOTATIONS
    const result = quotations.map((q) => ({
      ...q,
      items: items.filter((item) => item.quotation_id === q.id),
    }));

    return NextResponse.json(result);

  } catch (error) {
    console.error("❌ ERROR FETCHING QUOTATIONS:", error);

    return NextResponse.json(
      { message: "Error fetching quotations", error: error.message },
      { status: 500 }
    );
  }
}