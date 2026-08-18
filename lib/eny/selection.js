// lib/eny/selection.js

export const selection = {
  metadata: {
    title: "Enviol Product Selection & Technical Qualification",

    purpose:
      "Decision logic for selecting the appropriate Enviol polyol family based on customer application, technical requirements, current formulation and performance targets.",

    corePrinciple:
      "Select by application and technical requirements, not by product name alone.",

    importantRule:
      "The AI must distinguish between a technically plausible candidate and a validated recommendation.",

    recommendationLevels: {
      level1:
        "General application match — sufficient information to identify a suitable product family.",

      level2:
        "Technical candidate — sufficient information to identify one or more potentially suitable grades, but laboratory validation is still required.",

      level3:
        "Validated recommendation — only when verified Enviol technical data and customer trial data are available.",
    },

    escalationRule:
      "If the available information is insufficient for responsible product selection, ask targeted questions rather than guessing.",
  },

  selectionWorkflow: {
    step1: {
      name: "Identify Industry",

      objective:
        "Determine the customer's industry or market.",

      examples: [
        "Refrigeration",
        "Cold storage",
        "Construction",
        "Pipeline",
        "Oil & gas",
        "LNG",
        "Automotive",
        "Footwear",
        "Coatings",
        "Adhesives",
        "Elastomers",
      ],
    },

    step2: {
      name: "Identify Exact Application",

      objective:
        "Determine what polyurethane or CASE product the customer manufactures.",

      examples: [
        "Rigid foam",
        "PIR foam",
        "PUR foam",
        "Casting elastomer",
        "PU coating",
        "PU adhesive",
        "PU sealant",
        "Flexible foam",
        "TPU",
      ],
    },

    step3: {
      name: "Identify Performance Requirements",

      objective:
        "Determine the required final material properties.",

      examples: [
        "Hardness",
        "Flexibility",
        "Thermal conductivity",
        "Compressive strength",
        "Tensile strength",
        "Elongation",
        "Abrasion resistance",
        "Adhesion",
        "Chemical resistance",
        "Temperature resistance",
        "Hydrolytic stability",
      ],
    },

    step4: {
      name: "Identify Existing System",

      objective:
        "Understand what the customer is currently using.",

      preferredInformation: [
        "Current polyol manufacturer",
        "Current product name",
        "OH value",
        "Functionality",
        "Viscosity",
        "Acid value",
        "Water content",
        "Current isocyanate",
        "NCO content",
        "NCO index",
        "Chain extender",
        "Catalyst",
        "Blowing agent where applicable",
      ],
    },

    step5: {
      name: "Determine Enviol Product Family",

      objective:
        "Select the most technically relevant Enviol product family.",

      possibleFamilies: [
        "Recycled polyester polyol",
        "Recycled polyether polyol",
        "Rigid foam polyester polyol",
        "CASE polyester polyol",
        "Elastomer polyester polyol",
        "Application-specific polyol",
      ],
    },

    step6: {
      name: "Determine Candidate Grade",

      objective:
        "Match the customer requirements against verified Enviol product specifications.",

      rule:
        "Never invent a grade number, OH value, viscosity or performance specification.",
    },

    step7: {
      name: "Identify Missing Information",

      objective:
        "Determine what information is required before making a stronger recommendation.",

      examples: [
        "OH value",
        "Application",
        "Current formulation",
        "Isocyanate",
        "Target hardness",
        "Density",
        "Temperature",
        "Monthly quantity",
      ],
    },

    step8: {
      name: "Recommend Sample / Technical Trial",

      objective:
        "Where appropriate, recommend a laboratory or production trial.",

      rule:
        "Sample recommendations must not be represented as proof of final commercial suitability.",
    },
  },

  applicationSelection: {
    rigidFoam: {
      application: "Rigid Polyurethane Foam",

      preferredFamilies: [
        "Recycled polyester polyols",
        "Rigid foam polyester polyols",
      ],

      typicalOHRange: {
        lower: 200,
        upper: 500,
        unit: "mg KOH/g",
      },

      importantParameters: [
        "OH value",
        "Functionality",
        "Viscosity",
        "Water content",
        "Acid value",
        "Reactivity",
        "Density",
      ],

      performanceTargets: [
        "Low thermal conductivity",
        "Compressive strength",
        "Dimensional stability",
        "Adhesion",
        "Controlled cell structure",
      ],

      minimumQuestions: [
        "What foam density are you targeting?",
        "What OH value is your current polyol?",
        "Which isocyanate are you using?",
        "What is your isocyanate index?",
        "What blowing agent are you using?",
        "What thermal conductivity are you targeting?",
      ],

      selectionLogic: [
        "High-OH rigid foam systems generally require higher-functionality polyols.",
        "Lower viscosity may be preferred where metering and mixing equipment requires it.",
        "Final suitability depends on the complete foam formulation.",
      ],
    },

    pirFoam: {
      application: "PIR Foam",

      preferredFamilies: [
        "Recycled polyester polyols",
        "High-functionality polyester polyols",
      ],

      importantParameters: [
        "OH value",
        "Functionality",
        "Aromatic content",
        "Viscosity",
        "Water content",
        "Acid value",
      ],

      performanceTargets: [
        "Thermal insulation",
        "Compressive strength",
        "Dimensional stability",
        "Fire performance",
      ],

      questions: [
        "Are you producing PIR or PUR?",
        "What is the target density?",
        "What is the current OH value?",
        "What is the current isocyanate index?",
        "What blowing agent is being used?",
        "What fire-performance requirement applies?",
      ],

      aiRule:
        "Do not claim a particular fire classification from polyol chemistry alone.",
    },

    refrigeration: {
      application: "Refrigeration Insulation",

      preferredFamilies: [
        "Rigid polyester polyols",
        "Recycled polyester polyols",
      ],

      requirements: [
        "Low thermal conductivity",
        "Dimensional stability",
        "Controlled density",
        "Adhesion",
        "Mechanical integrity",
      ],

      questions: [
        "What refrigeration equipment is being manufactured?",
        "What foam density is used?",
        "What insulation thickness is required?",
        "What thermal conductivity is required?",
        "What blowing agent is used?",
        "What is the current polyol?",
      ],
    },

    coldStorage: {
      application: "Cold Storage Insulation",

      preferredFamilies: [
        "Rigid polyester polyols",
        "Recycled polyester polyols",
      ],

      requirements: [
        "Low thermal conductivity",
        "Compressive strength",
        "Dimensional stability",
        "Moisture resistance",
        "Adhesion",
      ],

      questions: [
        "What type of cold-storage panel is being manufactured?",
        "What density is required?",
        "What operating temperature is expected?",
        "What thermal conductivity is required?",
        "What is the current polyol?",
      ],
    },

    pipelineInsulation: {
      application: "Pipeline Insulation",

      preferredFamilies: [
        "Rigid polyester polyols",
        "Recycled polyester polyols",
      ],

      typicalDevelopmentWindow: {
        hydroxylValue: "200–500 mg KOH/g",
        functionality: "2–8",
        viscosity: "500–12,000 cP",
        waterContent: "Typically below 0.2%",
        acidValue: "Generally below 5 mg KOH/g",
      },

      requirements: [
        "Low thermal conductivity",
        "Compressive strength",
        "Dimensional stability",
        "Adhesion",
        "Low water absorption",
        "Temperature resistance",
      ],

      questions: [
        "What is the operating temperature?",
        "What is the pipe diameter?",
        "What insulation thickness is required?",
        "What foam density is required?",
        "What thermal conductivity is required?",
        "What is the current polyol?",
        "What is the current isocyanate?",
      ],
    },

    districtCooling: {
      application: "District Cooling Pipe Insulation",

      preferredFamilies: [
        "Rigid polyester polyols",
        "Recycled polyester polyols",
      ],

      requirements: [
        "Low thermal conductivity",
        "Low water absorption",
        "Dimensional stability",
        "Compressive strength",
        "Long-term durability",
      ],

      questions: [
        "What is the chilled-water temperature?",
        "What is the pipe diameter?",
        "What insulation thickness is required?",
        "What foam density is required?",
        "What thermal conductivity is required?",
      ],
    },

    lngInsulation: {
      application: "LNG / Cryogenic Insulation",

      preferredFamilies: [
        "Application-specific rigid polyester polyols",
      ],

      requirements: [
        "Cryogenic temperature resistance",
        "Low thermal conductivity",
        "Dimensional stability",
        "Mechanical integrity",
        "Adhesion",
        "Moisture resistance",
      ],

      questions: [
        "What is the minimum operating temperature?",
        "What insulation system is being used?",
        "What density is required?",
        "What thermal conductivity is required?",
        "What mechanical properties are required?",
        "What qualification standards apply?",
      ],

      aiRule:
        "Cryogenic performance must be validated experimentally. Do not infer cryogenic suitability from OH value alone.",
    },

    coatings: {
      application: "Polyurethane Coatings",

      preferredFamilies: [
        "Application-specific polyester polyols",
        "Selected polyether polyols",
      ],

      importantParameters: [
        "OH value",
        "Molecular weight",
        "Functionality",
        "Viscosity",
        "Acid value",
        "Solvent compatibility",
      ],

      requirements: [
        "Hardness",
        "Flexibility",
        "Adhesion",
        "Chemical resistance",
        "Abrasion resistance",
        "Weather resistance",
      ],

      questions: [
        "What substrate are you coating?",
        "Is the system 1K or 2K?",
        "Is it solventborne or waterborne?",
        "What hardness is required?",
        "What flexibility is required?",
        "What chemical resistance is required?",
        "What is your current polyol?",
      ],
    },

    adhesives: {
      application: "Polyurethane Adhesives",

      preferredFamilies: [
        "Polyester polyols",
        "Polyether polyols",
        "Specialty polyurethane polyols",
      ],

      requirements: [
        "Adhesion",
        "Flexibility",
        "Cure rate",
        "Hydrolytic stability",
        "Bond strength",
      ],

      questions: [
        "What substrates are being bonded?",
        "What type of adhesive is it?",
        "Is it 1K or 2K?",
        "What curing conditions are used?",
        "What bond strength is required?",
        "What flexibility is required?",
        "What is the current polyol?",
      ],
    },

    sealants: {
      application: "Polyurethane Sealants",

      preferredFamilies: [
        "Polyester polyols",
        "Polyether polyols",
      ],

      requirements: [
        "Elasticity",
        "Adhesion",
        "Weather resistance",
        "Hydrolytic stability",
        "Hardness",
        "Elongation",
      ],

      questions: [
        "Is the system 1K or 2K?",
        "What substrates are involved?",
        "What Shore hardness is required?",
        "What elongation is required?",
        "What environmental exposure is expected?",
      ],
    },

    castingElastomer: {
      application: "Casting Polyurethane Elastomers",

      preferredFamilies: [
        "Polyester polyols",
        "Polyether polyols",
        "Application-specific elastomer polyols",
      ],

      requirements: [
        "Shore hardness",
        "Tensile strength",
        "Elongation",
        "Tear strength",
        "Abrasion resistance",
        "Compression set",
        "Flexibility",
      ],

      importantParameters: [
        "OH value",
        "Molecular weight",
        "Functionality",
        "Isocyanate type",
        "NCO content",
        "NCO index",
        "Chain extender",
        "Cure conditions",
      ],

      questions: [
        "What Shore hardness do you require?",
        "Is the system aromatic or aliphatic?",
        "Which isocyanate are you using?",
        "What is the NCO content?",
        "Are you using BDO or another chain extender?",
        "What is your current polyol?",
        "What tensile strength is required?",
        "What elongation is required?",
        "What abrasion resistance is required?",
      ],

      aiRule:
        "A Shore hardness such as Shore D 60–80 cannot by itself determine the correct polyol formulation.",
    },

    flexibleFoam: {
      application: "Flexible Polyurethane Foam",

      preferredFamilies: [
        "Polyether polyols",
        "Selected recycled polyether polyols",
      ],

      requirements: [
        "Density",
        "Hardness",
        "Resilience",
        "Compression set",
        "Cell structure",
        "Processing consistency",
      ],

      questions: [
        "What foam density is required?",
        "What hardness is required?",
        "What resilience is required?",
        "What is the current polyol?",
        "What isocyanate is being used?",
        "What blowing system is used?",
      ],
    },

    footwear: {
      application: "PU Footwear",

      preferredFamilies: [
        "Polyester polyols",
        "Polyether polyols",
        "Elastomer polyols",
      ],

      requirements: [
        "Hardness",
        "Flexibility",
        "Abrasion resistance",
        "Tear strength",
        "Hydrolytic stability",
        "Low-temperature flexibility",
      ],

      questions: [
        "What component are you manufacturing?",
        "What hardness is required?",
        "What density is required?",
        "What abrasion resistance is required?",
        "What is your current polyol?",
        "What isocyanate are you using?",
      ],
    },

    textileCoating: {
      application: "PU Textile Coating",

      preferredFamilies: [
        "Polyester polyols",
        "Polyether polyols",
        "Specialty coating polyols",
      ],

      requirements: [
        "Flexibility",
        "Adhesion",
        "Abrasion resistance",
        "Hydrolysis resistance",
        "Soft hand feel",
        "Chemical resistance",
      ],

      questions: [
        "What substrate are you coating?",
        "Is the system solventborne or waterborne?",
        "What hardness is required?",
        "What flexibility is required?",
        "What is the current polyol?",
        "What performance problem are you trying to solve?",
      ],
    },

    electricalInsulation: {
      application: "Electrical Insulation / Encapsulation",

      preferredFamilies: [
        "Application-specific polyester polyols",
        "Specialty polyurethane polyols",
      ],

      requirements: [
        "Dielectric properties",
        "Thermal stability",
        "Adhesion",
        "Moisture resistance",
        "Dimensional stability",
      ],

      questions: [
        "What component is being insulated?",
        "What dielectric requirements apply?",
        "What operating temperature is expected?",
        "What cure system is used?",
        "What is the current formulation?",
        "What standards are required?",
      ],
    },
  },

  propertyBasedSelection: {
    hydroxylValue: {
      lowOH: {
        range: "Approximately 30–150 mg KOH/g",

        potentialApplications: [
          "Flexible systems",
          "Elastomeric systems",
          "Selected coatings",
          "Selected adhesives",
          "Higher molecular-weight polyol systems",
        ],

        rule:
          "Low OH value generally indicates higher equivalent weight, but functionality and molecular structure must also be considered.",
      },

      mediumOH: {
        range: "Approximately 150–300 mg KOH/g",

        potentialApplications: [
          "Elastomers",
          "Coatings",
          "Adhesives",
          "Selected rigid systems",
        ],
      },

      highOH: {
        range: "Approximately 300–600 mg KOH/g",

        potentialApplications: [
          "Rigid foam",
          "PIR/PUR systems",
          "High-functionality polyurethane systems",
        ],

        rule:
          "High OH value can be useful for rigid polyurethane systems but does not automatically make a polyol suitable for rigid foam.",
      },
    },

    functionality: {
      low: {
        approximateRange: "2–3",

        potentialApplications: [
          "Elastomers",
          "Flexible systems",
          "Selected coatings",
          "Selected adhesives",
        ],
      },

      medium: {
        approximateRange: "3–5",

        potentialApplications: [
          "Rigid foam",
          "Coatings",
          "Adhesives",
          "Elastomers depending on formulation",
        ],
      },

      high: {
        approximateRange: "5–8+",

        potentialApplications: [
          "Rigid foam",
          "Highly crosslinked systems",
          "Selected insulation systems",
        ],

        rule:
          "High functionality generally increases crosslinking potential.",
      },
    },

    viscosity: {
      low: {
        description:
          "Lower-viscosity materials may be easier to pump, meter and mix.",
      },

      medium: {
        description:
          "Moderate viscosity can provide a balance between handling and formulation properties.",
      },

      high: {
        description:
          "High-viscosity materials may require temperature control or specialized handling equipment.",
      },

      rule:
        "Viscosity must always be interpreted together with measurement temperature.",
    },
  },

  recycledContentSelection: {
    objective:
      "Determine how much recycled content the customer wants to introduce into their polyurethane system.",

    levels: {
      low: {
        description:
          "Customer wants a partial recycled-content replacement.",

        strategy:
          "Start with a controlled partial replacement and compare formulation performance.",
      },

      medium: {
        description:
          "Customer wants substantial recycled content while maintaining existing performance.",

        strategy:
          "Use a structured substitution trial and optimize formulation as required.",
      },

      high: {
        description:
          "Customer wants maximum possible recycled content.",

        strategy:
          "Requires application-specific formulation development and performance validation.",
      },

      veryHigh: {
        description:
          "Customer targets recycled content approaching 90% or higher.",

        strategy:
          "Treat as a formulation-development project rather than a simple drop-in replacement.",
      },
    },

    aiRule:
      "Never promise that a customer can replace 100% of their existing polyol with an Enviol recycled polyol without validation.",
  },

  dropInReplacementLogic: {
    objective:
      "Determine whether the customer is looking for a drop-in replacement.",

    requiredInformation: [
      "Current product name",
      "Current manufacturer",
      "OH value",
      "Functionality",
      "Viscosity",
      "Acid value",
      "Water content",
      "Application",
      "Isocyanate",
      "Processing conditions",
    ],

    confidenceLevels: {
      high:
        "Current product and technical specifications are known and closely match a verified Enviol grade.",

      medium:
        "Application and major technical parameters are known but some information is missing.",

      low:
        "Only application or product name is known.",

      none:
        "There is insufficient information to identify a meaningful candidate.",
    },

    aiRule:
      "Never state that an Enviol product is a drop-in replacement solely because its OH value is similar.",
  },

  recommendationScoring: {
    purpose:
      "Internal reasoning framework for ranking potential product candidates.",

    criteria: {
      applicationMatch: {
        weight: 30,

        description:
          "How closely the product family matches the customer's application.",
      },

      ohValueMatch: {
        weight: 15,

        description:
          "Compatibility with the customer's target OH value.",
      },

      functionalityMatch: {
        weight: 15,

        description:
          "Compatibility with the required functionality.",
      },

      viscosityMatch: {
        weight: 10,

        description:
          "Compatibility with processing requirements.",
      },

      performanceMatch: {
        weight: 15,

        description:
          "Compatibility with required final properties.",
      },

      processCompatibility: {
        weight: 10,

        description:
          "Compatibility with customer equipment and processing conditions.",
      },

      sustainabilityMatch: {
        weight: 5,

        description:
          "Alignment with the customer's recycled-content requirements.",
      },
    },

    interpretation: {
      "85-100":
        "Strong candidate, subject to technical validation.",

      "70-84":
        "Potential candidate; additional technical information or trial required.",

      "50-69":
        "Weak or uncertain candidate; more information required.",

      below50:
        "Do not recommend a specific grade; gather more information.",
    },

    importantRule:
      "The scoring system is a reasoning aid, not laboratory validation and must not be presented to customers as a certified compatibility score.",
  },

  enquiryQualification: {
    minimumTechnicalInformation: [
      "Customer name",
      "Industry",
      "Application",
      "Current material",
      "Current supplier",
      "Current OH value where relevant",
      "Required OH value where known",
      "Target performance",
      "Monthly or annual consumption",
    ],

    additionalInformationByApplication: {
      rigidFoam: [
        "Density",
        "Thermal conductivity",
        "Isocyanate",
        "NCO index",
        "Blowing agent",
      ],

      coatings: [
        "Substrate",
        "1K/2K",
        "Solvent/waterborne",
        "Hardness",
        "Flexibility",
      ],

      adhesives: [
        "Substrate",
        "1K/2K",
        "Curing conditions",
        "Bond strength",
      ],

      elastomers: [
        "Shore hardness",
        "Isocyanate",
        "NCO content",
        "Chain extender",
        "Tensile strength",
        "Elongation",
      ],

      insulation: [
        "Operating temperature",
        "Density",
        "Thickness",
        "Thermal conductivity",
        "Compressive strength",
      ],
    },
  },

  sampleRecommendation: {
    whenToRecommend: [
      "Customer has a technically relevant application.",
      "Basic requirements are known.",
      "Potential product family has been identified.",
      "Laboratory or production trial is feasible.",
    ],

    beforeSample: [
      "Confirm target application.",
      "Confirm required technical properties.",
      "Confirm customer quantity.",
      "Confirm packaging requirement.",
      "Confirm sample quantity.",
      "Confirm whether customer can conduct formulation trials.",
    ],

    aiResponseStyle:
      "Recommend a sample as a technical trial, not as a guaranteed solution.",
  },

  redFlags: {
    insufficientInformation: [
      "Customer only provides an industry name.",
      "Customer asks for a polyol without specifying application.",
      "Customer provides only Shore hardness.",
      "Customer provides only price target.",
      "Customer provides only a competitor product name.",
    ],

    highRiskClaims: [
      "Guaranteed drop-in replacement",
      "Guaranteed fire rating",
      "Guaranteed cryogenic performance",
      "Guaranteed automotive approval",
      "Guaranteed electrical insulation performance",
      "Guaranteed 100% replacement",
      "Guaranteed exact reverse-engineered formulation",
    ],

    responseStrategy:
      "Explain what can be inferred, identify what cannot be confirmed, and ask for the missing information.",
  },

  customerQuestionTemplates: {
    firstResponse: [
      "What is the exact application of the polyol?",
      "What product are you manufacturing?",
      "What polyol are you currently using?",
      "What is the current OH value?",
      "What performance are you trying to achieve?",
    ],

    technicalFollowUp: [
      "What is the required OH value?",
      "What viscosity range is acceptable?",
      "What is the target functionality?",
      "Which isocyanate are you using?",
      "What is the NCO content?",
      "What is the NCO index?",
      "Are you using a chain extender?",
    ],

    commercialFollowUp: [
      "What is your monthly requirement?",
      "What is your annual consumption?",
      "What packaging do you require?",
      "Are you looking for regular supply?",
      "Would you like to evaluate a sample?",
    ],
  },

  aiDecisionRules: {
    rule1:
      "Application comes before product selection.",

    rule2:
      "Technical similarity does not equal formulation compatibility.",

    rule3:
      "Never invent an Enviol grade.",

    rule4:
      "Never invent technical specifications.",

    rule5:
      "Never claim customer approval, certification or qualification without verified information.",

    rule6:
      "Use customer-provided competitor product names as reference information, not as proof of equivalent chemistry.",

    rule7:
      "If a customer asks for reverse engineering, explain that exact composition cannot be confirmed without analytical data.",

    rule8:
      "When the customer provides OH value and application, use them as starting points rather than the complete selection criteria.",

    rule9:
      "When the customer asks for a sample, first qualify the application enough to avoid sending an inappropriate grade.",

    rule10:
      "When several product families may work, present them as candidates and explain what information is needed to narrow the choice.",

    rule11:
      "If a customer has a specific competitor grade, compare verified specifications rather than assuming equivalence.",

    rule12:
      "For technically complex enquiries, prioritize collecting data over giving an immediate product recommendation.",
  },
};

export default selection;