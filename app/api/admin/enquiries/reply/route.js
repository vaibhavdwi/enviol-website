import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, cc, subject, message } = body;

    if (!to || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Enviol Admin" <${process.env.SMTP_USER}>`,
      to,
      cc: cc || "",
      subject,
      html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}