"use client";

import Image from "next/image";
import { useState } from "react";

export default function TechnologyClient() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="bg-yellow-50">

      {/* HERO */}
      <section className="py-20 border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Polyol Manufacturing Technology | Polymer Recycling & Depolymerization Process
          </h1>

          <p className="text-lg max-w-3xl mx-auto">
            Enviol Polytech Solutions converts PET and polyurethane waste into high-performance polyester and polyether polyols using advanced chemical recycling and depolymerization processes.
          </p>

        </div>
      </section>

      {/* TECHNOLOGICAL FRAMEWORK */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Technological Framework
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>PET Waste Chemical Recycling</li>
              <li>PU Foam Recycling & Recovery</li>
              <li>Depolymerization & Molecular Restructuring</li>
			  <li>Future: Carry Bags, PU Soles, Rubber Scrap</li>
              <li>Recycled Polyester Polyol Manufacturing</li>
              <li>CASE Applications Integration</li>
            </ul>
          </div>

          <div className="relative h-80 w-full">
            <Image
              src="/images/technology-use.jpg"
              alt="Polymer recycling process for polyol manufacturing"
              fill
              className="object-cover rounded"
            />
          </div>

        </div>
      </section>

      {/* 🔥 R&D SECTION (RESTORED) */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-2xl font-semibold mb-6 text-center">
            Research & Technical Validation
          </h2>

          <p className="max-w-4xl mx-auto text-center">
            Enviol operates an in-house R&D laboratory focused on feedstock characterization, reaction optimization, and polyol formulation development. External certified testing ensures consistency in hydroxyl value, viscosity, and industrial performance standards for polyurethane applications.
          </p>

        </div>
      </section>

      {/* 🔥 MANUFACTURING ROADMAP (RESTORED) */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-2xl font-semibold mb-6">
            Manufacturing Roadmap
          </h2>

          <p>
            Enviol is currently in the pilot phase and scaling toward industrial polyol manufacturing with a targeted capacity of 30 tons per day. The facility is designed for scalable production, quality control, and efficient chemical processing to meet global demand.
          </p>

        </div>
      </section>

      {/* SEO SECTION */}
      <section className="py-16 bg-yellow-50 text-center">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-2xl font-semibold mb-4">
            Sustainable Polyol Production Through Chemical Recycling
          </h2>

          <p className="max-w-4xl mx-auto text-gray-700">
            Our technology enables conversion of polymer waste into high-quality polyols, reducing dependency on virgin petrochemical feedstock and supporting circular economy manufacturing.
          </p>

        </div>
      </section>

      {/* STRATEGIC ADVANTAGES */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-2xl font-semibold mb-8 text-center">
            Strategic Advantages
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">

            {[
              {
                title: "Import Substitution",
                desc: "Reducing reliance on imported petrochemical polyols."
              },
              {
                title: "Circular Production",
                desc: "Converting waste polymers into reusable raw materials."
              },
              {
                title: "Cost Efficiency",
                desc: "Providing sustainable and cost-effective polyol solutions."
              }
            ].map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`border p-6 rounded transition-all duration-300 cursor-pointer
                  ${activeCard === index ? "bg-[#42b3a5] text-white shadow-xl scale-105" : "bg-white"}`}
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}