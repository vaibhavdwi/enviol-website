import { NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";


function numberToWords(num) {
  const a = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

  if (num === 0) return "Zero";
  if (num < 20) return a[num];
  if (num < 100) return b[Math.floor(num/10)] + (num%10 ? " " + a[num%10] : "");
  if (num < 1000) return a[Math.floor(num/100)] + " Hundred " + numberToWords(num%100);
  if (num < 100000) return numberToWords(Math.floor(num/1000)) + " Thousand " + numberToWords(num%1000);
  if (num < 10000000) return numberToWords(Math.floor(num/100000)) + " Lakh " + numberToWords(num%100000);
  return "";
}
export async function POST(request) {
  try {
    const body = await request.json();
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

    if (!company_name || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Invalid quotation data" },
        { status: 400 }
      );
    }

    // ---------------- CALCULATIONS ----------------
    const calculatedItems = items.map((item) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const discount = Number(item.discount) || 0;

      const total = qty * price;
      const discountAmount = (total * discount) / 100;
      const lineTotal = total - discountAmount;

      return { ...item, qty, price, discount, lineTotal };
    });

    const grandTotal = calculatedItems.reduce(
	(sum, item) => sum + item.lineTotal,
	0
);

// ✅ ADD THIS BELOW
	const cgst = grandTotal * 0.09;
	const sgst = grandTotal * 0.09;
	const finalTotal = grandTotal + cgst + sgst;

    // ---------------- QUOTATION NUMBER ----------------
    const today = new Date();
    const formattedDate =
      today.getFullYear().toString() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const quotationNumber = `QO-${formattedDate}-${randomNum}`;
    const lastFiveDigits = quotationNumber.slice(-5);

    // ---------------- PDF ----------------
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const page = pdfDoc.addPage([595, 842]);

    // ✅ GLOBAL OFFSET (move everything downward)
    const OFFSET_Y = -10;
    const Y = (val) => val + OFFSET_Y;

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

    const desiredHeight = 65;
    const scale = desiredHeight / logo.height;

    // ---------------- HEADER ----------------
    page.drawImage(logo, {
      x: 50,
      y: Y(740),
      width: logo.width * scale,
      height: desiredHeight,
    });

    page.drawText("Enviol Polytech Solutions Pvt. Ltd.", {
      x: 120,
      y: Y(805),
      size: 14,
      font: boldFont,
    });

    page.drawText(
      "127/625, W-1 Saket Nagar, Juhi Colony Juhi",
      { x: 120, y: Y(785), size: 10, font }
    );

    page.drawText(
      "Kanpur Nagar, Uttar Pradesh - 209304",
      { x: 120, y: Y(770), size: 10, font }
    );

    page.drawText("GSTIN: 09AAJCE6554F1ZE", {
      x: 120,
      y: Y(755),
      size: 10,
      font,
    });

    page.drawText("Phone: +91 96250 93722 | Email: info@enviol.com", {
      x: 120,
      y: Y(740),
      size: 10,
      font,
    });

    page.drawLine({
      start: { x: 40, y: Y(730) },
      end: { x: 555, y: Y(730) },
      thickness: 1,
    });

    // ---------------- QUOTATION BOX ----------------
    page.drawRectangle({
      x: 380,
      y: Y(760),
      width: 175,
      height: 60,
      color: rgb(0.9, 0.9, 0.9),
    });

    page.drawText("QUOTATION", {
      x: 415,
      y: Y(795),
      size: 16,
      font: boldFont,
    });

    page.drawText(`Quotation No: ${quotationNumber}`, {
      x: 390,
      y: Y(775),
      size: 10,
      font,
    });

    page.drawText(`Date: ${today.toLocaleDateString()}`, {
      x: 390,
      y: Y(760),
      size: 10,
      font,
    });

    // ---------------- CUSTOMER ----------------
    let y = Y(700);

    page.drawText("Bill To:", {
      x: 40,
      y,
      size: 12,
      font: boldFont,
    });

    y -= 20;

    page.drawText(`Company: ${company_name}`, { x: 40, y, size: 10, font });
    y -= 15;

    if (contact_person) {
      page.drawText(`Contact: ${contact_person}`, { x: 40, y, size: 10, font });
      y -= 15;
    }

    page.drawText(
      `Address: ${address}, ${city}, ${state} - ${pincode}`,
      { x: 40, y, size: 10, font }
    );

    y -= 15;

    if (gst_number) {
      page.drawText(`GST: ${gst_number}`, { x: 40, y, size: 10, font });
      y -= 15;
    }

    y -= 20;

    // ---------------- TABLE ----------------
    page.drawRectangle({
      x: 40,
      y,
      width: 515,
      height: 20,
      color: rgb(0.9, 0.9, 0.9),
    });

    page.drawText("#", { x: 45, y: y + 5, size: 10, font: boldFont });
    page.drawText("Description", { x: 80, y: y + 5, size: 10, font: boldFont });
    page.drawText("Qty", { x: 350, y: y + 5, size: 10, font: boldFont });
    page.drawText("Rate", { x: 400, y: y + 5, size: 10, font: boldFont });
    page.drawText("Amount", { x: 480, y: y + 5, size: 10, font: boldFont });

    y -= 25;

    calculatedItems.forEach((item, index) => {
      page.drawText(`${index + 1}`, { x: 45, y, size: 10, font });
      page.drawText(item.product_name || "", { x: 80, y, size: 10, font });
      page.drawText(`${item.qty}`, { x: 350, y, size: 10, font });
      page.drawText(`Rs. ${item.price.toFixed(2)}`, { x: 400, y, size: 10, font });
      page.drawText(`Rs. ${item.lineTotal.toFixed(2)}`, { x: 480, y, size: 10, font });

      y -= 20;
    });

    y -= 10;

    page.drawLine({
      start: { x: 40, y },
      end: { x: 555, y },
      thickness: 1,
    });

    y -= 30;

    // ---------------- TOTAL ----------------
    // ---------------- TOTAL BREAKUP ----------------

// Subtotal
page.drawText("Subtotal:", {
  x: 400,
  y,
  size: 11,
  font,
});

page.drawText(`Rs. ${grandTotal.toFixed(2)}`, {
  x: 480,
  y,
  size: 11,
  font,
});

y -= 20;

// CGST
page.drawText("CGST (9%):", {
  x: 400,
  y,
  size: 11,
  font,
});

page.drawText(`Rs. ${cgst.toFixed(2)}`, {
  x: 480,
  y,
  size: 11,
  font,
});

y -= 20;

// SGST
page.drawText("SGST (9%):", {
  x: 400,
  y,
  size: 11,
  font,
});

page.drawText(`Rs. ${sgst.toFixed(2)}`, {
  x: 480,
  y,
  size: 11,
  font,
});

y -= 25;

// FINAL TOTAL
page.drawText("Final Total:", {
  x: 400,
  y,
  size: 12,
  font: boldFont,
});

page.drawText(`Rs. ${finalTotal.toFixed(2)}`, {
  x: 480,
  y,
  size: 12,
  font: boldFont,
});

y -= 40;

//------Amount in words-------

const amountInWords =
  numberToWords(Math.round(finalTotal)) + " Rupees Only";

page.drawText(`Amount in Words: ${amountInWords}`, {
  x: 40,
  y,
  size: 10,
  font,
});

y -= 25;


    // ---------------- FOOTER ----------------
    page.drawText("Quotation Validity: 15 Days", {
      x: 40,
      y,
      size: 10,
      font,
    });

    y -= 20;

    page.drawText("Payment Terms:", {
      x: 40,
      y,
      size: 11,
      font: boldFont,
    });

    y -= 15;

    page.drawText(
      "75% payment as advance to confirm order. Remaining 25% within 15 days or earlier.",
      { x: 40, y, size: 10, font }
    );

    y -= 30;

    page.drawText("Bank Details:", {
      x: 40,
      y,
      size: 11,
      font: boldFont,
    });

    y -= 15;

    page.drawText("Account Name: Enviol Polytech Solutions Private Limited", {
      x: 40,
      y,
      size: 10,
      font,
    });

    y -= 15;

    page.drawText("A/C Number: 17450210003831", {
      x: 40,
      y,
      size: 10,
      font,
    });

    y -= 15;

    page.drawText("Bank: Uco Bank, Sujatganj Kanpur", {
      x: 40,
      y,
      size: 10,
      font,
    });

    y -= 15;

    page.drawText("IFSC Code: UCBA0001745", {
      x: 40,
      y,
      size: 10,
      font,
    });

    y -= 25;

    page.drawText(
      "Payment Mode : RTGS / Cheque drawn in favour of Enviol Polytech Solutions",
      { x: 40, y, size: 10, font }
    );

    // ---------------- SIGNATURE ----------------
    page.drawText("Authorized Signatory", {
      x: 400,
      y: Y(120),
      size: 11,
      font: boldFont,
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=quote_${lastFiveDigits}.pdf`,
      },
    });

  } catch (error) {
    console.error("Quotation PDF error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}