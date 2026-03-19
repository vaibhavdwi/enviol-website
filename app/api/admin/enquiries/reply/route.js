import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    const to = formData.get("to");
    const cc = formData.get("cc");
    const subject = formData.get("subject");
    const message = formData.get("message");
    const contactId = formData.get("contactId");

    const file = formData.get("file");

    if (!to || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Prepare attachment
    let attachments = [];
    let attachmentName = null;

    if (file && typeof file === "object" && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      attachments.push({
        filename: file.name,
        content: buffer,
      });

      attachmentName = file.name;
    }

    // ✅ STEP 1: Save to DB FIRST (IMPORTANT)
    let replyId = null;

    if (contactId) {
      const result = await pool.query(
        `INSERT INTO contact_replies
        (contact_id, to_email, cc_email, subject, message, attachment_name, email_status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING id`,
        [contactId, to, cc, subject, message, attachmentName, "pending"]
      );

      replyId = result.rows[0].id;
    }

    // ✅ STEP 2: Try sending email (but don’t fail API)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Enviol Admin" <${process.env.SMTP_USER}>`,
        to,
        cc: cc || "",
        subject,
        html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
        attachments,
      });

      // ✅ Update status → sent
      if (replyId) {
        await pool.query(
          `UPDATE contact_replies SET email_status = $1 WHERE id = $2`,
          ["sent", replyId]
        );
      }

      return NextResponse.json({
        message: "Reply saved + email sent",
      });

    } catch (mailError) {
      console.error("Email failed:", mailError);

      // ❌ Update status → failed
      if (replyId) {
        await pool.query(
          `UPDATE contact_replies SET email_status = $1 WHERE id = $2`,
          ["failed", replyId]
        );
      }

      return NextResponse.json({
        message: "Reply saved (email not sent)",
      });
    }

  } catch (err) {
    console.error("Server error:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}