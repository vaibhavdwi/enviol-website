import pool from "../../../lib/db";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      company,
      person,
      email,
      phone,
      category,
      message,
      captchaAnswer,
      num1,
      num2,
    } = body;

    // ✅ Required fields check
    if (!company || !person || !email || !message || !category) {
      return Response.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // ✅ Block disposable emails
    const blockedDomains = [
      "tempmail.com",
      "mailinator.com",
      "10minutemail.com",
    ];

    const domain = email.split("@")[1];
    if (blockedDomains.includes(domain)) {
      return Response.json(
        { error: "Temporary email addresses are not allowed" },
        { status: 400 }
      );
    }

    // ✅ Captcha validation
    if (parseInt(captchaAnswer) !== parseInt(num1) + parseInt(num2)) {
      return Response.json(
        { error: "Invalid captcha" },
        { status: 400 }
      );
    }

    // ================================
    // ✅ STEP 1: INSERT INTO DATABASE
    // ================================
    await pool.query(
      `INSERT INTO contacts 
      (company, person, email, phone, category, message) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [company, person, email, phone, category, message]
    );

    // ================================
    // ✅ STEP 2: EMAIL SETUP
    // ================================
    const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT == "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // 🔥 FIX FOR SELF-SIGNED CERT ERROR
  },
});

    const mailOptions = {
      from: `"Enviol Website Enquiry" <${process.env.SMTP_USER}>`,
      to: "info@enviol.com",
      subject: `New Enquiry - ${category}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Person:</strong> ${person}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Category:</strong> ${category}</p>

        <h3>Message:</h3>
        <p>${message}</p>
      `,
    };

    // ================================
    // ✅ STEP 3: SEND EMAIL SAFELY
    // ================================
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error("EMAIL FAILED:", err);
    }

    // ================================
    // ✅ FINAL RESPONSE
    // ================================
    return Response.json(
      { message: "Enquiry submitted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}