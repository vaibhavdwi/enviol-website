"use client";

import AnimatedHeading from "@/components/AnimatedHeading";
import Link from "next/link";

export default function PolyurethaneTechnologyGuidePage() {

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO */}
        <div className="max-w-4xl">

          <AnimatedHeading title="Polyurethane Technology Guide" />

          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

            <p>
              Polyurethane technology is a polymer chemistry platform based on the reaction between polyols and isocyanates to form highly tunable polymer systems used in insulation, coatings, adhesives, and elastomers.
            </p>

            <p>
              The versatility of polyurethane systems comes from the ability to control molecular structure, crosslinking density, and phase separation, enabling a wide range of mechanical and thermal properties.
            </p>

            <p>
              This guide provides an advanced technical overview of polyurethane chemistry, system design, and industrial applications.
            </p>

          </div>

        </div>

        {/* CHEMISTRY CORE */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Core Chemistry of Polyurethane Systems
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed space-y-3">

          <p>
            Polyurethane formation is based on the exothermic reaction between:
            <strong> polyols (–OH functional compounds)</strong> and
            <strong> isocyanates (–NCO groups)</strong>.
          </p>

          <p>
            This reaction forms a urethane linkage (–NH–CO–O–), which builds the polymer backbone.
          </p>

          <p>
            The final polymer properties depend on:
            molecular weight, functionality, catalyst system, and isocyanate index.
          </p>

        </div>

        {/* SYSTEM TYPES */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Types of Polyurethane Systems
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Rigid Foam Systems</h3>
            <p className="text-sm mt-2 text-gray-600">
              Closed-cell insulation systems used in PIR and PUF boards, cold storage, refrigeration, and sandwich panels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Flexible Foam Systems</h3>
            <p className="text-sm mt-2 text-gray-600">
              Open-cell systems used in cushioning, automotive seating, and packaging applications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Coating Systems</h3>
            <p className="text-sm mt-2 text-gray-600">
              Crosslinked PU networks used in protective coatings, industrial paints, and surface engineering.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow">
            <h3 className="font-semibold text-gray-800">Elastomer Systems</h3>
            <p className="text-sm mt-2 text-gray-600">
              High durability systems used in rollers, wheels, seals, and abrasion-resistant components.
            </p>
          </div>

        </div>

        {/* PIR vs PUF */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          PIR vs PUF Technology (Insulation Systems)
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed space-y-3">

          <p>
            Polyisocyanurate (PIR) and Polyurethane Foam (PUF) are both rigid insulation systems derived from polyurethane chemistry but differ in isocyanate index and ring structure formation.
          </p>

          <p>
            PIR systems contain isocyanurate rings that provide:
            higher thermal stability, improved fire resistance, and better dimensional performance.
          </p>

          <p>
            PUF systems provide:
            cost efficiency, strong insulation performance, and easier processing characteristics.
          </p>

        </div>

        {/* INSULATION SCIENCE */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Thermal Insulation Mechanism
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed space-y-3">

          <p>
            Rigid polyurethane foams achieve insulation through a closed-cell structure that traps low-conductivity blowing gases.
          </p>

          <p>
            Heat transfer is minimized through:
            conduction resistance, gas entrapment, and reduced convection pathways.
          </p>

          <p>
            This makes PU foams one of the most efficient insulation materials available commercially.
          </p>

        </div>

        {/* PROPERTY ENGINEERING */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Property Engineering in PU Systems
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow text-gray-700 leading-relaxed space-y-3">

          <p>
            Polyurethane performance is engineered by adjusting:
            polyol type, functionality, molecular weight, catalysts, and isocyanate ratio.
          </p>

          <p>
            This allows control over hardness, flexibility, adhesion, chemical resistance, and thermal behavior.
          </p>

        </div>

        {/* APPLICATION MAP */}
        <h2 className="text-2xl font-semibold mt-14 mb-6 text-gray-800">
          Industrial Application Map
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Insulation Systems</h3>
            <p className="text-sm mt-2 text-gray-600">
              Sandwich panels, cold storage, refrigeration, industrial roofing.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Coating Systems</h3>
            <p className="text-sm mt-2 text-gray-600">
              Automotive coatings, industrial paints, protective coatings.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Adhesives & Sealants</h3>
            <p className="text-sm mt-2 text-gray-600">
              Construction adhesives, structural bonding systems.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Elastomer Applications</h3>
            <p className="text-sm mt-2 text-gray-600">
              Wheels, rollers, seals, vibration damping components.
            </p>
          </div>

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

          <Link href="/products/coating-grade-polyols/authority/manufacturing-process"
            className="bg-white p-5 rounded-xl border shadow hover:shadow-lg transition"
          >
            Polyol Manufacturing Process
          </Link>

        </div>

      </div>

    </main>
  );
}