"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {

  // ✅ images must be INSIDE the function
  const images = [
    "/hero/hero1.jpg",
    "/hero/hero2.jpg",
    "/hero/hero3.jpg",
    "/hero/hero4.jpg",
    "/hero/hero5.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">

        {/* Background Images */}
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Enviol Manufacturing"
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl px-6">
          <h1 className="text-5xl font-bold mb-6">
            Transforming Waste into High-Performance Polyols
          </h1>

          <div className="flex gap-6 justify-center">
            <a
              href="/contact"
              className="bg-green-600 px-8 py-4 rounded font-semibold"
            >
              Request Technical Consultation
            </a>

            <a
              href="/products"
              className="border border-white px-8 py-4 rounded font-semibold"
            >
              Explore Our Products
            </a>
          </div>
        </div>

      </section>
	  
	  {/* WHAT WE DO */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            What We Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">
                Sustainable Polyol Recovery
              </h3>
              <p>
                We recover valuable polyols from industrial waste streams and
                reprocess them into premium-grade polyester and polyether polyols
                for CASE applications.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">
                Advanced Research & Development
              </h3>
              <p>
                Our R&D-driven processes ensure consistent hydroxyl value,
                stable viscosity, and reliable industrial performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">
                Circular Chemical Manufacturing
              </h3>
              <p>
                We help manufacturers reduce raw material dependency and carbon
                footprint through sustainable circular sourcing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ENVIOL */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Enviol Polytech Solutions
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <ul className="space-y-4 text-lg">
              <li>✔ Sustainable Raw Material Alternative</li>
              <li>✔ Waste-to-Value Innovation</li>
              <li>✔ Reliable Industrial Supply</li>
              <li>✔ Technical Documentation & Batch Traceability</li>
              <li>✔ Research-Driven Manufacturing</li>
            </ul>

            <div className="relative w-full h-80 rounded overflow-hidden shadow-lg">
    <Image
  src="/images/banner.jpg"
  alt="Enviol Polytech Manufacturing Facility"
  fill
  className="object-cover"
/>
  </div>
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section className="py-20 bg-yellow-50 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Our Commitment to Sustainability
          </h2>
          <p className="text-lg">
            We believe chemical manufacturing must evolve responsibly.
            By recovering polyols from waste streams, we reduce landfill
            impact, conserve resources, and support global sustainability goals
            while maintaining industrial-grade performance standards.
          </p>
        </div>
      </section>

     {/* INDUSTRIES */}
<section className="py-20 bg-yellow-50 text-center">
  <div className="max-w-6xl mx-auto px-6">

    {/* Clickable Heading */}
    <div className="mb-12">
      <Link href="/industries" className="group inline-block">
        <h2 className="text-3xl font-bold relative inline-block transition-colors duration-300 group-hover:text-[#42b3a5]">
          Industries We Serve
          <span className="absolute left-0 -bottom-2 h-[3px] w-full bg-[#42b3a5] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </h2>
      </Link>
    </div>

    {/* Industry Cards */}
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

{/* IMPACT METRICS SECTION */}
<section className="py-20 bg-yellow-50 border-t">
  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-3xl font-bold mb-12">
      Our Industrial Impact Commitment
    </h2>

    <div className="grid md:grid-cols-4 gap-10">

      {/* Metric 1 */}
      <div>
        <h3 className="text-4xl font-bold text-[#42b3a5] mb-2">
          30 TPD
        </h3>
        <p className="text-sm uppercase tracking-wide text-gray-600">
          Target Recycling Capacity
        </p>
      </div>

      {/* Metric 2 */}
      <div>
        <h3 className="text-4xl font-bold text-[#42b3a5] mb-2">
          PET & PU
        </h3>
        <p className="text-sm uppercase tracking-wide text-gray-600">
          Polymer Waste Streams Processed
        </p>
      </div>

      {/* Metric 3 */}
      <div>
        <h3 className="text-4xl font-bold text-[#42b3a5] mb-2">
          Low Carbon
        </h3>
        <p className="text-sm uppercase tracking-wide text-gray-600">
          Regeneration Model
        </p>
      </div>

      {/* Metric 4 */}
      <div>
        <h3 className="text-4xl font-bold text-[#42b3a5] mb-2">
          Make in India
        </h3>
        <p className="text-sm uppercase tracking-wide text-gray-600">
          Import Substitution Focus
        </p>
      </div>

    </div>
  </div>
</section>


      {/* FINAL CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Integrate Sustainable Polyols Into Your Production Line?
        </h2>

        <p className="mb-6">
          Connect with our technical team for product consultation and
          enquiry-based pricing.
        </p>

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

