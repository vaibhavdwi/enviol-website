import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req) {

  try {

    const { searchParams } = new URL(req.url);
    const product_id = searchParams.get("product_id");

    if (!product_id) {
      return NextResponse.json(
        { message: "Product id required" },
        { status: 400 }
      );
    }

    const bomRes = await pool.query(
      `SELECT id FROM bom WHERE product_id = $1 LIMIT 1`,
      [product_id]
    );

    if (bomRes.rows.length === 0) {
      return NextResponse.json({ items: [] });
    }

    const bomId = bomRes.rows[0].id;

    const itemsRes = await pool.query(
      `SELECT rm_item_name, ratio_percent, unit
       FROM bom_items
       WHERE bom_id = $1`,
      [bomId]
    );

    return NextResponse.json({
      items: itemsRes.rows
    });

  } catch (err) {

    console.error("BOM get error:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}