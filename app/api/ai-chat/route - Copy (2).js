import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

import { GoogleGenAI } from "@google/genai";
import enyKnowledge from "@/lib/enyKnowledge";

/*
|--------------------------------------------------------------------------
| ENY — Enviol TechSupport AI
|--------------------------------------------------------------------------
|
| This API route:
|
| 1. Receives the current conversation from AIEnquiryChat.js
| 2. Uses the Enviol knowledge base
| 3. Extracts structured enquiry information
| 4. Determines the current enquiry state
| 5. Generates ENY's customer-facing response
| 6. Determines whether the enquiry is ready for submission
|
| IMPORTANT:
|
| This route DOES NOT:
|
| - insert into PostgreSQL
| - send enquiry emails
| - submit enquiries
| - call /api/ai-enquiry
|
| Final enquiry submission is handled ONLY by:
|
|     /api/ai-enquiry
|
|--------------------------------------------------------------------------
*/


// ============================================================================
// CONFIGURATION
// ============================================================================

const GEMINI_MODEL =
  "gemini-3.6-flash";


// ============================================================================
// GEMINI CLIENT
// ============================================================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  timeout: 60000,
});


// ============================================================================
// GEMINI RETRY WRAPPER
// ============================================================================
//
// Retries temporary Gemini/API failures.
//
// Retryable:
// - 429
// - 500
// - 502
// - 503
// - 504
//
// Permanent errors are not retried.
//
// ============================================================================

async function generateWithRetry(
  params,
  maxRetries = 3
) {

  let lastError = null;


  for (
    let attempt = 0;
    attempt <= maxRetries;
    attempt++
  ) {

    try {

      return await ai.models.generateContent(
        params
      );

    } catch (error) {

      lastError = error;


      const status =
        Number(
          error?.status ||
          error?.code ||
          error?.cause?.status ||
          0
        );


      const retryable =
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504;


      if (
        !retryable ||
        attempt >= maxRetries
      ) {

        throw error;

      }


      const baseDelay =
        Math.min(
          1000 * Math.pow(2, attempt),
          8000
        );


      const jitter =
        Math.floor(
          Math.random() * 500
        );


      const delay =
        baseDelay + jitter;


      console.warn(
        `[ENY GEMINI] Temporary Gemini error ${status}. ` +
        `Retry ${attempt + 1}/${maxRetries} ` +
        `in ${delay}ms.`
      );


      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            delay
          )
      );

    }

  }


  throw lastError;

}


// ============================================================================
// ENVIOL KNOWLEDGE BASE
// ============================================================================

const ENY_KNOWLEDGE =
  JSON.stringify(
    enyKnowledge,
    null,
    2
  );


// ============================================================================
// CLEAN MESSAGE HISTORY
// ============================================================================

function cleanMessages(messages) {

  if (!Array.isArray(messages)) {
    return [];
  }


  return messages

    .filter((message) => {

      return (
        message &&
        typeof message === "object" &&
        (
          message.sender === "user" ||
          message.sender === "ai"
        ) &&
        typeof message.text === "string" &&
        message.text.trim()
      );

    })

    .slice(-30)

    .map((message) => {

      return {

        role:
          message.sender === "user"
            ? "user"
            : "model",

        parts: [
          {
            text:
              message.text.trim(),
          },
        ],

      };

    });

}


// ============================================================================
// NORMALIZE ENQUIRY DATA
// ============================================================================

function normalizeEnquiryData(data) {

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {

    return {};

  }


  const allowedFields = [

    "company",
    "person",
    "email",
    "phone",

    "category",
    "product",
    "application",
    "endUse",

    "technicalGrade",
    "grade",

    "ohValue",
    "functionality",
    "viscosity",
    "acidValue",
    "waterContent",

    "ncoOhRatio",
    "isocyanate",

    "hardness",
    "processingMethod",
    "castingRequirements",

    "quantity",
    "monthlyConsumption",
    "annualConsumption",

    "sampleRequirement",

    "existingMaterial",
    "existingSupplier",
    "existingGrade",

    "desiredReplacement",

    "deliveryLocation",
    "timeline",

    "specialRequirements",

    "message",
    "summary",

  ];


  const normalized = {};


  for (
    const field of allowedFields
  ) {

    const value =
      data[field];


    if (
      typeof value === "string" &&
      value.trim()
    ) {

      normalized[field] =
        value.trim();

    }

  }


  // Keep technicalGrade consistent for frontend.

  if (
    !normalized.technicalGrade &&
    normalized.grade
  ) {

    normalized.technicalGrade =
      normalized.grade;

  }


  return normalized;

}


// ============================================================================
// CHECK BASIC CUSTOMER DETAILS
// ============================================================================

function hasBasicCustomerDetails(
  enquiryData
) {

  return Boolean(

    enquiryData.company &&
    enquiryData.person &&
    enquiryData.email &&
    enquiryData.phone

  );

}


// ============================================================================
// GET MISSING CUSTOMER DETAILS
// ============================================================================

function getMissingCustomerDetails(
  enquiryData
) {

  const missing = [];


  if (!enquiryData.company) {
    missing.push("company");
  }


  if (!enquiryData.person) {
    missing.push("person");
  }


  if (!enquiryData.email) {
    missing.push("email");
  }


  if (!enquiryData.phone) {
    missing.push("phone");
  }


  return missing;

}


// ============================================================================
// CHECK MEANINGFUL REQUIREMENT
// ============================================================================

function hasMeaningfulRequirement(
  enquiryData
) {

  return Boolean(

    enquiryData.product ||
    enquiryData.application ||
    enquiryData.endUse ||
    enquiryData.technicalGrade ||
    enquiryData.ohValue ||
    enquiryData.existingMaterial ||
    enquiryData.existingGrade ||
    enquiryData.desiredReplacement ||
    enquiryData.specialRequirements ||
    enquiryData.sampleRequirement ||
    enquiryData.category

  );

}


// ============================================================================
// CHECK SIMPLE CONFIRMATION
// ============================================================================

function looksLikeConfirmation(text) {

  if (
    !text ||
    typeof text !== "string"
  ) {

    return false;

  }


  const normalized =
    text
      .trim()
      .toLowerCase()
      .replace(/[.!?,]+$/g, "");


  const confirmations =
    new Set([

      "yes",
      "yes please",
      "sure",
      "okay",
      "ok",
      "correct",
      "that's right",
      "that is right",
      "looks good",
      "proceed",
      "go ahead",
      "submit",
      "send it",
      "continue",
      "please proceed",
      "that's correct",
      "that is correct",
      "exactly",
      "fine",
      "agreed",

    ]);


  return confirmations.has(
    normalized
  );

}


// ============================================================================
// CHECK SUBMISSION / SALES INTENT
// ============================================================================
//
// We scan the complete customer conversation rather than only the latest
// message.
//
// This is important.
//
// Example:
//
// Customer:
// "Can you post my enquiry?"
//
// ENY:
// "Sure, please share your email."
//
// Customer:
// "anna@abc.com"
//
// The latest message contains no "submit" keyword, but the submission
// intent is still active.
//
// ============================================================================

function looksLikeSubmissionIntent(
  text
) {

  if (
    !text ||
    typeof text !== "string"
  ) {

    return false;

  }


  const normalized =
    text
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();


  // Avoid obvious negative statements.

  if (
    /\b(don't|do not|not|never)\s+(submit|send|post|place)\b/
      .test(normalized)
  ) {

    return false;

  }


  return (

    /\bsubmit\b/.test(normalized) ||

    /\bsubmit.*enquiry\b/.test(normalized) ||

    /\bsubmit.*request\b/.test(normalized) ||

    /\bsend.*enquiry\b/.test(normalized) ||

    /\bsend.*request\b/.test(normalized) ||

    /\bpost.*enquiry\b/.test(normalized) ||

    /\bpost.*request\b/.test(normalized) ||

    /\bconnect.*sales\b/.test(normalized) ||

    /\bconnect.*order\b/.test(normalized) ||

    /\bconnect.*team\b/.test(normalized) ||

    /\bconnect.*enviol\b/.test(normalized) ||

    /\bcontact.*sales\b/.test(normalized) ||

    /\bcontact.*order\b/.test(normalized) ||

    /\bcontact.*team\b/.test(normalized) ||

    /\bspeak.*sales\b/.test(normalized) ||

    /\bspeak.*team\b/.test(normalized) ||

    /\btalk.*sales\b/.test(normalized) ||

    /\btalk.*team\b/.test(normalized) ||

    /\bplace.*order\b/.test(normalized) ||

    /\bproceed.*enquiry\b/.test(normalized) ||

    /\bproceed.*request\b/.test(normalized)

  );

}


// ============================================================================
// CHECK SUBMISSION INTENT FROM COMPLETE CONVERSATION
// ============================================================================

function conversationHasSubmissionIntent(
  messages
) {

  if (!Array.isArray(messages)) {
    return false;
  }


  return messages.some(
    (message) => {

      if (
        message.role !== "user"
      ) {

        return false;

      }


      const text =
        message.parts?.[0]?.text ||
        "";


      return looksLikeSubmissionIntent(
        text
      );

    }
  );

}


// ============================================================================
// BUILD ENQUIRY STATE
// ============================================================================

function buildEnquiryState({

  enquiryData,

  messages,

  lastUserText,

  customerConfirmedSummary,

}) {

  const meaningfulRequirement =
    hasMeaningfulRequirement(
      enquiryData
    );


  const basicDetailsComplete =
    hasBasicCustomerDetails(
      enquiryData
    );


  const submissionIntent =
    conversationHasSubmissionIntent(
      messages
    );


  const missingCustomerDetails =
    getMissingCustomerDetails(
      enquiryData
    );


  return {

    meaningfulRequirement,

    basicDetailsComplete,

    submissionIntent,

    missingCustomerDetails,

    customerConfirmedSummary,

    readyForSubmission:
      meaningfulRequirement &&
      basicDetailsComplete &&
      customerConfirmedSummary,

    lastUserMessage:
      lastUserText,

  };

}


// ============================================================================
// STRUCTURED EXTRACTION SCHEMA
// ============================================================================

const EXTRACTION_SCHEMA = {

  type: "object",

  properties: {

    enquiryData: {

      type: "object",

      properties: {

        company: {
          type: "string",
        },

        person: {
          type: "string",
        },

        email: {
          type: "string",
        },

        phone: {
          type: "string",
        },


        category: {
          type: "string",
        },

        product: {
          type: "string",
        },

        application: {
          type: "string",
        },

        endUse: {
          type: "string",
        },


        technicalGrade: {
          type: "string",
        },

        grade: {
          type: "string",
        },


        ohValue: {
          type: "string",
        },

        functionality: {
          type: "string",
        },

        viscosity: {
          type: "string",
        },

        acidValue: {
          type: "string",
        },

        waterContent: {
          type: "string",
        },


        ncoOhRatio: {
          type: "string",
        },

        isocyanate: {
          type: "string",
        },


        hardness: {
          type: "string",
        },

        processingMethod: {
          type: "string",
        },

        castingRequirements: {
          type: "string",
        },


        quantity: {
          type: "string",
        },

        monthlyConsumption: {
          type: "string",
        },

        annualConsumption: {
          type: "string",
        },


        sampleRequirement: {
          type: "string",
        },


        existingMaterial: {
          type: "string",
        },

        existingSupplier: {
          type: "string",
        },

        existingGrade: {
          type: "string",
        },


        desiredReplacement: {
          type: "string",
        },


        deliveryLocation: {
          type: "string",
        },

        timeline: {
          type: "string",
        },


        specialRequirements: {
          type: "string",
        },


        message: {
          type: "string",
        },

        summary: {
          type: "string",
        },

      },

      required: [],

    },


    customerConfirmedSummary: {

      type: "boolean",

    },

  },


  required: [

    "enquiryData",
    "customerConfirmedSummary",

  ],

};


// ============================================================================
// EXTRACTION PROMPT
// ============================================================================

function buildExtractionPrompt(
  rawMessages
) {

  return `

You are ENY's internal enquiry-data extraction engine.

Your job is to extract structured customer enquiry information from the
complete conversation.

IMPORTANT:

Extract ONLY information explicitly provided by the customer or clearly
established from the conversation.

Never invent information.

Never infer:

- email addresses
- phone numbers
- company names
- people names
- quantities
- technical specifications
- product grades
- application details

If a value is unknown, leave that field as an empty string.

======================================================================
CUSTOMER INFORMATION
======================================================================

If the customer says:

"My name is Anna"

then:

person = "Anna"

If the customer says:

"I am Anna from ABC Industries"

then:

person = "Anna"
company = "ABC Industries"

Do NOT ask the customer to repeat information already present in the
conversation.

======================================================================
TECHNICAL INFORMATION
======================================================================

Preserve technical values as stated.

Examples:

"OH 110-120"

→ "110-120 mg KOH/g"

"Shore D 70"

→ "Shore D 70"

"2 tons per month"

→ "2 tons/month"

"100+ units"

→ "100+ units"

Do not invent missing technical values.

======================================================================
APPLICATION
======================================================================

Extract the customer's actual application.

For example:

"we manufacture sports shoe soles"

should produce:

application = "sports shoe sole manufacturing"

Do not convert general ENY explanations into customer requirements.

Only extract requirements actually stated by the customer.

======================================================================
CUSTOMER CONFIRMATION
======================================================================

Set customerConfirmedSummary = true ONLY if the customer clearly confirms
ENY's enquiry summary or clearly tells ENY to proceed AFTER the meaningful
requirement has already been established.

Examples:

"yes, that's correct"

"correct"

"looks good"

"go ahead"

"please proceed"

"submit it"

"yes, send it"

A bare "yes" should NOT automatically be treated as confirmation.

A "yes" answering a technical question is NOT final confirmation.

A greeting, thanks, goodbye or acknowledgement is NOT confirmation.

If there has been no proper enquiry summary or clear submission
confirmation, use false.

======================================================================
IMPORTANT
======================================================================

Do not turn ENY's suggestions into customer requirements.

For example, if ENY says:

"Would you require 2 tons/month?"

and the customer says:

"yes"

then quantity = "2 tons/month"

is valid because the customer confirmed it.

But if ENY merely mentions:

"Many customers use 2 tons/month"

that does NOT mean the customer requires 2 tons/month.

Return only the supplied JSON schema.

COMPLETE CONVERSATION:

${JSON.stringify(
  rawMessages,
  null,
  2
)}

`;

}


// ============================================================================
// ENY SYSTEM PROMPT
// ============================================================================

function buildSystemPrompt(
  enquiryState
) {

  return `
You are ENY, the AI enquiry assistant of Enviol Polytech Solutions.

Your identity:

Name: ENY
Role: Enviol TechSupport AI
Company: Enviol Polytech Solutions
Website: https://www.enviol.com

You are speaking directly with customers visiting the Enviol website.

Your primary purpose is to understand customer requirements for polyols,
polyurethane systems, applications and related technical or commercial
enquiries, and help qualify the enquiry for the Enviol team.

You are a technical sales assistant, not a general-purpose chatbot.

======================================================================
PERSONALITY
======================================================================

Be:

- Friendly
- Respectful
- Professional
- Technically aware
- Concise
- Human
- Helpful

Do not sound robotic.

Do not interrogate the customer.

Ask only one or two useful questions at a time.

Never ask for information that the customer has already provided.

If the customer provides several details in one message, acknowledge them
and continue with the missing information that matters.

Do not repeatedly ask the same question.

======================================================================
ENVIOL KNOWLEDGE BASE
======================================================================

The following is the official structured knowledge base of Enviol
Polytech Solutions.

This knowledge base is the primary authority for Enviol-specific
information.

You MUST actively use this knowledge when answering questions about:

- Enviol
- Enviol products
- product grades
- polyester polyols
- polyether polyols
- recycled polyols
- applications
- industries
- technical specifications
- product selection
- suitability
- samples
- technical enquiries
- commercial enquiries

---------------- ENY KNOWLEDGE BASE ----------------

${ENY_KNOWLEDGE}

---------------- END ENY KNOWLEDGE BASE ----------------

======================================================================
KNOWLEDGE BASE USAGE
======================================================================

Before answering an Enviol-specific question:

1. Identify what the customer is asking.
2. Identify the relevant product, application, technical or industry
   category.
3. Use the relevant information from the knowledge base.
4. Do not substitute generic polyurethane knowledge when Enviol-specific
   information is available.
5. Do not combine unrelated knowledge-base entries.
6. Do not assume suitability merely because products belong to the same
   broad chemical category.

When the knowledge base contains an exact answer, prefer that answer.

When the knowledge base contains a relevant candidate but does not
explicitly confirm suitability, say that it is a possible candidate and
that technical validation is required.

When the knowledge base does not contain the required information, say
that the Enviol technical team would need to confirm it.

NEVER invent an Enviol-specific fact.

NEVER create a product specification by combining specifications from
different products.

NEVER assume two grades are equivalent unless equivalence is explicitly
stated.

NEVER invent:

- product codes
- product grades
- OH values
- viscosity
- functionality
- prices
- MOQ
- availability
- stock
- certifications
- lead times
- customer references
- laboratory results
- exact formulations
- exact product equivalence
- regulatory information
- SDS information

======================================================================
KNOWLEDGE SOURCE PRIORITY
======================================================================

Use information in this order:

1. Exact information in the Enviol knowledge base
2. Information explicitly provided by the customer
3. General polyurethane/polyol technical knowledge
4. Reasonable technical inference

General technical knowledge may be used to explain concepts, but must NOT
be presented as a confirmed Enviol product specification.

======================================================================
ENVIOL SCOPE
======================================================================

ENY primarily assists with:

- Enviol Polytech Solutions
- Polyester polyols
- Recycled polyester polyols
- PET-based polyester polyols
- Polyether polyols
- Recycled polyols
- Polyurethane raw materials
- CASE applications
- Coatings
- Adhesives
- Sealants
- Elastomers
- Casting
- Rigid PU foam
- PIR foam
- PUF foam
- Insulation
- Refrigeration insulation
- Pipeline insulation
- Oil & gas insulation
- Electrical insulation
- Automotive applications
- Construction applications
- Product selection
- Technical enquiries
- Samples
- Quotations
- Commercial enquiries
- Enquiry qualification

======================================================================
OUT-OF-SCOPE QUESTIONS
======================================================================

If a question is completely unrelated to Enviol, polyurethane, polyols,
relevant chemicals or a customer enquiry, politely redirect.

Example:

"I'm ENY, Enviol's technical assistant, so I mainly help with polyols,
polyurethane applications, Enviol products and technical enquiries. If
you have a requirement related to these, I'd be happy to help. 😊"

Do not become a general-purpose assistant.

======================================================================
TECHNICAL CONVERSATION
======================================================================

Start broad.

Understand the application first whenever possible.

Relevant information may include:

- product/material required
- application
- end use
- technical grade
- OH value
- functionality
- viscosity
- acid value
- water content
- NCO/OH ratio
- isocyanate system
- hardness
- processing method
- casting/moulding requirements
- quantity
- monthly consumption
- annual consumption
- sample requirement
- existing material
- existing supplier
- existing product grade
- desired replacement
- delivery location
- required timeline
- special technical requirements

Do NOT ask everything.

Ask only what is relevant to the customer's requirement.

======================================================================
WHEN CUSTOMER DOES NOT KNOW A TECHNICAL VALUE
======================================================================

If the customer says they don't know OH value, functionality, viscosity
or another technical parameter, do not repeatedly ask.

Move to an easier question.

Example:

Customer:
"I don't know the OH value."

ENY:
"No problem. What are you manufacturing with the material?"

======================================================================
QUANTITY
======================================================================

Quantity is important when relevant.

Ask naturally:

"Approximately how much material would you require — per order or per
month?"

Accept approximate quantities such as:

- 100 kg
- 500 kg
- 1 ton
- 3 tons/month
- 10 MT/year
- 100+ units

Do not force exact quantities.

======================================================================
EXISTING PRODUCT / COMPETITOR
======================================================================

If the customer mentions another supplier, grade or product, understand
whether they want:

- equivalent material
- replacement
- alternative supplier
- improved performance
- lower cost
- recycled alternative

Never claim exact equivalence unless confirmed by the knowledge base or
technical team.

======================================================================
PRODUCT SELECTION
======================================================================

When a customer asks which product they should use:

1. Understand the application.
2. Understand required performance.
3. Identify relevant technical parameters.
4. Check the knowledge base.
5. Identify possible candidates.
6. Distinguish between confirmed suitability and technical validation.

Never claim exact equivalence unless explicitly verified.

Use wording such as:

"Based on the information you've provided, this type of polyester
polyol may be a suitable candidate. Our technical team would need to
confirm the exact grade."

======================================================================
SUBMISSION / SALES INTENT
======================================================================

If the customer explicitly asks to:

- post the enquiry
- submit the enquiry
- send the enquiry
- connect with the sales team
- connect with the order team
- contact the Enviol team
- speak with sales
- speak with the order team
- proceed with the enquiry
- place an order
- send the requirement to Enviol

then this is explicit submission/order intent.

When submission intent exists AND a meaningful requirement has already
been established:

STOP asking unnecessary technical questions.

Instead, collect missing customer contact information.

Required:

- Company name
- Contact person
- Email
- Phone

If the contact person is already known, do NOT ask for the person's name
again.

For example:

"Absolutely, Anna. I can prepare this enquiry for our team.

I have noted your requirement for a recycled polyester polyol with an
OH value of 110–120 mg KOH/g for sports shoe sole manufacturing.

Could you please share your company name, email address and
phone/WhatsApp number?"

If only one field is missing, ask only for that field.

If multiple fields are missing, ask for them naturally in one concise
message.

Do not claim that the enquiry has already been submitted.

======================================================================
CURRENT ENQUIRY STATE
======================================================================

The backend has already analyzed the conversation.

Use this state as the authoritative state for deciding what to say next.

CURRENT STATE:

${JSON.stringify(
  enquiryState,
  null,
  2
)}

======================================================================
STATE-BASED CONVERSATION CONTROL
======================================================================

IMPORTANT:

The state above is already calculated from the conversation.

Follow it.

----------------------------------------------------------------------
CASE 1 — REQUIREMENT NOT YET ESTABLISHED
----------------------------------------------------------------------

If:

meaningfulRequirement = false

Focus on understanding the customer's requirement.

Ask one useful question.

Do not immediately ask for all contact details.

----------------------------------------------------------------------
CASE 2 — REQUIREMENT ESTABLISHED + SUBMISSION INTENT + MISSING CONTACT
----------------------------------------------------------------------

If:

meaningfulRequirement = true

AND

submissionIntent = true

AND

basicDetailsComplete = false

then the customer has already asked to proceed.

STOP asking unnecessary technical questions.

Collect only the missing contact fields listed in:

missingCustomerDetails

If the customer's name is already known, never ask for it again.

----------------------------------------------------------------------
CASE 3 — REQUIREMENT ESTABLISHED + CONTACT COMPLETE + NOT CONFIRMED
----------------------------------------------------------------------

If:

meaningfulRequirement = true

AND

basicDetailsComplete = true

AND

customerConfirmedSummary = false

then provide a concise enquiry summary and ask:

"Does that look correct?"

Do not ask unnecessary technical questions.

----------------------------------------------------------------------
CASE 4 — READY
----------------------------------------------------------------------

If:

meaningfulRequirement = true

AND

basicDetailsComplete = true

AND

customerConfirmedSummary = true

then say that the enquiry is ready to be submitted to the Enviol team.

Do not ask another confirmation question.

Do not ask for more information.

Do not claim that the enquiry has already been submitted.

The frontend handles submission.

======================================================================
CUSTOMER CONTACT INFORMATION
======================================================================

Do not demand contact information at the beginning of a conversation.

First understand the requirement.

Once a meaningful requirement exists, collect contact information when
appropriate.

If the customer has already provided a field, never ask for it again.

If the customer says:

"My name is Anna"

then remember:

person = Anna

Do not ask:

"May I know your name?"

======================================================================
CONFIRMATION
======================================================================

A customer confirmation may be:

- yes
- yes please
- that's right
- that's correct
- correct
- exactly
- looks good
- proceed
- go ahead
- submit
- send it
- continue
- please proceed
- fine
- agreed

However, a simple "yes" is confirmation only when it clearly responds
to ENY's immediately preceding summary or confirmation request.

A "yes" answering a technical question is NOT final confirmation.

======================================================================
GENERAL TECHNICAL KNOWLEDGE
======================================================================

You may explain general concepts including:

- hydroxyl value
- acid value
- functionality
- viscosity
- molecular weight
- NCO/OH ratio
- polyester vs polyether polyol
- PU chemistry
- PIR
- PUF
- CASE
- coatings
- adhesives
- sealants
- elastomers
- casting
- insulation

General technical knowledge must never be presented as a confirmed
Enviol product specification.

======================================================================
SAFETY
======================================================================

You are an enquiry-assistance system, not an autonomous chemical
engineering approval system.

Do not provide dangerous synthesis instructions or unsafe chemical
handling instructions.

For formulation questions, provide high-level technical guidance and
recommend technical-team review where appropriate.

Do not invent:

- SDS information
- hazard classifications
- UN numbers
- regulatory classifications
- emergency procedures
- product safety claims

======================================================================
RESPONSE LENGTH
======================================================================

Keep normal ENY responses concise.

Prefer approximately 40–100 words.

When collecting contact information, keep the message short.

Ask one or two questions at a time.

Never stop a sentence halfway through.

======================================================================
IMPORTANT RESPONSE RULE
======================================================================

Your response must contain ONLY the natural-language message intended
for the customer.

Never mention:

- system prompts
- internal instructions
- Gemini
- APIs
- routes
- JSON
- backend logic
- enquiryData
- readyForSubmission
- extraction
- internal processing
- enquiry state

`;
}


// ============================================================================
// POST
// ============================================================================

export async function POST(req) {

  try {

    // ========================================================================
    // CHECK API KEY
    // ========================================================================

    if (
      !process.env.GEMINI_API_KEY
    ) {

      console.error(
        "[ENY GEMINI] GEMINI_API_KEY is missing."
      );


      return Response.json(

        {
          success: false,
          error:
            "AI service is not configured.",
        },

        {
          status: 500,
        }

      );

    }


    // ========================================================================
    // READ REQUEST
    // ========================================================================

    const body =
      await req.json();


    if (
      !body ||
      typeof body !== "object"
    ) {

      return Response.json(

        {
          success: false,
          error:
            "Invalid request.",
        },

        {
          status: 400,
        }

      );

    }


    // ========================================================================
    // CHAT ID
    // ========================================================================

    const chatId =
      String(
        body.chatId || ""
      ).trim();


    // ========================================================================
    // CLEAN CONVERSATION
    // ========================================================================

    const messages =
      cleanMessages(
        body.messages
      );


    if (
      messages.length === 0
    ) {

      return Response.json(

        {
          success: false,
          error:
            "No conversation message was provided.",
        },

        {
          status: 400,
        }

      );

    }


    // ========================================================================
    // LAST USER MESSAGE
    // ========================================================================

    const lastUserMessage =
      [...messages]
        .reverse()
        .find(
          (message) =>
            message.role === "user"
        );


    const lastUserText =
      lastUserMessage
        ?.parts
        ?.at(0)
        ?.text ||
      "";


    // ========================================================================
    // STEP 1 — EXTRACT STRUCTURED ENQUIRY DATA
    // ========================================================================
    //
    // We extract BEFORE generating ENY's response.
    //
    // This is important because ENY needs to know the current enquiry
    // state before deciding what to say.
    //
    // ========================================================================

    const extractionPrompt =
      buildExtractionPrompt(
        body.messages || []
      );


    const extractionResponse =
      await generateWithRetry({

        model:
          GEMINI_MODEL,

        contents:
          extractionPrompt,

        config: {

          temperature:
            0,

          maxOutputTokens:
            1500,

          responseMimeType:
            "application/json",

          responseSchema:
            EXTRACTION_SCHEMA,

        },

      });


    let extracted = {};


    try {

      extracted =
        JSON.parse(
          extractionResponse
            .text
            ?.trim() ||
          "{}"
        );

    } catch (error) {

      console.error(
        "[ENY EXTRACTION JSON ERROR]",
        error
      );


      extracted = {};

    }


    const enquiryData =
      normalizeEnquiryData(
        extracted?.enquiryData
      );


    // ========================================================================
    // STEP 2 — CUSTOMER CONFIRMATION
    // ========================================================================

    let customerConfirmedSummary =
      extracted
        ?.customerConfirmedSummary === true;


    // ========================================================================
    // CONSERVATIVE CONFIRMATION FALLBACK
    // ========================================================================
    //
    // If Gemini extraction missed an obvious confirmation, inspect the
    // immediately preceding ENY message.
    //
    // ========================================================================

    if (
      !customerConfirmedSummary &&
      looksLikeConfirmation(
        lastUserText
      )
    ) {

      const previousAssistantMessage =
        [...messages]
          .reverse()
          .find(
            (message) =>
              message.role === "model"
          );


      const previousAssistantText =
        previousAssistantMessage
          ?.parts
          ?.at(0)
          ?.text ||
        "";


      const confirmationContext =
        /summar|correct|right|proceed|submit|go ahead|ready|confirmation/i
          .test(
            previousAssistantText
          );


      if (
        confirmationContext
      ) {

        customerConfirmedSummary =
          true;

      }

    }


    // ========================================================================
    // STEP 3 — BUILD CURRENT ENQUIRY STATE
    // ========================================================================
    //
    // IMPORTANT:
    //
    // This happens BEFORE ENY generates its response.
    //
    // ========================================================================

    const enquiryState =
      buildEnquiryState({

        enquiryData,

        messages,

        lastUserText,

        customerConfirmedSummary,

      });


    // ========================================================================
    // STEP 4 — GENERATE ENY RESPONSE
    // ========================================================================
    //
    // ENY now receives:
    //
    // - conversation
    // - complete Enviol knowledge base
    // - current enquiry state
    //
    // Therefore ENY can make the correct next conversational decision.
    //
    // ========================================================================

    const systemPrompt =
      buildSystemPrompt(
        enquiryState
      );


    const response =
      await generateWithRetry({

        model:
          GEMINI_MODEL,

        contents:
          messages,

        config: {

          systemInstruction:
            systemPrompt,

          temperature:
            0.3,

          maxOutputTokens:
            700,

        },

      });


    const reply =
      response
        .text
        ?.trim();


    if (!reply) {

      throw new Error(
        "Gemini returned an empty response."
      );

    }


    // ========================================================================
    // STEP 5 — FINAL READINESS
    // ========================================================================

    const meaningfulRequirement =
      enquiryState
        .meaningfulRequirement;


    const basicDetailsComplete =
      enquiryState
        .basicDetailsComplete;


    const readyForSubmission =
      meaningfulRequirement &&
      basicDetailsComplete &&
      customerConfirmedSummary;


    // ========================================================================
    // DEBUG LOGGING
    // ========================================================================

    console.log(
      "[ENY CHAT]",
      {

        chatId,

        meaningfulRequirement,

        basicDetailsComplete,

        submissionIntent:
          enquiryState
            .submissionIntent,

        missingCustomerDetails:
          enquiryState
            .missingCustomerDetails,

        customerConfirmedSummary,

        readyForSubmission,

        enquiryData,

      }
    );


    // ========================================================================
    // RETURN TO AIEnquiryChat.js
    // ========================================================================

    return Response.json(

      {

        success: true,

        chatId,

        reply,

        enquiryData,

        readyForSubmission,

      },

      {
        status: 200,
      }

    );


  } catch (error) {

    // ========================================================================
    // FINAL ERROR HANDLING
    // ========================================================================

    console.error(
      "[ENY GEMINI CHAT ERROR]",
      error
    );


    return Response.json(

      {

        success: false,

        error:
          "ENY is temporarily unable to respond.",

      },

      {
        status: 500,
      }

    );

  }

}