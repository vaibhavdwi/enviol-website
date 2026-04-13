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

      {/* ================= WHAT WE DO ================= */}
      <section className="py-12 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            What We Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {["♻️", "🧪", "🔄"].map((icon, index) => (
              <div key={index} className="bg-white p-6 rounded shadow">
                <div className="text-4xl mb-4">{icon}</div>
                <p className="text-gray-600">High-performance sustainable polyol solutions.</p>
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