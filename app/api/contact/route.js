import pool from "../../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      company,
      person,
      email,
      phone,
      category,
      message,
      captchaAnswer,
      num1,
      num2,
    } = body;

    // ✅ Required fields check
    if (!company || !person || !email || !message || !category) {
      return Response.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // ✅ Block disposable emails
    const blockedDomains = [
      "tempmail.com",
      "mailinator.com",
      "10minutemail.com",
    ];

    const domain = email.split("@")[1];
    if (blockedDomains.includes(domain)) {
      return Response.json(
        { error: "Temporary email addresses are not allowed" },
        { status: 400 }
      );
    }

    // ✅ Captcha validation (VERY IMPORTANT)
    if (parseInt(captchaAnswer) !== parseInt(num1) + parseInt(num2)) {
      return Response.json(
        { error: "Invalid captcha" },
        { status: 400 }
      );
    }

    // ✅ Insert into DB
    await pool.query(
      `INSERT INTO contacts 
      (company, person, email, phone, category, message) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [company, person, email, phone, category, message]
    );

    return Response.json(
      { message: "Enquiry submitted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}