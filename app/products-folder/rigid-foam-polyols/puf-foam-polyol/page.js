"use client";

import Link from "next/link";
import Image from "next/image";
import products from "@/data/products.json";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function PUFoamPolyolPage() {

  const pufProduct = products.find(
    (p) => p.product_code === "RENVIOL-PolyRig-2400"
  );

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>

            <AnimatedHeading title="PUF Foam Polyols for Cost-Effective Insulation Systems" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

              <p>
                Enviol supplies high-quality PUF foam polyols designed for
                polyurethane rigid insulation systems used across industrial applications.
              </p>

              <p>
                PUF foam systems are widely used for cost-effective thermal insulation
                with good dimensional stability and efficient closed-cell structure.
              </p>

              <p>
                These materials are extensively used in cold storage, refrigeration systems,
                sandwich panels, insulated doors, and general-purpose insulation applications.
              </p>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">

            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-lg border border-gray-200">

              <Image
                src="/images/puf-foam-main.jpg"
                alt="PUF Foam Polyols"
                width={700}
                height={500}
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

        {/* IMAGE GALLERY */}
        <div className="grid md:grid-cols-3 gap-6 mt-14">

          <div className="rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
            <Image
              src="/images/puf-panel.jpg"
              alt="PUF Sandwich Panels"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
            <Image
              src="/images/puf-cold-storage.jpg"
              alt="Cold Storage PUF Insulation"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
            <Image
              src="/images/puf-refrigeration.jpg"
              alt="Refrigeration PUF Panels"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

        </div>

        {/* HOW PUF SYSTEMS WORK */}
        <h2 className="text-2xl font-semibold mt-16 mb-5 text-gray-800">
          How PUF Foam Systems Work
        </h2>

        <div className="space-y-4 max-w-5xl text-gray-700 leading-relaxed">

          <p>
            PUF foam systems are formed through the reaction of polyols with polymeric MDI,
            resulting in a rigid closed-cell polyurethane foam structure.
          </p>

          <p>
            These systems are optimized for cost-effective insulation performance,
            making them widely used in industrial and commercial insulation applications.
          </p>

          <p>
            PUF systems provide good thermal insulation, mechanical strength,
            and are suitable for a wide range of refrigeration and construction applications.
          </p>

        </div>

        {/* FEATURED PRODUCT */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Featured PUF Foam Polyol Grade
        </h2>

        {pufProduct && (
          <div className="bg-white rounded-xl p-6 shadow border border-gray-100 hover:shadow-xl transition-all duration-300">

            <h3 className="text-xl font-bold text-gray-800">
              {pufProduct.product_name}
            </h3>

            <p className="text-sm text-gray-500 mt-1 font-medium">
              {pufProduct.product_code}
            </p>

            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              {pufProduct.short_description}
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-700">

              <p>
                <span className="font-semibold text-gray-800">Applications:</span>{" "}
                {pufProduct.applications?.join(", ")}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Viscosity:</span>{" "}
                {pufProduct.technical_data?.dynamic_viscosity || "-"}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Hydroxyl Value:</span>{" "}
                {pufProduct.technical_data?.hydroxyl_number || "-"}
              </p>

            </div>

            <Link
              href={`/products/${pufProduct.slug}`}
              className="inline-flex mt-5 text-[#55BAAE] font-semibold hover:underline"
            >
              View Product →
            </Link>

          </div>
        )}

        {/* INDUSTRIAL APPLICATIONS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Industrial Applications
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {[
            {
              title: "Sandwich Panel Systems",
              desc: "PUF foam is widely used in insulation sandwich panel production for cost-effective thermal insulation systems.",
              href: "/products/rigid-foam-polyols/sandwich-panel-insulation"
            },
            {
              title: "Cold Storage Insulation",
              desc: "PUF insulation systems are widely used in cold storage rooms for maintaining controlled low temperatures.",
              href: "/products/rigid-foam-polyols/cold-storage-insulation"
            },
            {
              title: "Refrigeration Systems",
              desc: "PUF foam provides efficient insulation for refrigeration units and cooling systems.",
              href: "/products/rigid-foam-polyols/refrigeration-panel"
            },
            {
              title: "Insulated Doors & Panels",
              desc: "PUF systems are widely used in insulated doors, roofing panels, and construction insulation applications.",
              href: "/products/rigid-foam-polyols/industrial-roofing"
            }
          ].map((item, idx) => (

            <Link
              key={idx}
              href={item.href}
              className="
                group relative bg-white rounded-xl p-6 shadow border border-gray-100
                overflow-hidden transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:border-[#55BAAE]
              "
            >

              <div className="absolute inset-0 bg-[#55BAAE] opacity-0 group-hover:opacity-10 transition-all duration-300"></div>

              <div className="relative z-10">

                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#55BAAE] transition">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center text-[#55BAAE] font-semibold text-sm group-hover:underline">
                  Explore Application
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* ADVANTAGES */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Advantages of PUF Foam Polyols
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {[
            "Cost-effective insulation solution",
            "Good thermal insulation performance",
            "Widely used in cold storage applications",
            "Strong closed-cell structure",
            "Good dimensional stability",
            "Easy processing and application",
            "Versatile industrial usage",
            "Reliable long-term performance"
          ].map((point, idx) => (

            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
            >
              <p className="text-gray-700 font-medium">
                • {point}
              </p>
            </div>

          ))}

        </div>

        {/* TECHNICAL TABLE */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Technical Characteristics
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-sm bg-white border border-gray-200 rounded-lg overflow-hidden">

            <thead className="bg-gray-100 text-gray-800">

              <tr>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Typical Performance</th>
              </tr>

            </thead>

            <tbody>

              <tr className="border-t">
                <td className="p-3">Thermal Conductivity</td>
                <td className="p-3">Low</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Closed Cell Content</td>
                <td className="p-3">High</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Dimensional Stability</td>
                <td className="p-3">Good</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Cost Efficiency</td>
                <td className="p-3">High</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Applications</td>
                <td className="p-3">
                  Cold Storage, Refrigeration, Sandwich Panels, Insulated Doors
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* RELATED LINKS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Related Polyurethane Systems
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link
            href="/products/rigid-foam-polyols"
            className="bg-white rounded-xl border border-gray-200 p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Rigid Foam Polyols
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Explore rigid polyurethane foam systems used in thermal insulation,
              sandwich panels, refrigeration, and industrial insulation applications.
            </p>
          </Link>

          <Link
            href="/products/rigid-foam-polyols/pir-foam-polyol"
            className="bg-white rounded-xl border border-gray-200 p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              PIR Foam Polyols
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              High-performance polyisocyanurate insulation systems with superior fire resistance and thermal stability.
            </p>
          </Link>

        </div>

      </div>

    </main>
  );
}