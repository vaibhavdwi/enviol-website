import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {

    const { stocks } = await req.json();

    if (!stocks || stocks.length === 0) {
      return NextResponse.json(
        { message: "No stock data provided" },
        { status: 400 }
      );
    }

    for (const stock of stocks) {

      await pool.query(
        `
        UPDATE rm_stock
        SET quantity = $1,
            status = $2,
            created_at = NOW()
        WHERE id = $3
        `,
        [
          stock.quantity,
          stock.status,
          stock.id
        ]
      );

    }

    return NextResponse.json({
      message: "Stock updated successfully"
    });

  } catch (error) {

    console.error("RM Stock update error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }
}