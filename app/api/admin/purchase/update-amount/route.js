import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function POST(req) {

  const { id, amount } = await req.json();

  const finalAmount = Number(amount);

  // GST inclusive calculation
  const baseAmount = finalAmount / 1.18;
  const gstAmount = finalAmount - baseAmount;

  await pool.query(
    `UPDATE purchases
     SET final_amount = $1,
         base_amount = $2,
         gst_paid = $3
     WHERE id = $4`,
    [
      finalAmount,
      baseAmount,
      gstAmount,
      id
    ]
  );

  return NextResponse.json({ success: true });

}