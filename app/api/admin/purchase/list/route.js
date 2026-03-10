import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET() {

  const purchases = await pool.query(`
  
  SELECT p.*, 
  COALESCE(SUM(i.total_amount),0) AS total_amount,
  
  json_agg(
    json_build_object(
      'product_name', i.product_name,
      'quantity', i.quantity
    )
  ) as items
  
  FROM purchases p
  
  LEFT JOIN purchase_items i
  ON p.id = i.purchase_id
  
  GROUP BY p.id
  
  ORDER BY p.created_at DESC
  
  `);

  return NextResponse.json({
    purchases: purchases.rows
  });

}