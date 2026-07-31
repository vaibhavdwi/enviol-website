"use client";

import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function HydroxylValueExplainedPage() {
  return (
    <main className="bg-yellow-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">

        <AnimatedHeading title="Hydroxyl Value Explained: The Most Important Property of Polyols in Polyurethane Formulation" />

        <div className="mt-4 text-sm text-gray-500">
          Published: August 2026 • Technical Team, Enviol Polytech Solutions
        </div>

        {/* HERO IMAGE */}
        <div className="mt-8 h-80 rounded-xl bg-gray-200 flex items-center justify-center">
          [Hydroxyl Value and Polyurethane Chemistry Illustration]
        </div>

        {/* INTRODUCTION */}
        <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">

          <p>
            Hydroxyl value, often abbreviated as OH Value or Hydroxyl Number,
            is one of the most critical specifications of a polyol.
            Whether developing rigid polyurethane foam, flexible foam,
            coatings, adhesives, sealants or elastomers, hydroxyl value
            directly influences formulation design, isocyanate requirement,
            crosslink density and final product performance.
          </p>

          <p>
            Every polyurethane formulator must understand how hydroxyl
            value affects polymer chemistry because it determines the
            amount of isocyanate required to achieve the desired reaction.
            Incorrect hydroxyl value selection can lead to poor curing,
            reduced mechanical properties and inconsistent processing.
          </p>

          <p>
            This article explains hydroxyl value in detail, including its
            definition, calculation, measurement methods, influence on
            polyurethane formulations and practical considerations for
            selecting the right polyol.
          </p>

        </div>

        {/* WHAT IS OH VALUE */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            What is Hydroxyl Value?
          </h2>

          <div className="space-y-5 text-gray-700">

            <p>
              Hydroxyl value represents the amount of hydroxyl (-OH)
              groups present in one gram of polyol and is expressed as
              milligrams of potassium hydroxide (mg KOH/g).
            </p>

            <p>
              Since hydroxyl groups react directly with isocyanates,
              hydroxyl value determines the chemical reactivity of the
              polyol during polyurethane formation.
            </p>

            <p>
              Higher hydroxyl values indicate a greater concentration of
              reactive hydroxyl groups and generally lead to increased
              crosslink density within the polymer network.
            </p>

          </div>
        </section>

        {/* IMAGE */}
        <div className="mt-12 h-80 rounded-xl bg-gray-200 flex items-center justify-center">
          [Hydroxyl Groups Reacting with Isocyanate Diagram]
        </div>

        {/* WHY IT MATTERS */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Why Hydroxyl Value is Important
          </h2>

          <div className="space-y-5 text-gray-700">

            <p>Hydroxyl value directly affects:</p>

            <ul className="list-disc ml-6 space-y-2">
              <li>Isocyanate requirement</li>
              <li>Crosslink density</li>
              <li>Foam rigidity</li>
              <li>Mechanical strength</li>
              <li>Dimensional stability</li>
              <li>Cure speed</li>
              <li>Thermal resistance</li>
              <li>Chemical resistance</li>
            </ul>

          </div>
        </section>

        {/* TABLE */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Typical Hydroxyl Value Ranges
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Application</th>
                  <th className="p-4 text-left">Typical OH Value (mg KOH/g)</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-t">
                  <td className="p-4">Flexible Foam</td>
                  <td className="p-4">20–70</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">CASE Applications</td>
                  <td className="p-4">40–250</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Rigid Polyurethane Foam</td>
                  <td className="p-4">250–500</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">PIR Foam Systems</td>
                  <td className="p-4">300–550</td>
                </tr>

              </tbody>

            </table>

          </div>
        </section>

        {/* CALCULATION */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            How Hydroxyl Value Affects Polyurethane Formulation
          </h2>

          <div className="space-y-5 text-gray-700">

            <p>
              During formulation, hydroxyl value is used to calculate the
              exact quantity of isocyanate required for a given polyol.
            </p>

            <p>
              Formulators use hydroxyl value together with equivalent
              weight and NCO index to optimize foam performance,
              processing behavior and final physical properties.
            </p>

            <p>
              Small variations in hydroxyl value may significantly alter
              curing behavior, density and mechanical performance.
            </p>

          </div>
        </section>

        {/* HIGH VS LOW */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            High Hydroxyl Value vs Low Hydroxyl Value
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Property</th>
                  <th className="p-4 text-left">Low OH</th>
                  <th className="p-4 text-left">High OH</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-t">
                  <td className="p-4">Crosslink Density</td>
                  <td className="p-4">Lower</td>
                  <td className="p-4">Higher</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Rigidity</td>
                  <td className="p-4">Lower</td>
                  <td className="p-4">Higher</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Flexibility</td>
                  <td className="p-4">Higher</td>
                  <td className="p-4">Lower</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Heat Resistance</td>
                  <td className="p-4">Moderate</td>
                  <td className="p-4">Excellent</td>
                </tr>

              </tbody>

            </table>

          </div>
        </section>

        {/* IMAGE */}
        <div className="mt-12 h-80 rounded-xl bg-gray-200 flex items-center justify-center">
          [Crosslink Density Comparison Graphic]
        </div>

        {/* FACTORS */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Factors Affecting Hydroxyl Value
          </h2>

          <ul className="list-disc ml-6 space-y-3 text-gray-700">
            <li>Choice of glycol</li>
            <li>Choice of acid</li>
            <li>Molecular weight</li>
            <li>Functionality</li>
            <li>Degree of polymerization</li>
            <li>Polyol manufacturing process</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 text-gray-700">

            <div>
              <h3 className="font-semibold text-lg">
                What is hydroxyl value?
              </h3>
              <p>
                Hydroxyl value measures the concentration of reactive hydroxyl groups in a polyol.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Why is hydroxyl value important?
              </h3>
              <p>
                It determines isocyanate requirement, polymer structure and final polyurethane properties.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Which applications require high hydroxyl values?
              </h3>
              <p>
                Rigid polyurethane foams, PIR insulation systems and many structural polyurethane applications.
              </p>
            </div>

          </div>
        </section>

        {/* RELATED RESOURCES */}
<section className="mt-14 bg-white p-8 rounded-xl shadow">

  <h2 className="text-2xl font-bold mb-4">
    Related Resources
  </h2>

  <div className="flex flex-col gap-3">

    <Link
      href="/blog/technical/rigid-foam-polyols-guide"
      className="text-[#42b3a5] font-semibold"
    >
      → Rigid Foam Polyols: The Backbone of Modern Insulation Systems
    </Link>

    <Link
      href="/blog/technical/what-is-pir-foam"
      className="text-[#42b3a5] font-semibold"
    >
      → What is PIR Foam?
    </Link>

    <Link
      href="/blog/technical/what-is-puf-foam"
      className="text-[#42b3a5] font-semibold"
    >
      → What is PUF Foam?
    </Link>

    <Link
      href="/blog/technical/pir-foam-vs-puf-foam"
      className="text-[#42b3a5] font-semibold"
    >
      → PIR Foam vs PUF Foam
    </Link>

    <Link
      href="/products/rigid-foam-polyols"
      className="text-[#42b3a5] font-semibold"
    >
      → Rigid Foam Polyols Product Range
    </Link>

  </div>

</section>

      </div>
    </main>
  );
}