"use client";

import products from "@/data/products.json";
import Link from "next/link";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";
import { useState } from "react";

export default function CoatingGradePolyolsPage() {
	const [modal, setModal] = useState(null);
  const coatingProducts = products.filter(
    (p) => p.category === "Coating Grade Polyols"
  );

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* LEFT CONTENT */}
          <div className="md:w-1/2">

            <AnimatedHeading title="Coating Grade Polyols" />

            <div className="mt-6 space-y-4 leading-relaxed text-gray-700">
              <p>
                Coating grade polyols are specially designed polyester and polyether-based raw materials used in high-performance coating systems.
              </p>

              <p>
                These polyols provide excellent adhesion, chemical resistance, flexibility, and durability in protective coating applications.
              </p>

              <p>
                They are widely used in automotive coatings, industrial paints, protective coatings, and elastomeric systems where surface performance is critical.
              </p>
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/2 flex justify-center md:justify-end">

            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg border border-gray-200">

              <Image
                src="/images/coating-polyols.jpg"   // 🔁 replace image
                alt="Coating Grade Polyols"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />

            </div>

          </div>

        </div>

        {/* HOW IT WORKS */}
        <h2 className="text-2xl font-semibold mt-14 mb-4 text-gray-800">
          How Coating Grade Polyols Work
        </h2>

        <div className="max-w-4xl space-y-4 leading-relaxed text-gray-700">
          <p>
            Coating grade polyols react with isocyanates or curing agents to form crosslinked polymer networks that define hardness, gloss, and durability of coatings.
          </p>

          <p>
            Polyester polyols improve chemical resistance and hardness, while polyether polyols enhance flexibility and hydrolysis resistance.
          </p>

          <p>
            By adjusting functionality and molecular weight, coating properties such as drying time, adhesion, and elasticity can be precisely controlled.
          </p>
        </div>

{/* 🔷 ECOSYSTEM NAVIGATION HUB */}
<h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
  Explore Coating Grade Polyols Ecosystem
</h2>

<div className="grid md:grid-cols-2 gap-6">

  {[
    {
      title: "Polyester Coating Polyols",
      short: "High hardness & chemical resistance systems",
      link: "/products/coating-grade-polyols/polyester-coating-polyols",
      content: "Used in industrial coatings, flooring, and metal protection systems requiring high durability and chemical resistance."
    },
    {
      title: "Polyether Coating Polyols",
      short: "Flexible & hydrolysis-resistant systems",
      link: "/products/coating-grade-polyols/polyether-coating-polyols",
      content: "Best suited for humid environments, waterproof coatings, sealants, and elastomeric applications."
    },
    {
      title: "Acrylic Modified Polyols",
      short: "UV stable high gloss hybrid systems",
      link: "/products/coating-grade-polyols/acrylic-modified-polyols",
      content: "Used in automotive, architectural, and decorative coatings requiring gloss retention and UV stability."
    },
    {
      title: "Aliphatic Polyols",
      short: "Non-yellowing exterior grade systems",
      link: "/products/coating-grade-polyols/aliphatic-polyols",
      content: "Ideal for outdoor coatings, automotive clear coats, and high-end exterior applications."
    },
    {
      title: "Aromatic Polyols",
      short: "Cost-effective industrial coating systems",
      link: "/products/coating-grade-polyols/aromatic-polyols",
      content: "Used in flooring, industrial coatings, and metal protection where cost and strength are key."
    },
    {
      title: "Waterborne Polyols",
      short: "Low VOC sustainable coating systems",
      link: "/products/coating-grade-polyols/waterborne-polyols",
      content: "Eco-friendly systems used in green coatings, wood finishes, and regulatory-compliant applications."
    },

    // ⚙️ AUTHORITY PAGES (IMPORTANT FIXED PATHS)
    {
      title: "Polyester vs Polyether Guide",
      short: "Technical comparison of coating chemistries",
      link: "/products/coating-grade-polyols/authority/comparison-polyester-vs-polyether",
      content: "Detailed comparison of mechanical strength vs flexibility trade-offs between polyester and polyether systems."
    },
    {
      title: "Manufacturing Process",
      short: "Industrial production of polyols",
      link: "/products/coating-grade-polyols/authority/manufacturing-process",
      content: "Explains polycondensation, molecular weight control, and industrial production methods."
    },
    {
      title: "Advanced Technology Guide",
      short: "Deep coating chemistry insights",
      link: "/products/coating-grade-polyols/authority/technology-guide",
      content: "Covers polymer design, crosslinking chemistry, and performance tuning strategies."
    },
    {
      title: "Low VOC Guide",
      short: "Sustainable coating formulations",
      link: "/products/coating-grade-polyols/authority/low-voc-guide",
      content: "Explains regulatory compliance, solvent reduction strategies, and green chemistry approaches."
    }
  ].map((item, idx) => (
    <div
      key={idx}
      className="
        bg-white p-6 rounded-xl border shadow
        hover:bg-[#55BAAE] hover:text-white
        hover:shadow-2xl hover:-translate-y-2
        transition cursor-pointer group
      "
    >
      <h3 className="text-lg font-bold text-gray-800 group-hover:text-white">
        {item.title}
      </h3>

      <p className="text-sm text-gray-600 mt-2 group-hover:text-white/90">
        {item.short}
      </p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setModal(item)}
          className="text-sm font-semibold text-[#55BAAE] group-hover:text-white"
        >
          See More →
        </button>

        <Link
          href={item.link}
          className="text-sm font-semibold underline text-gray-700 group-hover:text-white"
        >
          Click Here
        </Link>
      </div>
    </div>
  ))}

</div>


        {/* PRODUCTS */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Our Coating Grade Polyol Grades
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {coatingProducts.map((product) => (

            <div
              key={product.id}
              className="
                bg-white p-6 shadow rounded-xl border border-gray-100
                transition-all duration-300
                hover:bg-[#55BAAE] hover:text-white
                hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
                cursor-pointer group
              "
            >

              {/* PRODUCT NAME */}
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-white transition">
                {product.product_name}
              </h3>

              {/* PRODUCT CODE */}
              <p className="text-xs font-semibold text-gray-500 group-hover:text-white/80 mt-1 transition">
                {product.product_code}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm mt-2 text-gray-600 group-hover:text-white/90 transition">
                {product.short_description}
              </p>

              {/* TECH DATA */}
              <div className="mt-4 text-sm text-gray-600 group-hover:text-white/90 space-y-1 transition">

                <p>
                  <span className="font-medium text-gray-800 group-hover:text-white">
                    Applications:
                  </span>{" "}
                  {product.applications?.join(", ")}
                </p>

                <p>
                  <span className="font-medium text-gray-800 group-hover:text-white">
                    Viscosity:
                  </span>{" "}
                  {product.technical_data?.dynamic_viscosity || "-"}
                </p>

                <p>
                  <span className="font-medium text-gray-800 group-hover:text-white">
                    Hydroxyl Value:
                  </span>{" "}
                  {product.technical_data?.hydroxyl_number || "-"}
                </p>

              </div>

              {/* LINK */}
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex mt-4 font-semibold text-[#42b3a5] group-hover:text-white transition"
              >
                View Product →
              </Link>

            </div>

          ))}

        </div>

        {/* TECHNICAL TABLE */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Technical Overview
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-sm border border-gray-200 bg-white rounded-lg overflow-hidden">

            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="p-3 text-left">Product Code</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Hydroxyl Number</th>
                <th className="p-3 text-left">Viscosity</th>
                <th className="p-3 text-left">Water Content</th>
                <th className="p-3 text-left">Acid Value</th>
              </tr>
            </thead>

            <tbody>

              {coatingProducts.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >

                  <td className="p-3 text-gray-600 font-medium">
                    {p.product_code}
                  </td>

                  <td className="p-3 text-gray-800">
                    {p.product_name}
                  </td>

                  <td className="p-3 text-gray-600">
                    {p.technical_data?.hydroxyl_number || "-"}
                  </td>

                  <td className="p-3 text-gray-600">
                    {p.technical_data?.dynamic_viscosity || "-"}
                  </td>

                  <td className="p-3 text-gray-600">
                    {p.technical_data?.water_content || "-"}
                  </td>

                  <td className="p-3 text-gray-600">
                    {p.technical_data?.acid_value || "-"}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}