import { NextResponse } from "next/server";
import { Pool } from "pg";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request) {
  try {

    // ---------- 1️⃣ Get Order ID ----------
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Order ID required" }, { status: 400 });
    }

    const orderId = parseInt(id, 10);

    // ---------- 2️⃣ Fetch Order ----------
    const orderResult = await pool.query(
      "SELECT * FROM orders WHERE id = $1",
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const order = orderResult.rows[0];

    // ✅ STATUS FIX
    const normalizedStatus = (order.order_status || "").trim().toLowerCase();
    const isCompleted = normalizedStatus === "completed";

    console.log("STATUS:", order.order_status);
    console.log("IS COMPLETED:", isCompleted);

    // ---------- 3️⃣ Fetch Order Items ----------
    const itemsResult = await pool.query(
      "SELECT * FROM order_items WHERE order_id = $1 ORDER BY id",
      [orderId]
    );

    const items = itemsResult.rows;

    // ---------- 4️⃣ Calculate Totals ----------
    let subtotal = 0;

    items.forEach((item) => {

      const price = Number(item.price_offered) || 0;
      const qty = Number(item.quantity) || 0;
      const discount = Number(item.discount_percent) || 0;

      const discountedPrice = price - (price * discount) / 100;
      const lineTotal = discountedPrice * qty;

      subtotal += lineTotal;

    });

    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const grandTotal = subtotal + cgst + sgst;

    // ---------- 5️⃣ Invoice Number ----------
    const today = new Date();

    const formattedDate =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    const invoiceNumber = `INV-${formattedDate}-${order.order_number}`;
	
	// ---------- 5.1️⃣ Save Invoice in DB ----------

    let invoiceId = null;

    const existingInvoice = await pool.query(
      "SELECT id FROM invoices WHERE order_id=$1",
      [orderId]
    );

    // ✅ ONLY INSERT IF COMPLETED
    if (isCompleted && existingInvoice.rows.length === 0) {

      const invoiceInsert = await pool.query(
        `INSERT INTO invoices
        (order_id, invoice_number, invoice_date, subtotal, cgst, sgst, total_amount)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING id`,
        [
          orderId,
          invoiceNumber,
          today,
          subtotal,
          cgst,
          sgst,
          grandTotal
        ]
      );

      invoiceId = invoiceInsert.rows[0].id;

      // ---------- Create Sales Entry ----------
      const margin = 30;
      const profit = subtotal * (margin / 100);

      await pool.query(
        `INSERT INTO sales
        (order_id, invoice_id, revenue, gst_collected, assumed_margin_percent, net_profit, sale_date)
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          orderId,
          invoiceId,
          subtotal,
          cgst + sgst,
          margin,
          profit,
          today
        ]
      );
    }

    // ---------- 6️⃣ Create PDF ----------
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.addPage([595, 842]); // A4

    // ---------- Fonts ----------
    const regularFontBytes = fs.readFileSync(
      path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf")
    );

    const boldFontBytes = fs.readFileSync(
      path.join(process.cwd(), "public/fonts/Roboto-Bold.ttf")
    );

    const font = await pdfDoc.embedFont(regularFontBytes);
    const boldFont = await pdfDoc.embedFont(boldFontBytes);

    // ---------- Logo ----------
    const logoPath = path.join(process.cwd(), "public/images/logo.png");
    const logoImageBytes = fs.readFileSync(logoPath);

    const logoImage = await pdfDoc.embedPng(logoImageBytes);

    page.drawImage(logoImage, {
      x: 50,
      y: 700,
      width: 50,
      height: 70,
    });

    // ---------- Helper ----------
    let y = 750;

    const drawText = (text, size = 11, x = 40, bold = false) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: bold ? boldFont : font,
        color: rgb(0, 0, 0),
      });
      y -= size + 4;
    };

    // ---------- Company Header ----------
    y = 760;

    drawText("Enviol Polytech Solutions Pvt. Ltd.", 14, 130, true);
    drawText("GSTIN: 2349823472374", 11, 130);
    drawText("Khasra No.164, Prasiddhpur Bhant,", 10, 130);
    drawText("Rania Industrial Area, Tehsil Akbarpur,", 10, 130);
    drawText("Kanpur Dehat, Uttar Pradesh - 209304", 10, 130);
    drawText("Phone: +91 96250 93722 | Email: info@enviol.com", 10, 130);

    // ✅ TITLE FIX
    page.drawText(
      isCompleted ? "INVOICE" : "PROFORMA INVOICE",
      {
        x: 380,
        y: 750,
        size: 18,
        font: boldFont,
      }
    );

    page.drawText(`Invoice No: ${invoiceNumber}`, {
      x: 350,
      y: 730,
      size: 10,
      font,
    });

    page.drawText(`Date: ${today.toLocaleDateString()}`, {
      x: 350,
      y: 715,
      size: 10,
      font,
    });
page.drawLine({
      start: { x: 40, y: y + 5 },
      end: { x: 555, y: y + 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    // ---------- Customer ----------
    y = 650;

    drawText("Bill To:", 12, 40, true);
    drawText(`Company: ${order.company_name}`);
    //drawText(`Contact: ${order.contact_person || "-"}`);
    drawText(`Address: ${order.address || "-"}`);
    drawText(`City: ${order.city || "-"}, ${order.state || "-"} ${order.pincode || ""}`);
    drawText(`GSTIN: ${order.gst_number || "-"}`);
    //drawText(`Phone: ${order.phone || "-"}`);
    //drawText(`Email: ${order.email || "-"}`);
page.drawLine({
      start: { x: 40, y: y + 5 },
      end: { x: 555, y: y + 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    // ---------- Table Header ----------
    y -= 10;

    const colX = [40, 90, 330, 370, 420, 480];

    const headers = ["#", "Description", "Qty", "Rate", "Disc%", "Total"];

    headers.forEach((header, i) => {
      page.drawText(header, {
        x: colX[i],
        y,
        size: 11,
        font: boldFont,
      });
    });

    y -= 15;

    page.drawLine({
      start: { x: 40, y: y + 5 },
      end: { x: 555, y: y + 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    // ---------- Table Rows ----------
    y -= 10;

    let index = 1;

    items.forEach((item) => {

      const price = Number(item.price_offered) || 0;
      const qty = Number(item.quantity) || 0;
      const discount = Number(item.discount_percent) || 0;

      const discountedPrice = price - (price * discount) / 100;
      const lineTotal = discountedPrice * qty;

      const row = [
        index.toString(),
        item.product_name,
        qty.toString(),
        `₹${price.toFixed(2)}`,
        `${discount}%`,
        `₹${lineTotal.toFixed(2)}`
      ];

      row.forEach((cell, i) => {

        page.drawText(cell, {
          x: colX[i],
          y,
          size: 10,
          font,
        });

      });

      y -= 18;
      index++;

    });

    // ---------- Totals ----------
    y -= 20;

    const drawTotalLine = (label, value, bold = false) => {

      page.drawText(label, {
        x: 350,
        y,
        size: 11,
        font: bold ? boldFont : font,
      });

      page.drawText(value, {
        x: 500,
        y,
        size: 11,
        font: bold ? boldFont : font,
      });

      y -= 15;
    };

    // Dynamic spacing before totals
const MIN_TOTAL_Y = 300;

if (y > MIN_TOTAL_Y) {
  y = MIN_TOTAL_Y;
}

drawTotalLine("Subtotal:", `₹${subtotal.toFixed(2)}`);
drawTotalLine("CGST (9%):", `₹${cgst.toFixed(2)}`);
drawTotalLine("SGST (9%):", `₹${sgst.toFixed(2)}`);

    page.drawLine({
      start: { x: 40, y: y + 5 },
      end: { x: 555, y: y + 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    y -= 15;

    drawTotalLine("Grand Total:", `₹${grandTotal.toFixed(2)}`, true);
	page.drawLine({
      start: { x: 40, y: y + 5 },
      end: { x: 555, y: y + 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
	// ---------- Amount in words-----------
	function numberToWords(num) {
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"];

  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + inWords(n % 100);
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand " + inWords(n % 1000);
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh " + inWords(n % 100000);
    return inWords(Math.floor(n / 10000000)) + " Crore " + inWords(n % 10000000);
  };

  return inWords(Math.floor(num)) + "Rupees Only";
}
function drawPaymentBlock(page, y, grandTotal, font, boldFont) {

  const drawLine = (text, x = 40, size = 10, isBold = false) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: isBold ? boldFont : font,
    });
    y -= size + 4;
  };

  // Amount in Words
  drawLine(`Amount in Words: ${numberToWords(grandTotal)}`, 40, 10, true);

  y -= 10;

  // Payment Terms
  drawLine("Payment Terms:", 40, 11, true);
  drawLine("75% advance. Remaining 25% within 15 days.", 40);

  y -= 10;

  // Bank Details
  drawLine("Bank Details:", 40, 11, true);

  const bankLines = [
    "Account Name: Enviol Polytech Solutions Pvt Ltd",
    "A/C Number: 1239817231236198237",
    "Bank: State Bank of India, Koyla Nagar Kanpur",
    "IFSC: SBIN001236",
    "Mode: Cheque / RTGS Only"
  ];

  bankLines.forEach(line => drawLine(line));

  return y;
}
y -= 30;

y = drawPaymentBlock(page, y, grandTotal, font, boldFont);
    // ---------- Signature ----------
    y -= 5;

    page.drawText("Authorized Signatory", {
      x: 420,
      y,
      size: 11,
      font: boldFont,
    });

    // ---------- Save PDF ----------
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${invoiceNumber}.pdf`,
      },
    });

  } catch (error) {

    console.error("PDF generation error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }
}