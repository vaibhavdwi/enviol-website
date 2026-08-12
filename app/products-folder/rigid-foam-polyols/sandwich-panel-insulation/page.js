"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function SandwichPanelInsulationPage() {

  const [modal, setModal] = useState(null);

  const sections = [
    {
      key: "pir",
      title: "PIR Sandwich Panels",
      short:
        "High fire resistance insulation system used in industrial roofing and high-performance buildings.",
      content: `
PIR sandwich panels use polyisocyanurate foam as the core insulation material.

They offer superior fire resistance, high thermal stability, and excellent structural integrity.

Applications:
- Industrial roofing systems
- Cold storage buildings
- Warehouses
- High-performance insulation structures

Specifications:
- Low thermal conductivity
- High closed-cell structure
- Enhanced fire resistance vs PUF

Advantages:
- Improved fire safety
- Long-term thermal efficiency
- High mechanical strength
      `,
    },
    {
      key: "puf",
      title: "PUF Sandwich Panels",
      short:
        "Cost-effective polyurethane insulation system widely used in cold storage and general construction.",
      content: `
PUF sandwich panels use polyurethane foam as the insulating core material.

They are widely used for cost-efficient thermal insulation solutions.

Applications:
- Cold storage rooms
- Refrigeration systems
- Prefabricated buildings
- Insulated doors

Specifications:
- Good thermal insulation
- Lightweight structure
- Economical system

Advantages:
- Cost-effective solution
- Easy processing
- Widely used industrial standard
      `,
    },
    {
      key: "roofing",
      title: "Roofing Panels",
      short:
        "Insulated roofing systems used in industrial sheds and commercial buildings.",
      content: `
Sandwich roofing panels combine metal sheets with rigid foam cores.

Applications:
- Warehouses
- Industrial sheds
- Manufacturing plants
- Commercial buildings

Specifications:
- Weather-resistant metal skins
- Insulated foam core
- Lightweight structure

Advantages:
- Reduced heat load
- Fast installation
- Long service life
      `,
    },
    {
      key: "cold",
      title: "Cold Storage Panels",
      short:
        "High insulation panels designed for low temperature storage environments.",
      content: `
Cold storage panels are engineered for controlled low-temperature environments.

Applications:
- Food storage facilities
- Pharmaceutical storage
- Logistics cold chains
- Frozen goods warehouses

Specifications:
- Very low thermal conductivity
- High insulation efficiency
- Moisture resistance

Advantages:
- Energy saving operation
- Stable temperature control
- Reduced thermal loss
      `,
    },
  ];

  const applications = [
    {
      key: "industrial",
      title: "Industrial Buildings",
      short:
        "Used in factories, warehouses, and industrial sheds for thermal insulation and structural efficiency.",
      content: `
Sandwich panels are widely used in industrial buildings due to their combination of insulation and strength.

Use Cases:
- Manufacturing plants
- Logistics hubs
- Warehouses
- Industrial sheds

Benefits:
- Faster construction
- Energy efficiency
- Reduced cooling load
- Long service life
      `,
    },
    {
      key: "coldstorage",
      title: "Cold Storage Facilities",
      short:
        "Critical insulation systems for temperature-controlled storage environments.",
      content: `
Cold storage applications require precise temperature control.

Sandwich panels with PIR/PUF cores provide:

Use Cases:
- Food storage
- Pharmaceutical storage
- Dairy and frozen goods

Benefits:
- Minimal thermal leakage
- High energy efficiency
- Stable internal temperature
      `,
    },
    {
      key: "refrigeration",
      title: "Refrigeration Systems",
      short:
        "Used in refrigerated trucks, chambers, and cooling systems.",
      content: `
Refrigeration systems require continuous insulation performance.

Applications:
- Cold chain logistics
- Refrigerated transport
- Cooling chambers

Benefits:
- Thermal consistency
- Reduced energy consumption
- Improved cooling efficiency
      `,
    },
    {
      key: "roofingapp",
      title: "Commercial Roofing",
      short:
        "Energy-efficient insulated roofing systems for industrial structures.",
      content: `
Sandwich roofing systems are widely used in modern construction.

Applications:
- Commercial buildings
- Industrial roofing
- Warehouses

Benefits:
- Heat reduction
- Weather protection
- Structural durability
      `,
    },
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <AnimatedHeading title="Sandwich Panel Insulation Systems" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

              <p>
                Sandwich panel systems are one of the most widely used rigid polyurethane
                insulation applications in industrial construction.
              </p>

              <p>
                They consist of PIR or PUF foam cores between metal sheets,
                delivering thermal insulation and structural strength.
              </p>

              <p>
                Enviol supplies polyols used in continuous sandwich panel production lines
                for roofing, cold storage, and industrial insulation systems.
              </p>

            </div>

          </div>

          <div className="flex justify-center md:justify-end">

            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow border border-gray-200">

              <Image
                src="/images/sandwich-panel-main.jpg"
                alt="Sandwich Panels"
                width={700}
                height={500}
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

        {/* TYPES */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Types of Sandwich Panel Systems
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {sections.map((item) => (
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

        {/* TECH SECTION */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Engineering Advantages
        </h2>

        <div className="space-y-4 text-gray-700 max-w-5xl leading-relaxed">

          <p>
            Sandwich panels combine insulation efficiency with structural rigidity.
          </p>

          <p>
            PIR improves fire resistance, while PUF reduces system cost.
          </p>

          <p>
            These systems are essential in modern energy-efficient industrial infrastructure.
          </p>

        </div>

      </div>

      {/* GLOBAL MODAL */}
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