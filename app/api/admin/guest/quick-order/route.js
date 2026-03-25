import { NextResponse } from "next/server";
import { Pool } from "pg";

// ✅ Configure DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  const client = await pool.connect();

  try {
    const body = await req.json();

    const { customer, items, total_amount } = body;

    // ✅ Basic validation
    if (!customer?.company_name || !customer?.contact_person || !customer?.email) {
      return NextResponse.json(
        { error: "Missing required customer fields" },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    // 🔥 Start transaction
    await client.query("BEGIN");

    // ✅ Generate order number (simple approach)
    const orderNumberRes = await client.query(
      `SELECT COALESCE(MAX(order_number), 1000) + 1 AS next FROM guest_orders`
    );

    const order_number = orderNumberRes.rows[0].next;

    // ✅ Insert into guest_orders
    const orderInsert = await client.query(
      `
      INSERT INTO guest_orders (
        order_number,
        total_amount,
        company_name,
        contact_person,
        email,
        phone,
        city,
        notes
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id
      `,
      [
        order_number,
        total_amount,
        customer.company_name,
        customer.contact_person,
        customer.email,
        customer.phone || null,
        customer.city || null,
        customer.notes || null,
      ]
    );

    const order_id = orderInsert.rows[0].id;

    // ✅ Insert items
    for (const item of items) {
      await client.query(
        `
        INSERT INTO guest_order_items (
          order_id,
          product_id,
          product_name,
          quantity,
          price_offered,
          discount_percent,
          discounted_price,
          line_total
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        `,
        [
          order_id,
          item.product_id,
          item.product_name,
          item.quantity,
          item.price_offered,
          item.discount_percent || 0,
          item.discounted_price || 0,
          item.line_total || 0,
        ]
      );
    }

    // ✅ Commit
    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      message: "Guest order created successfully",
      order_number,
    });

  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Guest Order Error:", error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}