"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const images = [
    "/hero/hero1.jpg",
    "/hero/hero2.jpg",
    "/hero/hero3.jpg",
    "/hero/hero4.jpg",
    "/hero/hero5.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const [activeBtn, setActiveBtn] = useState("contact");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ================= DESKTOP HERO ================= */}
      <section className="hidden md:flex relative h-[700px] items-center justify-center text-center text-white overflow-hidden -mt-24">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Polyester polyol manufacturing plant sustainable polyol production"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/60"></div>

        {/* Watermark Logo */}
        <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 z-20 opacity-80">
          <Image
            src="/images/logo-watermark.png"
            alt="Enviol Logo"
            width={340}
            height={220}
            className="object-contain"
          />
        </div>

        <div className="relative z-20 max-w-4xl px-6">
          <h1 className="text-5xl font-bold mb-4">
            Sustainable Polyester & Polyether Polyol Manufacturers for Global Industries
          </h1>

          <p className="text-lg text-gray-200 mb-6">
            Leading manufacturer of polyester and polyether polyols, specializing in recycled PET & PU waste upcycling into high-performance polyols for polyurethane, coatings, adhesives, sealants, and elastomer (CASE) applications worldwide.
          </p>

          <div className="flex gap-6 justify-center">
            <a
              href="/contact"
              onMouseEnter={() => setActiveBtn("contact")}
              onMouseLeave={() => setActiveBtn("contact")}
              className={`px-8 py-4 rounded font-semibold transition-all duration-300 ${
                activeBtn === "contact"
                  ? "bg-green-600 text-white scale-105 shadow-lg"
                  : "border border-white text-white opacity-70"
              }`}
            >
              Request Technical Consultation
            </a>

            <a
              href="/products"
              onMouseEnter={() => setActiveBtn("products")}
              onMouseLeave={() => setActiveBtn("contact")}
              className={`px-8 py-4 rounded font-semibold transition-all duration-300 ${
                activeBtn === "products"
                  ? "bg-green-600 text-white scale-105 shadow-lg"
                  : "border border-white text-white opacity-70"
              }`}
            >
              Explore Our Products
            </a>
          </div>
        </div>
      </section>

      {/* ================= MOBILE HERO ================= */}
      <section className="flex md:hidden relative min-h-[480px] items-center justify-center text-center text-white overflow-hidden px-4 pt-0 -mt-24">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Polyol manufacturing"
              fill
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-20">
          <h1 className="text-2xl font-bold leading-snug mb-3">
            Sustainable Polyol Manufacturers
          </h1>

          <p className="text-sm text-gray-200 mb-4">
            Polyester & Polyether Polyols from recycled PET & PU waste.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="/contact"
              className="bg-green-600 py-2.5 rounded font-semibold"
            >
              Get Consultation
            </a>

            <a
              href="/products"
              className="border border-white py-2.5 rounded"
            >
              View Products
            </a>
          </div>
        </div>
      </section>

      {/* ================= SEO ================= */}
      <section className="py-10 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Global Polyester Polyol Manufacturer & Supplier
          </h2>

          <p className="text-gray-700 max-w-4xl mx-auto">
            Enviol is a trusted polyester polyol manufacturer and polyether polyol supplier based in India, serving global industries with high-performance and sustainable polyol solutions.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-12 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            What We Do
          </h2>

          <p className="text-center max-w-3xl mx-auto text-gray-700 mb-6">
            We specialize in chemical recycling of PET and polyurethane waste streams through controlled depolymerization and regeneration processes to produce high-performance polyols with consistent hydroxyl value and viscosity.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Sustainable Polyol Recovery",
                desc: "We recover valuable polyols from industrial waste streams and reprocess them into premium-grade polyester and polyether polyols for CASE applications.",
                icon: "♻️",
              },
              {
                title: "Advanced Research & Development",
                desc: "Our R&D-driven processes ensure consistent hydroxyl value, stable viscosity, and reliable industrial performance.",
                icon: "🧪",
              },
              {
                title: "Circular Chemical Manufacturing",
                desc: "We help manufacturers reduce raw material dependency and carbon footprint through sustainable circular sourcing.",
                icon: "🔄",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative group rounded-xl p-[1px] bg-gradient-to-r from-[#42b3a5] to-green-400 hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white h-full rounded-xl p-6 shadow-md group-hover:shadow-xl transition">
                  <div className="text-4xl mb-4">{item.icon}</div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#42b3a5] transition">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
	  
	  {/* WHY ENVIOL */}
      <section className="py-12 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Why Enviol Polytech Solutions
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <ul className="space-y-4 text-lg">
              <li>✔ Sustainable Raw Material Alternative</li>
              <li>✔ Waste-to-Value Innovation</li>
              <li>✔ Reliable Industrial Supply</li>
              <li>✔ Technical Documentation & Batch Traceability</li>
              <li>✔ Research-Driven Manufacturing</li>
              <li>✔ Controlled Hydroxyl Value (OH) & Viscosity</li>
              <li>✔ Compatible with Standard PU Formulations</li>
			  <li>✔ Serving clients across India, Middle East, Europe & global markets</li>
            </ul>

            <div className="relative w-full h-80 rounded overflow-hidden shadow-lg">
              <Image
                src="/images/banner.jpg"
                alt="Polyol manufacturing facility India polyurethane raw materials plant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section className="py-12 bg-yellow-50 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Our Commitment to Sustainability
          </h2>

          <p className="text-lg mb-6">
            We believe chemical manufacturing must evolve responsibly.
            By recovering polyols from waste streams, we reduce landfill impact, conserve resources, and support global sustainability goals while maintaining industrial-grade performance standards.
          </p>

          <p className="text-gray-700">
            Our polyols are widely used in coatings, adhesives, sealants, elastomers, polyurethane foams, and synthetic leather applications across multiple industries.
          </p>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-12 bg-yellow-50 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/industries" className="group inline-block">
              <h2 className="text-3xl font-bold relative inline-block transition-colors duration-300 group-hover:text-[#42b3a5]">
                Industries We Serve
                <span className="absolute left-0 -bottom-2 h-[3px] w-full bg-[#42b3a5] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </h2>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Polyurethane Manufacturing", path: "/industries/polyurethane" },
              { name: "Foam Production", path: "/industries/foam-production" },
              { name: "Paint & Coatings", path: "/industries/paint-coatings" },
              { name: "Adhesives", path: "/industries/adhesives" },
              { name: "Sealents", path: "/industries/pu-sealents" },
              { name: "Powder Coating", path: "/industries/powder-coating" },
              { name: "Elastomers", path: "/industries/elastomers" },
              { name: "Artificial Leather", path: "/industries/artificial-leather" },
            ].map((industry, index) => (
              <Link key={index} href={industry.path} className="group">
                <div className="bg-gray-100 p-6 rounded shadow transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:bg-[#42b3a5] group-hover:text-white">
                  {industry.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-12 bg-yellow-50 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Our Industrial Impact Commitment
          </h2>

          <p className="max-w-3xl mx-auto text-gray-700 mb-6">
            Our operations focus on scaling sustainable chemical recycling to reduce dependence on virgin petrochemical feedstock while delivering consistent industrial-grade performance.
          </p>

          <div className="grid md:grid-cols-4 gap-10 justify-items-center">
            {[
              { value: "1000 TPA", label: "Target Recycling Capacity" },
              { value: "PET & PU", label: "Polymer Waste Streams Processed" },
              { value: "Low Carbon", label: "Regeneration Model" },
              { value: "Make in India", label: "Import Substitution Focus" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">

                <div
                  className="w-40 h-40 flex items-center justify-center rounded-full 
                  bg-gradient-to-br from-[#42b3a5] to-green-400 
                  text-white shadow-xl animate-pulseSlow hover:scale-110 
                  transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.4}s` }}
                >
                  <h3 className="text-xl font-bold px-4 text-center">
                    {item.value}
                  </h3>
                </div>

                <p className="mt-4 text-sm uppercase tracking-wide text-gray-600 max-w-[150px]">
                  {item.label}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-12 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Integrate Sustainable Polyols?
        </h2>

        <a
          href="/products"
          className="bg-accent text-black px-8 py-4 rounded font-semibold"
        >
          Explore Products
        </a>
      </section>
    </>
  );
}