import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function POST(req) {

  try {

    const body = await req.json();

    const { stock_date, items } = body;

    if (!items || items.length === 0) {

      return NextResponse.json(
        { message: "No items provided" },
        { status: 400 }
      );

    }

    for (const item of items) {

      await pool.query(
        `INSERT INTO rm_stock
        (item_name, quantity, unit, status, stock_date)
        VALUES ($1,$2,$3,$4,$5)`,
        [
          item.item_name,
          item.quantity,
          item.unit,
          item.status,
          stock_date
        ]
      );

    }

    return NextResponse.json({
      message: "Stock saved"
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Error saving stock" },
      { status: 500 }
    );

  }

}