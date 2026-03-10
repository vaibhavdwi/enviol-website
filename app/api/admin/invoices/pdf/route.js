import PDFDocument from "pdfkit";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  const result = await pool.query(
    "SELECT * FROM orders WHERE id = $1",
    [orderId]
  );

  const order = result.rows[0];

  const doc = new PDFDocument();

  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  doc.fontSize(20).text("ENVIOL POLYTECH SOLUTIONS");
  doc.fontSize(12).text("GSTIN: 2349823472374");

  doc.moveDown();
  doc.text(`Invoice For: ${order.company_name}`);
  doc.text(`City: ${order.city}`);

  doc.moveDown();
  doc.text(`Product: ${order.product_name}`);
  doc.text(`Quantity: ${order.quantity}`);
  doc.text(`Total: ₹ ${order.total_amount}`);

  doc.end();

  await new Promise((resolve) => doc.on("end", resolve));

  const pdfBuffer = Buffer.concat(buffers);

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice_${order.order_number}.pdf`,
    },
  });
}