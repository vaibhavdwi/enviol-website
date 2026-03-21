import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ✅ GET (Now supports optional filters — backward compatible)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get("date");
    const status = searchParams.get("status");

    let query = `
      SELECT id, batch_plan_number, batch_date, status 
      FROM batch_plan 
      WHERE 1=1
    `;

    let values = [];

    // Apply filters only if present
    if (date) {
      values.push(date);
      query += ` AND batch_date = $${values.length}`;
    }

    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    query += ` ORDER BY batch_date DESC`;

    const res = await pool.query(query, values);

    // ⚠️ Keep response SAME as before (array)
    return new Response(JSON.stringify(res.rows), { status: 200 });

  } catch (err) {
    console.error("Error fetching batch plans:", err);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
}

// ✅ POST (UNCHANGED LOGIC — only added default status)
export async function POST(req) {
  try {
    const { batchPlan, job_card_ids } = await req.json();

    // Validate input
    if (!batchPlan?.batch_plan_number || !batchPlan?.batch_date) {
      return new Response(
        JSON.stringify({ message: "Batch plan number and date are required" }),
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // ✅ Insert batch plan (added default status = Draft)
      const insertBatchPlanQuery = `
        INSERT INTO batch_plan (batch_plan_number, batch_date, status, created_at)
        VALUES ($1, $2, 'Draft', NOW())
        RETURNING id
      `;

      const insertRes = await client.query(insertBatchPlanQuery, [
        batchPlan.batch_plan_number,
        batchPlan.batch_date,
      ]);

      const batchPlanId = insertRes.rows[0].id;

      // ✅ Update job cards
      if (job_card_ids?.length > 0) {
        const placeholders = job_card_ids.map((_, i) => `$${i + 1}`).join(",");

        const updateJobCardsQuery = `
          UPDATE job_cards
          SET batch_plan_id = $${job_card_ids.length + 1},
              batch_number = $${job_card_ids.length + 2}
          WHERE id IN (${placeholders})
        `;

        await client.query(updateJobCardsQuery, [
          ...job_card_ids,
          batchPlanId,
          batchPlan.batch_plan_number,
        ]);
      }

      await client.query("COMMIT");

      return new Response(
        JSON.stringify({
          message: "Batch plan created successfully",
          batchPlanId,
        }),
        { status: 200 }
      );

    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Transaction Error:", err);

      return new Response(
        JSON.stringify({ message: "Server error during batch plan creation" }),
        { status: 500 }
      );
    } finally {
      client.release();
    }

  } catch (err) {
    console.error("Route Error:", err);

    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
}