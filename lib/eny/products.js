// lib/eny/products.js

export const products = {
  metadata: {
    title: "Enviol Polyol Product Knowledge",
    purpose:
      "Authoritative knowledge about Enviol polyester polyols, polyether polyols, product families, grades, properties and product-development status.",

    importantRule:
      "The AI must never invent a product name, grade, specification, certification, availability, price, MOQ or performance claim that is not explicitly present in this knowledge base.",

    commercialStatusRule:
      "A product discussed as a development, laboratory, benchmark or target grade must not automatically be represented as a commercially available product.",
  },

  productFamilies: {
    polyesterPolyols: {
      name: "Recycled Polyester Polyols",

      category: "Polyester Polyols",

      description:
        "Polyester polyols developed by Enviol using chemical recycling and polyol synthesis, including PET-derived polyester polyols.",

      primaryFeedstock:
        "Post-consumer and post-industrial PET and other suitable polyester waste streams.",

      coreTechnology:
        "Chemical recycling, including glycolysis-based conversion of PET into polyester-polyol intermediates.",

      characteristics: [
        "Recycled-content based",
        "Aromatic polyester backbone possible depending on feedstock and process",
        "Suitable for polyurethane chemistry",
        "Can be tailored across a broad hydroxyl-value range",
        "Can be developed for application-specific viscosity and functionality requirements",
      ],

      potentialApplications: [
        "Rigid polyurethane foam",
        "PIR insulation",
        "PUR insulation",
        "Spray polyurethane foam",
        "Construction insulation",
        "Refrigeration insulation",
        "Cold-storage insulation",
        "District-cooling insulation",
        "LNG insulation",
        "Oil and gas insulation",
        "Pipeline insulation",
        "Industrial coatings",
        "Polyurethane adhesives",
        "Polyurethane dispersions",
        "Casting elastomers",
        "Sealants",
        "Other CASE applications",
      ],

      hydroxylValueRange: {
        minimum: 30,
        maximum: 600,
        unit: "mg KOH/g",
        status: "development range",
      },

      developmentFocus: [
        "Low-OH polyester polyols",
        "Medium-OH polyester polyols",
        "High-OH polyester polyols",
        "Rigid-foam grades",
        "Coating grades",
        "Adhesive grades",
        "Elastomer grades",
        "High-recycled-content grades",
      ],
    },

    polyetherPolyols: {
      name: "Recycled Polyether Polyols",

      category: "Polyether Polyols",

      description:
        "Polyether polyols under development using chemical recycling of suitable polyurethane waste streams.",

      feedstock:
        "Suitable polyurethane foam and polyurethane waste streams.",

      technology:
        "Chemical recycling and recovery of useful polyol components from polyurethane waste.",

      potentialApplications: [
        "Flexible polyurethane foam",
        "Polyurethane elastomers",
        "CASE applications",
        "Adhesives",
        "Sealants",
        "Other polyurethane applications",
      ],

      developmentStatus:
        "Technology and product development category. Specific commercial grades must be confirmed separately.",
    },
  },

  polyesterPolyolGrades: {
    overview:
      "Enviol polyester polyols can be designed around hydroxyl value, functionality, viscosity, acid value, water content, molecular structure and application requirements.",

    developmentRange: [
      {
        parameter: "Hydroxyl Value",
        range: "30–600",
        unit: "mg KOH/g",
        significance:
          "Important for determining polyurethane formulation requirements, equivalent weight and final polymer characteristics.",
      },

      {
        parameter: "Functionality",
        range: "Approximately 2–8",
        unit: "average functionality",
        significance:
          "Influences crosslink density and the structure and performance of the resulting polyurethane system.",
      },

      {
        parameter: "Viscosity",
        range: "Approximately 500–12,000",
        unit: "cP",
        significance:
          "Influences handling, mixing, pumping and processing behavior.",
      },

      {
        parameter: "Water Content",
        range: "Typically below 0.2",
        unit: "%",
        significance:
          "Important because water reacts with isocyanates and can affect polyurethane processing and foaming.",
      },

      {
        parameter: "Acid Value",
        range: "Generally below 5",
        unit: "mg KOH/g",
        significance:
          "Important for polyol quality, reaction behavior and polyurethane formulation.",
      },
    ],
  },

  namedProducts: {
    RePolyester2100: {
      name: "RePolyester 2100",
      type: "Polyester Polyol",

      description:
        "An Enviol recycled polyester polyol product designation.",

      feedstock:
        "PET-derived recycled feedstock.",

      status:
        "Product designation. Exact commercial specification must be confirmed from the latest Enviol technical documentation before making customer-specific claims.",

      aiRule:
        "Do not invent OH value, viscosity, functionality, density, acid value, water content, price or application performance for RePolyester 2100 unless those values are explicitly added to the knowledge base or supplied by the user.",
    },
  },

  productDevelopment: {
    currentDevelopmentAreas: [
      {
        category: "Rigid Foam Polyester Polyols",
        targetOH:
          "Approximately 250–330 mg KOH/g for selected rigid-foam development work.",
        applications: [
          "Rigid polyurethane foam",
          "PIR/PUR insulation",
          "Thermal insulation",
        ],
        status:
          "Development focus; exact commercial grades and specifications must be confirmed individually.",
      },

      {
        category: "High-OH Polyester Polyols",
        targetOH:
          "Approximately 300–600 mg KOH/g depending on formulation and application.",
        applications: [
          "Rigid foam",
          "High-crosslink-density polyurethane systems",
        ],
        status: "Development category.",
      },

      {
        category: "Low-OH Polyester Polyols",
        targetOH:
          "Approximately 30–200 mg KOH/g depending on molecular-weight and application requirements.",
        applications: [
          "Coatings",
          "Adhesives",
          "Elastomers",
          "Sealants",
        ],
        status: "Development category.",
      },

      {
        category: "Elastomer Polyester Polyols",
        target:
          "Polyols designed for polyurethane elastomers with application-specific hardness and mechanical requirements.",
        applications: [
          "Casting elastomers",
          "Industrial elastomers",
          "PU components",
          "TPU-related development",
        ],
        status: "Development category.",
      },
    ],
  },

  feedstockAndChemistry: {
    PET: {
      description:
        "PET is one of Enviol's primary feedstocks for developing recycled polyester polyols.",

      typicalSource:
        "PET flakes and suitable polyester waste.",

      recyclingMethod:
        "Chemical recycling through glycolysis and subsequent polyol development.",
    },

    glycols: {
      primary: [
        {
          name: "Diethylene Glycol",
          abbreviation: "DEG",
          role:
            "Primary glycol component used in Enviol's PET glycolysis and polyester-polyol development work.",
        },

        {
          name: "Monoethylene Glycol",
          abbreviation: "MEG",
          role:
            "Glycol component that can be used to modify polyester-polyol chemistry and molecular structure.",
        },

        {
          name: "1,4-Butanediol",
          abbreviation: "BDO",
          role:
            "Diol that can be incorporated into polyester-polyol chemistry to influence chain structure and final properties.",
        },
      ],

      futureDevelopment: [
        {
          name: "1,6-Hexanediol",
          abbreviation: "HDO",
        },

        {
          name: "Neopentyl Glycol",
          abbreviation: "NPG",
        },

        {
          name: "Polypropylene Glycol",
          abbreviation: "PPG",
        },
      ],
    },
  },

  applicationMapping: {
    rigidFoam: {
      preferredFamily: "Recycled Polyester Polyols",

      commonlyRelevantProperties: [
        "High hydroxyl value",
        "Suitable functionality",
        "Controlled viscosity",
        "Low water content",
        "Low acid value",
        "Compatibility with the customer's formulation",
      ],

      typicalOHRange:
        "Approximately 200–500 mg KOH/g depending on formulation and target foam.",

      note:
        "The actual required OH value depends on the complete polyurethane/PIR formulation, isocyanate index, catalysts, blowing agents and desired foam properties.",
    },

    coatings: {
      preferredFamily:
        "Recycled Polyester Polyols, with grade selected according to coating chemistry.",

      relevantProperties: [
        "Hydroxyl value",
        "Molecular weight",
        "Functionality",
        "Viscosity",
        "Acid value",
        "Compatibility",
        "Solvent compatibility",
        "Cure requirements",
      ],

      note:
        "Coating selection must consider whether the system is 1K, 2K, solventborne, waterborne or otherwise formulated.",
    },

    adhesives: {
      preferredFamily:
        "Recycled Polyester Polyols and selected polyether/polyester systems.",

      relevantProperties: [
        "Hydroxyl value",
        "Molecular weight",
        "Functionality",
        "Viscosity",
        "Flexibility",
        "Reactivity",
        "Compatibility",
      ],
    },

    elastomers: {
      preferredFamily:
        "Application-specific polyester or polyether polyols.",

      relevantProperties: [
        "Hydroxyl value",
        "Molecular weight",
        "Functionality",
        "Glycol structure",
        "Hardness target",
        "Mechanical requirements",
        "Processing method",
      ],

      note:
        "A target Shore hardness alone is insufficient to select a polyol. The AI should ask for the complete two-component system, isocyanate type, NCO content, desired hardness, processing method and other relevant requirements.",
    },

    sealants: {
      preferredFamily:
        "Application-specific polyester and polyether polyols.",

      relevantProperties: [
        "Hydroxyl value",
        "Molecular weight",
        "Functionality",
        "Viscosity",
        "Flexibility",
        "Moisture sensitivity",
        "Cure requirements",
      ],
    },

    flexibleFoam: {
      preferredFamily:
        "Polyether polyols and selected recycled polyether/polyester systems.",

      relevantProperties: [
        "Hydroxyl value",
        "Functionality",
        "Molecular weight",
        "Viscosity",
        "Reactivity",
        "Compatibility with formulation",
      ],
    },
  },

  specificationRules: {
    hydroxylValue: {
      description:
        "Hydroxyl value is one of the most important parameters for selecting and comparing polyols.",

      unit: "mg KOH/g",

      aiBehavior:
        "Always preserve the unit mg KOH/g when discussing hydroxyl value unless the customer explicitly requests another representation.",
    },

    viscosity: {
      unit: "cP",

      aiBehavior:
        "Viscosity should be reported together with temperature whenever a specific product specification is being discussed and the temperature is known.",
    },

    functionality: {
      description:
        "Average functionality indicates the average number of reactive hydroxyl groups per polyol molecule and influences polyurethane network formation.",
    },

    acidValue: {
      unit: "mg KOH/g",

      aiBehavior:
        "Do not confuse acid value with hydroxyl value. They are different analytical parameters with different meanings.",
    },

    waterContent: {
      unit: "%",

      aiBehavior:
        "Water content is particularly important in polyurethane systems because water reacts with isocyanates.",
    },
  },

  productComparison: {
    polyesterVsPolyether: {
      polyesterPolyol: [
        "Often provides good adhesion",
        "Can provide high polarity",
        "Can provide good mechanical properties",
        "Useful for coatings and rigid polyurethane systems",
        "Can be produced from recycled PET feedstock",
      ],

      polyetherPolyol: [
        "Often provides good hydrolytic stability",
        "Commonly used in flexible polyurethane systems",
        "Can provide useful low-temperature flexibility",
        "Suitable for many elastomer, foam and CASE applications",
      ],

      aiRule:
        "Do not claim that one chemistry is universally superior. Selection depends on application, formulation, processing and required performance.",
    },
  },

  customerQuestions: {
    basicProductQuestions: [
      "Which polyester polyol is suitable for my application?",
      "What is the OH value?",
      "What is the viscosity?",
      "What is the functionality?",
      "How much recycled content does the product contain?",
      "What applications is the grade suitable for?",
      "Can you provide a TDS?",
      "Can I get a sample?",
      "What is the MOQ?",
      "What is the price?",
      "Is the product commercially available?",
    ],

    technicalQuestions: [
      "Which OH value should I use?",
      "Should I use polyester or polyether polyol?",
      "Can the polyol be used for rigid foam?",
      "Can the polyol be used for PIR foam?",
      "Can it be used for coatings?",
      "Can it be used for polyurethane adhesives?",
      "Can it be used for casting elastomers?",
      "Can it be used with MDI?",
      "Can it be used with TDI?",
    ],
  },

  aiResponseRules: {
    neverInvent: [
      "Product specifications",
      "TDS values",
      "SDS information",
      "Certifications",
      "Approvals",
      "Prices",
      "MOQ",
      "Production capacity",
      "Delivery time",
      "Stock availability",
      "Customer names",
      "Performance test results",
      "Regulatory approvals",
    ],

    whenSpecificationIsMissing:
      "Tell the customer that the specification is not currently available in the AI knowledge base and offer to connect them with Enviol's technical or sales team.",

    whenCustomerRequestsProductRecommendation:
      "Use application, OH value, functionality, viscosity, processing method, desired mechanical properties and other relevant requirements before recommending a product.",

    whenCustomerRequestsPrice:
      "Do not estimate or invent a price. Collect the required quantity, destination, specification and packaging requirements and route the enquiry to the sales process.",

    whenCustomerRequestsTDS:
      "Do not fabricate a TDS. If a verified TDS is available through the application, provide or route the customer to it. Otherwise collect the enquiry details for the Enviol team.",

    commercialStatus:
      "If the commercial status of a grade is unclear, describe it as a development or product-family option rather than claiming it is currently available for purchase.",
  },
};

export default products;