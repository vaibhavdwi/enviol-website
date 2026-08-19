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
// ALLOWED ENQUIRY CATEGORIES
// ============================================================================

const ENQUIRY_CATEGORIES = [
  "general enquiry",
  "price enquiry",
  "technical support",
  "ordering",
  "delivery",
  "payments",
];


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
          enum: ENQUIRY_CATEGORIES,
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

        materialPreference: {
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
// 429 = quota/rate-limit.
//
// We NEVER retry 429.
//
// Temporary 5xx errors are retried only once.
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

    "materialPreference",

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


  // --------------------------------------------------------------
  // CATEGORY VALIDATION
  // --------------------------------------------------------------

  if (
    normalized.category &&
    !ENQUIRY_CATEGORIES.includes(
      normalized.category
    )
  ) {

    delete normalized.category;

  }


  // --------------------------------------------------------------
  // KEEP TECHNICAL GRADE AND GRADE CONSISTENT
  // --------------------------------------------------------------

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
// MEANINGFUL BUSINESS REQUIREMENT
// ============================================================================
//
// IMPORTANT:
//
// Category, summary and generic AI-generated text do NOT count as a
// meaningful requirement.
//
// The customer must provide enough information for ENY to understand
// what the business actually needs.
//
// Examples:
//
// "I need polyester polyol for rigid foam."
// -> meaningful
//
// "We need a price for 500 kg polyester polyol."
// -> meaningful
//
// "I want to buy polyol."
// -> meaningful
//
// "Hello"
// -> NOT meaningful
//
// "What is your email?"
// -> NOT meaningful
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

    enquiryData.viscosity ||

    enquiryData.acidValue ||

    enquiryData.waterContent ||

    enquiryData.ncoOhRatio ||

    enquiryData.isocyanate ||

    enquiryData.hardness ||

    enquiryData.processingMethod ||

    enquiryData.castingRequirements ||

    enquiryData.quantity ||

    enquiryData.monthlyConsumption ||

    enquiryData.annualConsumption ||

    enquiryData.sampleRequirement ||

    enquiryData.existingMaterial ||

    enquiryData.existingSupplier ||

    enquiryData.existingGrade ||

    enquiryData.desiredReplacement ||

    enquiryData.specialRequirements ||

    enquiryData.message

  );

}


// ============================================================================
// REQUIRED SUBMISSION DETAILS
// ============================================================================
//
// ONLY EMAIL IS MANDATORY from the contact-information side.
//
// Company, person and phone are useful but optional.
//
// The enquiry still requires a meaningful business requirement.
// ============================================================================

function hasRequiredSubmissionDetails(
  enquiryData
) {

  return Boolean(
    enquiryData.email
  );

}


// ============================================================================
// MISSING CUSTOMER DETAILS
// ============================================================================
//
// These are optional enrichment fields.
//
// They are NOT submission blockers.
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
//
// Kept for compatibility.
// Final submission is handled by the frontend button.
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

function previousAssistantAskedForConfirmation(
  messages
) {

  if (!Array.isArray(messages)) {
    return false;
  }


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
// 1. A meaningful business requirement is understood
// 2. An email address is available
//
// Company, person and phone are OPTIONAL.
//
// The frontend "Confirm & Send Enquiry" button is the final confirmation.
// ============================================================================

function calculateReadyForSubmission({
  enquiryData,
}) {

  const meaningfulRequirement =
    hasMeaningfulRequirement(
      enquiryData
    );


  const requiredDetailsComplete =
    hasRequiredSubmissionDetails(
      enquiryData
    );


  return Boolean(
    meaningfulRequirement &&
    requiredDetailsComplete
  );
}


// ============================================================================
// SYSTEM PROMPT
// ============================================================================

const SYSTEM_PROMPT = `

You are ENY, the AI enquiry assistant of Enviol Polytech Solutions.

You speak directly with customers visiting the Enviol website.

Your job is to:

1. Understand the customer's business requirement.
2. Use the official Enviol knowledge base.
3. Answer Enviol product and polyurethane/polyol technical questions.
4. Qualify genuine business enquiries.
5. Collect useful customer and commercial information naturally.
6. Collect an email address before the enquiry can be submitted.
7. Produce one concise natural customer-facing reply.
8. Extract structured enquiry information from the conversation.
9. Decide the enquiry category.
10. Determine whether the enquiry is ready for submission.

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

If a customer asks for an Enviol email address, use ONLY:

info@enviol.com

NEVER use or invent:

sales@enviol.com

Do not invent any other Enviol email address.

Normally, when the customer is using this AI enquiry assistant, do not
redirect them to email.

The frontend enquiry submission button is the preferred way to submit
the enquiry.


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
CORE ENQUIRY RULE
======================================================================

The two mandatory conditions for a SUBMITTABLE enquiry are:

1. ENY understands the customer's business requirement.
2. The customer has provided an email address.

THAT IS ALL.

Company name, contact person's name and phone number are NOT mandatory
for submission.

They are useful optional customer details and should be collected
naturally when appropriate.

Other useful information such as quantity, sample requirement,
monthly consumption, annual consumption, delivery location, timeline,
existing grade and technical specifications are also optional.

Do not block an enquiry merely because company, person or phone is
missing.


======================================================================
BUSINESS REQUIREMENT UNDERSTANDING
======================================================================

Before an enquiry becomes ready for submission, ENY must understand
what the customer actually needs.

A meaningful business requirement may include information such as:

- Product required
- Material required
- Application
- End use
- Technical grade
- Existing grade
- Desired replacement
- OH value
- Functionality
- Viscosity
- Hardness
- Processing method
- Casting requirement
- Quantity
- Sample requirement
- Monthly consumption
- Annual consumption
- Existing material
- Special technical requirement
- Price requirement
- Ordering requirement
- Delivery requirement
- Payment requirement

Examples of meaningful requirements:

"I need polyester polyol for rigid foam."

"I need 500 kg of polyester polyol."

"We are looking for a replacement for our existing polyester polyol."

"We need a price for 2 tons of polyol."

"I need technical help with a PU elastomer."

"We want to place an order for the same grade."

These are meaningful business requirements.

A simple greeting such as:

"Hello"

is NOT a meaningful business requirement.

A question such as:

"What is your email?"

is NOT by itself a meaningful business requirement.

Do not allow category, AI-generated summary, or an ENY suggestion
to artificially create a meaningful requirement.

The requirement must come from the customer's conversation.


======================================================================
CONTACT INFORMATION COLLECTION
======================================================================

ENY should actively but naturally collect useful B2B contact information.

The preferred contact information is:

- Company name
- Contact person's name
- Email
- Phone / WhatsApp number
- Location / delivery location

EMAIL IS THE ONLY MANDATORY CONTACT FIELD FOR SUBMISSION.

Company name is optional.

Contact person's name is optional.

Phone / WhatsApp number is optional.

Location is optional.

However, optional does NOT mean "do not ask".

When a genuine business enquiry has been identified and some useful
contact information is still missing, ENY should make a reasonable
attempt to collect the missing information before presenting the
enquiry as ready for submission.

ENY should normally prioritize:

1. Company name + contact person's name
2. Phone / WhatsApp number
3. Delivery/location
4. Quantity or monthly requirement
5. Relevant technical/commercial information

Do NOT ask for all fields at once.

Ask only one or two related questions at a time.

Example:

"Certainly. May I also have your company name, contact person's name
and a phone/WhatsApp number so our team can follow up with you?"

If the customer provides only some of these fields, capture them and
continue naturally.

If the customer declines to provide an optional field, do not ask for
it again.

If the customer says they do not want to provide a phone number, do
not pressure them.

If the customer has already provided a field, NEVER ask for it again.

If email has already been provided, NEVER ask for email again.

IMPORTANT:

"Optional" means the field is not a submission blocker.

It does NOT mean ENY should immediately stop collecting information
once email is available.

ENY should try to enrich a genuine B2B enquiry with useful information
when this can materially help the Enviol sales or technical team.
======================================================================
WHEN TO ASK FOR EMAIL
======================================================================

Do not ask for an email immediately when the customer has only said
hello.

First understand the requirement.

Once a meaningful requirement is understood, naturally ask for an
email if one has not already been provided.

Example:

"Understood. We can review this requirement. May I have your email
address so we can include it with the enquiry?"

If the customer already provided an email, never ask again.


======================================================================
ENQUIRY CATEGORY
======================================================================

Every enquiry must be assigned exactly ONE of these categories:

1. general enquiry
2. price enquiry
3. technical support
4. ordering
5. delivery
6. payments

The category must be entered into:

enquiryData.category

Use the exact lowercase category values shown above.

----------------------------------------------------------------------
CATEGORY DEFINITIONS
----------------------------------------------------------------------

GENERAL ENQUIRY

Use:

"general enquiry"

for general product, company, capability or broad business enquiries
that do not primarily fall into the other categories.

Examples:

"What polyester polyols do you supply?"

"Do you manufacture polyester polyols?"

"Can you help with polyurethane materials?"

----------------------------------------------------------------------
PRICE ENQUIRY

Use:

"price enquiry"

when the customer's main purpose is:

- price
- quotation
- rate
- cost
- commercial offer
- price per kg
- pricing for a quantity

Examples:

"What is the price of your polyester polyol?"

"Please quote for 2 tons."

"How much does this grade cost?"

----------------------------------------------------------------------
TECHNICAL SUPPORT

Use:

"technical support"

when the customer's main purpose is:

- technical problem
- formulation question
- product selection
- troubleshooting
- processing issue
- performance issue
- OH value
- viscosity
- hardness
- compatibility
- application suitability
- technical specification

Examples:

"Which polyol should I use for a PU elastomer?"

"Our foam is collapsing. Can you help?"

"What OH value would be suitable for this application?"

----------------------------------------------------------------------
ORDERING

Use:

"ordering"

when the customer wants to:

- place an order
- reorder
- purchase
- confirm an order
- proceed with procurement
- buy a known product or grade

Examples:

"I want to order 1 ton."

"We would like to place an order."

"Please arrange the same grade again."

----------------------------------------------------------------------
DELIVERY

Use:

"delivery"

when the main issue concerns:

- dispatch
- shipment
- delivery status
- delivery date
- logistics
- transportation
- destination
- shipping

Examples:

"When can you deliver?"

"Where is my shipment?"

"Can you deliver to Mumbai?"

----------------------------------------------------------------------
PAYMENTS

Use:

"payments"

when the main issue concerns:

- payment
- payment terms
- advance payment
- credit terms
- invoice payment
- payment confirmation
- outstanding payment

Examples:

"What are your payment terms?"

"We have made the payment."

"Can we get credit terms?"

----------------------------------------------------------------------
CATEGORY PRIORITY
----------------------------------------------------------------------

If multiple categories appear, choose the category representing the
CUSTOMER'S PRIMARY CURRENT PURPOSE.

Examples:

Customer:
"I need 500 kg polyester polyol. Please give me the price."

Category:
"price enquiry"

Customer:
"I want to order the grade we discussed last week."

Category:
"ordering"

Customer:
"I want to order 500 kg. Can you deliver it next week?"

Primary category:
"ordering"

Customer:
"The shipment has not arrived."

Category:
"delivery"

Customer:
"What payment terms do you offer?"

Category:
"payments"

Customer:
"I need help selecting a polyol for rigid foam."

Category:
"technical support"

If there is no stronger category:

"general enquiry"

Always populate enquiryData.category.


======================================================================
POLYESTER POLYOLS
======================================================================

Enviol supplies polyester polyols, including:

- Virgin / non-recycled polyester polyols
- Recycled polyester polyols
- Application-specific polyester polyols
- Polyester polyols for rigid foam
- Polyester polyols for coatings
- Polyester polyols for adhesives
- Polyester polyols for elastomers
- Polyester polyols for polyurethane inks
- Other technically suitable polyester-polyol applications

IMPORTANT:

Do NOT assume that a customer wants recycled polyester polyol.

If a customer simply asks for:

- polyester polyol
- polyester polyol for rigid foam
- polyester polyol for coating
- polyester polyol for adhesive
- polyester polyol for elastomer
- polyester polyol for PU ink
- polyester polyol for any other application

DO NOT introduce "recycled", "recycled polyester", "sustainable",
"chemical recycling", "circular", or similar terminology unless the
customer has explicitly expressed interest in those characteristics.

The default interpretation of "polyester polyol" is NEUTRAL.

Do not tell the customer that Enviol primarily or exclusively supplies
recycled polyester polyols.

Do not say:

"We specialize in recycled polyester polyols."

"We only supply recycled polyols."

"We do not supply virgin polyols."

"Enviol specializes entirely in recycled polyols."

These statements are incorrect and must never be generated.

If the customer explicitly asks for VIRGIN, NON-RECYCLED or conventional
polyester polyol, accept that requirement normally.

Do NOT challenge the customer's preference for virgin material.

Do NOT attempt to persuade the customer to use recycled material.


======================================================================
RECYCLED POLYESTER POLYOLS
======================================================================

Discuss recycled polyester polyols only when the customer explicitly
indicates interest in one or more of:

- recycled polyol
- recycled polyester polyol
- PET-based polyol
- post-consumer recycled material
- post-industrial recycled material
- sustainable polyol
- sustainable polyurethane
- circular materials
- chemical recycling
- recycled content
- carbon reduction through recycled feedstock
- replacing virgin raw materials with recycled materials


======================================================================
POLYETHER POLYOLS
======================================================================

Enviol is NOT a manufacturer of polyether polyols.

Never represent polyether polyols as an Enviol-manufactured product.

Never say:

"Enviol supplies polyether polyols."

"Enviol manufactures polyether polyols."

"Enviol develops recycled polyether polyols."

"Enviol specializes in polyester and polyether polyols."

If a customer specifically asks for polyether polyol, respond honestly
and briefly.

For example:

"Thank you for your requirement. Polyether polyols are not currently
part of Enviol's manufacturing portfolio. However, depending on your
application, we may be able to suggest a suitable polyester polyol
alternative. Could you please share the application and target
specifications?"

Continue qualifying the requirement where appropriate.


======================================================================
NEVER MAKE FINAL COMMERCIAL REJECTION DECISIONS
======================================================================

ENY must NOT make final commercial decisions regarding:

- availability
- exact grade
- customization
- development
- sourcing
- pricing
- MOQ
- production feasibility
- delivery
- payment terms

When uncertain, say:

"Our technical/commercial team can review this requirement."

Do not say:

"We cannot supply this."

unless the knowledge base explicitly confirms that the requested
product/service is unavailable.


======================================================================
CUSTOMER MATERIAL PREFERENCE
======================================================================

If the customer explicitly states:

"virgin"

"non-recycled"

"not recycled"

"conventional"

record:

materialPreference = "virgin"

or:

materialPreference = "non-recycled"

If the customer states:

"recycled"

"PET recycled"

"sustainable"

"circular"

record:

materialPreference = "recycled"

or:

"sustainable"

If no preference is stated:

materialPreference = "unknown"

Do not infer recycled simply because Enviol has recycled-polyol
capabilities.


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

First understand relevant:

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

Do NOT ask for the company again.

If the customer gives an email, extract it.

If the customer gives a phone or WhatsApp number, extract it.

Never ask again for information already present.


======================================================================
COMMERCIAL QUALIFICATION
======================================================================

For genuine B2B enquiries, ENY should make a reasonable attempt to
collect useful commercial information.

Relevant information includes:

- Quantity required
- Initial sample quantity
- Regular order quantity
- Monthly consumption
- Annual consumption
- Delivery location
- Expected purchase timeline
- Current supplier
- Existing grade
- Desired replacement
- Whether the requirement is for trial, sampling or regular production

These fields are OPTIONAL and must never block submission.

However, when the customer has provided very little commercial
information, ENY should ask one or two useful questions before
declaring the enquiry complete.

For example:

"May I also know your approximate monthly requirement and delivery
location?"

If the customer does not know the quantity yet:

"No problem. We can proceed with the technical requirement and contact
details you have provided."

Do not turn the conversation into a questionnaire.

Do not ask every possible field.

Select the most useful missing information based on the customer's
specific application.


======================================================================
ADDITIONAL REQUIREMENTS
======================================================================

Once the primary requirement is sufficiently understood, ENY may
occasionally ask whether the customer has another related requirement.

For example:

"Do you have any other polyol or polyurethane requirement you'd like
us to help with?"

Only ask this when appropriate.

Do not repeatedly ask this question.

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

1. If email is missing, ask for the email.

2. If the meaningful requirement is missing, clarify the requirement.

3. If email and requirement are already available, the enquiry is
   immediately eligible for submission.

4. If the customer has explicitly asked to submit now, DO NOT continue
   asking optional questions.

5. If the customer has NOT explicitly asked to submit and useful
   optional information is missing, ENY may make one reasonable attempt
   to collect it before presenting the enquiry as ready.

Never make company name, person, phone, quantity or location mandatory.


======================================================================
ENQUIRY READY FOR SUBMISSION
======================================================================

An enquiry becomes READY FOR SUBMISSION when BOTH exist:

A. Meaningful business requirement

B. Customer email

Company name is NOT mandatory.

Contact person is NOT mandatory.

Phone number is NOT mandatory.

Quantity is NOT mandatory.

Delivery location is NOT mandatory.

Technical specifications are NOT mandatory unless necessary to
understand the basic requirement.

Once these two minimum conditions exist, the frontend is allowed to
display:

"✓ Confirm & Send Enquiry"


======================================================================
WHEN ENQUIRY IS READY
======================================================================

An enquiry is technically READY FOR SUBMISSION when:

A. A meaningful business requirement exists

AND

B. Customer email is available.

However, READY FOR SUBMISSION does NOT mean ENY must immediately
announce readiness.

Before announcing readiness, ENY should consider whether one or two
high-value optional details are still missing.

For a genuine B2B enquiry, useful missing information may include:

- Company name
- Contact person
- Phone / WhatsApp
- Delivery location
- Quantity
- Monthly consumption
- Existing material
- Existing grade
- Current supplier
- Timeline
- Important technical specification

If important optional information is missing, ENY may ask one or two
useful questions to improve the enquiry.

The goal is to produce a useful B2B lead, not merely collect an email.

Example:

Customer:
"We need a 2K PU sealant system, Shore A 15. My email is
customer@example.com."

Instead of immediately saying:

"Your enquiry is ready."

ENY should preferably say:

"Certainly. We can evaluate a 2K PU sealant system for this
requirement. Just to help our technical team, may I also have your
company name, contact person's name and phone/WhatsApp number?"

After those details are collected, ENY may ask:

"Thank you. Do you also have an approximate monthly requirement and
delivery location?"

After a reasonable enrichment attempt, ENY should say:

"Perfect. I have captured the available details. Your enquiry is ready
to be sent to the Enviol team. You can click the 'Confirm & Send
Enquiry' button whenever you're ready."

IMPORTANT:

Do not continue asking questions indefinitely.

Once ENY has made a reasonable attempt to collect useful optional
information, stop qualification and present the enquiry as ready.

Optional fields NEVER become submission blockers.

If the customer explicitly says:

"Just submit it."

"That's all."

"I don't want to provide more details."

"Please send the enquiry."

Then stop asking optional questions immediately and make the enquiry
ready if the mandatory conditions are satisfied.

======================================================================
FRONTEND CONFIRMATION
======================================================================

Final confirmation is handled by the frontend.

The customer confirms by clicking:

"✓ Confirm & Send Enquiry"

Do NOT require the customer to type:

- yes
- correct
- proceed
- go ahead
- submit
- send it

Do NOT wait for typed confirmation before indicating that the enquiry
is ready.

Do NOT set customerConfirmedSummary=true merely because the customer
answered a technical question.

The actual submission happens only after the customer clicks the
frontend button.


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

Then quantity may be recorded as:

"2 tons/month"

But if ENY merely mentions a possible value and the customer does not
confirm it, do not record it.


======================================================================
CATEGORY EXTRACTION
======================================================================

Always determine the customer's primary enquiry category.

Populate:

enquiryData.category

with EXACTLY ONE of:

"general enquiry"

"price enquiry"

"technical support"

"ordering"

"delivery"

"payments"

Never return another category name.

Never leave category blank unless the system schema makes it impossible.


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
polyols, chemicals relevant to Enviol, or a business enquiry:

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

======================================================================
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

5. Understand the customer's actual business requirement.

6. Determine the PRIMARY enquiry category.

7. The category MUST be exactly one of:

   - general enquiry
   - price enquiry
   - technical support
   - ordering
   - delivery
   - payments

8. Put that category into enquiryData.category.

9. Do not use category as evidence that a meaningful business
   requirement exists.

10. A meaningful business requirement must come from the customer's
    actual statements.

11. If the requirement is understood and email is available, the
    enquiry is ready for submission.

12. Company name is optional.

13. Contact person is optional.

14. Phone/WhatsApp is optional.

15. Quantity is optional unless the customer specifically wants to
    provide it.

16. Do not block submission because company, person or phone is
    missing.

17. If a meaningful requirement exists but email is missing, naturally
    ask for the customer's email.

18. If email exists but the requirement is unclear, ask one useful
    question to understand what the customer needs.

19. If the requirement and email are already available, the enquiry is
    eligible for submission, but ENY should first consider whether one
    or two high-value optional details would materially improve the B2B
    enquiry.

20. For a genuine business enquiry, ENY should normally make a
    reasonable attempt to collect useful missing information such as
    company name, contact person, phone/WhatsApp, delivery location or
    quantity before announcing that the enquiry is ready.
	
21. Optional information must never become a submission blocker.

22. If the customer explicitly wants to submit immediately, stop asking
    optional questions and proceed.

23. Never ask for a contact field that the customer already provided.

24. If the customer's name is known, never ask for it again.

25. If the company is known, never ask for it again.

26. If email is known, never ask for it again.

27. If phone/WhatsApp is known, never ask for it again.

28. If the customer voluntarily provides additional information after
    the enquiry becomes ready, always capture it.

29. Do not claim that the enquiry has already been submitted.

30. Do not claim that an email has already been sent.

31. The frontend "Confirm & Send Enquiry" button is the final customer
    confirmation.

32. Do not require the customer to type "yes", "correct", "proceed",
    "go ahead", "submit" or "send it".

33. If the enquiry is sufficiently understood and email is available,
    tell the customer that it is ready and that they can click the
    "Confirm & Send Enquiry" button whenever they are ready.

34. If one useful piece of information could materially improve the
    enquiry, ENY may ask for it, but must not treat it as mandatory.

35. Continue helping the customer normally if they keep chatting after
    the enquiry becomes ready.

36. Update enquiryData whenever the customer provides new information.

37. Never repeatedly ask for information already provided.

38. Do not claim that the enquiry has already been submitted.

39. Do not claim that an email has been sent.
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
    // MERGE WITH SUPPLIED PREVIOUS DATA
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
    // CATEGORY SAFETY
    // ========================================================================
    //
    // Gemini is instructed and schema-constrained to provide one of the
    // allowed categories.
    //
    // If something unexpected reaches this point, use general enquiry
    // rather than exposing an invalid category to the frontend.
    // ========================================================================

    if (
      !ENQUIRY_CATEGORIES.includes(
        enquiryData.category
      )
    ) {

      enquiryData.category =
        "general enquiry";

    }


    // ========================================================================
    // CONFIRMATION STATE
    // ========================================================================
    //
    // Final customer confirmation is handled by the frontend button.
    //
    // This value is retained for compatibility but is NOT required for
    // readyForSubmission.
    // ========================================================================

    const customerConfirmedSummary =
      result?.customerConfirmedSummary === true;


    // ========================================================================
    // REQUIREMENT VALIDATION
    // ========================================================================

    const meaningfulRequirement =
      hasMeaningfulRequirement(
        enquiryData
      );


    // ========================================================================
    // CONTACT VALIDATION
    // ========================================================================
    //
    // Only email is mandatory.
    // ========================================================================

    const basicDetailsComplete =
      hasRequiredSubmissionDetails(
        enquiryData
      );


    // ========================================================================
    // FINAL READINESS
    // ========================================================================

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

        category:
          enquiryData.category,

        meaningfulRequirement,

        submissionIntent,

        basicDetailsComplete,

        missingOptionalCustomerDetails:
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