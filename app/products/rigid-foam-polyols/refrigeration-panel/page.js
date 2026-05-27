"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function RefrigerationInsulationPage() {

  const [modal, setModal] = useState(null);

  const systems = [
    {
      key: "overview",
      title: "Refrigeration Insulation Systems",
      short:
        "High-performance insulation systems designed for refrigeration and cooling equipment applications.",
      content: `
Refrigeration insulation systems are used to minimize thermal losses in cooling environments.

These systems are based on PIR and PUF rigid foam technologies that provide excellent thermal resistance.

Applications include commercial refrigeration units, cold rooms, transport refrigeration, and industrial cooling systems.

Key Features:
- Low thermal conductivity
- High closed-cell foam structure
- Moisture resistance
- Long-term dimensional stability

Advantages:
- Improved cooling efficiency
- Reduced energy consumption
- Stable temperature control
      `,
    },
    {
      key: "pir",
      title: "PIR Refrigeration Insulation",
      short:
        "High fire-resistant and high-performance insulation for advanced refrigeration systems.",
      content: `
PIR-based insulation systems provide superior fire resistance and thermal stability.

They are widely used in high-performance refrigeration applications where safety and efficiency are critical.

Applications:
- Industrial refrigeration chambers
- Cold storage refrigeration units
- High-end cooling systems

Specifications:
- High isocyanurate ring content
- Very low thermal conductivity
- Enhanced fire resistance

Advantages:
- Higher safety standards
- Better heat resistance
- Long service life
      `,
    },
    {
      key: "puf",
      title: "PUF Refrigeration Systems",
      short:
        "Cost-effective polyurethane insulation widely used in refrigeration equipment.",
      content: `
PUF insulation systems are widely used in commercial refrigeration applications.

They offer reliable insulation at lower cost compared to PIR systems.

Applications:
- Commercial refrigerators
- Display cooling units
- Small cold storage systems

Specifications:
- Lightweight foam structure
- Good insulation efficiency
- Easy processing

Advantages:
- Economical solution
- Easy manufacturing
- Widely used industrial standard
      `,
    },
    {
      key: "equipment",
      title: "Refrigeration Equipment Insulation",
      short:
        "Insulation used in refrigerated trucks, cooling chambers, and HVAC systems.",
      content: `
Refrigeration equipment requires continuous thermal insulation for efficiency.

Applications:
- Refrigerated transport trucks
- Cooling tunnels
- HVAC duct insulation
- Industrial chillers

Benefits:
- Reduced heat ingress
- Improved cooling efficiency
- Energy savings
      `,
    },
  ];

  const applications = [
    {
      key: "coldchain",
      title: "Cold Chain Logistics",
      short:
        "Temperature-controlled logistics systems for transport and storage.",
      content: `
Cold chain logistics depends on reliable refrigeration insulation systems.

Applications:
- Refrigerated transport vehicles
- Distribution warehouses
- Export logistics

Benefits:
- Maintains product quality
- Prevents temperature fluctuation
- Reduces spoilage losses
      `,
    },
    {
      key: "food",
      title: "Food Processing Industry",
      short:
        "Used in food preservation and processing refrigeration systems.",
      content: `
Food processing industries rely heavily on refrigeration insulation.

Applications:
- Meat processing units
- Dairy plants
- Frozen food storage

Benefits:
- Hygienic temperature control
- Extended shelf life
- Reduced energy cost
      `,
    },
    {
      key: "pharma",
      title: "Pharmaceutical Cooling",
      short:
        "Critical insulation systems for medicine and vaccine storage.",
      content: `
Pharmaceutical refrigeration requires strict temperature stability.

Applications:
- Vaccine storage units
- Medicine cold rooms
- Research laboratories

Benefits:
- Regulatory compliance
- Stable storage conditions
- High reliability systems
      `,
    },
    {
      key: "industrial",
      title: "Industrial Refrigeration Systems",
      short:
        "Large-scale cooling systems used in industrial applications.",
      content: `
Industrial refrigeration systems are used for large-scale cooling needs.

Applications:
- Manufacturing cooling systems
- Chemical storage
- Large industrial chillers

Benefits:
- High efficiency cooling
- Stable operation
- Long system durability
      `,
    },
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <AnimatedHeading title="Refrigeration Insulation Systems" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

              <p>
                Refrigeration insulation systems are essential for maintaining
                controlled cooling environments across industrial and commercial applications.
              </p>

              <p>
                These systems use PIR and PUF rigid foam technologies to minimize
                heat transfer and improve energy efficiency.
              </p>

              <p>
                Enviol supplies advanced polyols used in refrigeration panel
                manufacturing and cooling system insulation.
              </p>

            </div>

          </div>

          <div className="flex justify-center md:justify-end">

            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow border border-gray-200">

              <Image
                src="/images/refrigeration-main.jpg"
                alt="Refrigeration Insulation"
                width={700}
                height={500}
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

        {/* SYSTEMS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Refrigeration Insulation Systems
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {systems.map((item) => (
            <div
              key={item.key}
              className="bg-white rounded-xl border shadow p-6"
            >

              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {item.short}
              </p>

              <button
                onClick={() => setModal(item)}
                className="mt-4 text-[#55BAAE] font-semibold hover:underline"
              >
                See More →
              </button>

            </div>
          ))}

        </div>

        {/* APPLICATIONS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Industrial Applications
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {applications.map((item) => (
            <div
              key={item.key}
              className="bg-white rounded-xl border shadow p-6"
            >

              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {item.short}
              </p>

              <button
                onClick={() => setModal(item)}
                className="mt-4 text-[#55BAAE] font-semibold hover:underline"
              >
                See More →
              </button>

            </div>
          ))}

        </div>

        {/* TECH */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Engineering Advantages
        </h2>

        <div className="space-y-4 text-gray-700 max-w-5xl leading-relaxed">

          <p>
            Refrigeration insulation systems are designed for maximum thermal efficiency and energy savings.
          </p>

          <p>
            PIR systems improve fire safety and high-temperature resistance.
          </p>

          <p>
            PUF systems provide cost-effective insulation for commercial applications.
          </p>

        </div>

      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white max-w-2xl w-full rounded-xl shadow-xl p-6 relative">

            <button
              onClick={() => setModal(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-800">
              {modal.title}
            </h2>

            <div className="mt-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {modal.content}
            </div>

          </div>

        </div>
      )}

    </main>
  );
}