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
      <section className="py-20 bg-lightbg">
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
      <section className="py-20 bg-white">
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
      <section className="py-20 bg-lightbg text-center">
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
      <section className="py-20 bg-white text-center">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold mb-12">
      Industries We Serve
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <Link href="/industries/polyurethane" className="group">
        <div className="bg-gray-100 p-6 rounded shadow transition duration-300 group-hover:bg-[#42b3a5] group-hover:text-white">
          Polyurethane Manufacturing
        </div>
      </Link>

      <Link href="/industries/foam-production" className="group">
        <div className="bg-gray-100 p-6 rounded shadow transition duration-300 group-hover:bg-[#42b3a5] group-hover:text-white">
          Foam Production
        </div>
      </Link>

      <Link href="/industries/paint-coatings" className="group">
        <div className="bg-gray-100 p-6 rounded shadow transition duration-300 group-hover:bg-[#42b3a5] group-hover:text-white">
          Paint & Coatings
        </div>
      </Link>

      <Link href="/industries/adhesives" className="group">
        <div className="bg-gray-100 p-6 rounded shadow transition duration-300 group-hover:bg-[#42b3a5] group-hover:text-white">
          Adhesives
        </div>
      </Link>

      <Link href="/industries/powder-coating" className="group">
        <div className="bg-gray-100 p-6 rounded shadow transition duration-300 group-hover:bg-[#42b3a5] group-hover:text-white">
          Powder Coating
        </div>
      </Link>

      <Link href="/industries/elastomers" className="group">
        <div className="bg-gray-100 p-6 rounded shadow transition duration-300 group-hover:bg-[#42b3a5] group-hover:text-white">
          Elastomers
        </div>
      </Link>

      <Link href="/industries/artificial-leather" className="group">
        <div className="bg-gray-100 p-6 rounded shadow transition duration-300 group-hover:bg-[#42b3a5] group-hover:text-white">
          Artificial Leather
        </div>
      </Link>

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

