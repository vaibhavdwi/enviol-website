"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AnimatedTagline from "@/components/AnimatedTagline";
import AnimatedSubheading from "@/components/AnimatedSubheading";
import AnimatedBrand from "@/components/AnimatedBrand";

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
        <Link href="/" className="flex flex-col">

  {/* Logo + Brand */}
  <div className="flex items-center gap-3">

    <div className="relative animate-logoFloat">
  
  {/* Glow */}
  <div className="absolute inset-0 rounded-full bg-[#5ffbf1]/20 blur-xl animate-logoPulse"></div>

  <Image
    src="/images/logo-n.png"
    alt="Enviol"
    width={60}
    height={60}
    priority
    className="relative z-10"
  />

</div>

    <div className="leading-none">
      <AnimatedBrand
  key={`brand-${pathname}`}
  text="E N V I O L"
/>
 

<AnimatedSubheading
  key={`sub-${pathname}`}
  text="POLYTECH SOLUTIONS"
/>
    </div>

  </div>

  {/* Tagline */}
  <div className="pl-[8px] mt-1">
    <AnimatedTagline text="Reuse waste to Sustainable Polyurethanes" />
  </div>

</Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 text-base md:text-lg font-medium text-[#d8f3f1]">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative group transition-all duration-300 ${
  isActive
    ? "text-[#5ffbf1]"
    : "text-[#d8f3f1] hover:text-[#7be0d4]"
}`}
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

 <Link
  href="/contact"
  className="ml-4 relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-base font-semibold text-white overflow-hidden
  bg-gradient-to-r from-[#42b3a5] to-green-400
  animate-contactDance
  hover:scale-105 transition duration-300 shadow-lg"
>
  {/* Glow */}
  <span className="absolute inset-0 rounded-full animate-contactPulse border border-white/30"></span>

  {/* Shine Effect */}
  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>

  {/* Text */}
  <span className="relative z-10 flex items-center gap-2">
    Contact
    <span className="animate-arrowMove">→</span>
  </span>
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