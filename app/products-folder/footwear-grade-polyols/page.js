"use client";

import products from "@/data/products.json";
import Link from "next/link";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";
import { useState } from "react";

export default function FootwearGradePolyolsPage() {

  const [modal, setModal] = useState(null);

  const footwearProducts = products.filter(
    (p) => p.category === "Footwear Grade Polyols"
  );

  return (

    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* LEFT */}
          <div className="md:w-1/2">

            <AnimatedHeading title="Footwear Grade Polyols" />

            <div className="mt-6 space-y-4 leading-relaxed text-gray-700">

              <p>
                Footwear grade polyols are specially engineered polyurethane raw materials used in manufacturing high-performance shoe sole systems.
              </p>

              <p>
                These polyols provide excellent flexibility, abrasion resistance, cushioning, durability, and lightweight performance required for modern footwear applications.
              </p>

              <p>
                They are widely used in sports shoes, leather footwear, sandals, slippers, safety shoes, and industrial workwear footwear systems.
              </p>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/2 flex justify-center md:justify-end">

            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg border border-gray-200">

              <Image
                src="/images/footwear-polyols.png"
                alt="Footwear Grade Polyols"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />

            </div>

          </div>

        </div>

        {/* HOW IT WORKS */}
        <h2 className="text-2xl font-semibold mt-14 mb-4 text-gray-800">
          How Footwear Grade Polyols Work
        </h2>

        <div className="max-w-4xl space-y-4 leading-relaxed text-gray-700">

          <p>
            Footwear polyols react with isocyanates to produce polyurethane elastomer systems that form durable and flexible shoe soles.
          </p>

          <p>
            By controlling hydroxyl value, molecular weight, and functionality, manufacturers can optimize hardness, rebound, comfort, flexibility, and wear resistance.
          </p>

          <p>
            Different footwear applications require customized formulations ranging from soft flexible slipper soles to highly durable industrial safety shoe systems.
          </p>

        </div>

       {/* FOOTWEAR ECOSYSTEM */}
<h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
  Footwear Polyol Technologies & Application Systems
</h2>

<div className="grid md:grid-cols-2 gap-6">

  {[
    {
      title: "Sports Shoe Systems",
      short: "High rebound lightweight athletic sole systems",
      content: `
Sports footwear polyurethane systems are engineered for high energy return, lightweight structure, flexibility, and long-term mechanical durability.

These systems are widely used in:
• Running shoes
• Athletic footwear
• Training shoes
• Performance sneakers
• Shock-absorbing midsoles

Key performance requirements include:
• High rebound
• Low density
• Excellent abrasion resistance
• Flex crack resistance
• Dynamic cushioning
• Long-term fatigue resistance

Typical polyurethane technologies:
• Microcellular polyurethane systems
• Flexible polyester polyols
• Polyether cushioning systems
• TPU-compatible systems

Recommended hardness range:
• Shore A 45–70 depending on shoe design

These formulations are optimized for modern lightweight athletic footwear manufacturing where comfort and durability are both critical.
`
    },

    {
      title: "Leather Footwear Systems",
      short: "Durable formal and leather shoe sole systems",
      content: `
Leather footwear polyurethane systems focus on dimensional stability, durability, elegance, and long service life.

These systems are commonly used in:
• Formal shoes
• Leather footwear
• Office shoes
• Premium lifestyle footwear
• Semi-rigid sole systems

Key performance requirements:
• Excellent abrasion resistance
• Strong structural integrity
• Smooth surface finish
• Good hydrolysis resistance
• Stable hardness profile

Typical technologies used:
• Polyester polyurethane systems
• Semi-rigid PU elastomers
• Dense sole systems
• High durability aromatic systems

Recommended hardness range:
• Shore A 55–75

These systems are preferred where durability, aesthetics, and premium sole performance are important.
`
    },

    {
      title: "Sandals & Slippers",
      short: "Soft comfort-focused lightweight systems",
      content: `
Sandals and slipper polyurethane systems are engineered for softness, flexibility, lightweight feel, and long-wearing comfort.

These systems typically use low-density flexible polyurethane formulations optimized for daily casual footwear applications where cushioning and walking comfort are critical.

Key performance areas include:
• Soft touch feel
• Lightweight sole construction
• Flex crack resistance
• Comfort during prolonged use
• Good rebound and cushioning
• Cost-effective production

Typical polyurethane technologies used:
• Flexible polyester polyols
• Polyether-based cushioning systems
• Microcellular PU systems
• Low hardness elastomer systems

Recommended applications:
• Household slippers
• Casual sandals
• Open footwear
• EVA replacement soles
• Lightweight molded footwear

Manufacturing considerations:
• Controlled density optimization
• Faster demolding cycles
• Good mold flow behavior
• Smooth skin formation
• Stable dimensional properties

Recommended hardness range:
• Shore A 25–55 depending on application

These systems are widely used in high-volume footwear manufacturing where comfort, lightweight structure, and production efficiency are important.
`
    },

    {
      title: "Flexible Sole Systems",
      short: "Elastic fatigue-resistant polyurethane soles",
      content: `
Flexible sole polyurethane systems are designed for continuous flexing applications where crack resistance and elasticity are critical.

These systems are suitable for:
• Walking shoes
• Casual footwear
• Lifestyle footwear
• Daily wear applications

Key performance requirements:
• Excellent flexibility
• High elongation
• Long-term fatigue resistance
• Good resilience
• Low temperature flexibility

Typical technologies include:
• Flexible polyester polyols
• Polyether elastomer systems
• Soft segment optimized PU chemistry

Recommended hardness range:
• Shore A 35–65

These systems help manufacturers produce highly comfortable footwear with improved walking performance and long-term durability.
`
    },

    {
      title: "Safety & Industrial Footwear",
      short: "Heavy-duty industrial worker shoe systems",
      content: `
Industrial safety footwear polyurethane systems are engineered for demanding environments requiring superior mechanical strength and durability.

These systems are commonly used in:
• Worker safety shoes
• Construction footwear
• Industrial boots
• Mining footwear
• Oil & chemical resistant footwear

Critical performance requirements include:
• High abrasion resistance
• Oil and chemical resistance
• Heavy load support
• Excellent tear strength
• Long-term durability
• Anti-slip properties

Typical polyurethane technologies:
• High-density PU elastomers
• Aromatic polyester systems
• Reinforced sole formulations
• Dual-density safety sole systems

Recommended hardness range:
• Shore A 60–80

These systems are designed for industrial-grade footwear manufacturing where worker protection and long operational life are essential.
`
    },

    {
      title: "Footwear Processing Technologies",
      short: "PU footwear manufacturing & molding systems",
      content: `
Polyurethane footwear production involves specialized processing technologies optimized for sole quality, cycle time, and production efficiency.

Common manufacturing technologies:
• Direct injection molding
• Open casting systems
• Microcellular foaming
• Dual-density sole systems
• Low-pressure PU processing

Critical processing parameters:
• Controlled viscosity
• Fast curing profile
• Stable cream and gel time
• Uniform cell structure
• Good mold release behavior

Performance optimization areas:
• Density control
• Hardness tuning
• Rebound adjustment
• Surface finish quality
• Hydrolysis resistance

Modern footwear polyol systems are engineered to balance mechanical performance, lightweight construction, processing efficiency, and sustainability requirements.
`
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

      <button
        onClick={() => setModal(item)}
        className="mt-4 text-sm font-semibold text-[#55BAAE] group-hover:text-white"
      >
        See Details →
      </button>

    </div>

  ))}

</div>

        {/* PRODUCTS */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Our Footwear Grade Polyol Grades
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {footwearProducts.map((product) => (

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

              <h3 className="text-lg font-bold text-gray-800 group-hover:text-white transition">
                {product.product_name}
              </h3>

              <p className="text-xs font-semibold text-gray-500 group-hover:text-white/80 mt-1 transition">
                {product.product_code}
              </p>

              <p className="text-sm mt-2 text-gray-600 group-hover:text-white/90 transition">
                {product.short_description}
              </p>

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

              {footwearProducts.map((p) => (

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

      {/* MODAL */}
{modal && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setModal(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl leading-none"
      >
        ✕
      </button>

      {/* TITLE */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 pr-10">
        {modal.title}
      </h3>

      {/* CONTENT */}
      <div className="mt-5 text-[15px] text-gray-700 leading-8 whitespace-pre-line">
        {modal.content}
      </div>

    </div>

  </div>

)}

    </main>

  );
}