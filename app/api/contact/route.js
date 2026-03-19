import pool from "../../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { company, person, email, phone, message } = body;

    if (!company || !person || !email || !message) {
      return Response.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    await pool.query(
      "INSERT INTO contacts (company, person, email, phone, message) VALUES ($1, $2, $3, $4, $5)",
      [company, person, email, phone, message]
    );

    return Response.json(
      { message: "Enquiry submitted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}