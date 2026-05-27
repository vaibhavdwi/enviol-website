"use client";

import { useState } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function WaterbornePolyolsPage() {

  const [modal, setModal] = useState(null);

  // ✅ FIXED FILTER (important for correctness + SEO structure)
  const waterborneProducts = products.filter(
    (p) =>
      p.category === "Coating Grade Polyols" &&
      (p.subCategory === "Waterborne Polyols" || p.type === "Waterborne Polyols")
  );

  const applications = [
    {
      title: "Low VOC Industrial Coatings",
      short: "Eco-friendly coatings for regulated environments.",
      content: `
Waterborne polyols are widely used in low VOC coating systems that meet environmental and regulatory standards.

They reduce solvent emissions while maintaining coating performance.

Applications:
- Industrial protective coatings
- Regulatory compliant coatings
- Green manufacturing systems

Benefits:
- Low VOC emissions
- Environmental compliance
- Safe processing
      `
    },
    {
      title: "Wood & Furniture Coatings",
      short: "Water-based finishes for wood protection systems.",
      content: `
Used in furniture and wood coatings where clarity and safety are important.

Benefits:
- Low odor
- Smooth finish
- Safe indoor application
      `
    },
    {
      title: "Architectural Wall Coatings",
      short: "Sustainable coatings for interior and exterior walls.",
      content: `
Used in building coatings where sustainability and durability are required.

Benefits:
- Breathable films
- Weather resistance
- Eco-friendly formulation
      `
    },
    {
      title: "Flexible PU Dispersions",
      short: "Water-based elastomeric coating systems.",
      content: `
Waterborne polyols are used in flexible PU dispersions for coatings and adhesives.

Benefits:
- Flexibility
- Crack resistance
- Improved safety profile
      `
    }
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <AnimatedHeading title="Waterborne Polyols" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Waterborne polyols are environmentally friendly polyurethane raw materials dispersed in water, designed for low VOC and sustainable coating systems.
              </p>
              <p>
                These systems eliminate or reduce solvent usage while maintaining excellent coating performance, adhesion, and durability.
              </p>
              <p>
                They are widely used in green coatings, industrial finishes, wood coatings, and architectural applications.
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow border border-gray-200">
              <Image
                src="/images/waterborne-polyols-hero.jpg"
                alt="Waterborne Polyols"
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
            <Image src="/images/waterborne-industrial.jpg" alt="Low VOC Coatings" width={500} height={350} className="w-full h-64 object-cover" />
          </div>

          <div className="rounded-xl overflow-hidden shadow border bg-white">
            <Image src="/images/waterborne-wood.jpg" alt="Wood Coatings" width={500} height={350} className="w-full h-64 object-cover" />
          </div>

          <div className="rounded-xl overflow-hidden shadow border bg-white">
            <Image src="/images/waterborne-architectural.jpg" alt="Architectural Coatings" width={500} height={350} className="w-full h-64 object-cover" />
          </div>

        </div>

        {/* WHAT IT IS */}
        <h2 className="text-2xl font-semibold mt-14 mb-5 text-gray-800">
          What are Waterborne Polyols?
        </h2>

        <div className="max-w-4xl space-y-4 text-gray-700 leading-relaxed">
          <p>
            Waterborne polyols are polyurethane building blocks dispersed in water instead of organic solvents, enabling low VOC coating systems.
          </p>
          <p>
            They are designed to meet modern environmental regulations while maintaining performance characteristics such as adhesion, flexibility, and durability.
          </p>
          <p>
            These systems represent the future of sustainable coating technology in industrial and architectural applications.
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
          Waterborne Polyol Grades
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {waterborneProducts.map((product) => (
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