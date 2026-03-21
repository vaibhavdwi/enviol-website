import { NextResponse } from "next/server";
import { Pool } from "pg";

// DB connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {
    const { batch_plan_id } = await req.json();

    // ✅ Safe fallback (unchanged behavior)
    if (!batch_plan_id) {
      return NextResponse.json({ job_cards: [] });
    }

    // ✅ Extended query (added new fields, no removal)
    const query = `
      SELECT 
        id, 
        job_number, 
        product_name, 
        batch_size, 
        operator_name, 
        status, 
        batch_date, 
        batch_time,
        start_time,
        end_time,
        remarks
      FROM job_cards
      WHERE batch_plan_id = $1
      ORDER BY job_number
    `;

    const result = await pool.query(query, [batch_plan_id]);

    // ✅ SAME response format
    return NextResponse.json({ job_cards: result.rows });

  } catch (err) {
    console.error("Error fetching job cards by batch plan:", err);

    return new Response(
      JSON.stringify({ message: "Server error fetching job cards" }),
      { status: 500 }
    );
  }
}