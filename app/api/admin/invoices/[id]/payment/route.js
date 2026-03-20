import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PATCH(req, context) {
  const client = await pool.connect();

  try {
    const { id } = await context.params;
    const body = await req.json();
    const amount = Number(body.amount);

    // ❗ Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid payment amount" },
        { status: 400 }
      );
    }

    await client.query("BEGIN");

    // 🔒 Lock row to prevent double update (VERY IMPORTANT)
    const invoiceRes = await client.query(
      `SELECT total_amount, amount_received 
       FROM invoices 
       WHERE id = $1
       FOR UPDATE`,
      [id]
    );

    if (invoiceRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    const invoice = invoiceRes.rows[0];

    const total = Number(invoice.total_amount || 0);
    const currentReceived = Number(invoice.amount_received || 0);

    const newReceived = currentReceived + amount;

    // ❗ Prevent overpayment
    if (newReceived > total) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { message: "Payment exceeds invoice amount" },
        { status: 400 }
      );
    }

    // ✅ Determine payment status
    let paymentStatus = "No Payment";

    if (newReceived > 0 && newReceived < total) {
      paymentStatus = "Part Payment Received";
    } else if (newReceived >= total) {
      paymentStatus = "Full Payment Received";
    }

    // ✅ Atomic update (no race condition)
    await client.query(
      `UPDATE invoices 
       SET amount_received = $1,
           last_payment_date = NOW(),
           payment_status = $2
       WHERE id = $3`,
      [newReceived, paymentStatus, id]
    );
	// ✅ Sync ONLY payment_status to sales
	await client.query(
	`UPDATE sales 
	SET payment_status = $1
	WHERE invoice_id = $2`,
	[paymentStatus, id]
	);

    await client.query("COMMIT");

    return NextResponse.json({
      message: "Payment updated successfully",
      amount_received: newReceived,
      payment_status: paymentStatus,
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Payment API Error:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}