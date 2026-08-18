// lib/eny/applications.js

export const applications = {
  metadata: {
    title: "Enviol Polyol Applications Knowledge",
    purpose:
      "Application-specific knowledge for selecting and discussing Enviol polyester and polyether polyols across polyurethane and CASE applications.",

    importantRule:
      "Application suitability is not determined by application name alone. The AI must consider formulation chemistry, required properties, processing conditions and customer specifications before recommending a specific grade.",

    recommendationRule:
      "The AI may identify a suitable product family or development direction, but must not guarantee final formulation performance without customer trials and technical validation.",
  },

  overview: {
    majorApplicationCategories: [
      "Rigid polyurethane foam",
      "PIR insulation",
      "PUR insulation",
      "Cold-storage insulation",
      "Refrigeration insulation",
      "District-cooling insulation",
      "LNG insulation",
      "Oil and gas insulation",
      "Pipeline insulation",
      "Construction insulation",
      "Industrial thermal insulation",
      "Coatings",
      "Polyurethane adhesives",
      "Polyurethane dispersions",
      "Casting elastomers",
      "TPU-related applications",
      "Sealants",
      "Flexible polyurethane foam",
      "CASE applications",
    ],
  },

  rigidFoam: {
    name: "Rigid Polyurethane Foam",

    category: "Rigid Foam",

    description:
      "Rigid polyurethane foam is a crosslinked cellular polyurethane material widely used for thermal insulation and structural applications.",

    preferredPolyolFamily:
      "Polyester polyols are commonly relevant for rigid polyurethane foam, although the final choice depends on the formulation.",

    typicalPolyolCharacteristics: {
      hydroxylValue:
        "Approximately 200–500 mg KOH/g may be relevant depending on the formulation and target foam properties.",

      functionality:
        "Higher functionality can contribute to increased crosslink density and rigid foam structure.",

      viscosity:
        "Should be suitable for the customer's mixing and processing equipment.",

      waterContent:
        "Typically kept low because water reacts with isocyanate and affects foam formation.",

      acidValue:
        "Generally kept low to support predictable polyurethane reaction behavior.",
    },

    desiredPerformance: [
      "Low thermal conductivity",
      "Dimensional stability",
      "Adequate compressive strength",
      "Good adhesion where required",
      "Controlled cell structure",
      "Suitable density",
      "Fire-performance compatibility where required",
      "Processing compatibility",
    ],

    customerInputsRequired: [
      "Target foam density",
      "Target thermal conductivity",
      "Target compressive strength",
      "Desired OH value",
      "Isocyanate type",
      "Isocyanate index",
      "Blowing-agent system",
      "Catalyst system",
      "Surfactant system",
      "Processing method",
      "Desired recycled content",
    ],

    aiQuestions: [
      "What type of rigid foam are you manufacturing?",
      "What foam density are you targeting?",
      "What OH value are you currently using?",
      "Which isocyanate are you using?",
      "What is your current polyol formulation?",
      "What thermal conductivity do you need?",
      "Do you require a specific recycled content?",
    ],
  },

  pirFoam: {
    name: "PIR Foam",

    category: "Rigid Insulation",

    description:
      "Polyisocyanurate (PIR) foam is a highly crosslinked polyurethane-related insulation material commonly used where high thermal insulation and improved fire performance are required.",

    preferredPolyolFamily:
      "Polyester polyols can be particularly relevant to PIR formulations.",

    polyolConsiderations: [
      "Hydroxyl value",
      "Functionality",
      "Aromatic content",
      "Viscosity",
      "Acid value",
      "Water content",
      "Reactivity",
      "Compatibility with the customer's PIR formulation",
    ],

    targetProperties: [
      "Thermal insulation",
      "Dimensional stability",
      "Compressive strength",
      "Fire performance",
      "Adhesion",
      "Controlled cell structure",
    ],

    formulationConsiderations: [
      "High isocyanate index may be used depending on formulation",
      "Catalyst selection is important",
      "Blowing-agent selection affects thermal performance",
      "Surfactant selection affects cell structure",
      "Polyol functionality influences network formation",
    ],

    aiRule:
      "Do not provide a fixed PIR formulation based only on the requested OH value. Ask for the customer's existing formulation and processing conditions before suggesting formulation changes.",
  },

  purFoam: {
    name: "PUR Foam",

    category: "Rigid Insulation",

    preferredPolyolFamily:
      "Polyester polyols and polyether polyols depending on the desired properties.",

    relevantProperties: [
      "OH value",
      "Functionality",
      "Viscosity",
      "Water content",
      "Reactivity",
      "Compatibility",
      "Thermal conductivity",
      "Dimensional stability",
    ],

    applications: [
      "Insulated panels",
      "Refrigeration",
      "Cold storage",
      "Construction insulation",
      "Pipe insulation",
      "Industrial equipment insulation",
    ],
  },

  refrigeration: {
    name: "Refrigeration Insulation",

    category: "Thermal Insulation",

    description:
      "Polyurethane and PIR systems are widely used as thermal insulation materials in refrigeration equipment and systems.",

    relevantPolyolFamily:
      "Rigid-foam polyester polyols.",

    performanceRequirements: [
      "Low thermal conductivity",
      "Dimensional stability",
      "Good adhesion",
      "Controlled foam density",
      "Mechanical integrity",
      "Low-temperature performance",
      "Processing consistency",
    ],

    customerInputsRequired: [
      "Refrigeration equipment type",
      "Insulation thickness",
      "Target density",
      "Current polyol",
      "Current isocyanate",
      "Blowing agent",
      "Thermal conductivity requirement",
      "Processing temperature",
      "Mould or continuous-process method",
    ],
  },

  coldStorage: {
    name: "Cold Storage Insulation",

    category: "Thermal Insulation",

    description:
      "Rigid polyurethane and PIR insulation systems can be used in cold-storage panels, rooms and related thermal insulation structures.",

    preferredPolyolFamily:
      "Rigid-foam polyester polyols.",

    importantProperties: [
      "Thermal conductivity",
      "Compressive strength",
      "Dimensional stability",
      "Adhesion",
      "Cell structure",
      "Moisture resistance",
    ],

    customerInputsRequired: [
      "Panel type",
      "Target density",
      "Insulation thickness",
      "Current formulation",
      "Target thermal conductivity",
      "Required mechanical strength",
      "Operating temperature",
    ],
  },

  districtCooling: {
    name: "District Cooling Insulation",

    category: "Thermal Insulation",

    description:
      "District cooling systems require reliable thermal insulation around chilled-water distribution infrastructure to reduce heat gain and maintain energy efficiency.",

    relevantPolyolFamily:
      "Rigid polyester polyols for PU insulation systems.",

    importantProperties: [
      "Low thermal conductivity",
      "Dimensional stability",
      "Moisture resistance",
      "Compressive strength",
      "Adhesion",
      "Long-term insulation performance",
    ],

    customerInputsRequired: [
      "Pipe diameter",
      "Insulation thickness",
      "Operating temperature",
      "Pipe insulation system",
      "Foam density",
      "Current PU system",
      "Thermal conductivity target",
    ],
  },

  lngInsulation: {
    name: "LNG Insulation",

    category: "Cryogenic Insulation",

    description:
      "LNG insulation systems operate under demanding cryogenic conditions and require materials capable of maintaining dimensional and mechanical integrity under low temperatures.",

    relevantPolyolFamily:
      "Application-specific rigid polyester polyols.",

    criticalConsiderations: [
      "Cryogenic temperature exposure",
      "Thermal conductivity",
      "Dimensional stability",
      "Mechanical strength",
      "Adhesion",
      "Moisture resistance",
      "Long-term durability",
    ],

    aiRule:
      "Do not claim that an Enviol grade is LNG-certified or cryogenically qualified unless the relevant qualification, test data or certification is explicitly available.",

    customerInputsRequired: [
      "Operating temperature",
      "Insulation system",
      "Foam type",
      "Foam density",
      "Thermal conductivity target",
      "Mechanical requirements",
      "Current formulation",
      "Required certification or qualification",
    ],
  },

  oilAndGasInsulation: {
    name: "Oil & Gas Insulation",

    category: "Industrial Insulation",

    description:
      "Polyurethane and related insulation systems can be used in oil and gas infrastructure where thermal insulation, mechanical integrity and environmental durability are important.",

    relevantPolyolFamily:
      "Rigid polyester polyols for application-specific polyurethane insulation systems.",

    relevantProperties: [
      "Thermal conductivity",
      "Compressive strength",
      "Dimensional stability",
      "Adhesion",
      "Water resistance",
      "Chemical resistance",
      "Temperature resistance",
    ],

    customerInputsRequired: [
      "Application type",
      "Operating temperature",
      "Pipe or equipment geometry",
      "Insulation thickness",
      "Foam density",
      "Current system",
      "Required mechanical properties",
      "Required standards or approvals",
    ],

    aiRule:
      "Do not claim compliance with oil-and-gas standards or customer specifications unless the relevant data has been verified.",
  },

  pipelineInsulation: {
    name: "Pipeline Insulation",

    category: "Industrial Thermal Insulation",

    description:
      "Polyurethane and related rigid foam systems are used for thermal insulation of pipelines where low thermal conductivity, mechanical strength and long-term dimensional stability are required.",

    relevantPolyolFamily:
      "Rigid polyester polyols.",

    typicalDevelopmentParameters: {
      hydroxylValue: "Approximately 200–500 mg KOH/g",
      functionality: "Approximately 2–8",
      viscosity: "Approximately 500–12,000 cP",
      waterContent: "Typically below 0.2%",
      acidValue: "Generally below 5 mg KOH/g",
    },

    performanceRequirements: [
      "Low thermal conductivity",
      "High compressive strength",
      "Dimensional stability",
      "Good adhesion",
      "Low water absorption",
      "Resistance to operating temperatures",
      "Long-term durability",
    ],

    customerInputsRequired: [
      "Pipeline service",
      "Operating temperature",
      "Pipe diameter",
      "Insulation thickness",
      "Foam density",
      "Current polyol",
      "Current isocyanate",
      "Required thermal conductivity",
      "Required compressive strength",
      "Applicable standards",
    ],

    aiRule:
      "The stated development parameters are general application-oriented ranges and must not automatically be represented as the specification of a particular Enviol product.",
  },

  constructionInsulation: {
    name: "Construction Insulation",

    category: "Building Insulation",

    applications: [
      "Insulated panels",
      "Roof insulation",
      "Wall insulation",
      "Building envelope insulation",
      "Spray insulation",
      "Thermal insulation boards",
    ],

    relevantPolyolFamily:
      "Rigid polyester polyols and application-specific polyurethane polyols.",

    relevantProperties: [
      "Thermal conductivity",
      "Density",
      "Compressive strength",
      "Dimensional stability",
      "Fire performance",
      "Adhesion",
      "Processing characteristics",
    ],
  },

  coatings: {
    name: "Polyurethane Coatings",

    category: "CASE",

    description:
      "Polyurethane coatings use polyols and isocyanates to form protective and decorative polymeric films with application-specific mechanical and chemical properties.",

    preferredPolyolFamily:
      "Application-specific polyester polyols, with polyether systems considered where appropriate.",

    relevantPolyolProperties: [
      "Hydroxyl value",
      "Molecular weight",
      "Functionality",
      "Viscosity",
      "Acid value",
      "Water content",
      "Backbone chemistry",
      "Flexibility",
      "Hardness",
      "Reactivity",
    ],

    applicationTypes: [
      "Industrial coatings",
      "Protective coatings",
      "Metal coatings",
      "Wood coatings",
      "Textile coatings",
      "Automotive-related coatings",
      "Floor coatings",
      "General polyurethane coatings",
    ],

    customerInputsRequired: [
      "1K or 2K system",
      "Solventborne or waterborne",
      "Substrate",
      "Desired hardness",
      "Desired flexibility",
      "Chemical resistance requirement",
      "Abrasion resistance requirement",
      "Cure conditions",
      "Current polyol",
      "Current isocyanate",
    ],

    aiRule:
      "Do not assume that a polyester polyol suitable for rigid foam is automatically suitable for polyurethane coatings.",
  },

  adhesives: {
    name: "Polyurethane Adhesives",

    category: "CASE",

    description:
      "Polyurethane adhesives use reactive polyols and isocyanates to create adhesive systems for a wide variety of substrates.",

    relevantPolyolFamily:
      "Application-specific polyester and polyether polyols.",

    relevantProperties: [
      "Hydroxyl value",
      "Molecular weight",
      "Functionality",
      "Viscosity",
      "Flexibility",
      "Tack",
      "Adhesion",
      "Cure rate",
      "Chemical resistance",
      "Hydrolytic stability",
    ],

    applications: [
      "Lamination",
      "Textile bonding",
      "Packaging",
      "Automotive components",
      "Footwear",
      "Industrial bonding",
      "Composite bonding",
    ],

    customerInputsRequired: [
      "Substrates",
      "1K or 2K system",
      "Solventborne, waterborne or solvent-free",
      "Required open time",
      "Cure temperature",
      "Desired flexibility",
      "Bond strength requirement",
      "Current polyol",
      "Current isocyanate",
    ],
  },

  polyurethaneDispersions: {
    name: "Polyurethane Dispersions",

    category: "CASE",

    description:
      "Polyurethane dispersions are waterborne polyurethane systems used in coatings, adhesives, textile finishing and related applications.",

    relevantPolyolFamily:
      "Specialized polyester or polyether polyols designed for polyurethane dispersion synthesis.",

    importantProperties: [
      "Molecular weight",
      "Hydroxyl value",
      "Functionality",
      "Backbone chemistry",
      "Hydrolytic stability",
      "Compatibility",
      "Viscosity",
      "Reactive group content",
    ],

    aiRule:
      "PUD development generally requires more detailed polymer-design information than simple OH-value matching. The AI should collect the customer's existing synthesis route and target dispersion properties before recommending a grade.",
  },

  castingElastomers: {
    name: "Casting Polyurethane Elastomers",

    category: "Elastomers",

    description:
      "Casting polyurethane elastomers are formed by reacting polyol components with isocyanates and are used where flexible to rigid elastomeric mechanical properties are required.",

    relevantPolyolFamily:
      "Application-specific polyester or polyether polyols.",

    relevantProperties: [
      "Hydroxyl value",
      "Molecular weight",
      "Functionality",
      "Glycol structure",
      "Viscosity",
      "Hardness",
      "Tensile strength",
      "Elongation",
      "Tear strength",
      "Abrasion resistance",
      "Compression set",
      "Hydrolytic stability",
    ],

    hardnessRange:
      "Can range from very soft elastomeric systems to hard elastomers depending on formulation.",

    customerInputsRequired: [
      "Target Shore hardness",
      "Aromatic or aliphatic isocyanate",
      "NCO content",
      "Polyol OH value",
      "Polyol molecular weight",
      "Glycol or chain extender",
      "Mixing ratio",
      "Cure temperature",
      "Post-cure requirement",
      "Tensile requirement",
      "Elongation requirement",
      "Tear requirement",
      "Abrasion requirement",
    ],

    aiRule:
      "Do not select a polyester polyol solely from Shore hardness. Hardness is a system-level property determined by polyol, isocyanate, chain extender, crosslinking and processing conditions.",
  },

  tpu: {
    name: "Thermoplastic Polyurethane",

    category: "TPU",

    description:
      "TPU is a thermoplastic polyurethane material produced from polyols, diisocyanates and chain extenders.",

    relevantPolyolFamily:
      "Application-specific polyester or polyether polyols.",

    importantProperties: [
      "Molecular weight",
      "Hydroxyl value",
      "Functionality",
      "Hard-segment content",
      "Soft-segment chemistry",
      "Melting behavior",
      "Hydrolytic stability",
      "Mechanical properties",
    ],

    customerInputsRequired: [
      "TPU hardness",
      "Polyol type",
      "Polyol molecular weight",
      "Diisocyanate type",
      "Chain extender",
      "Hard-segment ratio",
      "Processing temperature",
      "Target mechanical properties",
    ],
  },

  sealants: {
    name: "Polyurethane Sealants",

    category: "CASE",

    relevantPolyolFamily:
      "Application-specific polyester and polyether polyols.",

    relevantProperties: [
      "Molecular weight",
      "Hydroxyl value",
      "Functionality",
      "Viscosity",
      "Flexibility",
      "Adhesion",
      "Weather resistance",
      "Hydrolytic stability",
      "Cure characteristics",
    ],

    customerInputsRequired: [
      "One-component or two-component",
      "Substrate",
      "Required elongation",
      "Hardness",
      "Cure conditions",
      "Moisture exposure",
      "Weathering requirements",
      "Current formulation",
    ],
  },

  flexibleFoam: {
    name: "Flexible Polyurethane Foam",

    category: "Flexible Foam",

    description:
      "Flexible polyurethane foams are commonly produced using polyether-based systems, although polyester chemistry can be used in selected applications.",

    preferredPolyolFamily:
      "Polyether polyols and selected recycled polyether/polyester systems.",

    relevantProperties: [
      "Hydroxyl value",
      "Functionality",
      "Molecular weight",
      "Viscosity",
      "Reactivity",
      "Density",
      "Cell structure",
      "Flexibility",
    ],

    customerInputsRequired: [
      "Foam density",
      "Hardness",
      "Current polyol",
      "Isocyanate",
      "Blowing system",
      "Catalyst system",
      "Target resilience",
      "Processing method",
    ],
  },

  case: {
    name: "CASE Applications",

    abbreviation:
      "Coatings, Adhesives, Sealants and Elastomers",

    description:
      "CASE is a major application group for polyurethane chemistry and includes coatings, adhesives, sealants and elastomer systems.",

    applicationCategories: [
      "Coatings",
      "Adhesives",
      "Sealants",
      "Elastomers",
    ],

    selectionFactors: [
      "Polyol chemistry",
      "Hydroxyl value",
      "Molecular weight",
      "Functionality",
      "Viscosity",
      "Backbone structure",
      "Hydrolytic stability",
      "Chemical resistance",
      "Mechanical requirements",
      "Processing method",
    ],

    aiRule:
      "For CASE applications, the AI should generally ask for the customer's current formulation and target performance before making a specific product recommendation.",
  },

  applicationSelection: {
    rigidFoam: {
      likelyFamily: "Polyester Polyol",
      priorityParameters: [
        "OH value",
        "Functionality",
        "Viscosity",
        "Water content",
        "Acid value",
      ],
    },

    pir: {
      likelyFamily: "Polyester Polyol",
      priorityParameters: [
        "OH value",
        "Functionality",
        "Aromatic structure",
        "Reactivity",
        "Viscosity",
      ],
    },

    coatings: {
      likelyFamily: "Polyester Polyol",
      alternativeFamily: "Polyether Polyol",
      priorityParameters: [
        "OH value",
        "Molecular weight",
        "Functionality",
        "Viscosity",
        "Compatibility",
      ],
    },

    adhesives: {
      likelyFamily: "Polyester or Polyether Polyol",
      priorityParameters: [
        "Molecular weight",
        "OH value",
        "Functionality",
        "Viscosity",
        "Flexibility",
        "Adhesion",
      ],
    },

    elastomers: {
      likelyFamily: "Polyester or Polyether Polyol",
      priorityParameters: [
        "Molecular weight",
        "OH value",
        "Functionality",
        "Hardness",
        "Mechanical requirements",
        "Isocyanate chemistry",
      ],
    },

    sealants: {
      likelyFamily: "Polyester or Polyether Polyol",
      priorityParameters: [
        "Molecular weight",
        "OH value",
        "Functionality",
        "Flexibility",
        "Hydrolytic stability",
      ],
    },

    flexibleFoam: {
      likelyFamily: "Polyether Polyol",
      alternativeFamily: "Polyester Polyol",
      priorityParameters: [
        "Molecular weight",
        "OH value",
        "Functionality",
        "Reactivity",
        "Foam density",
      ],
    },
  },

  customerQualification: {
    universalQuestions: [
      "What is your application?",
      "What polyol are you currently using?",
      "What OH value are you currently using?",
      "What viscosity do you require?",
      "What is the desired final product performance?",
      "What is your monthly or annual consumption?",
      "What is your required recycled content?",
      "Are you looking for an existing grade or a customized grade?",
    ],

    rigidFoamQuestions: [
      "What type of foam are you producing?",
      "What density are you targeting?",
      "What OH value is your current polyol?",
      "Which isocyanate are you using?",
      "What is your isocyanate index?",
      "What blowing agent are you using?",
      "What thermal conductivity are you targeting?",
    ],

    coatingQuestions: [
      "What type of coating are you making?",
      "Is it 1K or 2K?",
      "Is it solventborne or waterborne?",
      "What substrate are you coating?",
      "What hardness and flexibility are required?",
      "What chemical or abrasion resistance is required?",
    ],

    adhesiveQuestions: [
      "What substrates are you bonding?",
      "Is the system 1K or 2K?",
      "What cure conditions are used?",
      "What bond strength is required?",
      "What flexibility is required?",
      "What is your current polyol?",
    ],

    elastomerQuestions: [
      "What Shore hardness do you need?",
      "Which isocyanate are you using?",
      "What is the NCO content?",
      "Are you using a chain extender?",
      "What tensile strength is required?",
      "What elongation is required?",
      "What tear and abrasion resistance are required?",
      "What is the casting and curing process?",
    ],
  },

  aiGuidance: {
    recommendationLanguage:
      "Use language such as 'potentially suitable', 'likely suitable', 'a good starting point' or 'we would need to validate this formulation' when the recommendation has not been experimentally confirmed.",

    avoidAbsoluteClaims: [
      "Guaranteed performance",
      "Guaranteed compatibility",
      "Guaranteed certification",
      "Guaranteed fire rating",
      "Guaranteed thermal conductivity",
      "Guaranteed mechanical properties",
      "Guaranteed regulatory compliance",
    ],

    technicalValidation:
      "Final application suitability should be confirmed through laboratory or customer trials using the customer's complete formulation and processing conditions.",

    enquiryEscalation:
      "If a customer has a technically complex requirement, insufficient information or a request for a customized grade, collect the relevant technical details and move the conversation toward an Enviol technical enquiry.",
  },
};

export default applications;