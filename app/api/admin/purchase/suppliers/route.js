import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET() {

  const result = await pool.query(`
    SELECT DISTINCT ON (supplier_name)
      supplier_name,
      contact_person,
      email,
      phone,
      gst_number,
      address,
      city,
      state,
      pincode
    FROM purchases
    ORDER BY supplier_name, created_at DESC
  `);

  return NextResponse.json(result.rows);

}