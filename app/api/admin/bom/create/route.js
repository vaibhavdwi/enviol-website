import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {

  try {

    const body = await req.json();

    const { product_name, items } = body;

    if (!product_name || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Invalid BOM data" },
        { status: 400 }
      );
    }

    // -------- Generate Product ID --------

    const productIdMatch = product_name.match(/\d+/);

const product_id = productIdMatch
  ? productIdMatch[0]
  : Math.floor(1000 + Math.random() * 9000).toString();

    // -------- Create BOM --------

    const bomRes = await pool.query(
      `INSERT INTO bom
       (product_id, product_name)
       VALUES ($1,$2)
       RETURNING id`,
      [product_id, product_name]
    );

    const bomId = bomRes.rows[0].id;

    // -------- Insert BOM Items --------

    for (const item of items) {

      await pool.query(
        `INSERT INTO bom_items
        (bom_id, rm_item_name, ratio_percent, unit)
        VALUES ($1,$2,$3,$4)`,
        [
          bomId,
          item.rm_item_name,
          item.ratio_percent,
          "Kg"
        ]
      );

    }

    return NextResponse.json({
      message: "BOM created successfully"
    });

  } catch (error) {

    console.error("BOM create error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }

}