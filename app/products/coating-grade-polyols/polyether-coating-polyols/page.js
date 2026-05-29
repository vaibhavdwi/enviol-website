"use client";

import { useEffect, useState } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function PolyetherCoatingPolyolsPage() {

  const [modal, setModal] = useState(null);

  // ✅ FIXED: more accurate filtering (IMPORTANT FOR SEO)
  const polyetherProducts = products.filter(
    (p) => p.product_type === "Polyether Coating Polyols"
  );

  const applications = [
    {
      title: "Waterproof Coating Systems",
      short: "High moisture resistance coatings for humid and wet environments.",
      content: `
Polyether coating polyols are widely used in waterproof coating systems due to their excellent hydrolysis resistance.

They maintain performance even under long-term water exposure and humid conditions.

Applications include:
• Roof waterproof coatings
• Membrane systems
• Damp-proof protective coatings

Advantages:
• Excellent water resistance
• Long-term flexibility
• Stable performance in humidity
      `
    },
    {
      title: "Elastomeric Coatings",
      short: "Flexible coatings for dynamic and moving surfaces.",
      content: `
Polyether systems provide high elasticity and elongation in polyurethane coating films.

They are ideal for substrates that undergo vibration, expansion, or mechanical movement.

Benefits:
• High elongation
• Crack resistance
• Elastic recovery
      `
    },
    {
      title: "Construction Sealants",
      short: "PU-based sealing and bonding systems.",
      content: `
Polyether polyols are widely used in sealants and adhesives due to their flexibility and bonding strength.

They ensure long-term structural integrity in construction joints.

Benefits:
• Strong adhesion
• Weather resistance
• Elastic bonding performance
      `
    },
    {
      title: "Industrial Protective Coatings",
      short: "Durable coatings for moderate chemical environments.",
      content: `
Used in industrial systems requiring flexibility and moisture resistance.

While chemical resistance is moderate compared to polyester systems, flexibility and durability are significantly higher.

Benefits:
• Flexibility under stress
• Crack prevention
• Moisture tolerance
      `
    }
  ];

  // UX improvement: ESC close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModal(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <AnimatedHeading title="Polyether Coating Polyols" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

              <p>
                Polyether coating polyols are flexible polyurethane raw materials designed for coating systems requiring hydrolysis resistance, elasticity, and long-term durability.
              </p>

              <p>
                These materials are widely used in waterproof coatings, elastomeric coatings, sealants, and construction systems where moisture resistance is critical.
              </p>

              <p>
                Compared to polyester systems, polyether polyols deliver superior flexibility and performance in humid environments.
              </p>

            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow border border-gray-200">
              <Image
                src="/images/polyether-coating-hero.png"
                alt="Polyether Coating Polyols"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* IMAGE STRIP */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {[
            { src: "/images/coating-waterproof.jpg", alt: "Waterproof Coatings" },
            { src: "/images/coating-elastomer.jpg", alt: "Elastomeric Coatings" },
            { src: "/images/coating-sealant.jpg", alt: "Sealants" }
          ].map((img, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow border bg-white hover:scale-[1.02] transition"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={350}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}

        </div>

        {/* WHAT IT IS */}
        <h2 className="text-2xl font-semibold mt-14 mb-5 text-gray-800">
          What are Polyether Coating Polyols?
        </h2>

        <div className="max-w-4xl space-y-4 text-gray-700 leading-relaxed">

          <p>
            Polyether coating polyols are hydroxyl-functional polymers used in polyurethane systems where flexibility and hydrolysis resistance are critical.
          </p>

          <p>
            They outperform polyester systems in moisture-rich environments due to their stable ether linkage structure.
          </p>

          <p>
            These materials are essential for elastomeric coatings, sealants, adhesives, and waterproofing systems.
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
                hover:shadow-2xl hover:-translate-y-2
                transition-all duration-300 cursor-pointer group
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
                className="mt-4 font-semibold text-[#42b3a5] group-hover:text-white hover:underline"
              >
                See More →
              </button>
            </div>
          ))}

        </div>

        {/* PRODUCTS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Polyether Coating Polyol Grades
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {polyetherProducts.map((product) => (
            <div
              key={product.id}
              className="
                bg-white p-6 shadow rounded-xl border border-gray-100
                hover:bg-[#55BAAE] hover:text-white
                hover:shadow-2xl hover:-translate-y-2
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
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
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