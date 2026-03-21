import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PATCH(req) {
  try {
    const {
      batch_plan_id,
      batch_status,
      job_card_statuses, // OLD
      job_card_updates,  // NEW
    } = await req.json();

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // ✅ 1️⃣ Update batch plan status (unchanged)
      if (batch_status) {
        await client.query(
          "UPDATE batch_plan SET status = $1 WHERE id = $2",
          [batch_status, batch_plan_id]
        );
      }

      // ✅ 2️⃣ OLD LOGIC (unchanged)
      if (job_card_statuses?.length > 0) {
        const ids = job_card_statuses.map((jc) => jc.id);
        const placeholders = ids.map((_, i) => `$${i + 1}`).join(",");

        const query = `
          UPDATE job_cards
          SET status = CASE id
            ${job_card_statuses
              .map(
                (jc, idx) =>
                  `WHEN $${idx + 1} THEN $${idx + 1 + ids.length}`
              )
              .join(" ")}
          END
          WHERE id IN (${placeholders})
        `;

        await client.query(
          query,
          [...ids, ...job_card_statuses.map((jc) => jc.status)]
        );
      }

      // ✅ 3️⃣ NEW LOGIC (extended + FG stock update)
      if (job_card_updates?.length > 0) {
        for (const jc of job_card_updates) {

          // 🔹 Fetch existing job card data
          const existing = await client.query(
            `SELECT status, product_name, batch_size FROM job_cards WHERE id = $1`,
            [jc.id]
          );

          const prevStatus = existing.rows[0]?.status;
          const productName = existing.rows[0]?.product_name;
          const batchSize = existing.rows[0]?.batch_size;

          // 🔹 Update job card
          await client.query(
            `UPDATE job_cards
             SET status = $1,
                 start_time = $2,
                 end_time = $3,
                 remarks = $4
             WHERE id = $5`,
            [
              jc.status,
              jc.start_time || null,
              jc.end_time || null,
              jc.remarks || null,
              jc.id,
            ]
          );

          // ✅ FG STOCK UPDATE (only when status changes to DONE)
          if (jc.status === "Done" && prevStatus !== "Done") {

            const stockRes = await client.query(
              `SELECT id, quantity FROM fg_stock WHERE item_name = $1`,
              [productName]
            );

            if (stockRes.rows.length > 0) {
              // 🔹 Update existing stock
              await client.query(
                `UPDATE fg_stock
                 SET quantity = quantity + $1,
                     stock_date = CURRENT_DATE
                 WHERE item_name = $2`,
                [batchSize, productName]
              );
            } else {
              // 🔹 Insert new stock
              await client.query(
                `INSERT INTO fg_stock (item_name, quantity, unit, stock_date)
                 VALUES ($1, $2, 'KG', CURRENT_DATE)`,
                [productName, batchSize]
              );
            }
          }
        }
      }

      await client.query("COMMIT");

      return new Response(
        JSON.stringify({ message: "Statuses updated successfully" }),
        { status: 200 }
      );

    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);

      return new Response(
        JSON.stringify({ message: "Server error during update" }),
        { status: 500 }
      );
    } finally {
      client.release();
    }

  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
}