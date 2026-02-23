export const products = [
  {
    id: 1,
    name: "RePolyester 2100",
    slug: "repolyester-2100",
    description: "Recycled polyester polyol for CASE applications.",
    image: "/images/repolyester-2100.jpg",

    applications: [
      "Coatings",
      "Adhesives",
      "Sealants",
      "Elastomers (CASE)"
    ],

    compatibility:
      "Compatible with conventional polyurethane systems and standard isocyanates.",

    storage:
      "Store in tightly closed containers in a dry place at 20–30°C. Avoid moisture contamination.",

    solubility:
      "Soluble in common organic solvents used in polyurethane systems.",

    specifications: [
      {
        property: "Hydroxyl number",
        testCondition: "",
        value: "150 - 174",
        unit: "mg KOH/g",
        standard: "ISO 4629-2"
      },
      {
        property: "Dynamic viscosity",
        testCondition: "23°C",
        value: "16,000 - 31,000",
        unit: "mPa·s",
        standard: "ISO 3219"
      },
      {
        property: "Water content",
        testCondition: "",
        value: "≤ 0.1",
        unit: "%",
        standard: "DIN 51777-1"
      }
    ],

    tds: "/tds/repolyester-2100.pdf"
  },

  {
  id: 2,
  name: "RePolyether 3300",
  slug: "repolyether-3300",
  description: "Recovered polyether polyol designed for flexible and rigid foam systems.",
  image: "/images/repolyether-3300.jpg",

  applications: [
    "Flexible polyurethane foam",
    "Rigid foam systems",
    "Insulation materials",
    "Automotive seating"
  ],

  compatibility:
    "Compatible with conventional isocyanates used in polyurethane foam production.",

  storage:
    "Store in sealed containers in a dry environment between 20–30°C. Avoid prolonged exposure to air and moisture.",

  solubility:
    "Miscible with common polyether polyols and compatible polyurethane raw materials.",

  specifications: [
    {
      property: "Hydroxyl number",
      testCondition: "",
      value: "48 - 56",
      unit: "mg KOH/g",
      standard: "ISO 4629-2"
    },
    {
      property: "Dynamic viscosity",
      testCondition: "25°C",
      value: "400 - 800",
      unit: "mPa·s",
      standard: "ISO 3219"
    },
    {
      property: "Water content",
      testCondition: "",
      value: "≤ 0.1",
      unit: "%",
      standard: "DIN 51777-1"
    },
    {
      property: "Acid value",
      testCondition: "",
      value: "≤ 0.5",
      unit: "mg KOH/g",
      standard: "ISO 2114"
    }
  ],

  tds: "/tds/repolyether-3300.pdf"
}
];