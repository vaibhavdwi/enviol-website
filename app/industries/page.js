"use client";
import Link from "next/link";
import { useState } from "react";
import ApplicationsTable from "../../components/ApplicationsTable";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function IndustriesPage() {

  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="bg-yellow-50">

      {/* HERO */}
      <section className="pt-20 pb-8 border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <AnimatedHeading title="Industries & Applications We Support"/>
          <p className="text-lg max-w-3xl mx-auto">
            Enviol Polytech Solutions provides regenerated polyols
            tailored for industrial sectors seeking sustainable,
            cost-efficient, and domestically sourced materials.
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="pt-8 pb-20 border-b">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

  {[
    {
      title: "Polyurethane Manufacturing",
      desc: "High-quality regenerated polyols tailored for PU system manufacturers.",
      path: "/industries/polyurethane",
    },
    {
      title: "Foam Production",
      desc: "Sustainable raw materials supporting rigid and flexible foam production.",
      path: "/industries/foam-production",
    },
    {
      title: "Paint & Coatings",
      desc: "Reliable polyol inputs for industrial and protective coating systems.",
      path: "/industries/paint-coatings",
    },
    {
      title: "Adhesives",
      desc: "Performance-driven solutions for advanced bonding applications.",
      path: "/industries/adhesives",
    },
    {
      title: "Sealants",
      desc: "Cost-efficient regenerated inputs for durable sealing systems.",
      path: "/industries/pu-sealents",
    },
    {
      title: "Powder Coating",
      desc: "Supporting circular material innovation in powder coating technologies.",
      path: "/industries/powder-coating",
    },
    {
      title: "Elastomers",
      desc: "Structured polyol systems for resilient and durable elastomer products.",
      path: "/industries/elastomers",
    },
    {
      title: "Artificial Leather",
      desc: "Sustainable material solutions for synthetic leather manufacturing.",
      path: "/industries/artificial-leather",
    },
  ].map((item, index) => (
    <Link key={index} href={item.path}>
      <div
        onMouseEnter={() => setActiveCard(index)}
        className={`border p-8 rounded-lg transition-all duration-300 cursor-pointer ${
          activeCard === index
            ? "bg-[#55BAAE] text-white shadow-[0_10px_30px_rgba(85,186,174,0.35)] scale-[1.02]"
            : "hover:bg-[#55BAAE] hover:text-white hover:shadow-lg"
        }`}
      >
        <h3 className="text-xl font-semibold mb-3">
          {item.title}
        </h3>

        <p className="text-sm leading-relaxed">
          {item.desc}
        </p>
      </div>
    </Link>
  ))}

</div>
      </section>

      {/* APPLICATIONS TABLE */}
      <section className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Explore Applications
          </h2>
          <ApplicationsTable />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">
            Partner With Enviol
          </h2>
          <p className="mb-8">
            Join us in building a circular polymer economy and
            strengthening India’s industrial self-reliance.
          </p>
          <Link
            href="/contact"
            className="bg-[#55BAAE] text-white px-8 py-3 rounded font-semibold"
          >
            Request Technical Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}