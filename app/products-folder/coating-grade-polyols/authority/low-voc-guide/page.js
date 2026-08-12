"use client";

import AnimatedHeading from "@/components/AnimatedHeading";
import Link from "next/link";

export default function LowVOCGuidePage() {

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="max-w-4xl">

          <AnimatedHeading title="Low VOC Polyurethane Systems Guide" />

          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

            <p>
              Volatile Organic Compounds (VOC) are organic chemicals that evaporate during application and curing of coatings and polyurethane systems, contributing to air pollution and health hazards.
            </p>

            <p>
              Low VOC polyurethane technology focuses on reducing or eliminating solvent emissions while maintaining performance in coatings, adhesives, insulation, and elastomer systems.
            </p>

            <p>
              This guide explains the science, formulation approaches, and industrial relevance of low VOC polyurethane systems.
            </p>

          </div>

        </div>

        {/* WHAT ARE VOCs */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          What are VOCs in Polyurethane Systems?
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed space-y-3">

          <p>
            VOCs are solvents and organic compounds that evaporate during application of polyurethane coatings and formulations.
          </p>

          <p>
            In traditional PU systems, VOCs improve flow and application but contribute to environmental pollution and regulatory concerns.
          </p>

          <p>
            Industrial regulations now enforce strict VOC limits in coatings and insulation materials worldwide.
          </p>

        </div>

        {/* WHY LOW VOC */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Why Low VOC Systems Matter
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Environmental Compliance</h3>
            <p className="text-sm mt-2 text-gray-600">
              Meets global emission regulations for industrial coatings and construction materials.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Worker Safety</h3>
            <p className="text-sm mt-2 text-gray-600">
              Reduces exposure to harmful volatile solvents during application.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Sustainability Goals</h3>
            <p className="text-sm mt-2 text-gray-600">
              Supports green building certifications and sustainable manufacturing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Market Demand</h3>
            <p className="text-sm mt-2 text-gray-600">
              Increasing demand from automotive, construction, and insulation industries.
            </p>
          </div>

        </div>

        {/* TECHNOLOGY */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Low VOC Technology in Polyurethane Systems
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed space-y-3">

          <p>
            Low VOC polyurethane systems are achieved through waterborne polyols, high solids formulations, and reactive diluents instead of traditional solvents.
          </p>

          <p>
            These systems minimize free volatile components while maintaining coating performance and mechanical integrity.
          </p>

          <p>
            Waterborne polyols play a key role in enabling sustainable polyurethane coatings.
          </p>

        </div>

        {/* SYSTEM COMPARISON */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Low VOC vs Conventional Systems
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-sm bg-white border border-gray-200 rounded-lg overflow-hidden">

            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Low VOC Systems</th>
                <th className="p-3 text-left">Conventional Systems</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-t">
                <td className="p-3 font-medium">Environmental Impact</td>
                <td className="p-3">Low emission</td>
                <td className="p-3">High emission</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-medium">Safety</td>
                <td className="p-3">High</td>
                <td className="p-3">Moderate</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-medium">Performance</td>
                <td className="p-3">Optimized</td>
                <td className="p-3">High but solvent dependent</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-medium">Technology Base</td>
                <td className="p-3">Waterborne / high solids</td>
                <td className="p-3">Solvent based</td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* APPLICATIONS */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Industrial Applications
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Low VOC Industrial Coatings</h3>
            <p className="text-sm mt-2 text-gray-600">
              Used in machinery, automotive, and protective coating systems.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Construction Materials</h3>
            <p className="text-sm mt-2 text-gray-600">
              Applied in insulation panels and architectural coatings.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Wood & Furniture Coatings</h3>
            <p className="text-sm mt-2 text-gray-600">
              Safe indoor applications with minimal odor and emissions.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Green Building Systems</h3>
            <p className="text-sm mt-2 text-gray-600">
              Supports LEED and sustainable construction certifications.
            </p>
          </div>

        </div>

        {/* INTERNAL LINKS */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Related Authority Pages
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link href="/products/coating-grade-polyols/waterborne-polyols"
            className="bg-white p-5 rounded-xl border shadow hover:shadow-lg transition"
          >
            Waterborne Polyols
          </Link>

          <Link href="/products/coating-grade-polyols/authority/technology-guide"
            className="bg-white p-5 rounded-xl border shadow hover:shadow-lg transition"
          >
            Polyurethane Technology Guide
          </Link>

        </div>

      </div>

    </main>
  );
}