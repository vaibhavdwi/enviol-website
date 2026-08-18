 // lib/eny/technical.js

export const technical = {
  metadata: {
    title: "Enviol Technical Knowledge",
    purpose:
      "Technical knowledge covering polyester polyols, polyether polyols, polyurethane chemistry, polyol characterization, formulation principles and technical product selection.",

    scope: [
      "Polyol chemistry",
      "Polyester polyols",
      "Polyether polyols",
      "PET glycolysis",
      "Hydroxyl value",
      "Acid value",
      "Functionality",
      "Molecular weight",
      "Equivalent weight",
      "Viscosity",
      "Water content",
      "NCO/OH ratio",
      "Isocyanate index",
      "Polyurethane formulation",
      "Rigid foam",
      "CASE",
      "Elastomers",
    ],

    importantRule:
      "Technical guidance should be treated as formulation-development guidance rather than a guarantee of final product performance.",

    safetyRule:
      "The AI must not present experimental formulation suggestions as validated commercial formulations. Customer trials and laboratory validation are required.",
  },

  fundamentalChemistry: {
    polyurethane: {
      name: "Polyurethane",

      description:
        "Polyurethanes are polymers formed primarily through reactions between isocyanate-functional compounds and compounds containing hydroxyl groups.",

      primaryComponents: [
        "Polyol",
        "Isocyanate",
        "Catalysts",
        "Surfactants where applicable",
        "Blowing agents where applicable",
        "Chain extenders where applicable",
        "Crosslinkers where applicable",
        "Other additives",
      ],

      primaryReaction:
        "Hydroxyl groups react with isocyanate groups to form urethane linkages.",

      simplifiedReaction:
        "Polyol-OH + Isocyanate-NCO → Polyurethane urethane linkage",
    },

    polyol: {
      definition:
        "A polyol is a molecule or polymer containing multiple hydroxyl groups capable of reacting with isocyanates.",

      importantParameters: [
        "Hydroxyl value",
        "Functionality",
        "Molecular weight",
        "Equivalent weight",
        "Viscosity",
        "Acid value",
        "Water content",
        "Backbone chemistry",
      ],
    },

    isocyanate: {
      definition:
        "Isocyanates contain reactive NCO groups that react with hydroxyl groups and other nucleophiles in polyurethane chemistry.",

      commonTypes: [
        "MDI",
        "Polymeric MDI",
        "TDI",
        "Aliphatic diisocyanates",
        "Other application-specific isocyanates",
      ],

      aiRule:
        "The exact isocyanate should be considered before making formulation recommendations because isocyanate type and NCO content strongly affect the final system.",
    },
  },

  polyesterPolyolChemistry: {
    definition:
      "Polyester polyols contain ester linkages within their molecular backbone and hydroxyl groups available for polyurethane reaction.",

    typicalRawMaterials: [
      "Dicarboxylic acids",
      "Polyacids",
      "Diols",
      "Polyols",
      "Recycled PET",
      "Glycols",
    ],

    importantProperties: [
      "Hydroxyl value",
      "Acid value",
      "Functionality",
      "Molecular weight",
      "Viscosity",
      "Aromatic content",
      "Water content",
      "Hydrolytic stability",
    ],

    advantages: [
      "Good mechanical properties",
      "Good adhesion in many systems",
      "High polarity",
      "Useful compatibility with polyurethane chemistry",
      "Can provide useful hardness and strength",
      "Can be produced from recycled polyester feedstocks",
    ],

    limitations: [
      "Hydrolytic stability may require consideration depending on structure and application",
      "Viscosity can be relatively high",
      "Final properties depend strongly on polyester structure and formulation",
    ],
  },

  polyetherPolyolChemistry: {
    definition:
      "Polyether polyols contain ether linkages in their polymer backbone and hydroxyl groups suitable for reaction with isocyanates.",

    commonStartingMaterials: [
      "Propylene oxide",
      "Ethylene oxide",
      "Polyhydric initiators",
    ],

    importantProperties: [
      "Hydroxyl value",
      "Functionality",
      "Molecular weight",
      "Viscosity",
      "Ethylene oxide content",
      "Propylene oxide content",
      "Reactivity",
    ],

    advantages: [
      "Good hydrolytic stability in many systems",
      "Useful flexibility",
      "Broad polyurethane application range",
      "Widely used in flexible foam",
      "Useful for elastomers and CASE applications",
    ],

    limitations: [
      "Properties depend strongly on molecular structure and EO/PO composition",
      "Not automatically interchangeable with polyester polyols",
    ],
  },

  petGlycolysis: {
    definition:
      "PET glycolysis is a chemical recycling process in which polyethylene terephthalate is reacted with glycols to break down the polymer structure and produce lower-molecular-weight intermediates suitable for further polyol synthesis.",

    feedstock:
      "PET flakes or other suitable polyester waste.",

    processConcept: [
      "PET preparation",
      "Feedstock charging",
      "Glycol addition",
      "Heating",
      "Catalyzed glycolysis where applicable",
      "Depolymerization/transesterification",
      "Reaction monitoring",
      "Polyol adjustment",
      "Final property adjustment",
      "Filtration and quality control where applicable",
    ],

    importantVariables: [
      "PET-to-glycol ratio",
      "Glycol type",
      "Catalyst",
      "Reaction temperature",
      "Reaction time",
      "PET particle size",
      "Degree of conversion",
      "Acid value",
      "Hydroxyl value",
      "Viscosity",
      "Residual solids",
      "Color",
    ],

    glycols: {
      DEG: {
        name: "Diethylene Glycol",
        abbreviation: "DEG",

        role:
          "A glycol commonly used in PET glycolysis and polyester-polyol synthesis.",

        generalEffect:
          "Can contribute to flexible ether-containing segments and influence molecular weight, viscosity and hydroxyl functionality of the resulting system.",
      },

      MEG: {
        name: "Monoethylene Glycol",
        abbreviation: "MEG",

        role:
          "A glycol that can participate in PET depolymerization and polyester synthesis.",

        generalEffect:
          "Can influence molecular structure, hydroxyl value, viscosity and hard-segment characteristics.",
      },

      BDO: {
        name: "1,4-Butanediol",
        abbreviation: "BDO",

        role:
          "A diol used in polyester and polyurethane chemistry.",

        generalEffect:
          "Can influence chain structure, crystallinity, hardness and mechanical properties depending on the complete formulation.",
      },

      HDO: {
        name: "1,6-Hexanediol",
        abbreviation: "HDO",

        role:
          "A longer-chain diol that can be used to modify polyester-polyol structure.",

        generalEffect:
          "Can contribute to flexibility and influence molecular spacing and mechanical behavior.",
      },

      NPG: {
        name: "Neopentyl Glycol",
        abbreviation: "NPG",

        role:
          "A branched diol used in polyester chemistry.",

        generalEffect:
          "Can improve hydrolytic and weathering characteristics in appropriate polyester structures and can influence hardness and flexibility.",
      },
    },

    aiRule:
      "Changing glycol type or glycol ratio changes the molecular structure and therefore can affect OH value, molecular weight, viscosity, flexibility, hardness, hydrolytic stability and final polyurethane performance.",
  },

  hydroxylValue: {
    name: "Hydroxyl Value",

    abbreviation: "OH Value",

    unit: "mg KOH/g",

    definition:
      "Hydroxyl value represents the amount of hydroxyl functionality present in a polyol and is conventionally expressed as milligrams of potassium hydroxide equivalent per gram of sample.",

    importance: [
      "Used to characterize polyols",
      "Used for polyurethane formulation calculations",
      "Influences equivalent weight",
      "Influences required isocyanate quantity",
      "Provides an indication of hydroxyl functionality relative to molecular weight",
    ],

    approximateFormula:
      "Polyol equivalent weight ≈ 56100 / OH value",

    examples: [
      {
        ohValue: 100,
        approximateEquivalentWeight: 561,
      },
      {
        ohValue: 200,
        approximateEquivalentWeight: 280.5,
      },
      {
        ohValue: 300,
        approximateEquivalentWeight: 187,
      },
      {
        ohValue: 330,
        approximateEquivalentWeight: 170,
      },
      {
        ohValue: 500,
        approximateEquivalentWeight: 112.2,
      },
    ],

    interpretation:
      "Higher OH value generally corresponds to more hydroxyl equivalents per unit mass and, for comparable functionality assumptions, a lower average equivalent weight.",

    aiWarning:
      "OH value alone does not determine whether a polyol is suitable. Functionality, molecular structure, viscosity, processing and final application requirements must also be considered.",
  },

  equivalentWeight: {
    name: "Polyol Equivalent Weight",

    definition:
      "Equivalent weight is the mass of polyol corresponding to one equivalent of reactive hydroxyl functionality.",

    formula:
      "Equivalent weight = 56100 / OH value",

    unit:
      "g/equivalent",

    examples: [
      {
        ohValue: 200,
        equivalentWeight: "280.5 g/eq",
      },
      {
        ohValue: 300,
        equivalentWeight: "187.0 g/eq",
      },
      {
        ohValue: 330,
        equivalentWeight: "170.0 g/eq",
      },
      {
        ohValue: 500,
        equivalentWeight: "112.2 g/eq",
      },
    ],
  },

  functionality: {
    name: "Functionality",

    definition:
      "Functionality represents the average number of reactive functional groups per molecule.",

    polyurethaneImportance: [
      "Influences crosslink density",
      "Influences network formation",
      "Can affect hardness",
      "Can affect dimensional stability",
      "Can affect viscosity",
      "Can affect mechanical properties",
    ],

    generalInterpretation: {
      lowFunctionality:
        "Generally associated with more linear or less highly crosslinked structures.",

      highFunctionality:
        "Generally increases the potential for branching and crosslinking.",
    },

    aiWarning:
      "Functionality should not be interpreted independently from molecular weight and OH value.",
  },

  molecularWeight: {
    definition:
      "Molecular weight describes the size of polyol molecules and is closely related to OH value and functionality.",

    relationship:
      "For a simplified polyol system, average molecular weight can be estimated approximately from functionality and equivalent weight.",

    approximateFormula:
      "Average molecular weight ≈ Functionality × Equivalent weight",

    relationshipToOH:
      "For a fixed functionality, increasing molecular weight generally decreases OH value.",

    aiRule:
      "Use molecular weight together with functionality and OH value when comparing polyol structures.",
  },

  viscosity: {
    unit: "cP",

    definition:
      "Viscosity represents resistance to flow and is an important processing parameter for polyols.",

    affectedBy: [
      "Molecular weight",
      "Temperature",
      "Hydrogen bonding",
      "Aromatic content",
      "Polyol structure",
      "Functionality",
      "Solids content",
      "Composition",
    ],

    processingImportance: [
      "Pumping",
      "Metering",
      "Mixing",
      "Spraying",
      "Casting",
      "Dispensing",
      "Storage and handling",
    ],

    aiRule:
      "A viscosity value without measurement temperature is incomplete when discussing a technical specification.",
  },

  acidValue: {
    name: "Acid Value",

    unit: "mg KOH/g",

    definition:
      "Acid value indicates the amount of acidic groups present in a material, expressed as potassium hydroxide equivalent per gram.",

    importance: [
      "Quality control",
      "Reaction behavior",
      "Polyol synthesis monitoring",
      "Polyurethane formulation consistency",
    ],

    distinction:
      "Acid value and hydroxyl value are different analytical parameters and must never be treated as interchangeable.",

    typicalDevelopmentTarget:
      "Generally below 5 mg KOH/g for selected Enviol polyester-polyol development work.",

    aiWarning:
      "The actual acceptable acid value depends on the product and application.",
  },

  waterContent: {
    name: "Water Content",

    unit: "%",

    importance: [
      "Water reacts with isocyanates",
      "Can generate carbon dioxide",
      "Can affect foam formation",
      "Can affect density",
      "Can alter polyurethane stoichiometry",
      "Can affect processing consistency",
    ],

    developmentTarget:
      "Typically below 0.2% for selected Enviol polyester-polyol development work.",

    aiWarning:
      "Do not represent 0.2% as a universal specification for every Enviol product.",
  },

  ncoOhChemistry: {
    ncoGroup: {
      definition:
        "NCO refers to the isocyanate functional group that reacts with hydroxyl groups in polyurethane chemistry.",
    },

    ncoContent: {
      definition:
        "NCO content indicates the amount of isocyanate functionality present in an isocyanate component.",

      unit: "%",
    },

    ohEquivalent:
      "OH equivalents are calculated from polyol mass and hydroxyl value.",

    ncoEquivalent:
      "NCO equivalents are calculated from isocyanate mass and NCO content.",

    stoichiometricRelationship:
      "Polyurethane formulation requires balancing reactive NCO equivalents against reactive OH and other active hydrogen equivalents.",
  },

  isocyanateIndex: {
    name: "Isocyanate Index",

    definition:
      "Isocyanate index expresses the ratio of available NCO equivalents to the reactive hydrogen equivalents in the formulation, commonly multiplied by 100.",

    simplifiedFormula:
      "Isocyanate Index = (NCO equivalents / reactive hydrogen equivalents) × 100",

    interpretation: {
      below100:
        "Less NCO than the stoichiometric reference amount.",

      around100:
        "Approximately stoichiometric NCO-to-reactive-hydrogen balance.",

      above100:
        "Excess NCO relative to the stoichiometric reference.",
    },

    importantNote:
      "Actual formulation calculations must include all relevant reactive components, including water and other active-hydrogen-containing materials where applicable.",

    aiRule:
      "Do not calculate a final isocyanate quantity unless the required OH value, polyol quantities, NCO content and all relevant reactive components are known.",
  },

  formulationCalculations: {
    polyolOHNumber: {
      formula:
        "OH equivalents = polyol mass × OH value / 56100",

      example:
        "For 100 g of a polyol with OH value 300 mg KOH/g: OH equivalents ≈ 100 × 300 / 56100 = 0.5348 equivalents.",
    },

    isocyanateNCOEquivalent: {
      formula:
        "NCO equivalents = isocyanate mass × NCO% / 4200",

      example:
        "For 100 g of an isocyanate containing 30% NCO: NCO equivalents ≈ 100 × 30 / 4200 = 0.7143 equivalents.",
    },

    isocyanateMass: {
      simplifiedFormula:
        "Required isocyanate mass ≈ required NCO equivalents × 4200 / NCO%",

      warning:
        "This simplified calculation must be adjusted when other reactive components such as water, chain extenders or crosslinkers are present.",
    },

    aiRule:
      "Always state assumptions when presenting formulation calculations.",
  },

  polyesterVsPolyether: {
    polyester: {
      backbone:
        "Ester-containing polymer backbone.",

      commonCharacteristics: [
        "Higher polarity",
        "Good adhesion in many applications",
        "Good mechanical strength potential",
        "Useful for rigid foam",
        "Useful for coatings",
        "Useful for selected adhesives and elastomers",
      ],

      consideration:
        "Hydrolytic stability must be considered depending on polyester structure and application environment.",
    },

    polyether: {
      backbone:
        "Ether-containing polymer backbone.",

      commonCharacteristics: [
        "Good flexibility",
        "Good hydrolytic stability in many systems",
        "Widely used in flexible foam",
        "Useful for elastomers",
        "Useful in selected CASE applications",
      ],
    },

    aiRule:
      "Neither polyester nor polyether is universally better. Selection must be application-specific.",
  },

  polyesterPolyolDesign: {
    importantVariables: [
      "Acid type",
      "Diol type",
      "Polyol functionality",
      "PET content",
      "Glycol ratio",
      "PET-to-glycol ratio",
      "Reaction conversion",
      "Molecular weight",
      "OH value",
      "Acid value",
      "Viscosity",
      "Aromatic content",
    ],

    designPrinciples: [
      "Increasing average molecular weight generally lowers OH value.",
      "Increasing functionality can increase crosslinking potential.",
      "Changing glycol chemistry changes molecular structure and physical properties.",
      "Changing PET content changes aromatic polyester contribution.",
      "Reaction conversion affects residual oligomers and final properties.",
      "Temperature and reaction time influence glycolysis and polyol formation.",
      "Final properties must be verified analytically.",
    ],
  },

  glycolSelection: {
    DEG: {
      usefulFor: [
        "PET glycolysis",
        "Polyester-polyol development",
        "Structure modification",
      ],

      generalEffect:
        "Can influence flexibility, molecular structure, viscosity and OH value depending on formulation.",
    },

    MEG: {
      usefulFor: [
        "PET glycolysis",
        "Polyester synthesis",
      ],

      generalEffect:
        "Can influence chain structure, rigidity and final polyester-polyol properties.",
    },

    BDO: {
      usefulFor: [
        "Polyester synthesis",
        "Polyurethane elastomer development",
        "Chain-structure modification",
      ],

      generalEffect:
        "Can contribute to harder and more structured polyurethane segments depending on the formulation.",
    },

    HDO: {
      usefulFor: [
        "Polyester-polyol development",
        "Flexibility modification",
        "Elastomer development",
      ],

      generalEffect:
        "Longer aliphatic chain can contribute to flexibility and influence mechanical behavior.",
    },

    NPG: {
      usefulFor: [
        "Polyester-polyol development",
        "Coating-grade polyester development",
      ],

      generalEffect:
        "Branched structure can improve selected durability and hydrolytic/weathering characteristics.",
    },

    selectionRule:
      "Glycol selection should be based on target OH value, molecular weight, viscosity, hardness, flexibility, hydrolytic stability, application and processing requirements.",
  },

  elastomerTechnicalKnowledge: {
    shoreHardness: {
      definition:
        "Shore hardness is a measure of resistance to indentation and is commonly used to describe polyurethane elastomer hardness.",

      commonScales: [
        "Shore A",
        "Shore D",
      ],

      aiRule:
        "Shore hardness alone is insufficient for selecting a polyol or designing an elastomer formulation.",
    },

    softElastomer: {
      importantVariables: [
        "Polyol molecular weight",
        "OH value",
        "Functionality",
        "Isocyanate chemistry",
        "NCO index",
        "Chain extender",
        "Crosslink density",
        "Cure conditions",
      ],

      generalPrinciple:
        "Soft polyurethane elastomers generally require formulation strategies that limit excessive crosslink density and maintain sufficient soft-segment content.",
    },

    hardElastomer: {
      importantVariables: [
        "Higher hard-segment content",
        "Isocyanate type",
        "Chain extender",
        "Polyol structure",
        "Crosslink density",
      ],
    },
  },

  rigidFoamTechnicalKnowledge: {
    keyParameters: [
      "Polyol OH value",
      "Functionality",
      "Polyol viscosity",
      "Water content",
      "Acid value",
      "Isocyanate index",
      "Blowing agent",
      "Catalyst",
      "Surfactant",
      "Foam density",
    ],

    performanceRelationships: {
      thermalConductivity:
        "Influenced by cell structure, blowing agent, density, gas phase and processing conditions.",

      compressiveStrength:
        "Influenced by density, cell structure, polymer crosslinking and formulation.",

      dimensionalStability:
        "Influenced by polymer structure, cell morphology, density, temperature and blowing-agent system.",

      firePerformance:
        "Influenced by polymer chemistry, aromatic content, additives, isocyanate index, cell structure and complete formulation.",
    },

    aiRule:
      "Never attribute a single foam property to the polyol alone when the property depends on the complete foam formulation.",
  },

  coatingsTechnicalKnowledge: {
    importantParameters: [
      "OH value",
      "Molecular weight",
      "Functionality",
      "Viscosity",
      "Backbone chemistry",
      "Solvent compatibility",
      "Cure chemistry",
      "Hardness",
      "Flexibility",
      "Chemical resistance",
    ],

    formulationConsiderations: [
      "Polyol-to-isocyanate ratio",
      "NCO content",
      "Catalyst",
      "Solvent",
      "Pigments",
      "Fillers",
      "Additives",
      "Cure temperature",
      "Humidity",
    ],
  },

  analyticalTesting: {
    coreTests: [
      "Hydroxyl value",
      "Acid value",
      "Viscosity",
      "Water content",
      "Density",
      "Color",
      "Moisture",
      "Functionality where applicable",
      "Molecular weight where required",
    ],

    polyurethanePerformanceTests: [
      "Density",
      "Compressive strength",
      "Tensile strength",
      "Elongation",
      "Tear strength",
      "Hardness",
      "Abrasion resistance",
      "Compression set",
      "Thermal conductivity",
      "Dimensional stability",
      "Adhesion",
      "Chemical resistance",
    ],

    aiRule:
      "Do not claim a material has passed a test unless verified test data is available.",
  },

  technicalTroubleshooting: {
    highViscosity: {
      possibleCauses: [
        "High molecular weight",
        "High functionality",
        "Aromatic structure",
        "High solids",
        "Low processing temperature",
        "Incomplete process optimization",
      ],

      informationRequired: [
        "Current viscosity",
        "Measurement temperature",
        "OH value",
        "Acid value",
        "Composition",
        "Application",
      ],
    },

    lowReactivity: {
      possibleCauses: [
        "Polyol chemistry",
        "Low catalyst activity",
        "Low temperature",
        "Isocyanate selection",
        "Mixing conditions",
        "Incorrect stoichiometry",
      ],

      aiRule:
        "Do not assume that low reactivity is caused by the polyol alone.",
    },

    foamShrinkage: {
      possibleCauses: [
        "Cell pressure imbalance",
        "Blowing-agent selection",
        "Polymer strength",
        "Surfactant selection",
        "Processing conditions",
        "Incorrect formulation",
      ],

      aiRule:
        "Foam shrinkage is a system-level problem and requires examination of the complete formulation.",
    },

    poorAdhesion: {
      possibleCauses: [
        "Polyol chemistry",
        "Substrate preparation",
        "Surface energy",
        "Cure conditions",
        "NCO/OH ratio",
        "Additives",
        "Moisture",
      ],
    },

    elastomerTooSoft: {
      possibleCauses: [
        "Low hard-segment content",
        "Low crosslink density",
        "Polyol molecular weight",
        "Chain extender level",
        "NCO index",
        "Isocyanate chemistry",
      ],
    },
  },

  technicalCommunication: {
    preferredUnits: {
      hydroxylValue: "mg KOH/g",
      acidValue: "mg KOH/g",
      viscosity: "cP",
      waterContent: "%",
      ncoContent: "%",
      density: "kg/m³ or g/cm³ depending on application",
      temperature: "°C",
    },

    terminology: {
      OH:
        "Hydroxyl group or hydroxyl value depending on context.",

      NCO:
        "Isocyanate functional group.",

      PUF:
        "Polyurethane foam.",

      PIR:
        "Polyisocyanurate.",

      PUR:
        "Polyurethane.",

      CASE:
        "Coatings, Adhesives, Sealants and Elastomers.",

      TPU:
        "Thermoplastic Polyurethane.",
    },
  },

  aiReasoningRules: {
    rule1:
      "Never select a polyol solely from OH value.",

    rule2:
      "Always consider application before recommending a polyol.",

    rule3:
      "Always distinguish a product specification from a general technical range.",

    rule4:
      "Never convert an experimental formulation into a claimed commercial formulation.",

    rule5:
      "When calculating formulation quantities, state all assumptions.",

    rule6:
      "When customer information is incomplete, ask targeted technical questions rather than guessing.",

    rule7:
      "For complex formulation problems, recommend laboratory validation.",

    rule8:
      "When discussing a customer's existing product, do not claim exact chemical composition unless verified.",

    rule9:
      "Shore hardness is a system-level result and cannot by itself determine the correct polyol.",

    rule10:
      "Polyester and polyether polyols should not be treated as interchangeable without application-specific validation.",

    rule11:
      "Changing glycol chemistry can change multiple properties simultaneously; do not attribute a single property change to one raw material without considering the full formulation.",

    rule12:
      "For customer-facing answers, separate verified Enviol data, general polyurethane knowledge and experimental suggestions clearly.",
  },
};

export default technical;