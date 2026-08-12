"use client";

import AnimatedHeading from "@/components/AnimatedHeading";
import Image from "next/image";
import Link from "next/link";

export default function ManufacturingProcessPage() {

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="max-w-4xl">

          <AnimatedHeading title="Polyol Manufacturing Process" />

          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

            <p>
              Polyols used in polyurethane systems are manufactured through controlled chemical reactions involving polyether or polyester synthesis routes depending on the desired end application.
            </p>

            <p>
              The manufacturing process determines key properties such as molecular weight, functionality, viscosity, and final performance in coatings, insulation, and elastomer systems.
            </p>

            <p>
              At Enviol, polyol development focuses on performance optimization for rigid foam, coatings, adhesives, and industrial polyurethane applications.
            </p>

          </div>

        </div>

        {/* PROCESS IMAGE */}
        <div className="mt-12 rounded-xl overflow-hidden shadow border bg-white">

          <Image
            src="/images/polyol-manufacturing-process.png"
            alt="Polyol Manufacturing Process"
            width={1200}
            height={500}
            className="w-full h-auto object-contain"
          />

        </div>

        {/* POLYESTER PROCESS */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Polyester Polyol Manufacturing
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed space-y-3">

          <p>
            Polyester polyols are produced through a polycondensation reaction between diacids (or anhydrides) and glycols under controlled temperature and vacuum conditions.
          </p>

          <p>
            The process involves esterification, water removal, and molecular weight control to achieve desired hydroxyl functionality.
          </p>

          <p>
            Key raw materials include:
            adipic acid, phthalic anhydride, ethylene glycol, diethylene glycol, and neopentyl glycol.
          </p>

        </div>

        {/* POLYETHER PROCESS */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Polyether Polyol Manufacturing
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed space-y-3">

          <p>
            Polyether polyols are manufactured via the polymerization of epoxides such as propylene oxide or ethylene oxide using initiator molecules.
          </p>

          <p>
            The reaction is catalyzed using potassium hydroxide or double metal cyanide (DMC) catalysts depending on desired molecular precision.
          </p>

          <p>
            This process allows control over molecular weight distribution, reactivity, and hydroxyl value.
          </p>

        </div>

        {/* PROCESS FLOW */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Process Flow Overview
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Raw Material Selection</h3>
            <p className="text-sm mt-2 text-gray-600">
              Selection of glycols, acids, and initiators based on target application.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Reaction Control</h3>
            <p className="text-sm mt-2 text-gray-600">
              Temperature, pressure, and catalyst control for polymer formation.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Molecular Adjustment</h3>
            <p className="text-sm mt-2 text-gray-600">
              Adjustment of hydroxyl value, viscosity, and functionality.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Filtration & Finishing</h3>
            <p className="text-sm mt-2 text-gray-600">
              Removal of impurities and final product stabilization.
            </p>
          </div>

        </div>

        {/* QUALITY CONTROL */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Quality Control & Testing
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed">

          <p>
            Each polyol batch is tested for hydroxyl value, viscosity, acid number, water content, and molecular consistency.
          </p>

          <p className="mt-3">
            These parameters ensure consistent performance in polyurethane systems across insulation, coatings, and elastomers.
          </p>

        </div>

        {/* SUSTAINABILITY */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Sustainable Manufacturing Approach
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed">

          <p>
            Modern polyol manufacturing is shifting toward bio-based feedstocks and energy-efficient production systems.
          </p>

          <p className="mt-3">
            Enviol focuses on developing sustainable polyol systems derived from recycled and renewable raw materials.
          </p>

        </div>

        {/* INTERNAL LINKS */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Related Authority Pages
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link href="/products/coating-grade-polyols/authority/comparison-polyester-vs-polyether"
            className="bg-white p-5 rounded-xl border shadow hover:shadow-lg transition"
          >
            Polyester vs Polyether Comparison
          </Link>

          <Link href="/products/coating-grade-polyols"
            className="bg-white p-5 rounded-xl border shadow hover:shadow-lg transition"
          >
            Coating Grade Polyols
          </Link>

        </div>

      </div>

    </main>
  );
}