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
      company,
      person,
      email,
      phone,
      message,
      category,
      product_slug,
      source_page,
    } = body;

    // ✅ Validation
    if (!company || !person || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Insert into guest_enquiries
    await client.query(
      `
      INSERT INTO guest_enquiries (
        company,
        person,
        email,
        phone,
        message,
        category,
        product_slug,
        source_page
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        company,
        person,
        email,
        phone || null,
        message,
        category || "General Enquiry",
        product_slug || null,
        source_page || null,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}