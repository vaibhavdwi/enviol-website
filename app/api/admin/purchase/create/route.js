import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {

    const body = await req.json();

    const { supplier, items } = body;

    if (!supplier || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Invalid purchase data" },
        { status: 400 }
      );
    }

    const {
      supplier_name,
      contact_person,
      email,
      phone,
      gst_number,
      address,
      city,
      state,
      pincode
    } = supplier;

    // Generate next purchase number
    const maxRes = await pool.query(
      "SELECT MAX(purchase_number) FROM purchases"
    );

    const nextPurchaseNumber =
      maxRes.rows[0].max
        ? parseInt(maxRes.rows[0].max) + 1
        : 1001;

    // Insert purchase
    const purchaseResult = await pool.query(
      `INSERT INTO purchases
      (purchase_number, supplier_name, contact_person, email, phone,
       gst_number, address, city, state, pincode)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        nextPurchaseNumber,
        supplier_name,
        contact_person,
        email,
        phone,
        gst_number,
        address,
        city,
        state,
        pincode
      ]
    );

    const purchase = purchaseResult.rows[0];
    const purchaseId = purchase.id;

    // Insert purchase items
    for (const item of items) {

      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const discount = Number(item.discount) || 0;

      const total = qty * price;
      const discountAmount = (total * discount) / 100;
      const lineTotal = total - discountAmount;

      await pool.query(
        `INSERT INTO purchase_items
        (purchase_id, product_name, quantity, price, discount_percent, total_amount)
        VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          purchaseId,
          item.product_name,
          qty,
          price,
          discount,
          lineTotal
        ]
      );
    }

    return NextResponse.json({
      message: "Purchase created successfully",
      purchase
    });

  } catch (error) {

    console.error("Purchase create error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }
}