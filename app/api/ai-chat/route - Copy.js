/*
|--------------------------------------------------------------------------
| ENY RULE-BASED AI CHAT API
|--------------------------------------------------------------------------
|
| ENY = Enviol TechSupport AI
|
| Initial rule-based conversational engine for Enviol.
|
| Responsibilities:
|
| 1. Receive current conversation from AIEnquiryChat.js
| 2. Understand basic customer intent using rules
| 3. Ask relevant PU / polyol questions
| 4. Track whether enough information has been collected
| 5. Ask the customer for final confirmation
| 6. Detect confirmation such as:
|      - yes
|      - sure
|      - okay
|      - proceed
|      - go ahead
|      - please submit
| 7. Return readyForSubmission = true after confirmation
|
| IMPORTANT:
|
| - NO OpenAI
| - NO API key
| - NO database storage
| - NO email
| - NO contact insertion
|
| Final enquiry submission remains handled separately by:
|
|      /api/ai-enquiry
|
|--------------------------------------------------------------------------
*/


// ========================================================================
// BASIC HELPERS
// ========================================================================

function cleanText(value) {

  if (!value) {
    return "";
  }

  return String(value)
    .trim()
    .replace(/\s+/g, " ");

}


// ========================================================================
// CLEAN MESSAGE HISTORY
// ========================================================================

function cleanMessages(messages) {

  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message) => {

      return (
        message &&
        typeof message === "object" &&
        (message.sender === "user" || message.sender === "ai") &&
        typeof message.text === "string" &&
        message.text.trim()
      );

    })
    .slice(-30)
    .map((message) => ({

      sender: message.sender,

      text: cleanText(message.text),

    }));

}


// ========================================================================
// GET LAST CUSTOMER MESSAGE
// ========================================================================

function getLastUserMessage(messages) {

  for (
    let i = messages.length - 1;
    i >= 0;
    i--
  ) {

    if (
      messages[i].sender === "user"
    ) {

      return messages[i].text;

    }

  }

  return "";

}


// ========================================================================
// GET LAST AI MESSAGE
// ========================================================================

function getLastAIMessage(messages) {

  for (
    let i = messages.length - 1;
    i >= 0;
    i--
  ) {

    if (
      messages[i].sender === "ai"
    ) {

      return messages[i].text;

    }

  }

  return "";

}


// ========================================================================
// CONVERSATION TEXT
// ========================================================================

function getConversationText(messages) {

  return messages
    .map((message) => message.text)
    .join(" ")
    .toLowerCase();

}


// ========================================================================
// CHECK WHETHER INFORMATION ALREADY EXISTS
// ========================================================================

function containsAny(text, words) {

  return words.some((word) =>
    text.includes(word.toLowerCase())
  );

}


// ========================================================================
// NORMALIZE CUSTOMER CONFIRMATION TEXT
// ========================================================================

function normalizeConfirmationText(text) {

  return cleanText(text)
    .toLowerCase()
    .replace(/[.!?,]+$/g, "")
    .trim();

}


// ========================================================================
// DETECT CUSTOMER CONFIRMATION
// ========================================================================
//
// IMPORTANT:
//
// "yes" should only trigger submission when ENY's immediately previous
// message was actually asking for confirmation.
//
// This prevents a normal technical statement such as:
//
// "Yes, we need polyester polyol."
//
// from accidentally submitting the enquiry.
// ========================================================================

function isConfirmation(text) {

  const normalized =
    normalizeConfirmationText(text);

  if (!normalized) {
    return false;
  }

  const confirmations = [

    "yes",
    "yes please",
    "sure",
    "okay",
    "ok",
    "alright",
    "all right",
    "fine",
    "correct",
    "that's correct",
    "that is correct",
    "looks good",
    "sounds good",
    "go ahead",
    "please go ahead",
    "proceed",
    "please proceed",
    "do it",
    "submit",
    "submit it",
    "please submit",
    "yes proceed",
    "yes go ahead",
    "yes please proceed",
    "yes please submit",

  ];

  return confirmations.includes(
    normalized
  );

}


// ========================================================================
// DETECT WHETHER ENY IS WAITING FOR CONFIRMATION
// ========================================================================
//
// We inspect ENY's latest message.
//
// This is much safer than simply looking for "yes".
// ========================================================================

function isAwaitingConfirmation(messages) {

  if (
    !Array.isArray(messages) ||
    messages.length < 2
  ) {

    return false;

  }


  const lastAIMessage =
    getLastAIMessage(messages);


  if (!lastAIMessage) {
    return false;
  }


  const text =
    lastAIMessage.toLowerCase();


  const confirmationPhrases = [

    "would you like me to proceed",

    "shall i proceed",

    "may i proceed",

    "should i submit",

    "would you like me to submit",

    "shall i submit",

    "can i submit",

    "ready to submit",

    "does that look correct",

    "is that correct",

    "is everything correct",

    "if everything looks correct",

    "proceed with submitting",

    "proceed with submission",

    "submit your enquiry",

    "submit the enquiry",

  ];


  return confirmationPhrases.some(
    (phrase) =>
      text.includes(phrase)
  );

}


// ========================================================================
// IDENTIFY BROAD PRODUCT
// ========================================================================

function identifyProduct(text) {

  if (
    containsAny(text, [
      "polyester polyol",
      "polyester",
      "pet polyol",
      "pet-based polyol",
      "pet based polyol",
    ])
  ) {

    return "Polyester Polyol";

  }


  if (
    containsAny(text, [
      "polyether polyol",
      "polyether",
    ])
  ) {

    return "Polyether Polyol";

  }


  if (
    containsAny(text, [
      "pu elastomer",
      "polyurethane elastomer",
      "elastomer",
    ])
  ) {

    return "PU Elastomer";

  }


  if (
    containsAny(text, [
      "pir foam",
      "pir insulation",
      "pir",
    ])
  ) {

    return "PIR Foam Polyol";

  }


  if (
    containsAny(text, [
      "puf foam",
      "pu foam",
      "rigid foam",
      "rigid polyurethane foam",
    ])
  ) {

    return "Rigid Foam Polyol";

  }


  if (
    containsAny(text, [
      "coating",
      "paint",
    ])
  ) {

    return "Coating Grade Polyol";

  }


  if (
    containsAny(text, [
      "adhesive",
      "adhesives",
    ])
  ) {

    return "Adhesive Grade Polyol";

  }


  if (
    containsAny(text, [
      "sealant",
      "sealants",
    ])
  ) {

    return "Sealant Grade Polyol";

  }


  if (
    containsAny(text, [
      "polyol",
    ])
  ) {

    return "Polyol";

  }


  return "";

}


// ========================================================================
// IDENTIFY APPLICATION
// ========================================================================

function identifyApplication(text) {

  const applications = [

    {
      name: "Coating",

      words: [
        "coating",
        "paint",
        "surface coating",
      ],

    },

    {
      name: "Adhesive",

      words: [
        "adhesive",
        "bonding",
      ],

    },

    {
      name: "Sealant",

      words: [
        "sealant",
      ],

    },

    {
      name: "Elastomer",

      words: [
        "elastomer",
        "rubber",
        "casting rubber",
      ],

    },

    {
      name: "Rigid PU Foam",

      words: [
        "rigid foam",
        "pu foam",
        "puf",
      ],

    },

    {
      name: "PIR Insulation",

      words: [
        "pir",
        "pir insulation",
      ],

    },

    {
      name: "Refrigeration Insulation",

      words: [
        "refrigeration",
        "refrigerator",
        "cold room",
        "cold storage",
      ],

    },

    {
      name: "Pipeline Insulation",

      words: [
        "pipeline",
        "pipe insulation",
      ],

    },

    {
      name: "Electrical Insulation",

      words: [
        "electrical insulation",
        "electrical",
      ],

    },

    {
      name: "Oil & Gas Insulation",

      words: [
        "oil and gas",
        "oil & gas",
        "oil gas",
      ],

    },

    {
      name: "Footwear",

      words: [
        "shoe",
        "shoes",
        "footwear",
        "sole",
      ],

    },

    {
      name: "Automotive",

      words: [
        "automotive",
        "automobile",
        "car",
      ],

    },

  ];


  for (
    const application of applications
  ) {

    if (
      containsAny(
        text,
        application.words
      )
    ) {

      return application.name;

    }

  }


  return "";

}


// ========================================================================
// DETECT TECHNICAL PARAMETERS
// ========================================================================

function detectTechnicalParameters(text) {

  const result = {};


  // ----------------------------------------------------------------------
  // OH VALUE
  // ----------------------------------------------------------------------

  const ohMatch =
    text.match(
      /(?:oh|hydroxyl)[^0-9]{0,20}(\d{2,4})/i
    );


  if (ohMatch) {

    result.ohValue =
      `${ohMatch[1]} mg KOH/g`;

  }


  // ----------------------------------------------------------------------
  // VISCOSITY
  // ----------------------------------------------------------------------

  const viscosityMatch =
    text.match(
      /viscosity[^0-9]{0,20}(\d+(?:\.\d+)?)/i
    );


  if (viscosityMatch) {

    result.viscosity =
      viscosityMatch[1];

  }


  // ----------------------------------------------------------------------
  // QUANTITY
  // ----------------------------------------------------------------------

  const quantityMatch =
    text.match(
      /(\d+(?:\.\d+)?)\s*(kg|kgs|ton|tons|mt|tonnes)/i
    );


  if (quantityMatch) {

    result.quantity =
      `${quantityMatch[1]} ${quantityMatch[2]}`;

  }


  // ----------------------------------------------------------------------
  // HARDNESS
  // ----------------------------------------------------------------------

  const hardnessMatch =
    text.match(
      /(?:shore\s*)?(?:d|a)?\s*(\d{1,3})/i
    );


  if (
    hardnessMatch &&
    containsAny(text, [
      "shore",
      "hardness",
    ])
  ) {

    result.hardness =
      hardnessMatch[1];

  }


  // ----------------------------------------------------------------------
  // FUNCTIONALITY
  // ----------------------------------------------------------------------

  const functionalityMatch =
    text.match(
      /functionality[^0-9]{0,20}(\d+(?:\.\d+)?)/i
    );


  if (functionalityMatch) {

    result.functionality =
      functionalityMatch[1];

  }


  // ----------------------------------------------------------------------
  // ACID VALUE
  // ----------------------------------------------------------------------

  const acidValueMatch =
    text.match(
      /(?:acid value|acid)[^0-9]{0,20}(\d+(?:\.\d+)?)/i
    );


  if (acidValueMatch) {

    result.acidValue =
      acidValueMatch[1];

  }


  // ----------------------------------------------------------------------
  // WATER CONTENT
  // ----------------------------------------------------------------------

  const waterMatch =
    text.match(
      /(?:water content|moisture|water)[^0-9]{0,20}(\d+(?:\.\d+)?)\s*%?/i
    );


  if (waterMatch) {

    result.waterContent =
      waterMatch[1];

  }


  return result;

}


// ========================================================================
// DETERMINE WHAT INFORMATION HAS ALREADY BEEN PROVIDED
// ========================================================================

function analyzeConversation(messages) {

  const text =
    getConversationText(messages);


  const product =
    identifyProduct(text);


  const application =
    identifyApplication(text);


  const technical =
    detectTechnicalParameters(text);


  // ----------------------------------------------------------------------
  // COMPANY
  // ----------------------------------------------------------------------

  const hasCompany =
    containsAny(text, [
      "company",
      "we are",
      "i am from",
      "i'm from",
      "our company",
      "my company",
      "business name",
      "organisation",
      "organization",
    ]);


  // ----------------------------------------------------------------------
  // EMAIL
  // ----------------------------------------------------------------------

  const hasEmail =
    /[^\s@]+@[^\s@]+\.[^\s@]+/.test(
      text
    );


  // ----------------------------------------------------------------------
  // PHONE
  // ----------------------------------------------------------------------

  const hasPhone =
    /(?:\+91[\s-]?)?[6-9]\d{9}/.test(
      text
    );


  return {

    product,

    application,

    technical,

    hasCompany,

    hasEmail,

    hasPhone,

  };

}


// ========================================================================
// GENERATE RULE-BASED RESPONSE
// ========================================================================

function generateReply(messages) {

  const conversation =
    analyzeConversation(messages);


  const lastMessage =
    getLastUserMessage(messages);


  const text =
    lastMessage.toLowerCase();


  // ======================================================================
  // CHECK FINAL CONFIRMATION FIRST
  // ======================================================================
  //
  // This MUST happen before the normal conversation rules.
  //
  // Example:
  //
  // ENY:
  // "Would you like me to proceed?"
  //
  // Customer:
  // "Sure"
  //
  // Result:
  //
  // readyForSubmission = true
  //
  // ======================================================================

  const awaitingConfirmation =
    isAwaitingConfirmation(
      messages
    );


  const customerConfirmed =
    awaitingConfirmation &&
    isConfirmation(
      lastMessage
    );


  if (customerConfirmed) {

    return {

      reply:
        "Thank you for confirming. I’ll pass your requirement to the " +
        "Enviol team for technical review.\n\n" +

        "We truly appreciate your interest in Enviol Polytech Solutions. " +
        "Our team will review the details and get back to you.\n\n" +

        "🙏 Thank you for visiting us.\n\n" +

        "Tata! 👋",

      readyForSubmission: true,

      conversationComplete: true,

    };

  }


  // ======================================================================
  // FIRST MESSAGE
  // ======================================================================

  if (
    messages.length <= 1
  ) {

    return {

      reply:
        "🙏 Namaste! Welcome to Enviol Polytech Solutions. " +
        "I’m ENY from the Enviol TechSupport AI team, and I’m grateful for your visit. " +
        "May I know what polyol or polyurethane solution you are looking for today?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // GREETINGS
  // ======================================================================

  if (
    /^(hi|hello|hey|namaste|good morning|good afternoon|good evening)[!. ]*$/i
      .test(text)
  ) {

    return {

      reply:
        "🙏 Namaste! It’s a pleasure to have you here. " +
        "Please tell me a little about the material or application you are working on, " +
        "and I’ll try to understand your requirement.",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // CUSTOMER SAYS THEY DON'T KNOW
  // ======================================================================

  if (
    containsAny(text, [
      "don't know",
      "do not know",
      "not sure",
      "i have no idea",
      "need help",
      "you tell me",
    ])
  ) {

    return {

      reply:
        "That’s absolutely fine. We can start with the application rather than the grade. " +
        "May I know what product you are manufacturing or what end use the polyurethane material is for?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // PRODUCT NOT YET IDENTIFIED
  // ======================================================================

  if (
    !conversation.product
  ) {

    return {

      reply:
        "Certainly. To guide you in the right direction, may I know what type of " +
        "polyurethane application you are working on — for example, coating, adhesive, " +
        "elastomer, rigid foam, PIR insulation, or another application?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // APPLICATION NOT YET IDENTIFIED
  // ======================================================================

  if (
    !conversation.application
  ) {

    return {

      reply:
        `Thank you. I understand that you are looking for ${conversation.product}. ` +
        "Could you tell me a little more about the end application or product you are manufacturing?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // ELASTOMER
  // ======================================================================

  if (
    conversation.application === "Elastomer"
  ) {

    if (
      !conversation.technical.hardness
    ) {

      return {

        reply:
          "Thank you. For the elastomer application, one useful parameter is the required hardness. " +
          "Do you have a target Shore hardness, such as Shore A or Shore D?",

        readyForSubmission: false,

        conversationComplete: false,

      };

    }

  }


  // ======================================================================
  // RIGID FOAM / PIR
  // ======================================================================

  if (
    conversation.application === "Rigid PU Foam" ||
    conversation.application === "PIR Insulation"
  ) {

    if (
      !conversation.technical.ohValue
    ) {

      return {

        reply:
          "Thank you. For rigid foam applications, the polyol's hydroxyl value is an important parameter. " +
          "Do you currently use a particular OH value or grade?",

        readyForSubmission: false,

        conversationComplete: false,

      };

    }

  }


  // ======================================================================
  // GENERAL POLYOL
  // ======================================================================

  if (
    conversation.product.includes("Polyol") &&
    !conversation.technical.ohValue
  ) {

    return {

      reply:
        "Thank you. Do you currently have a target hydroxyl value (OH value) for the polyol you use?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // QUANTITY
  // ======================================================================

  if (
    !conversation.technical.quantity
  ) {

    return {

      reply:
        "That gives me a good starting point. May I also know approximately how much material you would require — for example, per order or per month?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // CONTACT INFORMATION
  // ======================================================================

  if (
    !conversation.hasCompany
  ) {

    return {

      reply:
        "Thank you. I have a better understanding of your technical requirement now. " +
        "May I know your company name and your name, please?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // EMAIL
  // ======================================================================

  if (
    !conversation.hasEmail
  ) {

    return {

      reply:
        "Thank you. And what would be the best email address for our Enviol team to contact you regarding this requirement?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // PHONE
  // ======================================================================

  if (
    !conversation.hasPhone
  ) {

    return {

      reply:
        "Thank you. If convenient, may I also have a contact number for our team to reach you?",

      readyForSubmission: false,

      conversationComplete: false,

    };

  }


  // ======================================================================
  // FINAL SUMMARY / CONFIRMATION
  // ======================================================================

  return {

    reply:
      "Thank you for sharing those details. I believe we now have a useful understanding " +
      "of your requirement. Our Enviol technical team can review the application and " +
      "suggest the appropriate approach.\n\n" +

      "If everything looks correct, we can proceed with submitting your enquiry to the " +
      "Enviol team for review.\n\n" +

      "Would you like me to proceed?",

    readyForSubmission: false,

    conversationComplete: false,

    awaitingConfirmation: true,

  };

}


// ========================================================================
// POST
// ========================================================================

export async function POST(req) {

  try {

    // ====================================================================
    // READ REQUEST
    // ====================================================================

    const body =
      await req.json();


    if (
      !body ||
      typeof body !== "object"
    ) {

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
    // CHAT ID
    // ====================================================================

    const chatId =
      String(
        body.chatId || ""
      ).trim();


    // ====================================================================
    // MESSAGES
    // ====================================================================

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


    // ====================================================================
    // GENERATE RESPONSE
    // ====================================================================

    const result =
      generateReply(
        messages
      );


    // ====================================================================
    // RESPONSE
    // ====================================================================

    return Response.json(
      {

        success: true,

        chatId,

        reply:
          result.reply,

        readyForSubmission:
          result.readyForSubmission === true,

        conversationComplete:
          result.conversationComplete === true,

        awaitingConfirmation:
          result.awaitingConfirmation === true,

      },
      {
        status: 200,
      }
    );


  } catch (error) {

    // ====================================================================
    // SERVER ERROR
    // ====================================================================

    console.error(
      "[ENY RULE-BASED CHAT ERROR]",
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