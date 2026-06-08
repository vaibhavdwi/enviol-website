"use client";

import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function PIRvsPUFPage() {
  return (
    <main className="bg-yellow-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">

        <AnimatedHeading title="PIR Foam vs PUF Foam: Understanding the Differences, Advantages and Applications" />

        <div className="mt-4 text-sm text-gray-500">
          Published: June 2026 • Author: Anonymous
        </div>

        {/* HERO IMAGE */}
        <div className="mt-8 h-80 rounded-xl bg-gray-200 flex items-center justify-center">
          [PIR vs PUF Comparison Image]
        </div>

        <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">

          <p>
            PIR foam and PUF foam are among the most widely used insulation
            materials in modern construction, refrigeration, cold storage,
            sandwich panel manufacturing and industrial insulation systems.
            Although both materials originate from polyurethane chemistry,
            significant differences exist in their formulation, thermal
            performance, fire behavior and long-term operating characteristics.
          </p>

          <p>
            Understanding the distinction between Polyisocyanurate (PIR) foam
            and Polyurethane (PUF) foam is essential for insulation panel
            manufacturers, cold room fabricators, roofing contractors and
            polyurethane system houses selecting the most suitable insulation
            technology.
          </p>

        </div>

        {/* WHAT IS PUF */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            What is PUF Foam?
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">

            <p>
              Polyurethane Foam (PUF) is a rigid cellular insulation material
              produced through the reaction of polyols with polymeric MDI
              isocyanates in the presence of catalysts, blowing agents and
              performance additives.
            </p>

            <p>
              During the reaction, millions of closed cells are formed,
              creating a lightweight material with excellent thermal
              insulation properties and structural rigidity.
            </p>

            <p>
              Rigid PUF insulation is commonly used in:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li>Cold storage panels</li>
              <li>Refrigeration systems</li>
              <li>Sandwich panels</li>
              <li>Insulated doors</li>
              <li>Building insulation</li>
              <li>Industrial process insulation</li>
            </ul>

          </div>
        </section>

        {/* WHAT IS PIR */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            What is PIR Foam?
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">

            <p>
              Polyisocyanurate Foam (PIR) is an advanced form of rigid
              polyurethane insulation. It is produced using a significantly
              higher isocyanate index than conventional polyurethane foam.
            </p>

            <p>
              Under controlled conditions, excess isocyanate molecules react
              together to form isocyanurate ring structures which are highly
              thermally stable and inherently more resistant to fire.
            </p>

            <p>
              These additional crosslinked structures provide enhanced thermal
              stability, improved dimensional stability and superior fire
              performance compared with standard PUF systems.
            </p>

          </div>
        </section>

        {/* IMAGE */}
        <div className="mt-12 h-80 rounded-xl bg-gray-200 flex items-center justify-center">
          [PIR Molecular Structure Diagram]
        </div>

        {/* CHEMISTRY */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Chemistry Behind PIR and PUF Systems
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">

            <p>
              The primary difference between PIR and PUF lies in the
              isocyanate index used during formulation.
            </p>

            <p>
              Standard rigid polyurethane systems typically operate near
              stoichiometric ratios where polyol and isocyanate react to form
              urethane linkages.
            </p>

            <p>
              PIR systems use substantially higher levels of isocyanate,
              encouraging the formation of isocyanurate ring structures that
              improve heat resistance and fire performance.
            </p>

          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            PIR Foam vs PUF Foam Comparison
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Property</th>
                  <th className="p-4 text-left">PUF Foam</th>
                  <th className="p-4 text-left">PIR Foam</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-t">
                  <td className="p-4">Thermal Insulation</td>
                  <td className="p-4">Excellent</td>
                  <td className="p-4">Excellent to Superior</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Fire Resistance</td>
                  <td className="p-4">Moderate</td>
                  <td className="p-4">Significantly Higher</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Operating Temperature</td>
                  <td className="p-4">Lower</td>
                  <td className="p-4">Higher</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Dimensional Stability</td>
                  <td className="p-4">Good</td>
                  <td className="p-4">Excellent</td>
                </tr>

                <tr className="border-t">
                  <td className="p-4">Cost</td>
                  <td className="p-4">Lower</td>
                  <td className="p-4">Higher</td>
                </tr>

              </tbody>
            </table>

          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Common Applications of PIR and PUF Insulation
          </h2>

          <div className="space-y-5 text-gray-700">

            <h3 className="text-xl font-semibold">
              Cold Storage Panels
            </h3>

            <p>
              Both PIR and PUF are used extensively in cold room panels.
              However, PIR is increasingly preferred where fire regulations
              require enhanced safety performance.
            </p>

            <h3 className="text-xl font-semibold">
              Sandwich Panels
            </h3>

            <p>
              PIR sandwich panels are becoming common in industrial buildings,
              warehouses, logistics centers and food processing facilities.
            </p>

            <h3 className="text-xl font-semibold">
              Roofing Insulation
            </h3>

            <p>
              PIR systems offer superior thermal efficiency and fire behavior,
              making them attractive for commercial roofing applications.
            </p>

          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="mt-14 bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            Related Resources
          </h2>

          <div className="flex flex-col gap-3">

            <Link
              href="/products/rigid-foam-polyols"
              className="text-[#42b3a5] font-semibold"
            >
              → Rigid Foam Polyols
            </Link>

            <Link
              href="/industries/foam-production"
              className="text-[#42b3a5] font-semibold"
            >
              → Foam Production Industry
            </Link>

            <Link
              href="/contact"
              className="text-[#42b3a5] font-semibold"
            >
              → Request Technical Consultation
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}