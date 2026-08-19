import pool from "@/lib/db";
import nodemailer from "nodemailer";

/*
|--------------------------------------------------------------------------
| AI ENQUIRY API - ENY
|--------------------------------------------------------------------------
|
| ENY = Enviol TechSupport AI
|
| Responsibilities:
| 1. Receive completed AI chatbot enquiry
| 2. Generate unique 5-digit Chat ID
| 3. Validate customer information
| 4. Save structured enquiry into existing `contacts` table
| 5. Send enquiry email to info@enviol.com
| 6. Attach complete conversation transcript
| 7. Save communication record into `contact_replies`
| 8. Return success/failure to chatbot
|
| IMPORTANT:
| - Chat conversation is NOT stored in PostgreSQL.
| - Only final enquiry details are stored in `contacts`.
| - `contact_replies` stores only the enquiry/reply record,
|   NOT the full transcript.
|
|--------------------------------------------------------------------------
*/


// ========================================================================
// GENERATE RANDOM 5-DIGIT CHAT ID
// ========================================================================

function generateChatId() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}


// ========================================================================
// BASIC EMAIL VALIDATION
// ========================================================================

function isValidEmail(email) {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}


// ========================================================================
// ESCAPE HTML
// Prevent customer-entered content from breaking email HTML
// ========================================================================

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ========================================================================
// NORMALIZE TRANSCRIPT
// ========================================================================

function formatTranscript(transcript) {

  if (!transcript) {
    return "No transcript was provided.";
  }

  // ------------------------------------------------------------
  // If transcript is already an array
  // ------------------------------------------------------------

  if (Array.isArray(transcript)) {

    return transcript
      .map((item) => {

        const role =
          item.role ||
          item.sender ||
          "unknown";

        const content =
          item.content ||
          item.message ||
          item.text ||
          "";

        const label =
          role === "assistant"
            ? "ENY"
            : role === "user"
            ? "Customer"
            : role;

        return `${label}: ${content}`;

      })
      .join("\n\n");
  }


  // ------------------------------------------------------------
  // If transcript is an object
  // ------------------------------------------------------------

  if (typeof transcript === "object") {

    return JSON.stringify(
      transcript,
      null,
      2
    );
  }


  // ------------------------------------------------------------
  // If transcript is already text
  // ------------------------------------------------------------

  return String(transcript);
}


// ========================================================================
// CREATE EMAIL TRANSPORTER
// ========================================================================

function createTransporter() {

  return nodemailer.createTransport({

    host: process.env.SMTP_HOST,

    port: parseInt(
      process.env.SMTP_PORT || "587",
      10
    ),

    secure:
      String(process.env.SMTP_PORT) === "465",

    auth: {

      user:
        process.env.SMTP_USER,

      pass:
        process.env.SMTP_PASS,

    },

    tls: {

      // Same configuration as your existing contact API
      rejectUnauthorized: false,

    },

  });
}


// ========================================================================
// POST
// ========================================================================

export async function POST(req) {

  let client = null;

  try {

    // ====================================================================
    // READ REQUEST
    // ====================================================================

    const body = await req.json();

    if (!body || typeof body !== "object") {

      return Response.json(
        {
          success: false,
          error: "Invalid request.",
        },
        {
          status: 400,
        }
      );

    }


    // ====================================================================
    // CUSTOMER INFORMATION
    // ====================================================================

    const company =
      String(body.company || "").trim();

    const person =
      String(body.person || "").trim();

    const email =
      String(body.email || "")
        .trim()
        .toLowerCase();

    const phone =
      String(body.phone || "").trim();

    const category =
      String(
        body.category ||
        "General Enquiry"
      ).trim();

    const message =
      String(body.message || "").trim();


    // ====================================================================
    // AI / PRODUCT INFORMATION
    // ====================================================================

    const product =
      String(body.product || "").trim();

    const application =
      String(body.application || "").trim();

    const technicalGrade =
      String(
        body.technicalGrade ||
        body.grade ||
        ""
      ).trim();


    // ====================================================================
    // TRANSCRIPT
    // ====================================================================

    const transcript =
      formatTranscript(body.transcript);


    // ====================================================================
    // VALIDATION
    // ====================================================================

    if (!company) {

      return Response.json(
        {
          success: false,
          error: "Company name is required.",
        },
        {
          status: 400,
        }
      );

    }


    if (!person) {

      return Response.json(
        {
          success: false,
          error: "Contact person is required.",
        },
        {
          status: 400,
        }
      );

    }


    if (!email) {

      return Response.json(
        {
          success: false,
          error: "Email address is required.",
        },
        {
          status: 400,
        }
      );

    }


    if (!isValidEmail(email)) {

      return Response.json(
        {
          success: false,
          error: "Invalid email address.",
        },
        {
          status: 400,
        }
      );

    }


    // ====================================================================
    // BLOCK DISPOSABLE EMAILS
    // ====================================================================

    const blockedDomains = [

      "tempmail.com",
      "mailinator.com",
      "10minutemail.com",
      "guerrillamail.com",
      "yopmail.com",
      "temp-mail.org",

    ];


    const emailDomain =
      email.split("@")[1]?.toLowerCase();


    if (
      emailDomain &&
      blockedDomains.includes(emailDomain)
    ) {

      return Response.json(
        {
          success: false,
          error:
            "Temporary email addresses are not allowed.",
        },
        {
          status: 400,
        }
      );

    }


    // ====================================================================
    // GENERATE 5-DIGIT CHAT ID
    // ====================================================================

    const chatId =
  String(body.chatId || "").trim() ||
  generateChatId();


    // ====================================================================
    // CREATE FINAL MESSAGE
    //
    // This is what gets stored in contacts.message.
    //
    // The complete transcript is NOT stored here.
    // ====================================================================

    const finalMessage = `AI Enquiry - Chat ID: ${chatId}

Product / Requirement:
${product || "Not specified"}

Application:
${application || "Not specified"}

Technical Grade:
${technicalGrade || "Not specified"}

Customer Requirement:
${message || "Not specified"}

This enquiry was collected by ENY - Enviol TechSupport AI.

Full conversation transcript has been sent separately by email.`;


    // ====================================================================
    // DATABASE CONNECTION
    // ====================================================================

    client =
      await pool.connect();


    // ====================================================================
    // INSERT INTO EXISTING CONTACTS TABLE
    // ====================================================================

    const insertResult =
      await client.query(

        `
        INSERT INTO contacts
        (
          company,
          person,
          email,
          phone,
          category,
          message
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6
        )
        RETURNING id
        `,

        [

          company,

          person,

          email,

          phone || null,

          category,

          finalMessage,

        ]

      );


    const contactId =
      insertResult.rows[0]?.id;


    if (!contactId) {

      throw new Error(
        "Contact record was not created."
      );

    }


    // ====================================================================
    // CREATE TRANSCRIPT FILE
    // ====================================================================

    const transcriptHeader = `ENVIOL POLYTECH SOLUTIONS
AI ENQUIRY TRANSCRIPT

Chat ID: ${chatId}

Company: ${company}
Contact Person: ${person}
Email: ${email}
Phone: ${phone || "Not provided"}

Category: ${category}

Product / Requirement:
${product || "Not specified"}

Application:
${application || "Not specified"}

Technical Grade:
${technicalGrade || "Not specified"}

============================================================
CONVERSATION
============================================================

`;


    const transcriptFooter = `

============================================================
END OF TRANSCRIPT
============================================================

Chat ID: ${chatId}

Generated by:
ENY - Enviol TechSupport AI

This transcript was generated from an enquiry submitted
through the Enviol website.
`;


    const completeTranscript =
      transcriptHeader +
      transcript +
      transcriptFooter;


    // ====================================================================
    // CREATE SMTP TRANSPORTER
    // ====================================================================

    const transporter =
      createTransporter();


    // ====================================================================
    // EMAIL SUBJECT
    // ====================================================================

    const productSubject =
      product ||
      technicalGrade ||
      application ||
      "Product Requirement";


    const subject =
      `AI Enquiry #${chatId} - ${company} - ${productSubject}`;


    // ====================================================================
    // EMAIL BODY
    // ====================================================================

    const emailHtml = `

      <div style="
        font-family: Arial, Helvetica, sans-serif;
        color: #222;
        line-height: 1.6;
      ">

        <h2 style="color:#42b3a5;">
          New AI Based Enquiry
        </h2>

        <p>
          A new enquiry has been submitted through
          <strong>ENY - Enviol TechSupport AI</strong>.
        </p>

        <hr />

        <h3>Enquiry Details</h3>

        <table
          cellpadding="6"
          cellspacing="0"
          border="0"
          style="border-collapse:collapse;"
        >

          <tr>
            <td><strong>Chat ID:</strong></td>
            <td>${escapeHtml(chatId)}</td>
          </tr>

          <tr>
            <td><strong>Company:</strong></td>
            <td>${escapeHtml(company)}</td>
          </tr>

          <tr>
            <td><strong>Contact Person:</strong></td>
            <td>${escapeHtml(person)}</td>
          </tr>

          <tr>
            <td><strong>Email:</strong></td>
            <td>${escapeHtml(email)}</td>
          </tr>

          <tr>
            <td><strong>Phone:</strong></td>
            <td>${escapeHtml(phone || "Not provided")}</td>
          </tr>

          <tr>
            <td><strong>Enquiry Type:</strong></td>
            <td>${escapeHtml(category)}</td>
          </tr>

          <tr>
            <td><strong>Product:</strong></td>
            <td>${escapeHtml(product || "Not specified")}</td>
          </tr>

          <tr>
            <td><strong>Application:</strong></td>
            <td>${escapeHtml(application || "Not specified")}</td>
          </tr>

          <tr>
            <td><strong>Technical Grade:</strong></td>
            <td>${escapeHtml(
              technicalGrade || "Not specified"
            )}</td>
          </tr>

        </table>

        <hr />

        <h3>AI Enquiry Summary</h3>

        <div style="
          background:#f5f7f8;
          padding:15px;
          border-radius:8px;
          border-left:4px solid #42b3a5;
        ">

          ${escapeHtml(
            message ||
            "No additional requirement provided."
          ).replace(/\n/g, "<br />")}

        </div>

        <hr />

        <p>
          <strong>Chat ID:</strong>
          ${escapeHtml(chatId)}
        </p>

        <p style="
          color:#666;
          font-size:13px;
        ">

          The complete conversation between the customer
          and ENY is attached to this email.

        </p>

      </div>

    `;


    // ====================================================================
    // SEND EMAIL
    //
    // IMPORTANT:
    // We deliberately catch email failure separately.
    // This allows us to still record the enquiry in
    // contact_replies with email_status = "failed".
    // ====================================================================

    let emailStatus = "sent";

    try {

      await transporter.sendMail({

        from:
          `"Enviol AI Enquiry" <${process.env.SMTP_USER}>`,

        to:
          "info@enviol.com",

        replyTo:
          email,

        subject,

        html:
          emailHtml,

        attachments: [

          {

            filename:
              `ENVIOL-AI-ENQUIRY-${chatId}.txt`,

            content:
              completeTranscript,

            contentType:
              "text/plain; charset=utf-8",

          },

        ],

      });

    } catch (emailError) {

      emailStatus = "failed";

      console.error(
        "[AI ENQUIRY EMAIL ERROR]",
        emailError
      );

    }


    // ====================================================================
    // INSERT INTO contact_replies
    //
    // IMPORTANT:
    // The complete transcript is NOT stored here.
    //
    // Only the enquiry summary/details are stored.
    // The transcript exists only as the email attachment.
    // ====================================================================

    const replyMessage = `AI ENQUIRY

Chat ID: ${chatId}

Company:
${company}

Contact Person:
${person}

Email:
${email}

Phone:
${phone || "Not provided"}

Enquiry Type:
${category}

Product / Requirement:
${product || "Not specified"}

Application:
${application || "Not specified"}

Technical Grade:
${technicalGrade || "Not specified"}

AI Enquiry Summary:
${message || "No additional requirement provided."}

Full conversation transcript has been attached to the email.

Generated by:
ENY - Enviol TechSupport AI`;


    await client.query(

      `
      INSERT INTO contact_replies
      (
        contact_id,
        to_email,
        cc_email,
        subject,
        message,
        attachment_name,
        email_status
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
      `,

      [

        contactId,

        "info@enviol.com",

        null,

        subject,

        replyMessage,

        `ENVIOL-AI-ENQUIRY-${chatId}.txt`,

        emailStatus,

      ]

    );


    // ====================================================================
    // RELEASE DB CONNECTION
    // ====================================================================

    client.release();

    client = null;


    // ====================================================================
    // SUCCESS
    //
    // Even if email failed, the enquiry was successfully captured.
    // Therefore we return success=true but expose emailStatus.
    // ====================================================================

    return Response.json(

      {

        success: true,

        message:
          emailStatus === "sent"
            ? "AI enquiry submitted successfully."
            : "AI enquiry was recorded, but email delivery failed.",

        chatId,

        contactId,

        emailStatus,

      },

      {

        status: 200,

      }

    );


  } catch (error) {

    // ====================================================================
    // RELEASE CONNECTION IF SOMETHING FAILED
    // ====================================================================

    if (client) {

      try {

        client.release();

      } catch (releaseError) {

        console.error(
          "DB RELEASE ERROR:",
          releaseError
        );

      }

    }


    // ====================================================================
    // SERVER LOG
    // ====================================================================

    console.error(
      "[AI ENQUIRY API ERROR]",
      error
    );


    // ====================================================================
    // SAFE CLIENT RESPONSE
    // ====================================================================

    return Response.json(

      {

        success: false,

        error:
          "We could not submit your enquiry right now. Please try again or contact info@enviol.com.",

      },

      {

        status: 500,

      }

    );

  }

}