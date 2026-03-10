import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {

    const { orderIds, status } = await req.json();

    if (!orderIds || orderIds.length === 0) {
      return NextResponse.json(
        { message: "No orders selected" },
        { status: 400 }
      );
    }

    // ---------------- UPDATE ORDER STATUS ----------------

    await pool.query(
      `UPDATE orders 
       SET order_status = $1 
       WHERE id = ANY($2::int[])`,
      [status, orderIds]
    );

    // ---------------- FG STOCK DEDUCTION ----------------

    if (status === "Completed") {

      for (const orderId of orderIds) {

        // Get order items
        const itemsRes = await pool.query(
          `SELECT product_name, quantity 
           FROM order_items 
           WHERE order_id = $1`,
          [orderId]
        );

        const items = itemsRes.rows;

        for (const item of items) {

          // Check current stock
          const stockRes = await pool.query(
            `SELECT quantity 
             FROM fg_stock
             WHERE item_name = $1`,
            [item.product_name]
          );

          if (stockRes.rows.length === 0) {
            throw new Error(`FG item not found: ${item.product_name}`);
          }

          const currentStock = Number(stockRes.rows[0].quantity);
          const requiredQty = Number(item.quantity);

          if (currentStock < requiredQty) {
            throw new Error(
              `Insufficient stock for ${item.product_name}. Required ${requiredQty}, Available ${currentStock}`
            );
          }

          // Deduct stock
          await pool.query(
            `UPDATE fg_stock
             SET quantity = quantity - $1,
                 created_at = CURRENT_TIMESTAMP
             WHERE item_name = $2`,
            [requiredQty, item.product_name]
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
    });

  } catch (error) {

    console.error("Status update error:", error);

    return NextResponse.json(
      { message: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}