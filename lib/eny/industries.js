 // lib/eny/industries.js

export const industries = {
  metadata: {
    title: "Enviol Industry Knowledge",
    purpose:
      "Industry-specific knowledge for identifying where Enviol polyester polyols and polyether polyols can be used and understanding the technical requirements of customers in each industry.",

    importantRule:
      "Industry identification alone is not sufficient for product selection. The AI must identify the customer's specific application and technical requirements before recommending a product.",

    commercialRule:
      "Do not claim that Enviol is an approved supplier, certified supplier or qualified material for a particular company, project or industry standard unless verified information is available.",
  },

  overview: {
    primaryIndustries: [
      "Polyurethane manufacturing",
      "Rigid foam",
      "PIR/PUR insulation",
      "Refrigeration",
      "Cold storage",
      "Construction",
      "Pipeline insulation",
      "Oil and gas",
      "LNG and cryogenic insulation",
      "District cooling",
      "Industrial insulation",
      "Coatings",
      "Adhesives",
      "Sealants",
      "Elastomers",
      "Automotive",
      "Footwear",
      "Furniture and flexible foam",
      "Textile and synthetic leather",
      "Electrical insulation",
      "Composite materials",
    ],
  },

  polyurethaneManufacturing: {
    name: "Polyurethane Manufacturing",

    description:
      "Manufacturers producing polyurethane products are the core potential customer base for Enviol polyols.",

    applications: [
      "Rigid foam",
      "Flexible foam",
      "PIR foam",
      "PU coatings",
      "PU adhesives",
      "PU sealants",
      "Casting elastomers",
      "TPU",
      "Other CASE applications",
    ],

    relevantProductFamilies: [
      "Recycled polyester polyols",
      "Recycled polyether polyols",
      "Application-specific polyol grades",
    ],

    customerRequirements: [
      "Consistent OH value",
      "Consistent viscosity",
      "Low acid value",
      "Low water content",
      "Consistent batch quality",
      "Reliable supply",
      "Technical support",
      "Compatibility with existing formulations",
    ],

    qualificationQuestions: [
      "What polyurethane product do you manufacture?",
      "What polyol are you currently using?",
      "What is your current OH value?",
      "What is your monthly consumption?",
      "What is your required specification?",
      "Are you looking for recycled content?",
      "Do you need a drop-in replacement or a customized grade?",
    ],
  },

  rigidFoamIndustry: {
    name: "Rigid Foam Industry",

    description:
      "Manufacturers of rigid polyurethane foam use polyols and isocyanates to produce thermally insulating rigid foam products.",

    applications: [
      "Insulation panels",
      "Construction insulation",
      "Refrigeration",
      "Cold storage",
      "Pipe insulation",
      "Industrial equipment insulation",
      "Spray rigid foam",
    ],

    preferredProductFamily:
      "Recycled polyester polyols",

    relevantProperties: [
      "OH value",
      "Functionality",
      "Viscosity",
      "Water content",
      "Acid value",
      "Reactivity",
      "Compatibility",
    ],

    performanceRequirements: [
      "Low thermal conductivity",
      "Dimensional stability",
      "Compressive strength",
      "Adhesion",
      "Controlled cell structure",
      "Suitable density",
    ],

    customerQuestions: [
      "What type of rigid foam do you manufacture?",
      "What density are you targeting?",
      "What OH value do you currently use?",
      "Which isocyanate do you use?",
      "What is your current formulation?",
      "What thermal conductivity do you target?",
      "What is your annual consumption?",
    ],
  },

  pirPurInsulation: {
    name: "PIR / PUR Insulation",

    description:
      "PIR and PUR insulation manufacturers are important potential users of polyester polyols because the polyol structure strongly influences foam properties and formulation behavior.",

    applications: [
      "PIR panels",
      "PUR panels",
      "Roof insulation",
      "Wall insulation",
      "Cold-room panels",
      "Industrial insulation",
      "Pipe insulation",
    ],

    preferredProductFamily:
      "Recycled polyester polyols",

    relevantProperties: [
      "OH value",
      "Functionality",
      "Aromatic structure",
      "Viscosity",
      "Water content",
      "Acid value",
      "Reactivity",
    ],

    customerRequirements: [
      "Thermal conductivity",
      "Fire performance",
      "Compressive strength",
      "Dimensional stability",
      "Density",
      "Adhesion",
    ],

    qualificationQuestions: [
      "Are you manufacturing PIR or PUR?",
      "What is your target density?",
      "What is your current polyol?",
      "What is your OH value?",
      "What is your isocyanate index?",
      "Which blowing agent do you use?",
      "What fire-performance requirement do you have?",
      "What recycled content are you targeting?",
    ],

    aiRule:
      "Never claim a specific Enviol grade has a particular fire rating unless verified test data exists.",
  },

  refrigerationIndustry: {
    name: "Refrigeration Industry",

    applications: [
      "Refrigerator insulation",
      "Freezer insulation",
      "Commercial refrigeration",
      "Industrial refrigeration",
      "Refrigerated equipment",
    ],

    preferredProductFamily:
      "Rigid polyester polyols",

    keyRequirements: [
      "Low thermal conductivity",
      "Dimensional stability",
      "Controlled foam density",
      "Good adhesion",
      "Mechanical integrity",
      "Low-temperature performance",
    ],

    customerQuestions: [
      "What refrigeration equipment do you manufacture?",
      "What foam density do you use?",
      "What is the insulation thickness?",
      "What is your current polyol?",
      "What thermal conductivity do you target?",
      "What blowing agent do you use?",
      "What processing equipment do you use?",
    ],
  },

  coldStorageIndustry: {
    name: "Cold Storage",

    applications: [
      "Cold rooms",
      "Cold-storage panels",
      "Freezer rooms",
      "Industrial cold storage",
      "Temperature-controlled warehouses",
    ],

    preferredProductFamily:
      "Rigid polyester polyols",

    keyRequirements: [
      "Low thermal conductivity",
      "Dimensional stability",
      "Compressive strength",
      "Moisture resistance",
      "Adhesion",
      "Long-term insulation performance",
    ],

    customerQuestions: [
      "What type of cold-storage panel do you manufacture?",
      "What density are you targeting?",
      "What insulation thickness do you require?",
      "What is your current formulation?",
      "What operating temperature is expected?",
      "What thermal conductivity is required?",
    ],
  },

  constructionIndustry: {
    name: "Construction",

    applications: [
      "Building insulation",
      "Roof insulation",
      "Wall insulation",
      "Insulated panels",
      "Spray polyurethane insulation",
      "Construction sealants",
      "Construction adhesives",
      "Protective coatings",
    ],

    relevantProductFamilies: [
      "Recycled polyester polyols",
      "Recycled polyether polyols",
      "Application-specific CASE polyols",
    ],

    requirements: [
      "Thermal insulation",
      "Mechanical strength",
      "Dimensional stability",
      "Adhesion",
      "Fire performance",
      "Weather resistance",
      "Moisture resistance",
    ],

    customerQuestions: [
      "What construction product are you manufacturing?",
      "Is the application insulation, adhesive, coating or sealant?",
      "What performance specification do you require?",
      "What is your current polyol?",
      "What recycled content are you targeting?",
    ],
  },

  pipelineIndustry: {
    name: "Pipeline Insulation",

    applications: [
      "District heating pipelines",
      "District cooling pipelines",
      "Industrial pipelines",
      "Oil and gas pipelines",
      "Process pipelines",
      "Pre-insulated pipes",
    ],

    preferredProductFamily:
      "Rigid polyester polyols",

    typicalDevelopmentParameters: {
      hydroxylValue: "200–500 mg KOH/g",
      functionality: "2–8",
      viscosity: "500–12,000 cP",
      waterContent: "Typically below 0.2%",
      acidValue: "Generally below 5 mg KOH/g",
    },

    performanceRequirements: [
      "Low thermal conductivity",
      "Compressive strength",
      "Dimensional stability",
      "Adhesion",
      "Low water absorption",
      "Temperature resistance",
      "Long-term durability",
    ],

    customerQuestions: [
      "What fluid is transported through the pipeline?",
      "What is the operating temperature?",
      "What is the pipe diameter?",
      "What insulation thickness is required?",
      "What foam density are you targeting?",
      "What thermal conductivity do you require?",
      "What is your current polyol?",
      "Which isocyanate are you using?",
      "Which standards or approvals are required?",
    ],

    aiRule:
      "The development parameters listed here are general application guidance and are not automatically the specification of any particular Enviol product.",
  },

  districtCoolingIndustry: {
    name: "District Cooling",

    applications: [
      "Chilled-water pipelines",
      "Pre-insulated chilled-water pipes",
      "District cooling networks",
      "Central cooling infrastructure",
    ],

    preferredProductFamily:
      "Rigid polyester polyols",

    keyRequirements: [
      "Low thermal conductivity",
      "Low water absorption",
      "Dimensional stability",
      "Compressive strength",
      "Adhesion",
      "Long-term durability",
    ],

    customerQuestions: [
      "What is the chilled-water temperature?",
      "What is the pipe diameter?",
      "What insulation thickness is required?",
      "What foam density are you targeting?",
      "What is your current polyurethane system?",
      "What thermal conductivity is required?",
    ],
  },

  oilAndGasIndustry: {
    name: "Oil & Gas",

    applications: [
      "Pipeline insulation",
      "Process equipment insulation",
      "Cryogenic insulation",
      "Protective coatings",
      "Industrial sealants",
      "Adhesives",
      "Elastomers",
    ],

    relevantProductFamilies: [
      "Rigid polyester polyols",
      "Application-specific polyester polyols",
      "CASE polyols",
    ],

    requirements: [
      "Temperature resistance",
      "Thermal insulation",
      "Mechanical strength",
      "Chemical resistance",
      "Dimensional stability",
      "Moisture resistance",
      "Long-term durability",
    ],

    customerQuestions: [
      "What is the exact application?",
      "What operating temperature is involved?",
      "What pressure and environmental conditions apply?",
      "What is the substrate?",
      "What is the current polyurethane system?",
      "What standards are required?",
      "Are certifications or project approvals required?",
    ],

    aiRule:
      "Do not claim compliance with oil-and-gas standards, project specifications or customer approvals without verified documentation.",
  },

  lngIndustry: {
    name: "LNG and Cryogenic Insulation",

    applications: [
      "LNG pipelines",
      "LNG storage",
      "Cryogenic process equipment",
      "Cryogenic pipe insulation",
    ],

    preferredProductFamily:
      "Application-specific rigid polyester polyols",

    criticalRequirements: [
      "Cryogenic temperature resistance",
      "Low thermal conductivity",
      "Dimensional stability",
      "Mechanical integrity",
      "Adhesion",
      "Moisture resistance",
      "Long-term durability",
    ],

    qualificationQuestions: [
      "What is the minimum operating temperature?",
      "What insulation system are you using?",
      "What density is required?",
      "What thermal conductivity is required?",
      "What mechanical properties are required?",
      "What certification or qualification is required?",
      "What is the existing polyol system?",
    ],

    aiRule:
      "Cryogenic suitability must never be assumed from a generic rigid-foam specification. Actual testing and qualification are required.",
  },

  coatingsIndustry: {
    name: "Coatings",

    applications: [
      "Industrial coatings",
      "Protective coatings",
      "Metal coatings",
      "Automotive coatings",
      "Wood coatings",
      "Floor coatings",
      "Textile coatings",
      "Synthetic leather coatings",
    ],

    preferredProductFamilies: [
      "Application-specific polyester polyols",
      "Selected polyether polyols",
    ],

    keyParameters: [
      "OH value",
      "Molecular weight",
      "Functionality",
      "Viscosity",
      "Acid value",
      "Solvent compatibility",
      "Hardness",
      "Flexibility",
      "Chemical resistance",
      "Abrasion resistance",
    ],

    customerQuestions: [
      "What coating are you manufacturing?",
      "What substrate are you coating?",
      "Is the system 1K or 2K?",
      "Is it solventborne or waterborne?",
      "What hardness do you require?",
      "What flexibility do you require?",
      "What chemical resistance is required?",
      "What is your current polyol?",
      "What is your current isocyanate?",
    ],
  },

  adhesiveIndustry: {
    name: "Adhesives",

    applications: [
      "PU adhesives",
      "Lamination adhesives",
      "Textile adhesives",
      "Packaging adhesives",
      "Industrial adhesives",
      "Composite bonding",
      "Footwear adhesives",
    ],

    relevantProductFamilies: [
      "Polyester polyols",
      "Polyether polyols",
      "Specialty polyurethane polyols",
    ],

    keyParameters: [
      "OH value",
      "Molecular weight",
      "Functionality",
      "Viscosity",
      "Flexibility",
      "Adhesion",
      "Cure rate",
      "Hydrolytic stability",
    ],

    customerQuestions: [
      "What substrates are you bonding?",
      "What type of adhesive are you making?",
      "Is it 1K or 2K?",
      "What is the curing condition?",
      "What bond strength is required?",
      "What flexibility is required?",
      "What is your current polyol?",
    ],
  },

  sealantIndustry: {
    name: "Sealants",

    applications: [
      "Construction sealants",
      "Industrial sealants",
      "Automotive sealants",
      "General polyurethane sealants",
    ],

    relevantProductFamilies: [
      "Polyester polyols",
      "Polyether polyols",
    ],

    requirements: [
      "Elasticity",
      "Adhesion",
      "Weather resistance",
      "Hydrolytic stability",
      "Cure characteristics",
      "Hardness",
      "Elongation",
    ],

    customerQuestions: [
      "Is the sealant 1K or 2K?",
      "What substrates are involved?",
      "What Shore hardness is required?",
      "What elongation is required?",
      "What environmental exposure is expected?",
      "What cure mechanism is used?",
    ],
  },

  elastomerIndustry: {
    name: "Polyurethane Elastomers",

    applications: [
      "Casting elastomers",
      "Industrial components",
      "Wheels and rollers",
      "Bushings",
      "Shock absorbers",
      "Seals",
      "Gaskets",
      "Vibration-control components",
    ],

    relevantProductFamilies: [
      "Polyester polyols",
      "Polyether polyols",
      "Application-specific elastomer polyols",
    ],

    keyParameters: [
      "OH value",
      "Molecular weight",
      "Functionality",
      "Glycol structure",
      "Isocyanate type",
      "NCO content",
      "NCO index",
      "Chain extender",
      "Hardness",
      "Tensile strength",
      "Elongation",
      "Tear strength",
      "Abrasion resistance",
      "Compression set",
    ],

    customerQuestions: [
      "What Shore hardness do you need?",
      "Is the system aromatic or aliphatic?",
      "Which isocyanate are you using?",
      "What is the NCO content?",
      "Are you using a chain extender?",
      "What is your current polyol?",
      "What tensile strength do you need?",
      "What elongation do you need?",
      "What abrasion resistance is required?",
      "What is the curing process?",
    ],

    aiRule:
      "A target Shore hardness does not uniquely identify a suitable polyol. The entire polyurethane system must be considered.",
  },

  automotiveIndustry: {
    name: "Automotive",

    applications: [
      "PU coatings",
      "Adhesives",
      "Sealants",
      "Elastomers",
      "Interior components",
      "Acoustic materials",
      "Insulation",
      "Flexible foam",
      "Rigid foam",
    ],

    relevantProductFamilies: [
      "Polyester polyols",
      "Polyether polyols",
      "Specialty application-specific polyols",
    ],

    requirements: [
      "Mechanical performance",
      "Durability",
      "Temperature resistance",
      "Chemical resistance",
      "Abrasion resistance",
      "Low VOC where required",
      "Adhesion",
      "Dimensional stability",
    ],

    qualificationQuestions: [
      "What automotive component is being manufactured?",
      "Is the application foam, coating, adhesive, sealant or elastomer?",
      "What OEM specification applies?",
      "What performance requirements are required?",
      "What is the current formulation?",
      "Are automotive approvals required?",
    ],

    aiRule:
      "Do not claim automotive OEM approval or qualification unless verified documentation exists.",
  },

  footwearIndustry: {
    name: "Footwear",

    applications: [
      "PU soles",
      "TPU components",
      "Footwear adhesives",
      "Coatings",
      "Elastomeric components",
    ],

    relevantProductFamilies: [
      "Polyester polyols",
      "Polyether polyols",
      "Specialty elastomer polyols",
    ],

    keyRequirements: [
      "Flexibility",
      "Abrasion resistance",
      "Tear strength",
      "Hardness",
      "Hydrolytic stability",
      "Adhesion",
      "Low-temperature flexibility",
    ],

    customerQuestions: [
      "What footwear component are you manufacturing?",
      "What hardness is required?",
      "What density is required?",
      "What abrasion resistance is required?",
      "What is your current polyol?",
      "What isocyanate are you using?",
    ],
  },

  furnitureFlexibleFoam: {
    name: "Furniture & Flexible Foam",

    applications: [
      "Furniture cushions",
      "Mattresses",
      "Seating",
      "Automotive seating",
      "Flexible foam components",
    ],

    preferredProductFamily:
      "Polyether polyols and selected recycled polyether/polyester systems.",

    requirements: [
      "Foam density",
      "Hardness",
      "Resilience",
      "Compression set",
      "Cell structure",
      "Processing consistency",
    ],

    customerQuestions: [
      "What foam density do you need?",
      "What hardness do you need?",
      "What resilience is required?",
      "What is your current polyol?",
      "What isocyanate do you use?",
      "What blowing system do you use?",
    ],
  },

  textileIndustry: {
    name: "Textile & Synthetic Leather",

    applications: [
      "PU textile coating",
      "Synthetic leather",
      "Textile lamination",
      "Flexible coatings",
      "Adhesives",
    ],

    relevantProductFamilies: [
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
      "Cure characteristics",
    ],

    customerQuestions: [
      "What substrate are you coating?",
      "Is the coating solventborne or waterborne?",
      "What flexibility is required?",
      "What hardness is required?",
      "What is the current polyol?",
      "What is the current isocyanate?",
      "What performance issue are you trying to solve?",
    ],
  },

  electricalInsulation: {
    name: "Electrical Insulation",

    applications: [
      "Electrical encapsulation",
      "Insulating coatings",
      "Potting compounds",
      "Electrical components",
      "Transformer-related insulation systems",
    ],

    relevantProductFamilies: [
      "Application-specific polyester polyols",
      "Specialty polyurethane polyols",
    ],

    requirements: [
      "Electrical insulation",
      "Dielectric properties",
      "Thermal stability",
      "Adhesion",
      "Moisture resistance",
      "Chemical resistance",
      "Dimensional stability",
    ],

    customerQuestions: [
      "What electrical component is being insulated?",
      "What dielectric properties are required?",
      "What operating temperature is expected?",
      "What cure system is used?",
      "What is the current polyol?",
      "What standards or approvals apply?",
    ],

    aiRule:
      "Do not claim electrical-grade certification or dielectric performance without verified test data.",
  },

  industrialEquipment: {
    name: "Industrial Equipment",

    applications: [
      "Thermal insulation",
      "Protective coatings",
      "Elastomeric components",
      "Adhesives",
      "Sealants",
      "Encapsulation",
    ],

    relevantProductFamilies: [
      "Polyester polyols",
      "Polyether polyols",
      "CASE polyols",
    ],

    requirements: [
      "Chemical resistance",
      "Temperature resistance",
      "Mechanical strength",
      "Abrasion resistance",
      "Adhesion",
      "Dimensional stability",
    ],

    customerQuestions: [
      "What equipment or component are you manufacturing?",
      "What is the exact application?",
      "What temperature range applies?",
      "What chemicals will the material contact?",
      "What mechanical properties are required?",
      "What is your current formulation?",
    ],
  },

  industryToApplicationMapping: {
    refrigeration: [
      "Rigid foam",
      "PUR insulation",
      "PIR insulation",
    ],

    coldStorage: [
      "Rigid foam",
      "PUR insulation",
      "PIR insulation",
    ],

    construction: [
      "Rigid foam",
      "PIR",
      "PUR",
      "Coatings",
      "Adhesives",
      "Sealants",
    ],

    pipeline: [
      "Rigid foam insulation",
      "Protective coatings",
      "Adhesives",
    ],

    oilAndGas: [
      "Pipeline insulation",
      "Cryogenic insulation",
      "Coatings",
      "Sealants",
      "Elastomers",
    ],

    lng: [
      "Cryogenic insulation",
      "Rigid foam",
      "Adhesives",
    ],

    automotive: [
      "Flexible foam",
      "Rigid foam",
      "Coatings",
      "Adhesives",
      "Sealants",
      "Elastomers",
    ],

    footwear: [
      "PU soles",
      "TPU",
      "Adhesives",
      "Elastomers",
    ],

    textiles: [
      "Coatings",
      "Adhesives",
      "Synthetic leather",
      "Polyurethane dispersions",
    ],

    electrical: [
      "Encapsulation",
      "Potting",
      "Coatings",
      "Insulation",
    ],
  },

  industryPrioritization: {
    highPriority: [
      {
        industry: "Rigid Foam",
        reason:
          "Strong relevance to recycled polyester polyols and Enviol's insulation-focused product development.",
      },

      {
        industry: "PIR/PUR Insulation",
        reason:
          "Direct application area for high-OH polyester polyols.",
      },

      {
        industry: "Pipeline Insulation",
        reason:
          "Potential use of polyester polyols in rigid polyurethane insulation systems.",
      },

      {
        industry: "Refrigeration",
        reason:
          "Large potential application for rigid polyester polyols in thermal insulation.",
      },

      {
        industry: "Cold Storage",
        reason:
          "Relevant to rigid PU/PIR insulation systems.",
      },

      {
        industry: "Coatings",
        reason:
          "Important CASE application for application-specific polyester polyols.",
      },

      {
        industry: "Adhesives",
        reason:
          "Potential application for polyester and polyether polyols.",
      },

      {
        industry: "Elastomers",
        reason:
          "Potential higher-value application for application-specific polyester and polyether polyols.",
      },
    ],

    developmentPriority: [
      "Rigid foam",
      "PIR/PUR insulation",
      "Pipeline insulation",
      "Refrigeration",
      "Cold storage",
      "Construction insulation",
      "Coatings",
      "Adhesives",
      "Casting elastomers",
      "Sealants",
    ],
  },

  aiReasoningRules: {
    rule1:
      "Identify the customer's industry first, then determine the exact application.",

    rule2:
      "Never recommend a product based solely on industry.",

    rule3:
      "For industrial customers, identify the customer's existing formulation whenever possible.",

    rule4:
      "Ask for current OH value, application, isocyanate and processing method before making a technical recommendation when relevant.",

    rule5:
      "For insulation applications, ask about density, thermal conductivity, operating temperature and insulation thickness.",

    rule6:
      "For elastomers, ask about Shore hardness, isocyanate type, chain extender and mechanical properties.",

    rule7:
      "For coatings and adhesives, ask about substrate, 1K/2K chemistry, solvent/water system and required performance.",

    rule8:
      "For highly regulated or qualification-sensitive industries, never claim certification without verified evidence.",

    rule9:
      "If an industry is not explicitly covered, identify the closest application category and ask for technical requirements rather than guessing.",

    rule10:
      "The AI should use industry information to guide enquiry qualification, not to make unsupported product claims.",
  },
};

export default industries;