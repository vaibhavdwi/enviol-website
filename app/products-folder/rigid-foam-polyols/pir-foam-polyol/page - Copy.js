"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function PIRFoamPolyolPage() {
  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>

            <AnimatedHeading title="PIR Foam Polyols for High-Performance Insulation Systems" />

            <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">

              <p>
                Enviol supplies advanced PIR foam polyols engineered for
                polyisocyanurate insulation systems used in industrial
                thermal insulation applications.
              </p>

              <p>
                PIR foam systems provide superior fire resistance,
                dimensional stability, and low thermal conductivity
                compared to conventional polyurethane insulation systems.
              </p>

              <p>
                These rigid foam insulation materials are widely used in
                sandwich panels, industrial roofing, cold storage,
                refrigeration systems, and high-temperature insulation applications.
              </p>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">

            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-lg border border-gray-200">

              <Image
                src="/images/pir-foam-main.jpg"
                alt="PIR Foam Polyols"
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
              src="/images/pir-panel.jpg"
              alt="PIR Sandwich Panels"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
            <Image
              src="/images/pir-roofing.jpg"
              alt="Industrial Roofing Insulation"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
            <Image
              src="/images/pir-cold-storage.jpg"
              alt="Cold Storage PIR Insulation"
              width={500}
              height={350}
              className="w-full h-64 object-cover"
            />
          </div>

        </div>

        {/* HOW PIR SYSTEMS WORK */}
        <h2 className="text-2xl font-semibold mt-16 mb-5 text-gray-800">
          How PIR Foam Systems Work
        </h2>

        <div className="space-y-4 max-w-5xl text-gray-700 leading-relaxed">

          <p>
            PIR foam systems are formed through the reaction of polyester or
            polyether polyols with excess polymeric MDI at a higher isocyanate index.
          </p>

          <p>
            The elevated isocyanate ratio promotes the formation of
            isocyanurate ring structures which significantly improve
            thermal stability and fire performance.
          </p>

          <p>
            PIR insulation systems exhibit excellent closed-cell structure,
            low thermal conductivity, superior dimensional stability,
            and enhanced resistance to heat exposure.
          </p>

        </div>

        {/* INDUSTRIAL APPLICATIONS */}
<h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
  Industrial Applications
</h2>

<div className="grid md:grid-cols-2 gap-6">

  {[
    {
      title: "Sandwich Panel Systems",
      desc: "PIR foam insulation is widely used in continuous sandwich panel production for industrial and commercial insulation applications.",
      href: "/products/rigid-foam-polyols/sandwich-panel-insulation"
    },
    {
      title: "Industrial Roofing Panels",
      desc: "PIR insulation boards offer improved fire resistance and thermal insulation for insulated roofing systems.",
      href: "/products/rigid-foam-polyols/industrial-roofing"
    },
    {
      title: "Cold Storage Insulation",
      desc: "Closed-cell PIR foam systems help maintain controlled low-temperature environments with high energy efficiency.",
      href: "/products/rigid-foam-polyols/cold-storage-insulation"
    },
    {
      title: "Refrigeration Insulation",
      desc: "Rigid PIR foam systems provide low thermal conductivity for refrigeration equipment and cooling applications.",
      href: "/products/rigid-foam-polyols/refrigeration-panel"
    }
  ].map((item, idx) => (

    <Link
      key={idx}
      href={item.href}
      className="
        bg-white rounded-xl p-6 shadow border border-gray-100
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 block
      "
    >

      <h3 className="text-lg font-semibold text-gray-800">
        {item.title}
      </h3>

      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {item.desc}
      </p>

      <span className="inline-flex mt-4 text-[#42b3a5] font-semibold">
        Explore Application →
      </span>

    </Link>

  ))}

</div>

        {/* ADVANTAGES */}
        <h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
          Advantages of PIR Foam Polyols
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {[
            "Excellent thermal insulation performance",
            "Improved fire resistance compared to conventional PUF systems",
            "High dimensional stability",
            "Low thermal conductivity",
            "Excellent closed-cell structure",
            "Suitable for high-performance insulation panels",
            "Enhanced thermal stability",
            "Long-term insulation efficiency"
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
                <td className="p-3">Fire Resistance</td>
                <td className="p-3">Excellent</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Dimensional Stability</td>
                <td className="p-3">Excellent</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Industrial Applications</td>
                <td className="p-3">
                  Sandwich Panels, Roofing, Cold Storage, Refrigeration
                </td>
              </tr>

            </tbody>

          </table>

        </div>

{/* FEATURED PRODUCT GRADE */}
<h2 className="text-2xl font-semibold mt-16 mb-6 text-gray-800">
  Featured PIR Foam Polyol Grade
</h2>

<div className="grid md:grid-cols-1 gap-6">

  <div className="bg-white rounded-xl p-6 shadow border border-gray-100 hover:shadow-xl transition-all duration-300">

    <h3 className="text-xl font-bold text-gray-800">
      PIR Foam Board Polyol
    </h3>

    <p className="text-sm text-gray-500 mt-1 font-medium">
      RENVIOL-PolyRig-2800
    </p>

    <p className="mt-3 text-sm text-gray-700 leading-relaxed">
      Polyester polyol developed for PIR rigid insulation systems.
    </p>

    <div className="mt-4 space-y-2 text-sm text-gray-700">

      <p>
        <span className="font-semibold text-gray-800">Applications:</span>{" "}
        PIR Insulation Boards, Cold Storage Panels, Continuous Sandwich Panels, Thermal Insulation Systems
      </p>

      <p>
        <span className="font-semibold text-gray-800">Viscosity:</span>{" "}
        4000 - 7000 mPa.s @ 25°C
      </p>

      <p>
        <span className="font-semibold text-gray-800">Hydroxyl Value:</span>{" "}
        240 - 280 mg KOH/g
      </p>

    </div>

    <Link
      href="/products/rigid-foam-polyols"
      className="inline-flex mt-5 text-[#55BAAE] font-semibold hover:underline"
    >
      View Product →
    </Link>

  </div>

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
            href="/products/puf-foam-polyol"
            className="bg-white rounded-xl border border-gray-200 p-6 shadow hover:shadow-lg transition"
          >

            <h3 className="text-lg font-semibold text-gray-800">
              PUF Foam Polyols
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Discover cost-effective rigid polyurethane foam systems
              for cold storage and general insulation applications.
            </p>

          </Link>

        </div>

      </div>

    </main>
  );
}