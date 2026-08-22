"use client";

import { useState } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function AcrylicModifiedPolyolsPage() {
  const [modal, setModal] = useState(null);

  // FIXED: correct filtering (you can later refine via product tags)
  const acrylicProducts = products.filter(
    (p) => p.category === "Acrylic Modified Polyols"
  );

  const applications = [
    {
      title: "High Gloss Automotive Coatings",
      short:
        "Premium coatings for automotive OEM and refinishing systems with superior finish quality.",
      content: `
Acrylic modified polyols are widely used in automotive coatings where high gloss, UV resistance, and surface smoothness are required.

They enhance appearance, hardness, and long-term durability of automotive finishes.

Applications:
- Automotive OEM coatings
- Clear coats
- Car refinishing systems

Benefits:
- High gloss retention
- Excellent UV resistance
- Superior scratch resistance
- Long-term color stability
      `,
    },
    {
      title: "Exterior Architectural Coatings",
      short:
        "Weather-resistant coatings for buildings, facades, and infrastructure.",
      content: `
Used in exterior architectural coatings exposed to sunlight, rain, and temperature variation.

These systems maintain appearance and performance over long durations.

Benefits:
- Excellent weatherability
- Strong UV resistance
- Color retention
- Surface protection for decades
      `,
    },
    {
      title: "Industrial Decorative Coatings",
      short:
        "Premium finishes for appliances, furniture, and industrial goods.",
      content: `
Used where aesthetics and durability both matter.

Acrylic modification improves surface hardness and gloss.

Benefits:
- Smooth finish
- High durability
- Chemical resistance
- Premium appearance
      `,
    },
    {
      title: "Plastic & Mixed Substrate Coatings",
      short:
        "Special adhesion systems for plastics and difficult surfaces.",
      content: `
Acrylic modified systems improve adhesion on plastics and mixed substrates where normal coatings fail.

Benefits:
- Strong adhesion
- Balanced flexibility
- Excellent surface compatibility
- Reduced cracking on plastic substrates
      `,
    },
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">
      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <AnimatedHeading title="Acrylic Modified Polyols for High-Performance Coating Systems" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Acrylic modified polyols are hybrid polyurethane raw materials
                designed for high-gloss, UV-resistant and durable coating systems.
              </p>

              <p>
                These systems combine the flexibility of polyurethane with the hardness
                and weather resistance of acrylic chemistry.
              </p>

              <p>
                They are widely used in automotive coatings, architectural finishes,
                and industrial protective coating systems.
              </p>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow border border-gray-200">
              <Image
                src="/images/acrylic-coating-hero.png"
                alt="Acrylic Modified Polyols"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* IMAGE STRIP */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="rounded-xl overflow-hidden shadow border bg-white hover:shadow-lg transition">
            <Image
              src="/images/acrylic-auto.jpg"
              alt="Automotive Coatings"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow border bg-white hover:shadow-lg transition">
            <Image
              src="/images/acrylic-building.jpg"
              alt="Architectural Coatings"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow border bg-white hover:shadow-lg transition">
            <Image
              src="/images/acrylic-gloss.jpg"
              alt="High Gloss Coatings"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* WHAT IT IS */}
        <h2 className="text-2xl font-semibold mt-14 mb-5 text-gray-800">
          What are Acrylic Modified Polyols?
        </h2>

        <div className="max-w-4xl space-y-4 text-gray-700 leading-relaxed">
          <p>
            Acrylic modified polyols are hybrid polymer systems that enhance polyurethane coatings
            with improved hardness, UV resistance, and gloss retention.
          </p>

          <p>
            They bridge the performance gap between flexible PU coatings and hard acrylic coatings.
          </p>

          <p>
            This makes them ideal for exterior, automotive, and premium industrial coating systems.
          </p>
        </div>

        {/* APPLICATIONS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Industrial Applications
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {applications.map((app, idx) => (
            <div
              key={idx}
              className="
                bg-white p-6 rounded-xl border shadow
                hover:bg-[#55BAAE] hover:text-white
                hover:shadow-xl hover:-translate-y-1
                transition cursor-pointer group
              "
            >
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white">
                {app.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2 group-hover:text-white/90">
                {app.short}
              </p>

              <button
                onClick={() => setModal(app)}
                className="mt-4 text-[#55BAAE] font-semibold group-hover:text-white hover:underline"
              >
                See More →
              </button>
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Acrylic Modified Polyol Grades
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {acrylicProducts.map((product) => (
            <div
              key={product.id}
              className="
                bg-white p-6 shadow rounded-xl border border-gray-100
                hover:bg-[#55BAAE] hover:text-white
                hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
                transition-all duration-300 group
              "
            >
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-white">
                {product.product_name}
              </h3>

              <p className="text-xs text-gray-500 group-hover:text-white/80 mt-1">
                {product.product_code}
              </p>

              <p className="text-sm mt-2 text-gray-600 group-hover:text-white/90">
                {product.short_description}
              </p>

              <div className="mt-4 text-sm space-y-1 text-gray-600 group-hover:text-white/90">
                <p>
                  <span className="font-medium">Applications:</span>{" "}
                  {product.applications?.join(", ")}
                </p>

                <p>
                  <span className="font-medium">Viscosity:</span>{" "}
                  {product.technical_data?.dynamic_viscosity || "-"}
                </p>

                <p>
                  <span className="font-medium">Hydroxyl Value:</span>{" "}
                  {product.technical_data?.hydroxyl_number || "-"}
                </p>
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="inline-flex mt-4 font-semibold text-[#42b3a5] group-hover:text-white"
              >
                View Product →
              </Link>
            </div>
          ))}
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