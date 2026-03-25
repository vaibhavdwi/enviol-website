"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Technology", path: "/technology" },
    { name: "Sustainability", path: "/sustainability" },
    { name: "Industries", path: "/industries" },
    { name: "Products", path: "/products" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-[#1f2937] shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">

        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Enviol"
            width={50}
            height={50}
            priority
          />

          <div className="leading-tight">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Enviol Polytech Solutions
            </h1>

            <p className="text-xs md:text-sm tracking-wider text-gray-300">
              Reuse What You Waste
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 text-base md:text-lg font-medium text-white">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative group transition hover:text-gray-300"
              >
                {link.name}

                {/* Underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#42b3a5] transform transition-transform duration-300 origin-left ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            href="/contact"
            className="ml-4 bg-[#42b3a5] text-white px-6 py-2.5 rounded-full text-base font-semibold hover:scale-105 transition shadow-md"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[#1f2937] z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <span className="font-bold text-lg text-white">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={30} className="text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-6 py-8 text-xl text-white">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#42b3a5]"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-[#42b3a5] text-white px-6 py-3 rounded-full text-center font-semibold"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}