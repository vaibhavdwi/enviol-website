const pool = require("../../../lib/db");

export async function POST(req) {
  try {
    const body = await req.json();
    const { company, person, email, phone, message } = body;

    if (!company || !person || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Required fields missing" }),
        { status: 400 }
      );
    }

    await pool.query(
      "INSERT INTO contacts (company, person, email, phone, message) VALUES ($1, $2, $3, $4, $5)",
      [company, person, email, phone, message]
    );

    return new Response(
      JSON.stringify({ message: "Enquiry submitted successfully" }),
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
