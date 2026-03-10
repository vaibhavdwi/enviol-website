import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET(req){

  try{

    const {searchParams} = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let filter="";
    let values=[];

    if(from && to){
      filter="WHERE s.sale_date BETWEEN $1 AND $2";
      values=[from,to];
    }

    const result = await pool.query(

      `
      SELECT
      i.invoice_number,
      o.company_name,
      o.state,
      s.revenue,
      s.gst_collected,
      s.net_profit,
      s.sale_date
      FROM sales s
      JOIN invoices i ON s.invoice_id = i.id
      JOIN orders o ON s.order_id = o.id
      ${filter}
      ORDER BY s.sale_date DESC
      `,
      values

    );

    return NextResponse.json({
      reports: result.rows
    });

  }
  catch(error){

    console.error(error);

    return NextResponse.json(
      {message:"Reports error"},
      {status:500}
    );

  }

}