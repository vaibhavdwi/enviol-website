"use client";

import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function PolyesterVsPolyetherComparisonPage() {

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="max-w-4xl">

          <AnimatedHeading title="Polyester vs Polyether Polyols" />

          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

            <p>
              Polyester and polyether polyols are two fundamental raw material classes used in polyurethane systems for coatings, insulation, adhesives, and elastomers.
            </p>

            <p>
              The selection between these two determines key performance characteristics such as chemical resistance, flexibility, hydrolysis stability, and mechanical strength.
            </p>

            <p>
              This guide provides a technical comparison to help formulators and engineers select the appropriate polyol system for industrial applications.
            </p>

          </div>

        </div>

        {/* QUICK COMPARISON TABLE */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Key Technical Differences
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-sm bg-white border border-gray-200 rounded-lg overflow-hidden">

            <thead className="bg-gray-100 text-gray-800">

              <tr>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Polyester Polyols</th>
                <th className="p-3 text-left">Polyether Polyols</th>
              </tr>

            </thead>

            <tbody>

              <tr className="border-t">
                <td className="p-3 font-medium">Chemical Resistance</td>
                <td className="p-3">High</td>
                <td className="p-3">Moderate</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-medium">Hydrolysis Resistance</td>
                <td className="p-3">Lower</td>
                <td className="p-3">High</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-medium">Flexibility</td>
                <td className="p-3">Moderate</td>
                <td className="p-3">High</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-medium">Mechanical Strength</td>
                <td className="p-3">High</td>
                <td className="p-3">Moderate</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-medium">Cost Efficiency</td>
                <td className="p-3">Moderate</td>
                <td className="p-3">Moderate to High</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-medium">Best Use Case</td>
                <td className="p-3">Hard coatings, adhesives, rigid systems</td>
                <td className="p-3">Flexible coatings, elastomers, moisture-prone environments</td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* APPLICATION COMPARISON */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Application-Based Selection
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl border shadow">

            <h3 className="text-lg font-semibold text-gray-800">
              Choose Polyester Polyols When:
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>• High hardness and abrasion resistance is required</li>
              <li>• Chemical resistance is critical</li>
              <li>• Used in industrial coatings or flooring</li>
              <li>• Structural strength is priority</li>
            </ul>

          </div>

          <div className="bg-white p-6 rounded-xl border shadow">

            <h3 className="text-lg font-semibold text-gray-800">
              Choose Polyether Polyols When:
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>• Moisture or hydrolysis resistance is required</li>
              <li>• Flexibility and elasticity are important</li>
              <li>• Used in sealants, waterproof coatings</li>
              <li>• Outdoor or humid environments</li>
            </ul>

          </div>

        </div>

        {/* INDUSTRY INSIGHT */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Industry Insight
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed">

          <p>
            In industrial polyurethane systems, polyester polyols are typically used where mechanical strength and chemical resistance dominate performance requirements.
          </p>

          <p className="mt-3">
            Polyether polyols are preferred in environments exposed to moisture, temperature cycling, and flexible deformation conditions.
          </p>

          <p className="mt-3">
            In modern coating formulations, hybrid systems combining both chemistries are also used to balance performance properties.
          </p>

        </div>

        {/* INTERNAL LINKS */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Related Polyol Systems
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link href="/products/coating-grade-polyols/polyester-coating-polyols"
            className="bg-white p-5 rounded-xl border shadow hover:shadow-lg transition"
          >
            Polyester Coating Polyols
          </Link>

          <Link href="/products/coating-grade-polyols/polyether-coating-polyols"
            className="bg-white p-5 rounded-xl border shadow hover:shadow-lg transition"
          >
            Polyether Coating Polyols
          </Link>

        </div>

      </div>

    </main>
  );
}