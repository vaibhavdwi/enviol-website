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

    // Monthly Revenue

    const monthly = await pool.query(
      `
      SELECT
      TO_CHAR(sale_date,'YYYY-MM') AS month,
      SUM(revenue) AS revenue
      FROM sales
      ${filter}
      GROUP BY month
      ORDER BY month
      `,
      values
    );

    // Sales by Product

    const products = await pool.query(
      `
      SELECT
      oi.product_name,
      SUM(oi.quantity) AS qty_sold
      FROM sales s
      JOIN order_items oi ON s.order_id = oi.order_id
      ${filter}
      GROUP BY oi.product_name
      ORDER BY qty_sold DESC
      `
    );

    // Sales by State

    const states = await pool.query(
      `
      SELECT
      o.state,
      SUM(s.revenue) AS revenue
      FROM sales s
      JOIN orders o ON s.order_id = o.id
      ${filter}
      GROUP BY o.state
      ORDER BY revenue DESC
      `
    );

    // Top Customers

    const customers = await pool.query(
      `
      SELECT
      o.company_name,
      SUM(s.revenue) AS revenue
      FROM sales s
      JOIN orders o ON s.order_id = o.id
      ${filter}
      GROUP BY o.company_name
      ORDER BY revenue DESC
      LIMIT 10
      `
    );

    return NextResponse.json({

      monthly: monthly.rows,
      products: products.rows,
      states: states.rows,
      customers: customers.rows

    });

  }
  catch(error){

    console.error(error);

    return NextResponse.json(
      {message:"Analytics error"},
      {status:500}
    );

  }

}