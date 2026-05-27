"use client";

import { useState } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function AromaticPolyolsPage() {

  const [modal, setModal] = useState(null);

  // ✅ FIXED FILTER (important for correctness)
  const aromaticProducts = products.filter(
    (p) => p.category === "Coating Grade Polyols" &&
         (p.subCategory === "Aromatic Polyols" || p.type === "Aromatic Polyols")
  );

  const applications = [
    {
      title: "Industrial Protective Coatings",
      short: "Heavy-duty coatings for machinery and industrial surfaces.",
      content: `
Aromatic polyols are widely used in industrial protective coatings where hardness, chemical resistance, and cost efficiency are required.

They form strong crosslinked networks that provide durable surface protection.

Applications:
- Industrial machinery coatings
- Equipment protection systems
- Maintenance coatings

Benefits:
- High hardness
- Chemical resistance
- Cost efficiency
      `
    },
    {
      title: "Floor Coating Systems",
      short: "Durable PU flooring for industrial environments.",
      content: `
Used in industrial flooring systems requiring abrasion resistance and mechanical strength.

Benefits:
- High wear resistance
- Load-bearing strength
- Long service life
      `
    },
    {
      title: "Metal Protection Coatings",
      short: "Anti-corrosion coatings for metal substrates.",
      content: `
Aromatic systems provide strong adhesion and protective barriers on metal surfaces.

Benefits:
- Corrosion resistance
- Strong adhesion
- Mechanical durability
      `
    },
    {
      title: "General Industrial Coatings",
      short: "Cost-effective coating systems for mass industrial use.",
      content: `
Used where performance balance and cost optimization are important.

Benefits:
- Economical formulation
- Balanced performance
- Easy processing
      `
    }
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <AnimatedHeading title="Aromatic Polyols" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Aromatic polyols are high-performance polyurethane raw materials designed for industrial coating systems requiring strength, hardness, and cost efficiency.
              </p>
              <p>
                These systems are widely used in protective coatings, flooring systems, and metal protection applications where durability is critical.
              </p>
              <p>
                They form rigid, chemically resistant polymer networks suitable for demanding industrial environments.
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow border border-gray-200">
              <Image
                src="/images/aromatic-coating-hero.jpg"
                alt="Aromatic Polyols"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* IMAGE STRIP */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="rounded-xl overflow-hidden shadow border bg-white">
            <Image src="/images/aromatic-industrial.jpg" alt="Industrial Coatings" width={500} height={350} className="w-full h-64 object-cover" />
          </div>

          <div className="rounded-xl overflow-hidden shadow border bg-white">
            <Image src="/images/aromatic-floor.jpg" alt="Floor Coatings" width={500} height={350} className="w-full h-64 object-cover" />
          </div>

          <div className="rounded-xl overflow-hidden shadow border bg-white">
            <Image src="/images/aromatic-metal.jpg" alt="Metal Protection" width={500} height={350} className="w-full h-64 object-cover" />
          </div>

        </div>

        {/* WHAT IT IS */}
        <h2 className="text-2xl font-semibold mt-14 mb-5 text-gray-800">
          What are Aromatic Polyols?
        </h2>

        <div className="max-w-4xl space-y-4 text-gray-700 leading-relaxed">
          <p>
            Aromatic polyols are polyurethane building blocks derived from aromatic structures that provide high rigidity and chemical resistance.
          </p>
          <p>
            They are designed for industrial systems where mechanical strength and cost efficiency are more important than UV stability.
          </p>
          <p>
            These polyols are widely used in flooring, protective coatings, and heavy-duty industrial applications.
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
              className="bg-white p-6 rounded-xl border shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {app.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {app.short}
              </p>

              <button
                onClick={() => setModal(app)}
                className="mt-4 text-[#55BAAE] font-semibold hover:underline"
              >
                See More →
              </button>
            </div>
          ))}

        </div>

        {/* PRODUCTS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Aromatic Polyol Grades
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {aromaticProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 shadow rounded-xl border border-gray-100 hover:bg-[#55BAAE] hover:text-white hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 group"
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