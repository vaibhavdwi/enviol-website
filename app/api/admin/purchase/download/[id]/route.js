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

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const purchaseId = parseInt(id);

    // Fetch purchase
    const purchaseRes = await pool.query(
      "SELECT * FROM purchases WHERE id=$1",
      [purchaseId]
    );

    if (purchaseRes.rows.length === 0) {
      return NextResponse.json(
        { message: "Purchase not found" },
        { status: 404 }
      );
    }

    const purchase = purchaseRes.rows[0];

    // Fetch items
    const itemsRes = await pool.query(
      "SELECT * FROM purchase_items WHERE purchase_id=$1",
      [purchaseId]
    );

    const items = itemsRes.rows;

    // Calculate total
    const grandTotal = items.reduce(
      (sum, item) => sum + Number(item.total_amount),
      0
    );

    // Generate PO number
    const today = new Date();

    const formattedDate =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    const poNumber = `PO-${formattedDate}-${purchase.purchase_number}`;

    // Create PDF
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

    const logoPath = path.join(process.cwd(), "public/images/logo.png");

    const logoBytes = fs.readFileSync(logoPath);

    const logo = await pdfDoc.embedPng(logoBytes);

    page.drawImage(logo, {
      x: 40,
      y: 760,
      width: 70,
      height: 50
    });

    // Header
    page.drawText("Enviol Polytech Solutions Pvt. Ltd.", {
  x: 120,
  y: 805,
  size: 14,
  font: boldFont
});

page.drawText("GSTIN: 2349823472374", {
  x: 120,
  y: 790,
  size: 10,
  font
});

page.drawText(
  "Khasra No.164, Prasiddhpur Bhant, Rania Industrial Area",
  {
    x: 120,
    y: 775,
    size: 10,
    font
  }
);

page.drawText(
  "Tehsil Akbarpur, Kanpur Dehat, Uttar Pradesh - 209304",
  {
    x: 120,
    y: 760,
    size: 10,
    font
  }
);

page.drawText(
  "Phone: +91 96250 93722",
  {
    x: 120,
    y: 745,
    size: 10,
    font
  }
);

page.drawText(
  "Email: info@enviol.com",
  {
    x: 120,
    y: 730,
    size: 10,
    font
  }
);

    page.drawText("PURCHASE ORDER", {
      x: 420,
      y: 800,
      size: 16,
      font: boldFont
    });

    page.drawText(`PO Number: ${poNumber}`, {
      x: 380,
      y: 780,
      size: 10,
      font
    });

    page.drawText(`Date: ${today.toLocaleDateString()}`, {
      x: 380,
      y: 765,
      size: 10,
      font
    });

    // Supplier
    let y = 720;

    page.drawText("Supplier:", {
      x: 40,
      y,
      size: 12,
      font: boldFont
    });

    y -= 20;

    page.drawText(`Company: ${purchase.supplier_name}`, { x: 40, y, size: 10, font });
    y -= 15;

    page.drawText(`Contact: ${purchase.contact_person || "-"}`, { x: 40, y, size: 10, font });
    y -= 15;

    page.drawText(`Phone: ${purchase.phone || "-"}`, { x: 40, y, size: 10, font });
    y -= 15;

    page.drawText(`GST: ${purchase.gst_number || "-"}`, { x: 40, y, size: 10, font });

    y -= 30;

    // Table header
    page.drawText("#", { x: 40, y, size: 11, font: boldFont });
    page.drawText("Product", { x: 70, y, size: 11, font: boldFont });
    page.drawText("Qty", { x: 350, y, size: 11, font: boldFont });
    page.drawText("Price", { x: 400, y, size: 11, font: boldFont });
    page.drawText("Total", { x: 470, y, size: 11, font: boldFont });

    y -= 15;

    page.drawLine({
      start: { x: 40, y },
      end: { x: 550, y },
      thickness: 1
    });

    y -= 15;

    items.forEach((item, index) => {

      page.drawText(`${index + 1}`, { x: 40, y, size: 10, font });

      page.drawText(item.product_name, {
        x: 70,
        y,
        size: 10,
        font
      });

      page.drawText(`${item.quantity}`, {
        x: 350,
        y,
        size: 10,
        font
      });

      page.drawText(`₹${Number(item.price).toFixed(2)}`, {
        x: 400,
        y,
        size: 10,
        font
      });

      page.drawText(`₹${Number(item.total_amount).toFixed(2)}`, {
        x: 470,
        y,
        size: 10,
        font
      });

      y -= 20;

    });

    y -= 20;

    page.drawLine({
      start: { x: 40, y },
      end: { x: 550, y },
      thickness: 1
    });

    y -= 20;

    page.drawText("Grand Total:", {
      x: 400,
      y,
      size: 12,
      font: boldFont
    });

    page.drawText(`₹${grandTotal.toFixed(2)}`, {
      x: 470,
      y,
      size: 12,
      font: boldFont
    });
	
	y -= 40;

// Delivery Terms
page.drawText("Delivery Terms:", {
  x: 40,
  y,
  size: 11,
  font: boldFont
});

y -= 15;

page.drawText(
  "Delivery within 7 working days from the date of Purchase Order.",
  {
    x: 40,
    y,
    size: 10,
    font
  }
);

y -= 25;

// Payment Terms
page.drawText("Payment Terms:", {
  x: 40,
  y,
  size: 11,
  font: boldFont
});

y -= 15;

page.drawText(
  "50% advance against order confirmation. Remaining 50% within 15 days after delivery.",
  {
    x: 40,
    y,
    size: 10,
    font
  }
);

    page.drawText("Authorized Signatory", {
      x: 420,
      y: 120,
      size: 11,
      font: boldFont
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${poNumber}.pdf`
      }
    });

  } catch (error) {

    console.error("PO PDF error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );

  }

}