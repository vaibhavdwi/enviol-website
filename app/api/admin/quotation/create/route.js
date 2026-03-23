import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  const client = await pool.connect();

  try {
    const body = await req.json();

    const {
      company_name,
      contact_person,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      gst_number,
      items,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "No items provided" },
        { status: 400 }
      );
    }

    await client.query("BEGIN");

    // ✅ Generate quotation number
    const maxRes = await client.query(
      "SELECT MAX(quotation_number) FROM quotations"
    );

    const nextQuotationNumber =
      maxRes.rows[0].max
        ? parseInt(maxRes.rows[0].max) + 1
        : 5001;

    // ✅ Calculate totals
    let totalAmount = 0;

    const calculatedItems = items.map((item) => {
      const qty = Number(item.quantity);
      const price = Number(item.price);
      const discount = Number(item.discount);

      const total = qty * price;
      const discountAmount = (total * discount) / 100;
      const lineTotal = total - discountAmount;

      totalAmount += lineTotal;

      return {
        ...item,
        quantity: qty,
        price: price,
        discount: discount,
        line_total: lineTotal,
      };
    });

    // ✅ Insert quotation
    const result = await client.query(
      `INSERT INTO quotations
      (quotation_number, company_name, contact_person, email, phone,
       address, city, state, pincode, gst_number, total_amount)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id`,
      [
        nextQuotationNumber,
        company_name,
        contact_person,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        gst_number,
        totalAmount,
      ]
    );

    const quotationId = result.rows[0].id;

    // ✅ Insert items
    for (const item of calculatedItems) {
      await client.query(
        `INSERT INTO quotation_items
        (quotation_id, product_id, product_name,
         quantity, price, discount, line_total)
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          quotationId,
          item.product_id,
          item.product_name,
          item.quantity,
          item.price,
          item.discount,
          item.line_total,
        ]
      );
    }

    await client.query("COMMIT");

    return NextResponse.json({
      message: "Quotation saved successfully",
      quotation_id: quotationId,
      quotation_number: nextQuotationNumber,
    });

  } catch (error) {
    await client.query("ROLLBACK");

    console.error("QUOTATION CREATE ERROR:", error);

    return NextResponse.json(
      {
        message: "Error saving quotation",
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}