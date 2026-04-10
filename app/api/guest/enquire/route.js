import { NextResponse } from "next/server";
import { Pool } from "pg";
import nodemailer from "nodemailer";

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

    // ✅ Insert into DB
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

    // ✅ EMAIL SETUP (Hostinger SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465", // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // 🔥 FIX for your error
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: `"Enviol Website" <${process.env.SMTP_USER}>`,
      to: "info@enviol.com",
      subject: "New Enquiry Received",
      html: `
        <h2>New Enquiry Details</h2>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Contact Person:</strong> ${person}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Product:</strong> ${product_slug || "-"}</p>
        <p><strong>Source Page:</strong> ${source_page || "-"}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    // ✅ Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log("EMAIL SENT");
    } catch (err) {
      console.error("EMAIL FAILED:", err);
    }

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