"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Technology", path: "/technology" },
    { name: "Sustainability", path: "/sustainability" },
	{ name: "Industries", path: "/industries" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#42b3a5]/90 backdrop-blur-md shadow-lg"
          : "bg-[#42b3a5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <Image
            src="/images/logo.png"
            alt="Enviol Polytech Solutions"
            width={80}
            height={80}
            priority
            className="transition duration-300 group-hover:scale-105"
          />

          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Enviol Polytech Solutions
            </h1>
            <p className="text-sm font-semibold text-white tracking-wide uppercase">
              Reuse What You Waste
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8 text-base font-medium text-white">

          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative group transition-colors duration-300 ${
                  isActive ? "text-yellow-200" : "hover:text-gray-200"
                }`}
              >
                {link.name}

                {/* Animated Bottom Bar */}
                <span
                  className={`absolute left-0 -bottom-2 h-[3px] w-full bg-white transform transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            );
          })}

        </nav>
      </div>
    </header>
  );
}
