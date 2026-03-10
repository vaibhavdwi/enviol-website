import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  const client = await pool.connect();

  try {

    const body = await req.json();

    const { customer, items, total_amount } = body;

    const {
      company_name,
      contact_person,
      email,
      phone,
      gst_number,
      address,
      city,
      state,
      pincode,
      notes
    } = customer;

    await client.query("BEGIN");

    // Get next order number
    const maxRes = await client.query(
      "SELECT MAX(order_number) FROM orders"
    );

    const nextOrderNumber =
      maxRes.rows[0].max
        ? parseInt(maxRes.rows[0].max) + 1
        : 1001;

    // Insert Order (header)
    const orderResult = await client.query(
      `INSERT INTO orders
      (order_number, company_name, contact_person, email, phone, gst_number,
       address, city, state, pincode, notes, total_amount)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING id`,
      [
        nextOrderNumber,
        company_name,
        contact_person,
        email,
        phone,
        gst_number,
        address,
        city,
        state,
        pincode,
        notes,
        total_amount,
      ]
    );

    const orderId = orderResult.rows[0].id;

    // Insert Products
    for (const item of items) {

      await client.query(
        `INSERT INTO order_items
        (order_id, product_id, product_name, quantity,
         price_offered, discount_percent, discounted_price, line_total)
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          orderId,
          item.product_id,
          item.product_name,
          item.quantity,
          item.price_offered,
          item.discount_percent,
          item.discounted_price,
          item.line_total,
        ]
      );

    }

    await client.query("COMMIT");

    return NextResponse.json({
      message: "Order created successfully",
      order_id: orderId,
      order_number: nextOrderNumber,
    });

  } catch (err) {

    await client.query("ROLLBACK");

    console.error(err);

    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );

  } finally {
    client.release();
  }
}