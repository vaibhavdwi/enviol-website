"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AnimatedTagline from "@/components/AnimatedTagline";
import AnimatedSubheading from "@/components/AnimatedSubheading";
import AnimatedBrand from "@/components/AnimatedBrand";
import { track } from "@/utils/tracker";
import { NAVIGATION_EVENTS, LEAD_EVENTS } from "@/analytics/events";

import {
  productMenu,
  industriesMenu,
} from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Industries",
      path: "/industries",
      dropdown: industriesMenu,
    },

    {
      name: "Products",
      path: "/products",
      dropdown: productMenu,
    },

    {
      name: "Technology",
      path: "/technology",
    },

    {
      name: "Sustainability",
      path: "/sustainability",
    },
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

        {/* ============================================================
            LOGO
        ============================================================ */}

        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-3">

            <div className="relative animate-logoFloat">
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

          <div className="pl-[8px] mt-1">
            <AnimatedTagline text="Reuse waste to Sustainable Polyurethanes" />
          </div>
        </Link>

        {/* ============================================================
            DESKTOP MENU
        ============================================================ */}

        <nav className="hidden md:flex items-center gap-8 text-base md:text-lg font-medium text-[#d8f3f1]">

          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            {/* ========================================================
                NORMAL LINK
            ======================================================== */}

            if (!link.dropdown) {
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() =>
                    track(NAVIGATION_EVENTS.NAVIGATION_CLICK, {
                      metadata: {
                        target: link.name,
                        path: link.path,
                        source: "navbar_desktop",
                      },
                    })
                  }
                  className={`relative group transition-all duration-300 ${
                    isActive
                      ? "text-[#5ffbf1]"
                      : "text-[#d8f3f1] hover:text-[#7be0d4]"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#42b3a5] transform transition-transform duration-300 origin-left ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            }

            {/* ========================================================
                FIRST-LEVEL DROPDOWN
                No second-level dropdown anymore.
            ======================================================== */}

            return (
              <div
                key={link.name}
                className="relative group"
              >

                {/* Parent Link */}

                <Link
                  href={link.path}
                  onClick={() =>
                    track(NAVIGATION_EVENTS.NAVIGATION_CLICK, {
                      metadata: {
                        target: link.name,
                        path: link.path,
                        source: "navbar_dropdown_parent",
                      },
                    })
                  }
                  className={`flex items-center gap-1 transition-all duration-300 ${
                    pathname.startsWith(
                      `/${link.name.toLowerCase()}`
                    )
                      ? "text-[#5ffbf1]"
                      : "text-[#d8f3f1] hover:text-[#7be0d4]"
                  }`}
                >
                  {link.name}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 group-hover:rotate-180 transition duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>

                {/* ====================================================
                    FIRST-LEVEL DROPDOWN ONLY
                ==================================================== */}

                <div className="absolute top-full left-0 mt-3 w-72 bg-[#1f2937]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-3">

                  {link.dropdown.map((item) => (
                    <div key={item.name}>

                      {item.path ? (
                        <Link
                          href={item.path}
                          onClick={() =>
                            track(
                              NAVIGATION_EVENTS.NAVIGATION_CLICK,
                              {
                                metadata: {
                                  target: item.name,
                                  path: item.path,
                                  source: link.name.toLowerCase(),
                                },
                              }
                            )
                          }
                          className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#2b3748] hover:text-[#42b3a5] transition text-sm font-medium text-[#d8f3f1]"
                        >
                          <span>{item.name}</span>
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#2b3748] hover:text-[#42b3a5] transition text-sm font-medium text-[#d8f3f1]">
                          <span>{item.name}</span>
                        </div>
                      )}

                    </div>
                  ))}

                </div>
              </div>
            );
          })}

          {/* ==========================================================
              CONTACT
          ========================================================== */}

          <Link
            href="/contact"
            onClick={() =>
              track(LEAD_EVENTS.CTA_CLICK, {
                metadata: {
                  target: "contact",
                  source: "navbar_desktop",
                },
              })
            }
            className="ml-4 relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-base font-semibold text-white overflow-hidden bg-gradient-to-r from-[#42b3a5] to-green-400 animate-contactDance hover:scale-105 transition duration-300 shadow-lg"
          >
            <span className="absolute inset-0 rounded-full animate-contactPulse border border-white/30"></span>

            <span className="relative z-10 flex items-center gap-2">
              Contact
              <span className="animate-arrowMove">
                →
              </span>
            </span>
          </Link>
        </nav>

        {/* ============================================================
            MOBILE TOGGLE
        ============================================================ */}

        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>

        {/* ============================================================
            MOBILE MENU
        ============================================================ */}

        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-50">

            {/* BACKDROP */}

            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => {
                setMenuOpen(false);
                setOpenMobileDropdown(null);
              }}
            />

            {/* DRAWER */}

            <div className="absolute right-0 top-0 h-full w-80 bg-[#1f2937] shadow-2xl flex flex-col">

              {/* CLOSE BUTTON */}

              <div className="sticky top-0 z-10 flex justify-end px-4 py-2 bg-[#1f2937]">

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setOpenMobileDropdown(null);
                  }}
                  className="text-white"
                >
                  <X size={26} />
                </button>

              </div>

              {/* SCROLLABLE CONTENT */}

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-2 space-y-1">

                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className="flex flex-col"
                  >

                    {/* ==================================================
                        SIMPLE LINK
                    ================================================== */}

                    {!link.dropdown && (
                      <Link
                        href={link.path}
                        onClick={() => {
                          track(
                            NAVIGATION_EVENTS.NAVIGATION_CLICK,
                            {
                              metadata: {
                                target: link.name,
                                path: link.path,
                                source: "navbar_mobile",
                              },
                            }
                          );

                          setMenuOpen(false);
                          setOpenMobileDropdown(null);
                        }}
                        className="pl-4 pr-3 py-2.5 rounded-xl text-[#d8f3f1] font-medium hover:bg-[#2b3748] hover:text-[#5ffbf1] transition"
                      >
                        {link.name}
                      </Link>
                    )}

                    {/* ==================================================
                        FIRST-LEVEL MOBILE DROPDOWN
                    ================================================== */}

                    {link.dropdown && (
                      <div className="border-l border-white/10 pl-2">

                        {/* PARENT */}

                        <div className="flex items-center">

                          <Link
                            href={link.path}
                            onClick={() => {
                              track(
                                NAVIGATION_EVENTS.NAVIGATION_CLICK,
                                {
                                  metadata: {
                                    target: link.name,
                                    path: link.path,
                                    source:
                                      "navbar_mobile_parent",
                                  },
                                }
                              );

                              setMenuOpen(false);
                              setOpenMobileDropdown(null);
                            }}
                            className="flex-1 pl-4 pr-3 py-2.5 rounded-lg text-[#d8f3f1] font-medium hover:bg-[#2b3748] transition"
                          >
                            {link.name}
                          </Link>

                          <button
                            onClick={() =>
                              setOpenMobileDropdown(
                                openMobileDropdown ===
                                  link.name
                                  ? null
                                  : link.name
                              )
                            }
                            className="px-4 py-2.5 text-[#d8f3f1]"
                          >
                            <span
                              className={`block transition-transform duration-300 ${
                                openMobileDropdown ===
                                link.name
                                  ? "rotate-180"
                                  : ""
                              }`}
                            >
                              ▼
                            </span>
                          </button>

                        </div>

                        {/* =================================================
                            DROPDOWN ITEMS
                        ================================================= */}

                        {openMobileDropdown ===
                          link.name && (
                            <div className="ml-2 mt-2 space-y-1">

                              {link.dropdown.map(
                                (item) => (

                                  item.path ? (
                                    <Link
                                      key={item.name}
                                      href={item.path}
                                      onClick={() => {
                                        track(
                                          NAVIGATION_EVENTS.NAVIGATION_CLICK,
                                          {
                                            metadata: {
                                              target:
                                                item.name,
                                              path:
                                                item.path,
                                              parent:
                                                link.name,
                                              source:
                                                "navbar_mobile",
                                            },
                                          }
                                        );

                                        setMenuOpen(false);
                                        setOpenMobileDropdown(
                                          null
                                        );
                                      }}
                                      className="block px-3 py-2 rounded-lg text-sm font-medium text-[#d8f3f1] hover:bg-[#2b3748] hover:text-[#5ffbf1] transition"
                                    >
                                      {item.name}
                                    </Link>
                                  ) : (
                                    <div
                                      key={item.name}
                                      className="px-3 py-2 text-sm font-medium text-[#d8f3f1]"
                                    >
                                      {item.name}
                                    </div>
                                  )

                                )
                              )}

                            </div>
                          )}

                      </div>
                    )}

                  </div>
                ))}

                {/* ========================================================
                    CONTACT
                ======================================================== */}

                <Link
                  href="/contact"
                  onClick={() => {
                    track(LEAD_EVENTS.CTA_CLICK, {
                      metadata: {
                        target: "contact",
                        source: "navbar_mobile",
                      },
                    });

                    setMenuOpen(false);
                    setOpenMobileDropdown(null);
                  }}
                  className="block mt-6 text-center px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#42b3a5] to-green-400 shadow-lg active:scale-95 transition"
                >
                  Contact →
                </Link>

              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}