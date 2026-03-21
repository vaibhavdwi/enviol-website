import { NextResponse } from "next/server";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export async function POST(req) {
  try {
    const { products } = await req.json();

    if (!products || !products.length) {
      return new Response(
        JSON.stringify({ job_cards: [] }),
        { status: 200 }
      );
    }

    // Generate parameter placeholders for SQL query
    const placeholders = products.map((_, i) => `$${i + 1}`).join(",");

    const query = `
      SELECT id, job_number, product_id, product_name, batch_size, operator_name, batch_date, batch_time
      FROM job_cards
      WHERE product_name IN (${placeholders})
      ORDER BY batch_date, job_number
    `;

    const result = await pool.query(query, products);

    return new Response(
      JSON.stringify({ job_cards: result.rows }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching job cards:", err);
    return new Response(
      JSON.stringify({ message: "Server error fetching job cards" }),
      { status: 500 }
    );
  }
}