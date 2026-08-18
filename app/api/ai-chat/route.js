import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

import { GoogleGenAI } from "@google/genai";
import enyKnowledge from "@/lib/enyKnowledge";


// ============================================================================
// GEMINI CLIENT
// ============================================================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// ============================================================================
// MODEL
// ============================================================================
//
// Set this in .env.local:
//
// GEMINI_MODEL=gemini-3.5-flash-lite
//
// If GEMINI_MODEL is not defined, this fallback is used.
//
// IMPORTANT:
// The application makes ONE Gemini generation request per customer message.
// We deliberately do not rotate through multiple models automatically.
// ============================================================================

const GEMINI_MODEL =
  process.env.GEMINI_MODEL ||
  "gemini-3.5-flash-lite";


// ============================================================================
// KNOWLEDGE BASE
// ============================================================================

const ENY_KNOWLEDGE = JSON.stringify(
  enyKnowledge,
  null,
  2
);


// ============================================================================
// RESPONSE SCHEMA
// ============================================================================

const RESPONSE_SCHEMA = {
  type: "object",

  properties: {
    reply: {
      type: "string",
    },

    enquiryData: {
      type: "object",

      properties: {
        company: { type: "string" },
        person: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },

        category: { type: "string" },
        product: { type: "string" },
        application: { type: "string" },
        endUse: { type: "string" },

        technicalGrade: { type: "string" },
        grade: { type: "string" },

        ohValue: { type: "string" },
        functionality: { type: "string" },
        viscosity: { type: "string" },
        acidValue: { type: "string" },
        waterContent: { type: "string" },

        ncoOhRatio: { type: "string" },
        isocyanate: { type: "string" },

        hardness: { type: "string" },
        processingMethod: { type: "string" },
        castingRequirements: {
          type: "string",
        },

        quantity: { type: "string" },
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
    "reply",
    "enquiryData",
    "customerConfirmedSummary",
  ],
};


// ============================================================================
// RETRY WRAPPER
// ============================================================================
//
// IMPORTANT:
//
// 429 = quota/rate-limit.
//
// We NEVER retry 429.
//
// Temporary 5xx errors are retried only once.
//
// This prevents ENY from becoming unnecessarily slow.
// ============================================================================

async function generateWithRetry(
  params
) {

  const maxRetries = 1;

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

      const status = Number(
        error?.status ||
        error?.code ||
        error?.cause?.status ||
        0
      );


      // --------------------------------------------------------------
      // NEVER RETRY QUOTA ERRORS
      // --------------------------------------------------------------

      if (status === 429) {

        throw error;

      }


      // --------------------------------------------------------------
      // TEMPORARY SERVER ERRORS
      // --------------------------------------------------------------

      const retryable =
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


      const delay = 400;

      console.warn(
        `[ENY GEMINI] Temporary error ${status}. ` +
        `Retrying once in ${delay}ms.`
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

  throw new Error(
    "Gemini request failed."
  );

}


// ============================================================================
// CLEAN MESSAGE HISTORY
// ============================================================================

function cleanMessages(messages) {

  if (!Array.isArray(messages)) {
    return [];
  }


  return messages
    .filter((message) => {

      if (
        !message ||
        typeof message !== "object"
      ) {
        return false;
      }


      const validSender =
        message.sender === "user" ||
        message.sender === "ai";


      const validText =
        typeof message.text === "string" &&
        message.text.trim().length > 0;


      return (
        validSender &&
        validText
      );

    })

    // Prevent the prompt from growing indefinitely.
    .slice(-30)

    .map((message) => {

      return {
        role:
          message.sender === "user"
            ? "user"
            : "model",

        text:
          message.text.trim(),
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


  for (const field of allowedFields) {

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


  // Keep technicalGrade and grade consistent.

  if (
    !normalized.technicalGrade &&
    normalized.grade
  ) {

    normalized.technicalGrade =
      normalized.grade;

  }


  if (
    !normalized.grade &&
    normalized.technicalGrade
  ) {

    normalized.grade =
      normalized.technicalGrade;

  }


  return normalized;

}


// ============================================================================
// MERGE ENQUIRY DATA
// ============================================================================
//
// Later non-empty information can update previous information.
//
// Empty values NEVER erase existing information.
// ============================================================================

function mergeEnquiryData(
  previous,
  current
) {

  const merged = {
    ...(previous || {}),
  };


  for (
    const [key, value]
    of Object.entries(
      current || {}
    )
  ) {

    if (
      typeof value === "string" &&
      value.trim()
    ) {

      merged[key] =
        value.trim();

    }

  }


  return merged;

}


// ============================================================================
// MEANINGFUL REQUIREMENT
// ============================================================================

function hasMeaningfulRequirement(
  enquiryData
) {

  return Boolean(

    enquiryData.product ||
    enquiryData.application ||
    enquiryData.endUse ||
    enquiryData.technicalGrade ||
    enquiryData.grade ||
    enquiryData.ohValue ||
    enquiryData.functionality ||
    enquiryData.existingMaterial ||
    enquiryData.existingGrade ||
    enquiryData.desiredReplacement ||
    enquiryData.specialRequirements ||
    enquiryData.sampleRequirement ||
    enquiryData.category ||
    enquiryData.message ||
    enquiryData.summary

  );

}


// ============================================================================
// BASIC CUSTOMER DETAILS
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
// MISSING CUSTOMER DETAILS
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
// SUBMISSION INTENT
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


  return (

    /\bsubmit\b/.test(normalized) ||

    /\bsend\s+(the\s+)?enquir(y|ies)\b/.test(
      normalized
    ) ||

    /\bsend\s+(the\s+)?request\b/.test(
      normalized
    ) ||

    /\bpost\s+(the\s+)?enquir(y|ies)\b/.test(
      normalized
    ) ||

    /\bconnect.*sales\b/.test(
      normalized
    ) ||

    /\bconnect.*order\b/.test(
      normalized
    ) ||

    /\bconnect.*team\b/.test(
      normalized
    ) ||

    /\bcontact.*sales\b/.test(
      normalized
    ) ||

    /\bcontact.*team\b/.test(
      normalized
    ) ||

    /\bspeak.*sales\b/.test(
      normalized
    ) ||

    /\bspeak.*team\b/.test(
      normalized
    ) ||

    /\btalk.*sales\b/.test(
      normalized
    ) ||

    /\btalk.*team\b/.test(
      normalized
    ) ||

    /\bplace\s+(an\s+)?order\b/.test(
      normalized
    ) ||

    /\bproceed\s+(with\s+)?(the\s+)?enquir(y|ies)\b/.test(
      normalized
    ) ||

    /\bproceed\s+with\s+(this|the)\s+(request|requirement)\b/.test(
      normalized
    )

  );

}


// ============================================================================
// SIMPLE CONFIRMATION
// ============================================================================

function looksLikeConfirmation(
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
      .trim()
      .toLowerCase()
      .replace(/[.!?,]+$/g, "");


  const confirmations = new Set([

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
// PREVIOUS ASSISTANT CONFIRMATION CHECK
// ============================================================================
//
// A bare "yes" should only become final confirmation if ENY's immediately
// preceding message was actually asking the customer to confirm the enquiry.
// ============================================================================

function previousAssistantAskedForConfirmation(
  messages
) {

  if (!Array.isArray(messages)) {
    return false;
  }


  // Find the message immediately before the latest customer message.

  const previousMessage =
    messages.length >= 2
      ? messages[messages.length - 2]
      : null;


  if (
    !previousMessage ||
    previousMessage.role !== "model"
  ) {

    return false;

  }


  const text =
    String(
      previousMessage.text || ""
    ).trim();


  if (!text) {
    return false;
  }


  const explicitConfirmationQuestion =

    /\bdoes that look correct\b/i.test(text) ||

    /\bis that correct\b/i.test(text) ||

    /\bis that right\b/i.test(text) ||

    /\bplease confirm\b/i.test(text) ||

    /\bshall i proceed\b/i.test(text) ||

    /\bwould you like me to proceed\b/i.test(text) ||

    /\bare you happy with (the )?summary\b/i.test(text) ||

    /\bcan i proceed\b/i.test(text);


  return explicitConfirmationQuestion;

}


// ============================================================================
// FINAL READINESS
// ============================================================================
//
// The enquiry is ready when:
//
// 1. A meaningful requirement exists
// 2. Company is known
// 3. Contact person is known
// 4. Email is known
// 5. Phone is known
//
// IMPORTANT:
//
// The frontend "Confirm & Send Enquiry" button is the customer's
// explicit final confirmation.
//
// We therefore DO NOT require the customer to type "yes" anymore.
//
// Once this function returns true, AIEnquiryChat.js will display:
//
// "✓ Confirm & Send Enquiry"
//
// Clicking that button calls /api/ai-enquiry.
//

function calculateReadyForSubmission({
  enquiryData,
}) {

  const meaningfulRequirement =
    hasMeaningfulRequirement(
      enquiryData
    );


  const basicDetailsComplete =
    hasBasicCustomerDetails(
      enquiryData
    );


  return Boolean(

    meaningfulRequirement &&

    basicDetailsComplete

  );

}


// ============================================================================
// SYSTEM PROMPT
// ============================================================================

const SYSTEM_PROMPT = `

You are ENY, the AI enquiry assistant of Enviol Polytech Solutions.

You speak directly with customers visiting the Enviol website.

Your job is to:

1. Understand the customer's requirement.
2. Use the official Enviol knowledge base.
3. Answer Enviol product and polyurethane/polyol technical questions.
4. Qualify genuine enquiries.
5. Collect necessary contact details when the customer wants to proceed.
6. Produce one concise natural customer-facing reply.
7. Extract structured enquiry information from the conversation.
8. Determine whether the customer has confirmed the final enquiry summary.

You are NOT a general-purpose chatbot.


======================================================================
IDENTITY
======================================================================

Name:
ENY

Role:
Enviol TechSupport AI

Company:
Enviol Polytech Solutions

Website:
https://www.enviol.com

======================================================================
OFFICIAL CONTACT EMAIL
======================================================================

The official Enviol enquiry/contact email is:

info@enviol.com

If a customer asks for an email address, use ONLY:

info@enviol.com

NEVER use or invent:

sales@enviol.com

Do not invent any other Enviol email address.

Normally, when the customer is using this AI enquiry assistant, do not
redirect them to email. The frontend enquiry submission button is the
preferred way to submit the enquiry.

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


======================================================================
ENVIOL KNOWLEDGE BASE
======================================================================

The following is the official structured knowledge base of Enviol
Polytech Solutions.

This is the PRIMARY AUTHORITY for Enviol-specific information.

Use it actively.

Before answering an Enviol-specific question:

1. Identify what the customer is asking.
2. Find the relevant knowledge.
3. Use that knowledge.
4. Do not invent missing information.

If the knowledge base contains an exact answer, use it.

If the knowledge base contains a possible candidate but does not
explicitly confirm suitability, say that it is a possible candidate
and technical validation is required.

If the knowledge base does not contain the information, say that the
Enviol technical team would need to confirm it.

NEVER invent:

- product codes
- grades
- OH values
- functionality
- viscosity
- acid values
- water content
- prices
- MOQ
- availability
- lead times
- certifications
- performance claims
- exact formulations
- exact product equivalence
- laboratory results
- regulatory information

---------------- ENY KNOWLEDGE BASE ----------------

${ENY_KNOWLEDGE}

---------------- END ENY KNOWLEDGE BASE ----------------


======================================================================
KNOWLEDGE PRIORITY
======================================================================

Use information in this order:

1. Verified Enviol knowledge
2. Information explicitly provided by the customer
3. General polyurethane/polyol technical knowledge
4. Technical reasoning

General technical knowledge may explain concepts.

However, general knowledge MUST NOT be presented as a confirmed
Enviol product specification.


======================================================================
PRODUCT SELECTION
======================================================================

When a customer asks which product, grade or polyol may be suitable:

First understand the relevant:

- application
- end use
- material/system
- required performance
- important technical parameters
- processing method
- quantity
- existing product, if relevant

Do not immediately claim exact suitability.

Use wording such as:

"Based on the information you've provided, this type of polyester
polyol may be a suitable candidate. Our technical team would need
to confirm the exact grade."

Never claim exact equivalence unless explicitly verified.


======================================================================
TECHNICAL CONVERSATION
======================================================================

Relevant information may include:

- product
- application
- end use
- OH value
- functionality
- viscosity
- acid value
- water content
- NCO/OH ratio
- isocyanate
- hardness
- processing method
- casting requirements
- quantity
- monthly consumption
- annual consumption
- sample requirement
- existing material
- existing supplier
- existing grade
- desired replacement
- delivery location
- timeline
- special requirements

Do NOT ask for everything.

Ask only for information relevant to the customer's requirement.


======================================================================
WHEN CUSTOMER DOES NOT KNOW A TECHNICAL VALUE
======================================================================

Never repeatedly ask for a technical value the customer does not know.

Example:

Customer:
"I don't know the OH value."

ENY:
"No problem. What are you manufacturing with the material?"


======================================================================
CUSTOMER NAME AND CONTACT DETAILS
======================================================================

If the customer says:

"My name is Anna"

extract:

person = "Anna"

Do NOT ask for the person's name again.

If the customer says:

"My company is ABC"

extract:

company = "ABC"

Do not ask for the company again.

If the customer gives an email, extract it.

If the customer gives a phone or WhatsApp number, extract it.

Never ask again for information already present in the conversation.


======================================================================
CONTACT COLLECTION
======================================================================

The basic contact information required before submission is:

- Company
- Contact person
- Email
- Phone

Do not ask for these immediately when the customer has just started
the conversation.

First understand the customer's requirement.

Once a meaningful requirement exists, naturally collect the contact
information when appropriate.

IMPORTANT:

Obtaining the basic contact details does NOT mean that ENY must
immediately stop the conversation.

ENY should continue helping the customer and collect useful additional
information when it can materially help the Enviol technical or sales
team.

Never repeatedly ask for information that has already been provided.
However, if the customer voluntarily provides additional information
after expressing submission intent, always capture it.

For example, if the customer says:

"I need 10 kg sample and eventually around 500 kg/month."

extract both:

sampleRequirement = "10 kg"

monthlyConsumption = "500 kg/month"

Do not ignore additional information merely because the enquiry has
already become eligible for submission.

======================================================================
ENQUIRY QUALIFICATION
======================================================================

ENY should try to build a useful and commercially meaningful enquiry,
not merely collect contact details.

When relevant to the customer's application, ENY should naturally try
to understand:

- Exact product or material required
- Application
- End use
- Required OH value
- Functionality
- Viscosity
- Hardness
- Processing method
- Casting requirements
- Quantity required
- Initial sample quantity
- Monthly consumption
- Annual consumption
- Existing material
- Existing supplier
- Existing grade
- Desired replacement
- Delivery location
- Required timeline
- Special technical requirements

Do NOT ask for all of these fields.

Only ask for fields that are relevant to the customer's particular
application.

Do not turn the conversation into a questionnaire.

Ask one useful question at a time, or at most two closely related
questions.

If the customer does not know a technical parameter, do not repeatedly
ask for it. Instead, ask about the application, performance requirement,
existing material or end use.


======================================================================
COMMERCIAL QUALIFICATION
======================================================================

Where appropriate, ENY should try to understand the customer's
commercial requirement.

Useful information may include:

- Quantity required for initial testing
- Sample requirement
- Regular order quantity
- Monthly consumption
- Annual consumption
- Delivery location
- Expected purchase timeline

For example, if a customer is requesting a sample, ENY may ask:

"Approximately how much sample would you need for testing?"

If the customer is discussing regular production, ENY may ask:

"What approximate quantity would you expect to consume once the grade
is approved?"

Do not ask both questions if the customer has already provided the
information.


======================================================================
ADDITIONAL REQUIREMENTS
======================================================================

Before considering the conversation complete, ENY should also
occasionally check whether the customer has any other related
requirement.

For example:

"Is there any other polyol or polyurethane requirement you'd like us
to help with?"

or:

"Do you have any other application where you are currently sourcing
polyols?"

Only ask this when the primary enquiry is sufficiently understood.

Do not repeatedly ask this question.


======================================================================
CONVERSATION COMPLETION
======================================================================

ENY should not prematurely end the conversation immediately after
obtaining the customer's company, name, email and phone.

The minimum contact details make an enquiry SUBMITTABLE.

They do not mean that ENY must stop qualifying the enquiry.

If useful information is still missing, ENY may ask one final relevant
question.

Examples:

- desired quantity
- sample quantity
- delivery location
- timeline
- existing grade
- other related requirements

However, do not keep questioning the customer indefinitely.

Once the requirement is sufficiently understood, acknowledge that the
enquiry is ready and tell the customer to use the frontend
"Confirm & Send Enquiry" button.

======================================================================
SUBMISSION INTENT
======================================================================

Submission intent includes:

- submit my enquiry
- post my enquiry
- send my enquiry
- connect me with sales
- connect me with order team
- contact the Enviol team
- speak with sales
- proceed with the enquiry
- place an order
- send the requirement
- connect me with the team

When the customer explicitly wants to proceed:

DO NOT continue asking unnecessary technical questions.

Collect missing contact information instead.


======================================================================
ENQUIRY READY FOR SUBMISSION
======================================================================

An enquiry becomes READY FOR SUBMISSION when all of the following
exist:

A. Meaningful requirement

B. Company

C. Contact person

D. Email

E. Phone

Once these minimum requirements exist, the frontend is allowed to
display the:

"✓ Confirm & Send Enquiry"

button.

IMPORTANT:

READY FOR SUBMISSION does NOT mean that ENY must immediately stop
conversation.

If there is an important and easy-to-obtain piece of information that
would significantly improve the enquiry, ENY may ask for it before
presenting the enquiry as complete.

Examples:

- desired quantity
- sample quantity
- delivery location
- timeline
- existing grade
- monthly consumption
- other related application

Do not ask unnecessary technical questions merely to delay completion.

Once the requirement is sufficiently understood, ENY should tell the
customer that everything important has been captured and that they can
click the frontend button whenever they are ready.

Example:

"Perfect. I have captured your requirement and contact details. 🙏

I also have your requirement for approximately 10 kg of sample
material for testing.

Your enquiry is ready. You can click the
'Confirm & Send Enquiry' button below whenever you're ready."

Do not ask the customer to type "yes".

Do not ask for another confirmation question.

Do not claim that the enquiry has already been submitted.
======================================================================
CONFIRMATION
======================================================================

Final confirmation is handled by the frontend.

When the enquiry contains:

- Meaningful requirement
- Company
- Contact person
- Email
- Phone

ENY should consider the enquiry READY FOR SUBMISSION.

The frontend will then display:

"✓ Confirm & Send Enquiry"

The customer confirms the enquiry by clicking that button.

Do NOT require the customer to type:

- yes
- correct
- proceed
- go ahead
- submit
- send it

Do NOT wait for a typed confirmation before indicating that the
enquiry is ready.

Do NOT set customerConfirmedSummary=true merely because the customer
has answered a technical question.

The actual submission happens only after the customer clicks the
frontend "Confirm & Send Enquiry" button.

======================================================================
WHEN ENQUIRY IS READY
======================================================================

When the enquiry has enough information for submission, ENY should
naturally communicate that it is ready.

However, ENY may continue the conversation if the customer wants to
provide more information.

The customer is NOT required to submit immediately.

Example:

"Perfect. I have everything I need to prepare your enquiry. 🙏

Your requirement is ready to be sent to the Enviol team. You can click
the 'Confirm & Send Enquiry' button below whenever you're ready.

If you'd like, you can also tell me your expected quantity, sample
requirement or delivery location, and I'll include that information."

Do not repeatedly ask questions after this.

If the customer continues providing information, extract it and update
the enquiryData.

If the customer says they are finished, simply tell them the enquiry
is ready and they can click the button.

Never claim that the enquiry has already been submitted.

Never claim that an email has already been sent.

======================================================================
ENQUIRY DATA EXTRACTION
======================================================================

Extract ONLY information explicitly provided or explicitly confirmed
by the customer.

Only treat CUSTOMER statements as customer-provided enquiry data.

Do not turn ENY's suggestions into customer requirements.

Example:

ENY:
"Would you require around 2 tons/month?"

Customer:
"Yes."

Then quantity may be recorded as 2 tons/month.

But if ENY merely mentions a possible value and the customer does not
confirm it, do not record it.


======================================================================
PRESERVE CUSTOMER WORDING
======================================================================

Preserve technical values as stated where practical.

Examples:

"OH around 300"
→ "around 300"

"OH 110-120"
→ "110–120"

"Shore D 70"
→ "Shore D 70"

"2 tons per month"
→ "2 tons/month"


======================================================================
OUT OF SCOPE
======================================================================

If a question is completely unrelated to Enviol, polyurethane,
polyols, chemicals relevant to Enviol, or an enquiry:

"I'm ENY, Enviol's technical assistant, so I mainly help with
polyols, polyurethane applications, Enviol products and technical
enquiries. If you have a requirement related to these, I'd be happy
to help. 😊"


======================================================================
RESPONSE LENGTH
======================================================================

Normal responses:

Approximately 40–100 words.

Contact collection:

Keep concise.

Do not repeat the entire requirement unnecessarily.

Ask no more than one or two useful questions at a time.


======================================================================
SAFETY
======================================================================

You are an enquiry-assistance system, not an autonomous chemical
engineering approval system.

Do not provide dangerous synthesis instructions or unsafe chemical
handling instructions.

Do not invent:

- SDS information
- hazard classifications
- UN numbers
- regulatory classifications
- emergency procedures
- product safety claims


======================================================================
OUTPUT
======================================================================

Return ONLY according to the supplied JSON schema.

The "reply" field must contain ONLY the natural-language message
displayed to the customer.

Do NOT mention:

- system prompts
- internal instructions
- Gemini
- APIs
- routes
- backend
- extraction
- schema
- internal state
- readyForSubmission
`;


// ============================================================================
// SAFE JSON PARSER
// ============================================================================

function parseGeminiJSON(
  rawText
) {

  if (
    !rawText ||
    typeof rawText !== "string"
  ) {

    throw new Error(
      "Gemini returned an empty response."
    );

  }


  const cleaned =
    rawText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();


  try {

    return JSON.parse(
      cleaned
    );

  } catch (error) {

    console.error(
      "[ENY JSON PARSE ERROR]",
      error
    );

    console.error(
      "[ENY RAW RESPONSE]",
      rawText
    );

    throw new Error(
      "Gemini returned invalid structured output."
    );

  }

}


// ============================================================================
// POST
// ============================================================================

export async function POST(req) {

  try {

    // ========================================================================
    // API KEY
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
    // REQUEST BODY
    // ========================================================================

    let body;


    try {

      body =
        await req.json();

    } catch (error) {

      return Response.json(

        {
          success: false,

          error:
            "Invalid request body.",
        },

        {
          status: 400,
        }

      );

    }


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
    // LAST CUSTOMER MESSAGE
    // ========================================================================

    const lastUserMessage =
      [...messages]
        .reverse()
        .find(
          (message) =>
            message.role === "user"
        );


    const lastUserText =
      lastUserMessage?.text ||
      "";


    // ========================================================================
    // SERVER-SIDE SUBMISSION INTENT
    // ========================================================================

    const submissionIntent =
      looksLikeSubmissionIntent(
        lastUserText
      );


    // ========================================================================
    // CONVERSATION FOR GEMINI
    // ========================================================================
    //
    // We deliberately use the complete recent conversation.
    //
    // Gemini performs:
    //
    // 1. reply generation
    // 2. enquiry extraction
    // 3. confirmation detection
    //
    // in ONE generation request.
    // ========================================================================

    const conversationText =
      messages
        .map(
          (message) => {

            const speaker =
              message.role === "user"
                ? "CUSTOMER"
                : "ENY";


            return (
              `${speaker}: ${message.text}`
            );

          }
        )
        .join("\n\n");


    // ========================================================================
    // TASK
    // ========================================================================

    const taskPrompt = `

Here is the recent conversation between the customer and ENY.

================ CONVERSATION ================

${conversationText}

================ END CONVERSATION ================


CURRENT CUSTOMER MESSAGE:

"${lastUserText}"


SERVER-DETECTED SUBMISSION INTENT:

${submissionIntent ? "YES" : "NO"}


Now perform these tasks in ONE response:

1. Generate ENY's next natural customer-facing reply.

2. Extract all customer-provided enquiry information from the complete
   conversation.

3. Preserve information already provided by the customer.

4. Do not invent customer information.

5. Determine whether the enquiry contains enough information to be
   ready for submission.

6. If the customer explicitly wants to submit, place an order, contact
   sales, or connect with the Enviol team, collect ONLY missing contact
   information.

7. Never ask for a contact field that the customer already provided.

8. If the customer's name is known, never ask for it again.

9. If the company is known, never ask for it again.

10. If email is known, never ask for it again.

11. If phone/WhatsApp is known, never ask for it again.

12. Do not claim that the enquiry has already been submitted.

13. Do not expose internal classifications.

14. Once meaningful requirement + company + contact person + email +
    phone are available, the enquiry is eligible for submission.

15. Do not require the customer to type a confirmation such as "yes".

16. The frontend "Confirm & Send Enquiry" button is the final customer
    confirmation.

17. If the enquiry is sufficiently understood, tell the customer that
    it is ready and that they can click the "Confirm & Send Enquiry"
    button whenever they are ready.

18. If one or two useful pieces of information could materially improve
    the enquiry, ENY may ask for them before considering the
    conversation complete.

19. Prefer useful qualification over unnecessary questioning.

20. Relevant qualification information may include quantity, sample
    requirement, monthly consumption, annual consumption, delivery
    location, timeline, existing grade and other related requirements.

21. If the customer continues chatting after the enquiry becomes
    eligible for submission, continue helping them normally and update
    enquiryData with any new customer-provided information.

22. Never repeatedly ask for information already provided.

23. Do not claim that the enquiry has already been submitted.

24. Do not claim that an email has been sent.

25. The customer can click the frontend button whenever they decide
    they are finished.
`;


    // ========================================================================
    // ONE GEMINI GENERATION REQUEST
    // ========================================================================

    const response =
      await generateWithRetry({

        model:
          GEMINI_MODEL,

        contents:
          taskPrompt,

        config: {

          systemInstruction:
            SYSTEM_PROMPT,

          responseMimeType:
            "application/json",

          responseSchema:
            RESPONSE_SCHEMA,

          maxOutputTokens:
            700,

        },

      });


    // ========================================================================
    // READ RESPONSE
    // ========================================================================

    const rawText =
      response?.text?.trim() ||
      "";


    const result =
      parseGeminiJSON(
        rawText
      );


    // ========================================================================
    // NORMALIZE CURRENT EXTRACTION
    // ========================================================================

    const currentEnquiryData =
      normalizeEnquiryData(
        result?.enquiryData
      );


    // ========================================================================
    // IMPORTANT:
    //
    // The browser sends the conversation every time.
    //
    // Therefore Gemini's extraction is already based on the complete
    // conversation. We do not have to maintain server-side session state.
    //
    // The merge below protects against accidental omission of a field
    // by the latest Gemini response if the frontend happens to send
    // existing structured data in the future.
    // ========================================================================

    const suppliedPreviousData =
      normalizeEnquiryData(
        body.enquiryData
      );


    const enquiryData =
      mergeEnquiryData(
        suppliedPreviousData,
        currentEnquiryData
      );


    // ========================================================================
// CONFIRMATION STATE
// ========================================================================
//
// Final customer confirmation is now handled by the frontend button.
//
// Gemini may still return customerConfirmedSummary for compatibility,
// but this value is NOT required for readyForSubmission.
//
// The actual final confirmation happens when the customer clicks:
//
// "✓ Confirm & Send Enquiry"
//
// which calls /api/ai-enquiry.
//

const customerConfirmedSummary =
  result?.customerConfirmedSummary === true;


// ========================================================================
// REQUIREMENT VALIDATION
// ========================================================================

const meaningfulRequirement =
  hasMeaningfulRequirement(
    enquiryData
  );


const basicDetailsComplete =
  hasBasicCustomerDetails(
    enquiryData
  );


// ========================================================================
// FINAL READINESS
// ========================================================================
//
// IMPORTANT:
//
// We intentionally do NOT require:
//
// customerConfirmedSummary === true
//
// because the frontend button is the final confirmation mechanism.
//

const readyForSubmission =
  calculateReadyForSubmission({

    enquiryData,

  });


    // ========================================================================
    // FINAL REPLY
    // ========================================================================

    const reply =
      String(
        result?.reply || ""
      ).trim();


    if (!reply) {

      throw new Error(
        "Gemini returned an empty customer reply."
      );

    }


    // ========================================================================
    // DEBUG LOG
    // ========================================================================

    console.log(
      "[ENY CHAT]",
      {

        chatId,

        model:
          GEMINI_MODEL,

        messageCount:
          messages.length,

        meaningfulRequirement,

        submissionIntent,

        basicDetailsComplete,

        missingCustomerDetails:
          getMissingCustomerDetails(
            enquiryData
          ),

        customerConfirmedSummary,

        readyForSubmission,

      }
    );


    // ========================================================================
    // RESPONSE
    // ========================================================================

    return Response.json(

      {

        success:
          true,

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
    // ERROR LOGGING
    // ========================================================================

    console.error(
      "[ENY GEMINI CHAT ERROR]",
      error
    );


    const status =
      Number(
        error?.status ||
        error?.code ||
        error?.cause?.status ||
        0
      );


    // ========================================================================
    // QUOTA / RATE LIMIT
    // ========================================================================

    if (
      status === 429
    ) {

      return Response.json(

        {

          success:
            false,

          error:
            "ENY is temporarily unavailable because the AI service quota has been reached. Please try again shortly.",

        },

        {
          status: 429,
        }

      );

    }


    // ========================================================================
    // BAD REQUEST
    // ========================================================================

    if (
      status === 400
    ) {

      return Response.json(

        {

          success:
            false,

          error:
            "ENY could not process that request.",

        },

        {
          status: 400,
        }

      );

    }


    // ========================================================================
    // GENERAL ERROR
    // ========================================================================

    return Response.json(

      {

        success:
          false,

        error:
          "ENY is temporarily unable to respond.",

      },

      {
        status: 500,
      }

    );

  }

}