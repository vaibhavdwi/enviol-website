// lib/eny/enquirySchema.js

export const enquirySchema = {
  metadata: {
    title: "Enviol Customer Enquiry Schema",

    purpose:
      "Defines the structured information ENY should identify and extract from customer conversations, technical enquiries and sales discussions.",

    principle:
      "Extract only information that is explicitly provided or can be reliably inferred from the conversation.",

    inferenceRule:
      "Inferred values must be clearly marked as inferred and must never be presented as customer-confirmed information.",

    missingInformationRule:
      "Use null for unknown fields rather than inventing values.",
  },

  customer: {
    companyName: null,

    contactPerson: null,

    designation: null,

    email: null,

    phone: null,

    whatsapp: null,

    website: null,

    country: null,

    state: null,

    city: null,

    customerType: null,

    customerTypes: [
      "Manufacturer",
      "Distributor",
      "Trader",
      "Formulator",
      "System House",
      "OEM",
      "Research Organization",
      "Importer",
      "Exporter",
      "Other",
      "Unknown",
    ],
  },

  enquiry: {
    enquiryId: null,

    source: null,

    date: null,

    subject: null,

    originalCustomerMessage: null,

    summary: null,

    enquiryType: null,

    enquiryTypes: [
      "Product Enquiry",
      "Technical Enquiry",
      "Price Enquiry",
      "Sample Request",
      "Quotation Request",
      "Bulk Order",
      "Custom Development",
      "Replacement / Alternative",
      "Distributor Enquiry",
      "General Enquiry",
      "Other",
    ],

    urgency: null,

    urgencyLevels: [
      "Immediate",
      "Within 1 Week",
      "Within 1 Month",
      "Within 3 Months",
      "Long Term",
      "Unknown",
    ],
  },

  industry: {
    primaryIndustry: null,

    secondaryIndustry: null,

    application: null,

    subApplication: null,

    industryConfidence: null,

    applicationConfidence: null,

    possibleIndustries: [],

    possibleApplications: [],
  },

  productRequirement: {
    requestedProduct: null,

    requestedProductFamily: null,

    currentProduct: null,

    currentManufacturer: null,

    competitorProduct: null,

    competitorManufacturer: null,

    productType: null,

    productForm: null,

    requiredGrade: null,

    targetProduct: null,

    replacementRequired: null,

    dropInReplacementRequired: null,

    customizedGradeRequired: null,
  },

  technicalRequirements: {
    hydroxylValue: {
      min: null,
      max: null,
      target: null,
      unit: "mg KOH/g",
    },

    acidValue: {
      min: null,
      max: null,
      target: null,
      unit: "mg KOH/g",
    },

    viscosity: {
      min: null,
      max: null,
      target: null,
      unit: "cP",
      temperature: null,
      temperatureUnit: "°C",
    },

    functionality: {
      min: null,
      max: null,
      target: null,
    },

    molecularWeight: {
      min: null,
      max: null,
      target: null,
      unit: "g/mol",
    },

    waterContent: {
      min: null,
      max: null,
      target: null,
      unit: "%",
    },

    density: {
      min: null,
      max: null,
      target: null,
      unit: null,
    },

    color: {
      requirement: null,
    },

    appearance: {
      requirement: null,
    },

    solidsContent: {
      min: null,
      max: null,
      target: null,
      unit: "%",
    },
  },

  polyurethaneSystem: {
    systemType: null,

    systemTypes: [
      "1K PU",
      "2K PU",
      "Polyurethane Foam",
      "PIR Foam",
      "PUR Foam",
      "Casting Elastomer",
      "PU Coating",
      "PU Adhesive",
      "PU Sealant",
      "TPU",
      "Other",
      "Unknown",
    ],

    isocyanate: {
      type: null,

      manufacturer: null,

      productName: null,

      ncoContent: null,

      ncoContentUnit: "%",

      index: null,
    },

    chainExtender: {
      used: null,

      type: null,

      name: null,

      quantity: null,
    },

    crosslinker: {
      used: null,

      type: null,

      name: null,

      quantity: null,
    },

    catalyst: {
      used: null,

      type: null,

      name: null,
    },

    surfactant: {
      used: null,

      type: null,

      name: null,
    },

    blowingAgent: {
      used: null,

      type: null,

      name: null,
    },

    otherAdditives: [],
  },

  performanceRequirements: {
    shoreHardness: {
      scale: null,

      min: null,

      max: null,

      target: null,
    },

    tensileStrength: {
      min: null,

      max: null,

      target: null,

      unit: null,
    },

    elongation: {
      min: null,

      max: null,

      target: null,

      unit: "%",
    },

    tearStrength: {
      min: null,

      max: null,

      target: null,

      unit: null,
    },

    abrasionResistance: {
      requirement: null,

      testMethod: null,
    },

    compressionSet: {
      requirement: null,

      unit: null,

      testMethod: null,
    },

    compressiveStrength: {
      min: null,

      max: null,

      target: null,

      unit: null,
    },

    thermalConductivity: {
      min: null,

      max: null,

      target: null,

      unit: null,

      temperature: null,
    },

    dimensionalStability: {
      requirement: null,
    },

    adhesion: {
      requirement: null,

      substrate: null,

      testMethod: null,
    },

    chemicalResistance: {
      requirement: null,

      chemicals: [],
    },

    temperatureResistance: {
      minimum: null,

      maximum: null,

      unit: "°C",
    },

    hydrolyticStability: {
      requirement: null,
    },

    firePerformance: {
      required: null,

      classification: null,

      standard: null,
    },

    electricalProperties: {
      required: null,

      dielectricStrength: null,

      dielectricConstant: null,

      volumeResistivity: null,

      testMethod: null,
    },

    otherRequirements: [],
  },

  applicationConditions: {
    substrate: null,

    substrateType: null,

    operatingTemperature: {
      minimum: null,

      maximum: null,

      unit: "°C",
    },

    environmentalExposure: [],

    humidity: null,

    chemicalExposure: [],

    pressure: null,

    processingMethod: null,

    processingEquipment: null,

    mixingMethod: null,

    curingMethod: null,

    curingTemperature: null,

    curingTime: null,

    demouldTime: null,

    potLife: null,

    workingLife: null,
  },

  foamRequirements: {
    applicable: null,

    foamType: null,

    foamDensity: {
      min: null,

      max: null,

      target: null,

      unit: "kg/m³",
    },

    cellStructure: null,

    blowingAgent: null,

    thermalConductivity: null,

    riseTime: null,

    creamTime: null,

    gelTime: null,

    tackFreeTime: null,

    demouldTime: null,

    dimensionalStability: null,

    closedCellContent: null,
  },

  elastomerRequirements: {
    applicable: null,

    hardness: {
      scale: null,

      min: null,

      max: null,

      target: null,
    },

    tensileStrength: null,

    elongation: null,

    tearStrength: null,

    abrasionResistance: null,

    compressionSet: null,

    rebound: null,

    resilience: null,

    flexFatigue: null,

    hydrolysisResistance: null,

    lowTemperatureFlexibility: null,
  },

  coatingRequirements: {
    applicable: null,

    substrate: null,

    coatingType: null,

    systemType: null,

    solventSystem: null,

    waterborne: null,

    solventborne: null,

    solidsContent: null,

    dryFilmThickness: null,

    hardness: null,

    flexibility: null,

    adhesion: null,

    chemicalResistance: null,

    abrasionResistance: null,

    weatherResistance: null,

    gloss: null,

    cureTemperature: null,

    cureTime: null,
  },

  adhesiveRequirements: {
    applicable: null,

    substrate1: null,

    substrate2: null,

    adhesiveType: null,

    systemType: null,

    openTime: null,

    potLife: null,

    cureTime: null,

    bondStrength: null,

    peelStrength: null,

    shearStrength: null,

    flexibility: null,

    temperatureResistance: null,

    waterResistance: null,

    chemicalResistance: null,
  },

  quantity: {
    sampleRequired: null,

    sampleQuantity: null,

    sampleUnit: null,

    trialQuantity: null,

    trialUnit: null,

    monthlyRequirement: null,

    monthlyUnit: null,

    annualRequirement: null,

    annualUnit: null,

    orderQuantity: null,

    orderUnit: null,

    expectedFirstOrderQuantity: null,

    expectedFirstOrderUnit: null,

    futureScalePotential: null,
  },

  commercialRequirements: {
    priceTarget: null,

    priceCurrency: null,

    priceUnit: null,

    targetPricePerKg: null,

    currentPricePerKg: null,

    currentSupplier: null,

    paymentTerms: null,

    deliveryTerms: null,

    incoterms: null,

    packaging: null,

    packagingSize: null,

    packagingUnit: null,

    deliveryLocation: null,

    requiredDeliveryTime: null,

    importRequired: null,

    localSupplyRequired: null,
  },

  sustainability: {
    recycledContentRequired: null,

    targetRecycledContent: null,

    targetRecycledContentUnit: "%",

    sustainabilityPriority: null,

    sustainabilityRequirements: [],

    carbonReductionRequirement: null,

    recycledFeedstockPreference: null,

    preferredFeedstock: null,
  },

  regulatory: {
    certificationsRequired: [],

    standardsRequired: [],

    customerApprovalsRequired: null,

    regulatoryRequirements: [],

    documentationRequired: [],

    safetyDocumentationRequired: null,

    technicalDataSheetRequired: null,

    safetyDataSheetRequired: null,

    coaRequired: null,

    sampleTestingRequired: null,
  },

  competition: {
    currentSupplier: null,

    currentProduct: null,

    competitorProducts: [],

    competitorManufacturers: [],

    reasonForChange: null,

    problemsWithCurrentProduct: [],

    priceComparisonRequired: null,

    performanceComparisonRequired: null,
  },

  customerPainPoints: {
    primaryProblem: null,

    problems: [],

    currentMaterialIssues: [],

    processingIssues: [],

    performanceIssues: [],

    supplyIssues: [],

    priceIssues: [],

    sustainabilityIssues: [],
  },

  salesQualification: {
    leadStatus: null,

    leadStatuses: [
      "New",
      "Unqualified",
      "Information Required",
      "Technically Qualified",
      "Sample Requested",
      "Sample Sent",
      "Trial Ongoing",
      "Trial Successful",
      "Quotation Requested",
      "Quotation Sent",
      "Negotiation",
      "Purchase Order Expected",
      "Won",
      "Lost",
      "Dormant",
    ],

    leadTemperature: null,

    leadTemperatures: [
      "Hot",
      "Warm",
      "Cold",
      "Unknown",
    ],

    qualificationScore: null,

    technicalFitScore: null,

    commercialPotentialScore: null,

    purchaseIntentScore: null,

    sustainabilityFitScore: null,

    estimatedMonthlyValue: null,

    estimatedAnnualValue: null,

    probabilityOfConversion: null,

    expectedOrderTimeline: null,

    nextAction: null,

    followUpDate: null,

    assignedTo: null,
  },

  aiAssessment: {
    summary: null,

    applicationIdentified: null,

    productFamilyCandidate: null,

    candidateProducts: [],

    recommendationConfidence: null,

    confidenceLevels: [
      "Very High",
      "High",
      "Medium",
      "Low",
      "Very Low",
      "Unknown",
    ],

    missingInformation: [],

    technicalQuestionsToAsk: [],

    commercialQuestionsToAsk: [],

    recommendedNextStep: null,

    sampleRecommended: null,

    technicalReviewRequired: null,

    rdReviewRequired: null,

    salesReviewRequired: null,

    humanApprovalRequired: null,
  },

  conversationSignals: {
    requestedPrice: null,

    requestedSample: null,

    requestedTDS: null,

    requestedSDS: null,

    requestedCOA: null,

    requestedQuotation: null,

    requestedCall: null,

    requestedMeeting: null,

    requestedFactoryVisit: null,

    requestedTechnicalDiscussion: null,

    expressedUrgency: null,

    expressedPurchaseIntent: null,

    mentionedCompetitor: null,

    mentionedCurrentSupplier: null,

    mentionedExistingFormulation: null,

    askedForCustomization: null,

    askedForReverseEngineering: null,

    askedForReplacement: null,
  },

  extractedEntities: {
    productNames: [],

    companyNames: [],

    manufacturerNames: [],

    chemicalNames: [],

    applicationNames: [],

    industryNames: [],

    standards: [],

    certifications: [],

    countries: [],

    cities: [],

    quantities: [],

    prices: [],
  },

  dataQuality: {
    completenessScore: null,

    technicalCompletenessScore: null,

    commercialCompletenessScore: null,

    customerIdentityCompletenessScore: null,

    informationSources: {
      customerProvided: [],
      aiInferred: [],
      websiteKnowledge: [],
      verifiedEnviolData: [],
    },

    contradictions: [],

    uncertainFields: [],

    fieldsRequiringConfirmation: [],
  },

  aiExtractionRules: {
    rule1:
      "Never invent customer details.",

    rule2:
      "Never invent company names, product names, quantities or prices.",

    rule3:
      "Use null when information is unknown.",

    rule4:
      "Preserve the customer's original units where possible, while also storing normalized units when practical.",

    rule5:
      "If a customer says 'around 5 tons', preserve the approximate nature of the quantity.",

    rule6:
      "If the customer gives a range, store minimum and maximum rather than converting it to a single value.",

    rule7:
      "If the customer gives a competitor product name, store it as competitor information and do not automatically treat it as an Enviol equivalent.",

    rule8:
      "If the customer gives a technical specification, do not alter the value unless normalization is explicitly performed.",

    rule9:
      "Distinguish customer-confirmed information from AI inference.",

    rule10:
      "Never mark a lead as technically qualified when essential technical information is missing.",

    rule11:
      "Never mark a customer as ready for quotation solely because they requested a price.",

    rule12:
      "A sample request is a strong buying signal but does not guarantee purchase intent.",

    rule13:
      "If the customer provides a complete formulation, preserve the formulation information accurately for technical review.",

    rule14:
      "When the customer's requirement conflicts with known Enviol technical data, flag the contradiction rather than forcing a match.",

    rule15:
      "When a customer requests reverse engineering, identify the reference product and requested target properties separately.",
  },

  leadScoring: {
    purpose:
      "Provides a structured framework for prioritizing enquiries.",

    factors: {
      technicalClarity: {
        weight: 20,

        description:
          "How clearly the customer's application and technical requirements are defined.",
      },

      purchaseIntent: {
        weight: 25,

        description:
          "Evidence that the customer is actively planning a purchase.",
      },

      quantityPotential: {
        weight: 20,

        description:
          "Potential order volume or recurring consumption.",
      },

      applicationFit: {
        weight: 15,

        description:
          "How closely the customer's application aligns with Enviol's target applications.",
      },

      sustainabilityFit: {
        weight: 10,

        description:
          "Alignment with Enviol's recycled-polyol value proposition.",
      },

      commercialFit: {
        weight: 10,

        description:
          "Commercial attractiveness including price, location, payment terms and supply potential.",
      },
    },

    interpretation: {
      "80-100": "High-priority lead",

      "60-79": "Qualified / promising lead",

      "40-59": "Needs qualification",

      below40: "Low-priority or incomplete enquiry",
    },

    aiRule:
      "Lead score is an internal prioritization aid and must not be disclosed to customers unless explicitly designed for customer-facing use.",
  },

  outputFormat: {
    recommendedStructure: {
      customer: "Object containing customer identity information.",

      enquiry: "Object containing enquiry type and summary.",

      industry: "Industry and application classification.",

      productRequirement:
        "Requested product and current material information.",

      technicalRequirements:
        "Required polyol and polyurethane technical specifications.",

      performanceRequirements:
        "Final product performance requirements.",

      quantity:
        "Sample, trial and commercial quantity requirements.",

      commercialRequirements:
        "Price, packaging, logistics and commercial requirements.",

      sustainability:
        "Recycled-content and sustainability requirements.",

      competition:
        "Competitor/current-supplier information.",

      salesQualification:
        "Lead status, priority and next action.",

      aiAssessment:
        "AI's technical assessment, missing information and recommendation.",
    },

    finalRule:
      "The structured enquiry object should be generated only from information available in the conversation and verified ENY knowledge.",
  },
};

export default enquirySchema;