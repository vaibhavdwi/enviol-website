import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function POST(req) {

  const { id, status } = await req.json();

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    // 1️⃣ Update purchase status
    await client.query(
      "UPDATE purchases SET status=$1 WHERE id=$2",
      [status, id]
    );

    // 2️⃣ If status is Completed → push to RM stock
    if (status === "Completed") {

      await client.query(`
  INSERT INTO rm_stock (item_name, quantity, stock_date, created_at)
  SELECT product_name, quantity, CURRENT_DATE, CURRENT_TIMESTAMP
  FROM purchase_items
  WHERE purchase_id = $1
  ON CONFLICT (item_name)
  DO UPDATE
  SET quantity = rm_stock.quantity + EXCLUDED.quantity,
      created_at = CURRENT_TIMESTAMP
`, [id]);

    }

    await client.query("COMMIT");

    return NextResponse.json({ success: true });

  } catch (err) {

    await client.query("ROLLBACK");
    console.error(err);

    return NextResponse.json({
      success: false,
      error: err.message
    });

  } finally {

    client.release();

  }
}