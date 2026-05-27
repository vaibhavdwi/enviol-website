"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function ColdStorageInsulationPage() {

  const [modal, setModal] = useState(null);

  const sections = [
    {
      key: "overview",
      title: "Cold Storage Insulation Systems",
      short:
        "High-performance insulation systems designed for temperature-controlled storage environments.",
      content: `
Cold storage insulation systems are built using PIR and PUF rigid foam technologies.

These systems are essential for maintaining low-temperature environments with minimal energy loss.

Applications include food storage, pharmaceutical warehouses, logistics cold chains, and frozen storage facilities.

Key Features:
- Low thermal conductivity
- High energy efficiency
- Moisture resistant closed-cell structure

Advantages:
- Stable temperature control
- Reduced power consumption
- Long-term insulation performance
      `,
    },
    {
      key: "pir",
      title: "PIR Based Cold Storage Systems",
      short:
        "High fire-resistant insulation systems for advanced cold storage infrastructure.",
      content: `
PIR foam systems are widely used in high-performance cold storage applications.

They provide superior fire resistance and enhanced thermal stability compared to standard polyurethane systems.

Applications:
- Large cold warehouses
- Pharmaceutical cold rooms
- Export food storage units

Specifications:
- High isocyanurate content
- Low thermal conductivity
- Strong structural stability

Advantages:
- Improved fire safety
- Better thermal performance
- Long operational lifespan
      `,
    },
    {
      key: "puf",
      title: "PUF Based Cold Storage Systems",
      short:
        "Cost-effective insulation solution widely used in cold storage construction.",
      content: `
PUF systems are commonly used in cost-sensitive cold storage applications.

They provide reliable thermal insulation at lower material cost.

Applications:
- Small cold rooms
- Dairy storage units
- Food processing storage

Specifications:
- Lightweight foam structure
- Good insulation efficiency
- Easy installation

Advantages:
- Economical solution
- Easy fabrication
- Widely available system
      `,
    },
    {
      key: "construction",
      title: "Cold Room Panel Construction",
      short:
        "Sandwich panel based construction used in modular cold storage rooms.",
      content: `
Cold storage rooms are constructed using insulated sandwich panels with PIR or PUF cores.

Structure:
- Metal outer sheets (GI / PPGI)
- Rigid foam insulation core
- Interlocking panel joints

Applications:
- Modular cold rooms
- Walk-in freezers
- Industrial cold warehouses

Advantages:
- Fast installation
- Modular expansion
- High insulation integrity
      `,
    },
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <AnimatedHeading title="Cold Storage Insulation Systems" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

              <p>
                Cold storage insulation systems are critical for maintaining controlled
                temperature environments in industrial storage applications.
              </p>

              <p>
                These systems use PIR and PUF rigid foam insulation to minimize heat transfer
                and improve energy efficiency.
              </p>

              <p>
                Enviol supplies advanced polyols used in cold storage panel manufacturing
                and refrigeration insulation systems.
              </p>

            </div>

          </div>

          <div className="flex justify-center md:justify-end">

            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow border border-gray-200">

              <Image
                src="/images/cold-storage-main.jpg"
                alt="Cold Storage Insulation"
                width={700}
                height={500}
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

        {/* SECTIONS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Cold Storage System Types
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

          {[
            {
              title: "Food Storage Facilities",
              short:
                "Used for preservation of frozen and chilled food products.",
              content: `
Cold storage systems ensure long-term preservation of food products.

Applications:
- Frozen food warehouses
- Meat and seafood storage
- Dairy storage units

Benefits:
- Reduced spoilage
- Temperature consistency
- Energy efficiency
              `,
            },
            {
              title: "Pharmaceutical Storage",
              short:
                "Temperature-controlled storage for medicines and vaccines.",
              content: `
Pharmaceutical cold storage requires strict temperature control.

Applications:
- Vaccine storage
- Medicine warehouses
- Research labs

Benefits:
- Regulatory compliance
- Stable storage conditions
- High reliability
              `,
            },
            {
              title: "Logistics Cold Chain",
              short:
                "Used in transportation and distribution temperature control systems.",
              content: `
Cold chain logistics ensures temperature control during transport.

Applications:
- Refrigerated trucks
- Distribution centers
- Export logistics

Benefits:
- Reduced product loss
- Controlled transit temperature
- Improved supply chain quality
              `,
            },
            {
              title: "Industrial Cold Rooms",
              short:
                "Large scale industrial cooling and storage infrastructure.",
              content: `
Industrial cold rooms are used in large scale storage applications.

Applications:
- Processing plants
- Export hubs
- Bulk storage units

Benefits:
- Large capacity storage
- Stable cooling performance
- Long durability
              `,
            },
          ].map((item) => (

            <div
              key={item.title}
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
            Cold storage systems rely on low thermal conductivity materials to reduce energy loss.
          </p>

          <p>
            PIR systems provide enhanced fire safety and performance stability.
          </p>

          <p>
            PUF systems offer cost-effective insulation for large-scale deployment.
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