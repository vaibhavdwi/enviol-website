"use client";

import { useEffect, useState } from "react";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function PolyesterCoatingPolyolsPage() {

  const [modal, setModal] = useState(null);

  const polyesterProducts = products.filter(
    (p) => p.category === "Coating Grade Polyols"
  );

  const applications = [
    {
      title: "Industrial Protective Coatings",
      short: "Corrosion-resistant PU coatings for steel and industrial assets.",
      content: `
Polyester coating polyols are widely used in industrial protective coating systems due to their high hardness, chemical resistance, and long-term durability.

They form strong polyurethane networks when reacted with isocyanates, making them ideal for harsh industrial environments.

Key applications include:
• Steel structures
• Chemical processing plants
• Industrial machinery

Key advantages:
• Excellent corrosion resistance
• High mechanical strength
• Long-term surface protection
      `
    },
    {
      title: "Metal Coatings",
      short: "High adhesion coatings for metal substrates and fabrication systems.",
      content: `
Used in metal coating systems where adhesion, hardness, and surface finish are critical.

These polyols improve coating integrity and resistance against abrasion and chemicals.

Benefits include:
• Strong metal adhesion
• Scratch resistance
• Improved surface durability
      `
    },
    {
      title: "Automotive Primers",
      short: "Base layer coatings for automotive finishing systems.",
      content: `
Polyester polyols enhance film hardness, leveling, and surface smoothness in automotive primer systems.

They help achieve superior finish quality in multi-layer automotive coatings.

Benefits:
• Smooth surface finish
• High gloss compatibility
• Chemical resistance
      `
    },
    {
      title: "Industrial Floor Coatings",
      short: "Heavy-duty flooring systems for warehouses and factories.",
      content: `
Used in polyurethane flooring systems requiring abrasion resistance and load-bearing strength.

They improve durability in high-traffic industrial environments.

Benefits:
• High abrasion resistance
• Mechanical strength
• Chemical and stain resistance
      `
    }
  ];

  // ESC to close modal (UX upgrade)
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
            <AnimatedHeading title="Polyester Coating Polyols" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

              <p>
                Polyester coating polyols are high-performance raw materials used in polyurethane coating systems requiring hardness, chemical resistance, and long-term durability.
              </p>

              <p>
                These polyols are widely used in industrial coatings, metal protection systems, automotive primers, and high-performance surface coatings.
              </p>

              <p>
                Their molecular structure enables superior film formation, mechanical strength, and resistance against aggressive environments.
              </p>

            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow border border-gray-200">
              <Image
                src="/images/polyester-coating-hero.png"
                alt="Polyester Coating Polyols"
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
            { src: "/images/coating-industrial.jpg", alt: "Industrial Coatings" },
            { src: "/images/coating-metal.jpg", alt: "Metal Coatings" },
            { src: "/images/coating-floor.jpg", alt: "Floor Coatings" }
          ].map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow border bg-white hover:scale-[1.02] transition">
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
          What are Polyester Coating Polyols?
        </h2>

        <div className="max-w-4xl space-y-4 text-gray-700 leading-relaxed">

          <p>
            Polyester coating polyols are hydroxyl-functional resins used in polyurethane systems to deliver high hardness and chemical resistance.
          </p>

          <p>
            Compared to polyether polyols, polyester systems provide better mechanical strength, solvent resistance, and surface durability.
          </p>

          <p>
            They are essential in protective coatings where long-term surface performance is critical.
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
                hover:shadow-2xl hover:-translate-y-2
                hover:bg-[#55BAAE] hover:text-white
                transition-all duration-300 cursor-pointer
                group
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
          Polyester Coating Polyol Grades
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {polyesterProducts.map((product) => (
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