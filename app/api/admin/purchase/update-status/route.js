import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function POST(req) {

  const { id, status } = await req.json();

  await pool.query(
    "UPDATE purchases SET status=$1 WHERE id=$2",
    [status, id]
  );

  return NextResponse.json({ success: true });

}