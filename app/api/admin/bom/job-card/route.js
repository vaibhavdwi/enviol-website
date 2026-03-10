import { NextResponse } from "next/server";
import { Pool } from "pg";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
  try {

    const body = await request.json();

    const {
      product_id,
      product_name,
      batch_size,
      batch_date,
      batch_time,
      operator,
      bomItems
    } = body;

    if (!product_id || !batch_size || !bomItems) {
      return NextResponse.json(
        { message: "Invalid job card data" },
        { status: 400 }
      );
    }

    const size = Number(batch_size);

    // ===============================
    // 1️⃣ CHECK RAW MATERIAL STOCK
    // ===============================

    const insufficientItems = [];
    const calculatedRM = [];

    for (const item of bomItems) {

      const ratio = Number(item.ratio_percent);
      const requiredQty = (size * ratio) / 100;

      calculatedRM.push({
        ...item,
        requiredQty
      });

      const stockRes = await pool.query(
        `SELECT quantity FROM rm_stock WHERE item_name = $1`,
        [item.rm_item_name]
      );

      if (stockRes.rows.length === 0) {

        insufficientItems.push(
          `${item.rm_item_name} (Not found in RM stock)`
        );

      } else {

        const available = Number(stockRes.rows[0].quantity);

        if (available < requiredQty) {

          insufficientItems.push(
            `${item.rm_item_name} (Required: ${requiredQty.toFixed(2)} Kg, Available: ${available} Kg)`
          );
        }
      }
    }

    if (insufficientItems.length > 0) {

      return NextResponse.json(
        {
          message: "Insufficient Raw Material Stock",
          items: insufficientItems
        },
        { status: 400 }
      );
    }

    // ===============================
    // 2️⃣ GENERATE JOB CARD NUMBER
    // ===============================

    const jobRes = await pool.query(
      "SELECT MAX(id) FROM job_cards"
    );

    const nextNumber =
      jobRes.rows[0].max
        ? Number(jobRes.rows[0].max) + 1
        : 1;

    const today = new Date();

    const dateCode =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    const jobNumber = `JC-${dateCode}-${nextNumber}`;
    const batchNumber = `BATCH-${Date.now()}`;

    // ===============================
    // 3️⃣ INSERT JOB CARD
    // ===============================

    const jobInsert = await pool.query(
      `INSERT INTO job_cards
       (job_number,batch_number,product_id,product_name,batch_size,batch_date,batch_time,operator_name)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id`,
      [
        jobNumber,
        batchNumber,
        product_id,
        product_name,
        size,
        batch_date,
        batch_time,
        operator
      ]
    );

    const jobCardId = jobInsert.rows[0].id;

    // ===============================
    // 4️⃣ INSERT JOB CARD ITEMS
    // ===============================

    for (const item of calculatedRM) {

      await pool.query(
        `INSERT INTO job_card_items
         (job_card_id,rm_item_name,issued_qty,unit)
         VALUES ($1,$2,$3,$4)`,
        [
          jobCardId,
          item.rm_item_name,
          item.requiredQty,
          item.unit || "Kg"
        ]
      );

      // Deduct RM Stock

      await pool.query(
        `UPDATE rm_stock
         SET quantity = quantity - $1,
             created_at = CURRENT_TIMESTAMP
         WHERE item_name = $2`,
        [item.requiredQty, item.rm_item_name]
      );
    }

    // ===============================
    // 5️⃣ GENERATE JOB CARD PDF
    // ===============================

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.addPage([595, 842]);

    const regularFontBytes = fs.readFileSync(
      path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf")
    );

    const boldFontBytes = fs.readFileSync(
      path.join(process.cwd(), "public/fonts/Roboto-Bold.ttf")
    );

    const font = await pdfDoc.embedFont(regularFontBytes);
    const boldFont = await pdfDoc.embedFont(boldFontBytes);

    const logoBytes = fs.readFileSync(
      path.join(process.cwd(), "public/images/logo.png")
    );

    const logo = await pdfDoc.embedPng(logoBytes);

    page.drawImage(logo, {
      x: 40,
      y: 760,
      width: 70,
      height: 50,
    });

    page.drawText("Enviol Polytech Solutions Pvt Ltd", {
      x: 120,
      y: 800,
      size: 14,
      font: boldFont,
    });

    page.drawText("JOB CARD", {
      x: 260,
      y: 760,
      size: 18,
      font: boldFont,
    });

    page.drawText(`Job Card No: ${jobNumber}`, {
      x: 40,
      y: 720,
      size: 11,
      font,
    });

    page.drawText(`Batch No: ${batchNumber}`, {
      x: 40,
      y: 705,
      size: 11,
      font,
    });

    page.drawText(`Product: ${product_name}`, {
      x: 40,
      y: 690,
      size: 11,
      font,
    });

    page.drawText(`Batch Size: ${size} Kg`, {
      x: 40,
      y: 675,
      size: 11,
      font,
    });

    page.drawText(`Batch Date: ${batch_date}`, {
      x: 40,
      y: 660,
      size: 11,
      font,
    });

    page.drawText(`Batch Time: ${batch_time}`, {
      x: 40,
      y: 645,
      size: 11,
      font,
    });

    page.drawText(`Operator: ${operator}`, {
      x: 40,
      y: 630,
      size: 11,
      font,
    });

    // ===============================
    // RAW MATERIAL TABLE
    // ===============================

    let y = 590;

    page.drawText("Raw Material", { x: 40, y, size: 11, font: boldFont });
    page.drawText("Ratio %", { x: 300, y, size: 11, font: boldFont });
    page.drawText("Qty (Kg)", { x: 420, y, size: 11, font: boldFont });

    y -= 20;

    calculatedRM.forEach((rm) => {

      page.drawText(rm.rm_item_name, { x: 40, y, size: 10, font });

      page.drawText(`${rm.ratio_percent}%`, {
        x: 300,
        y,
        size: 10,
        font
      });

      page.drawText(rm.requiredQty.toFixed(2), {
        x: 420,
        y,
        size: 10,
        font
      });

      y -= 18;
    });

    page.drawText("Production Manager Signature", {
      x: 380,
      y: 120,
      size: 11,
      font: boldFont,
    });

    const pdfBytes = await pdfDoc.save();

    // format batch date + time for filename
const safeDate = batch_date.replaceAll("-", "");
const safeTime = batch_time.replaceAll(":", "");

const fileName = `job-card_${safeDate}-${safeTime}.pdf`;

return new NextResponse(pdfBytes, {
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${fileName}`,
  },
});

  } catch (error) {

    console.error("Job card error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}