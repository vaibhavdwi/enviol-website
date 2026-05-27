"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function IndustrialRoofingPage() {

  const [modal, setModal] = useState(null);

  const systems = [
    {
      key: "overview",
      title: "Industrial Roofing Insulation Systems",
      short:
        "High-performance insulated roofing systems using PIR and PUF rigid foam cores.",
      content: `
Industrial roofing systems are designed to provide thermal insulation, weather protection, and structural durability.

These systems use PIR and PUF rigid foam insulation sandwiched between metal sheets.

Applications include factories, warehouses, logistics hubs, and commercial buildings.

Key Features:
- High thermal resistance
- Weather protection
- Lightweight structure
- Fast installation

Advantages:
- Reduced heat load inside buildings
- Energy savings in HVAC systems
- Long service life
      `,
    },
    {
      key: "pir",
      title: "PIR Roofing Panels",
      short:
        "High fire-resistant roofing insulation for industrial and commercial buildings.",
      content: `
PIR roofing panels use polyisocyanurate foam as the core insulation material.

They offer improved fire resistance and high thermal stability compared to PUF systems.

Applications:
- Industrial sheds
- Warehouses
- High-temperature environments

Specifications:
- High isocyanurate structure
- Low thermal conductivity
- Superior fire performance

Advantages:
- Enhanced fire safety
- Long-term insulation performance
- High durability
      `,
    },
    {
      key: "puf",
      title: "PUF Roofing Panels",
      short:
        "Cost-effective roofing insulation system widely used in industrial construction.",
      content: `
PUF roofing panels are widely used for economical insulation solutions.

They provide good thermal insulation at lower cost.

Applications:
- Small industrial sheds
- Prefabricated buildings
- Cold region roofing

Specifications:
- Lightweight foam core
- Good insulation efficiency
- Easy manufacturing

Advantages:
- Cost-effective solution
- Easy installation
- Widely available system
      `,
    },
    {
      key: "metal",
      title: "Metal Roof Sandwich Panels",
      short:
        "Composite roofing system combining metal sheets with insulation core.",
      content: `
Metal sandwich roofing panels combine steel or aluminum sheets with rigid foam insulation.

Structure:
- Outer metal sheet (GI/PPGI)
- PIR or PUF foam core
- Inner protective lining

Applications:
- Industrial roofs
- Commercial buildings
- Cold storage roofs

Advantages:
- High strength
- Corrosion resistance
- Thermal efficiency
      `,
    },
  ];

  const applications = [
    {
      key: "factories",
      title: "Industrial Factories",
      short:
        "Used in manufacturing plants for thermal and structural roofing systems.",
      content: `
Factories require durable roofing systems with thermal insulation.

Benefits:
- Heat reduction inside plant
- Energy efficiency
- Structural durability

Applications:
- Manufacturing units
- Assembly plants
- Processing industries
      `,
    },
    {
      key: "warehouses",
      title: "Warehouses & Logistics",
      short:
        "Large-scale roofing insulation for storage and logistics hubs.",
      content: `
Warehouses use insulated roofing to maintain internal temperature stability.

Benefits:
- Reduced cooling load
- Product protection
- Energy savings

Applications:
- Storage warehouses
- Logistics hubs
- Distribution centers
      `,
    },
    {
      key: "commercial",
      title: "Commercial Buildings",
      short:
        "Energy-efficient roofing for malls, offices, and commercial structures.",
      content: `
Commercial buildings use insulated roofing systems for comfort and efficiency.

Benefits:
- Reduced HVAC load
- Better indoor comfort
- Lower energy bills

Applications:
- Shopping malls
- Office buildings
- Retail complexes
      `,
    },
    {
      key: "cold",
      title: "Cold Storage Roofing",
      short:
        "Specialized roofing systems for cold storage and refrigeration buildings.",
      content: `
Cold storage roofing requires high insulation performance.

Benefits:
- Minimal thermal leakage
- Temperature stability
- Energy efficiency

Applications:
- Cold rooms
- Freezer warehouses
- Refrigeration plants
      `,
    },
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <AnimatedHeading title="Industrial Roofing Insulation Systems" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

              <p>
                Industrial roofing insulation systems provide thermal protection
                and structural durability for large-scale buildings.
              </p>

              <p>
                These systems use PIR and PUF foam cores between metal sheets
                to reduce heat transfer and improve energy efficiency.
              </p>

              <p>
                Enviol supplies polyols used in roofing panel manufacturing
                and industrial insulation systems.
              </p>

            </div>

          </div>

          <div className="flex justify-center md:justify-end">

            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow border border-gray-200">

              <Image
                src="/images/industrial-roofing-main.jpg"
                alt="Industrial Roofing Insulation"
                width={700}
                height={500}
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

        {/* SYSTEMS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Roofing Insulation Systems
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {systems.map((item) => (
            <div key={item.key} className="bg-white rounded-xl border p-6 shadow">

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
            <div key={item.key} className="bg-white rounded-xl border p-6 shadow">

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

        {/* TECH SECTION */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Engineering Advantages
        </h2>

        <div className="space-y-4 text-gray-700 max-w-5xl leading-relaxed">

          <p>
            Industrial roofing systems combine insulation efficiency with structural strength.
          </p>

          <p>
            PIR systems improve fire safety and high-temperature resistance.
          </p>

          <p>
            PUF systems provide cost-effective insulation for large-scale roofing projects.
          </p>

        </div>

      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white max-w-2xl w-full rounded-xl p-6 relative">

            <button
              onClick={() => setModal(null)}
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black"
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