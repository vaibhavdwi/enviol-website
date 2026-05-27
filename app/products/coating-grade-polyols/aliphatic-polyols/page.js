"use client";

import { useState } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function AliphaticPolyolsPage() {
  const [modal, setModal] = useState(null);

  // FIXED: proper category filter (important for SEO + correctness)
  const aliphaticProducts = products.filter(
    (p) => p.category === "Aliphatic Polyols"
  );

  const applications = [
    {
      title: "Automotive Clear Coats",
      short:
        "UV-stable, non-yellowing coatings for premium automotive finishes.",
      content: `
Aliphatic polyols are widely used in automotive clear coat systems where UV stability, gloss retention, and long-term appearance are critical.

They prevent yellowing and maintain optical clarity under harsh sunlight exposure.

Applications:
- Automotive OEM coatings
- Refinish clear coats
- Premium vehicle finishes

Benefits:
- Excellent UV resistance
- Non-yellowing performance
- High gloss retention
- Long-term durability
      `,
    },
    {
      title: "Exterior Protective Coatings",
      short:
        "Weather-resistant coatings for outdoor industrial and architectural surfaces.",
      content: `
Used in exterior coating systems exposed to sunlight, moisture, and temperature variations.

Aliphatic chemistry ensures long-term stability in harsh environments.

Benefits:
- High UV stability
- Strong weather resistance
- Long service life
- Surface integrity protection
      `,
    },
    {
      title: "Industrial Equipment Coatings",
      short:
        "Durable coatings for machinery, tools, and industrial assets.",
      content: `
Used in industrial environments where mechanical strength and chemical resistance are required.

Benefits:
- Mechanical durability
- Moderate chemical resistance
- Surface protection
- Extended equipment life
      `,
    },
    {
      title: "High-End Architectural Finishes",
      short:
        "Premium coatings for modern architectural and design surfaces.",
      content: `
Used in architectural systems where aesthetics and durability must coexist.

Benefits:
- Excellent gloss retention
- Weather resistance
- Premium appearance
- Long-term color stability
      `,
    },
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">
      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <AnimatedHeading title="Aliphatic Polyols for UV-Stable Coating Systems" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Aliphatic polyols are high-performance polyurethane raw materials
                designed for UV-stable, non-yellowing coating systems.
              </p>

              <p>
                These systems provide superior weather resistance, gloss retention,
                and long-term durability in outdoor applications.
              </p>

              <p>
                They are widely used in automotive clear coats, industrial coatings,
                and premium architectural finishes.
              </p>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow border border-gray-200">
              <Image
                src="/images/aliphatic-coating-hero.jpg"
                alt="Aliphatic Polyols"
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
              src="/images/aliphatic-auto.jpg"
              alt="Automotive Clear Coat"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow border bg-white hover:shadow-lg transition">
            <Image
              src="/images/aliphatic-exterior.jpg"
              alt="Exterior Coating"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow border bg-white hover:shadow-lg transition">
            <Image
              src="/images/aliphatic-industrial.jpg"
              alt="Industrial Coating"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* WHAT IT IS */}
        <h2 className="text-2xl font-semibold mt-14 mb-5 text-gray-800">
          What are Aliphatic Polyols?
        </h2>

        <div className="max-w-4xl space-y-4 text-gray-700 leading-relaxed">
          <p>
            Aliphatic polyols are polyurethane building blocks designed to produce coatings
            with excellent UV resistance and non-yellowing properties.
          </p>

          <p>
            Unlike aromatic systems, aliphatic structures maintain stability under sunlight exposure,
            making them ideal for exterior applications.
          </p>

          <p>
            They are widely used in automotive, industrial, and architectural coating systems.
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
          Aliphatic Polyol Grades
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {aliphaticProducts.map((product) => (
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