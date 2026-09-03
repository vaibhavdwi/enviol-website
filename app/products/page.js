"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import productData from "../../data/products.json";
import AnimatedHeading from "@/components/AnimatedHeading";

const products = Array.isArray(productData) ? productData : [];

export default function ProductsPage() {
  const processSteps = [
    {
      number: "01",
      title: "Technical Discussion",
      shortTitle: "Technical\nDiscussion",
      color: "#3B82F6",
      lightColor: "#EFF6FF",
      customer:
        "We need a polyester polyol with a specific OH value, viscosity and reactivity for our PU system.",
      enviol:
        "We understand your application and technical requirements. Let's discuss the target properties, formulation and processing conditions.",
    },
    {
      number: "02",
      title: "Grade Development",
      shortTitle: "Grade\nDevelopment",
      color: "#8B5CF6",
      lightColor: "#F5F3FF",
      customer:
        "Can you develop a grade specifically suited to our formulation?",
      enviol:
        "Definitely. We can work around your required chemistry and performance targets to develop a suitable grade for your application.",
    },
    {
      number: "03",
      title: "Sample",
      shortTitle: "Sample",
      color: "#EC4899",
      lightColor: "#FDF2F8",
      customer:
        "Can you provide a sample so that we can evaluate it in our formulation?",
      enviol:
        "Certainly. We can prepare a development sample for your laboratory and formulation trials.",
    },
    {
      number: "04",
      title: "Customer Trials",
      shortTitle: "Customer\nTrials",
      color: "#F97316",
      lightColor: "#FFF7ED",
      customer:
        "We have received the sample and will test it in our existing PU system.",
      enviol:
        "Great. Please evaluate the processing behaviour and final performance. Based on your results, we can fine-tune the grade if required.",
    },
    {
      number: "05",
      title: "Validation",
      shortTitle: "Validation",
      color: "#EAB308",
      lightColor: "#FEFCE8",
      customer:
        "The material is performing well and meets our requirements.",
      enviol:
        "Excellent. We can now finalise the agreed specifications and ensure the grade can be reproduced consistently for regular production.",
    },
    {
      number: "06",
      title: "Regular Requirement",
      shortTitle: "Regular\nRequirement",
      color: "#14B8A6",
      lightColor: "#F0FDFA",
      customer:
        "We trust and like your sample. Now could you plan to get us 2 tons of XXX grade polyol every month?",
      enviol:
        "Definitely. We will plan our raw materials and production capacity around your regular requirement and make sure the agreed demand is met on time.",
    },
    {
      number: "07",
      title: "Planned Production & Supply",
      shortTitle: "Planned\nProduction",
      color: "#22C55E",
      lightColor: "#F0FDF4",
      customer:
        "We need the same grade every month according to our production schedule.",
      enviol:
        "Absolutely. Based on your regular requirement, we can plan production in advance so your required quantity is available according to the agreed delivery schedule.",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /* ============================================================
      AUTOMATIC 10 SECOND CYCLE
  ============================================================ */

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % processSteps.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, processSteps.length]);

  /* ============================================================
      SELECT STAGE
  ============================================================ */

  const selectStep = (index) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  };

  /* ============================================================
      HOVER STAGE
  ============================================================ */

  const handleHover = (index) => {
    if (isAutoPlaying) {
      setActiveStep(index);
    }
  };

  /* ============================================================
      PREVIOUS / NEXT
  ============================================================ */

  const goPrevious = () => {
    setActiveStep(
      (current) =>
        (current - 1 + processSteps.length) % processSteps.length
    );
    setIsAutoPlaying(false);
  };

  const goNext = () => {
    setActiveStep(
      (current) => (current + 1) % processSteps.length
    );
    setIsAutoPlaying(false);
  };

  /* ============================================================
      RESUME
  ============================================================ */

  const resumeAutoCycle = () => {
    setIsAutoPlaying(true);
  };

  const active = processSteps[activeStep];

  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        {/* ============================================================
            PAGE HEADING
        ============================================================ */}

        <AnimatedHeading title="Our Products" />

        {/* ============================================================
            PRODUCT CARDS
        ============================================================ */}

        <div className="grid md:grid-cols-2 gap-8">

          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              <div
                className="
                  bg-white
                  p-6
                  shadow
                  rounded-xl
                  border border-transparent
                  transition-all
                  duration-300
                  hover:bg-[#55BAAE]
                  hover:shadow-2xl
                  hover:-translate-y-2
                  hover:scale-[1.02]
                  cursor-pointer
                "
              >

                <h3
                  className="
                    text-xl
                    font-semibold
                    text-gray-800
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  {product.product_code}
                </h3>

                <p
                  className="
                    my-4
                    text-gray-600
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                >
                  {product.description}
                </p>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    text-blue-600
                    font-semibold
                    transition-all
                    duration-300
                    group-hover:text-white
                    group-hover:translate-x-1
                  "
                >
                  View Details →
                </span>

              </div>
            </Link>
          ))}

        </div>

        {/* ============================================================
            MAKE-TO-ORDER APPROACH
        ============================================================ */}

        <section className="mt-12">

          <div
            className="
              bg-[#f4faf9]
              border
              border-[#d8eeeb]
              rounded-2xl
              p-6
              md:p-8
              lg:p-10
            "
          >

            {/* ========================================================
                INTRODUCTION
            ======================================================== */}

            <div className="w-full">

              <h2 className="text-2xl md:text-3xl font-bold text-[#1F524F]">
                Developed Around Your Application. Manufactured Around Your
                Demand.
              </h2>

              <div className="w-16 h-1 bg-[#42B3A5] rounded-full mt-4 mb-6" />

              <p className="text-gray-700 leading-relaxed mb-5">
                Enviol is developing and validating commercial-grade{" "}
                <strong>
                  Polyester Polyols using advanced recycling techniques
                </strong>
                , while also conducting trials on{" "}
                <strong>
                  high-quality virgin aliphatic and aromatic polyol grades
                </strong>{" "}
                for a wide range of polyurethane applications.
              </p>

              <p className="text-gray-700 leading-relaxed mb-5">
                We work directly with customers to understand their{" "}
                <strong>
                  PU system, processing conditions, performance requirements
                  and expected consumption
                </strong>
                . Based on these requirements, our team can develop or
                customise specialised polyol grades and provide samples for
                formulation trials and validation.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Once a grade is successfully validated and a regular
                requirement is established, our{" "}
                <strong>make-to-order manufacturing strategy</strong>{" "}
                allows us to plan production around actual customer demand.
                This approach helps create a more dependable supply
                relationship while reducing uncertainty around raw-material
                availability and lead times.
              </p>

            </div>

            
            {/* ============================================================
                INTERACTIVE CIRCULAR DEVELOPMENT CYCLE
            ============================================================ */}

            <div
              className="
                mt-10
                bg-white
                border
                border-[#d8eeeb]
                rounded-2xl
                p-5
                md:p-7
                overflow-hidden
              "
            >

              {/* HEADER */}

              <div className="text-center mb-7">

                <h3 className="text-xl md:text-2xl font-semibold text-[#1F524F]">
                  From Development to Regular Supply
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Hover or select any stage to explore how we work with you.
                </p>

              </div>

              {/* ==========================================================
                  CIRCLE + CONVERSATION
              ========================================================== */}

              <div
                className="
                  flex
                  flex-col
                  lg:flex-row
                  items-center
                  justify-center
                  gap-7
                  lg:gap-10
                  max-w-6xl
                  mx-auto
                "
              >

                {/* ========================================================
                    CIRCULAR PROCESS
                ======================================================== */}

                <div
                  className="
                    relative
                    w-full
                    max-w-[500px]
                    sm:max-w-[540px]
                    lg:max-w-[500px]
                    aspect-square
                    flex-shrink-0
                  "
                >

                  {/* OUTER COLOUR RING */}

                  <div
                    className="
                      absolute
                      inset-[8%]
                      rounded-full
                      border-[3px]
                      border-[#d8eeeb]
                    "
                  />

                  {/* INNER RING */}

                  <div
                    className="
                      absolute
                      inset-[24%]
                      rounded-full
                      border
                      border-[#e4f2ef]
                      bg-[#f8fcfb]
                    "
                  />

                  {/* ======================================================
                      COLOURFUL SEGMENT DOTS
                  ====================================================== */}

                  {processSteps.map((step, index) => {

                    const angle = -90 + index * (360 / processSteps.length);
                    const radius = 42;

                    const x =
                      50 + radius * Math.cos((angle * Math.PI) / 180);

                    const y =
                      50 + radius * Math.sin((angle * Math.PI) / 180);

                    const isActive = activeStep === index;

                    return (
                      <div
                        key={`segment-${step.number}`}
                        className="
                          absolute
                          w-4
                          h-4
                          rounded-full
                          -translate-x-1/2
                          -translate-y-1/2
                          z-10
                          transition-all
                          duration-500
                        "
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          backgroundColor: step.color,
                          boxShadow: isActive
                            ? `0 0 0 7px ${step.color}25`
                            : "none",
                          transform: `translate(-50%, -50%) scale(${
                            isActive ? 1.35 : 1
                          })`,
                        }}
                      />
                    );
                  })}

                  {/* ======================================================
                      CENTER
                  ====================================================== */}

                  <div
                    className="
                      absolute
                      inset-[25%]
                      rounded-full
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      px-4
                      z-20
                    "
                  >

                    <div
                      className="
                        text-2xl
                        sm:text-3xl
                        font-extrabold
                        tracking-[0.12em]
                        text-[#1F524F]
                      "
                    >
                      ENVIOL
                    </div>

                    <div
                      className="
                        mt-2
                        text-[10px]
                        sm:text-xs
                        leading-tight
                        font-medium
                        text-gray-500
                      "
                    >
                      From Requirement
                      <br />
                      to Reliable Supply
                    </div>

                    <div
                      className="
                        mt-3
                        w-9
                        h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-white
                        text-lg
                        shadow-md
                        transition-all
                        duration-500
                      "
                      style={{
                        backgroundColor: active.color,
                      }}
                    >
                      ↻
                    </div>

                  </div>

                  {/* ======================================================
                      STAGE CARDS
                  ====================================================== */}

                  {processSteps.map((step, index) => {

                    const angle = -90 + index * (360 / processSteps.length);
                    const radius = 42;

                    const x =
                      50 + radius * Math.cos((angle * Math.PI) / 180);

                    const y =
                      50 + radius * Math.sin((angle * Math.PI) / 180);

                    const isActive = activeStep === index;

                    return (
                      <button
                        key={step.number}
                        type="button"
                        onMouseEnter={() => handleHover(index)}
                        onFocus={() => handleHover(index)}
                        onClick={() => selectStep(index)}
                        className="
                          absolute
                          z-30
                          -translate-x-1/2
                          -translate-y-1/2
                          rounded-2xl
                          flex
                          flex-col
                          items-center
                          justify-center
                          text-center
                          transition-all
                          duration-500
                          focus:outline-none
                        "
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          width: isActive ? "92px" : "82px",
                          height: isActive ? "92px" : "82px",
                          backgroundColor: isActive
                            ? step.color
                            : "white",
                          border: `2px solid ${
                            isActive ? step.color : step.color + "55"
                          }`,
                          color: isActive ? "white" : "#1F524F",
                          boxShadow: isActive
                            ? `0 10px 25px ${step.color}45, 0 0 0 5px ${step.color}18`
                            : "0 5px 15px rgba(31,82,79,0.10)",
                          transform: `translate(-50%, -50%) scale(${
                            isActive ? 1.08 : 1
                          })`,
                        }}
                      >

                        {/* NUMBER */}

                        <span
                          className="
                            text-[10px]
                            font-bold
                            tracking-wider
                          "
                          style={{
                            color: isActive ? "rgba(255,255,255,0.85)" : step.color,
                          }}
                        >
                          {step.number}
                        </span>

                        {/* TITLE */}

                        <span
                          className="
                            mt-1
                            text-[9px]
                            sm:text-[10px]
                            font-bold
                            leading-tight
                            whitespace-pre-line
                            max-w-[72px]
                          "
                        >
                          {step.shortTitle}
                        </span>

                        {/* MESSAGE BUBBLE */}

                        <span
                          className="
                            absolute
                            -right-2
                            -top-2
                            w-6
                            h-6
                            rounded-full
                            flex
                            items-center
                            justify-center
                            text-white
                            border-2
                            border-white
                            shadow-md
                          "
                          style={{
                            backgroundColor: step.color,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 10h8M8 14h5m7-2a8 8 0 01-8 8 8.5 8.5 0 01-3.4-.7L4 20l.7-3.6A8 8 0 1120 12z"
                            />
                          </svg>
                        </span>

                      </button>
                    );
                  })}

                </div>

                {/* ========================================================
                    CONVERSATION PANEL
                ======================================================== */}

                <div
                  className="
                    w-full
                    max-w-[500px]
                    lg:max-w-[450px]
                    flex-1
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      border
                      overflow-hidden
                      shadow-lg
                      transition-all
                      duration-500
                    "
                    style={{
                      borderColor: active.color + "45",
                      backgroundColor: active.lightColor,
                    }}
                  >

                    {/* PANEL HEADER */}

                    <div
                      className="
                        px-5
                        py-4
                        flex
                        items-center
                        justify-between
                        gap-3
                        text-white
                      "
                      style={{
                        backgroundColor: active.color,
                      }}
                    >

                      <div>

                        <div className="text-[10px] font-bold tracking-[0.15em] opacity-80">
                          E.g. — STAGE {active.number}
                        </div>

                        <h4 className="text-lg font-bold mt-0.5">
                          {active.title}
                        </h4>

                      </div>

                      <div
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-white/20
                          flex
                          items-center
                          justify-center
                          flex-shrink-0
                        "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 10h8M8 14h5m7-2a8 8 0 01-8 8 8.5 8.5 0 01-3.4-.7L4 20l.7-3.6A8 8 0 1120 12z"
                          />
                        </svg>
                      </div>

                    </div>

                    {/* MESSAGES */}

                    <div className="p-5">

                      {/* CUSTOMER */}

                      <div className="flex gap-3 mb-5">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-full
                            bg-white
                            border
                            flex
                            items-center
                            justify-center
                            text-sm
                            flex-shrink-0
                            shadow-sm
                          "
                          style={{
                            borderColor: active.color + "30",
                          }}
                        >
                          👤
                        </div>

                        <div className="flex-1">

                          <div className="text-xs font-semibold text-gray-500 mb-1">
                            Customer
                          </div>

                          <div
                            className="
                              bg-white
                              rounded-2xl
                              rounded-tl-sm
                              px-4
                              py-3
                              text-sm
                              text-gray-700
                              leading-relaxed
                              shadow-sm
                              border
                            "
                            style={{
                              borderColor: active.color + "20",
                            }}
                          >
                            {active.customer}
                          </div>

                        </div>

                      </div>

                      {/* ENVIOL */}

                      <div className="flex gap-3">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-full
                            text-white
                            flex
                            items-center
                            justify-center
                            text-xs
                            font-bold
                            flex-shrink-0
                            shadow-sm
                          "
                          style={{
                            backgroundColor: active.color,
                          }}
                        >
                          E
                        </div>

                        <div className="flex-1">

                          <div
                            className="text-xs font-semibold mb-1"
                            style={{
                              color: active.color,
                            }}
                          >
                            Enviol
                          </div>

                          <div
                            className="
                              text-white
                              rounded-2xl
                              rounded-tl-sm
                              px-4
                              py-3
                              text-sm
                              leading-relaxed
                              shadow-sm
                            "
                            style={{
                              backgroundColor: active.color,
                            }}
                          >
                            {active.enviol}
                          </div>

                        </div>

                      </div>

                    </div>

                    {/* NAVIGATION */}

                    <div
                      className="
                        px-5
                        pb-5
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <button
                        type="button"
                        onClick={goPrevious}
                        aria-label="Previous stage"
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-white
                          border
                          flex
                          items-center
                          justify-center
                          text-lg
                          transition-all
                          duration-300
                          hover:scale-110
                          shadow-sm
                        "
                        style={{
                          borderColor: active.color + "40",
                          color: active.color,
                        }}
                      >
                        ←
                      </button>

                      <div className="text-center">

                        <div className="text-xs font-semibold text-gray-500">
                          {active.number} / 07
                        </div>

                        <div className="flex gap-1.5 justify-center mt-2">

                          {processSteps.map((step, index) => (
                            <button
                              key={step.number}
                              type="button"
                              onClick={() => selectStep(index)}
                              aria-label={`Go to ${step.title}`}
                              className="
                                rounded-full
                                transition-all
                                duration-300
                              "
                              style={{
                                width: activeStep === index ? "18px" : "6px",
                                height: "6px",
                                backgroundColor:
                                  activeStep === index
                                    ? step.color
                                    : "#cbd5d1",
                              }}
                            />
                          ))}

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next stage"
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-white
                          border
                          flex
                          items-center
                          justify-center
                          text-lg
                          transition-all
                          duration-300
                          hover:scale-110
                          shadow-sm
                        "
                        style={{
                          borderColor: active.color + "40",
                          color: active.color,
                        }}
                      >
                        →
                      </button>

                    </div>

                  </div>

                </div>

              </div>

              {/* ==========================================================
                  AUTO CYCLE CONTROL
              ========================================================== */}

              <div className="mt-6 text-center">

                {isAutoPlaying ? (

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-full
                      bg-[#f4faf9]
                      border
                      border-[#d8eeeb]
                      text-xs
                      text-gray-500
                    "
                  >

                    <span
                      className="
                        w-2
                        h-2
                        rounded-full
                        animate-pulse
                      "
                      style={{
                        backgroundColor: active.color,
                      }}
                    />

                    Automatically exploring the customer journey

                  </div>

                ) : (

                  <button
                    type="button"
                    onClick={resumeAutoCycle}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-full
                      bg-[#1F524F]
                      text-white
                      text-sm
                      font-semibold
                      shadow-md
                      hover:bg-[#42B3A5]
                      hover:shadow-lg
                      transition-all
                      duration-300
                    "
                  >
                    <span>▶</span>
                    Resume Auto Cycle
                  </button>

                )}

              </div>

            </div>
			
			{/* ============================================================
                CUSTOMER BENEFITS
            ============================================================ */}

            <div className="mt-10">

              <h3 className="text-xl md:text-2xl font-semibold text-[#1F524F] mb-6">
                What This Means for Our Customers
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {[
                  {
                    title: "More Dependable Supply",
                    text:
                      "Production can be planned against regularised customer requirements, helping customers receive their required grades on time and reduce uncertainty around raw-material availability.",
                  },
                  {
                    title: "Application-Specific Grades",
                    text:
                      "We work towards developing polyol grades around your required PU system, processing conditions, performance targets and end application rather than relying only on standard off-the-shelf grades.",
                  },
                  {
                    title: "Better Production Planning",
                    text:
                      "Visibility of recurring requirements allows us to plan raw materials, manufacturing capacity and production schedules in advance, helping minimise avoidable supply interruptions.",
                  },
                  {
                    title: "Reduced Sourcing Uncertainty",
                    text:
                      "A planned manufacturing relationship can help customers reduce the uncertainty of sourcing suitable polyols whenever availability, lead times or grade-specific requirements become challenging.",
                  },
                  {
                    title: "Consistent, Repeatable Grades",
                    text:
                      "Once a specialised grade has been developed and validated, production can be organised around agreed specifications and application requirements to support consistency from order to order.",
                  },
                  {
                    title: "Long-Term Manufacturing Partnership",
                    text:
                      "Our objective is to become a reliable manufacturing partner, supporting customers through grade development, validation and regular supply as their requirements evolve.",
                  },
                ].map((benefit) => (
                  <div
                    key={benefit.title}
                    className="
                      group
                      bg-white
                      border
                      border-[#d8eeeb]
                      rounded-xl
                      p-5
                      transition-all
                      duration-300
                      hover:bg-[#55BAAE]
                      hover:border-[#55BAAE]
                      hover:shadow-xl
                      hover:-translate-y-1
                    "
                  >

                    <h4
                      className="
                        font-semibold
                        text-[#1F524F]
                        text-lg
                        mb-2
                        transition-colors
                        duration-300
                        group-hover:text-white
                      "
                    >
                      {benefit.title}
                    </h4>

                    <p
                      className="
                        text-gray-600
                        text-sm
                        leading-relaxed
                        transition-colors
                        duration-300
                        group-hover:text-white
                      "
                    >
                      {benefit.text}
                    </p>

                  </div>
                ))}

              </div>

            </div>


            {/* ============================================================
                CTA
            ============================================================ */}

            <div className="mt-8 pt-7 border-t border-[#d8eeeb]">

              <h3 className="text-xl font-semibold text-[#1F524F] mb-3">
                Looking for a Specific Polyol Grade?
              </h3>

              <p className="text-gray-600 leading-relaxed mb-5">
                Share your application, target properties, PU system,
                expected consumption and other technical requirements with
                our team. We can discuss your requirement, explore suitable
                formulations, develop specialised grades and provide samples
                for your trials.
              </p>

              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-full
                  bg-gradient-to-r
                  from-[#42B3A5]
                  to-green-400
                  text-white
                  font-semibold
                  shadow-md
                  hover:scale-105
                  transition
                  duration-300
                "
              >
                Discuss Your Requirement
                <span>→</span>
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

