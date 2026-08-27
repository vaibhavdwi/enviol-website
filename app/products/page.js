import Link from "next/link";
import { products } from "../../data/products";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function ProductsPage() {
  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

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
                  {product.name}
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
                Developed Around Your Application. Manufactured Around Your Demand.
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
                CUSTOMER BENEFITS
            ============================================================ */}

            <div className="mt-10">

              <h3 className="text-xl md:text-2xl font-semibold text-[#1F524F] mb-6">
                What This Means for Our Customers
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* ======================================================
                    BENEFIT 1
                ====================================================== */}

                <div
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
                    More Dependable Supply
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
                    Production can be planned against regularised customer
                    requirements, helping customers receive their required
                    grades on time and reduce uncertainty around raw-material
                    availability.
                  </p>
                </div>

                {/* ======================================================
                    BENEFIT 2
                ====================================================== */}

                <div
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
                    Application-Specific Grades
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
                    We work towards developing polyol grades around your
                    required PU system, processing conditions, performance
                    targets and end application rather than relying only on
                    standard off-the-shelf grades.
                  </p>
                </div>

                {/* ======================================================
                    BENEFIT 3
                ====================================================== */}

                <div
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
                    Better Production Planning
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
                    Visibility of recurring requirements allows us to plan raw
                    materials, manufacturing capacity and production schedules
                    in advance, helping minimise avoidable supply interruptions.
                  </p>
                </div>

                {/* ======================================================
                    BENEFIT 4
                ====================================================== */}

                <div
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
                    Reduced Sourcing Uncertainty
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
                    A planned manufacturing relationship can help customers
                    reduce the uncertainty of sourcing suitable polyols
                    whenever availability, lead times or grade-specific
                    requirements become challenging.
                  </p>
                </div>

                {/* ======================================================
                    BENEFIT 5
                ====================================================== */}

                <div
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
                    Consistent, Repeatable Grades
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
                    Once a specialised grade has been developed and validated,
                    production can be organised around agreed specifications
                    and application requirements to support consistency from
                    order to order.
                  </p>
                </div>

                {/* ======================================================
                    BENEFIT 6
                ====================================================== */}

                <div
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
                    Long-Term Manufacturing Partnership
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
                    Our objective is to become a reliable manufacturing
                    partner, supporting customers through grade development,
                    validation and regular supply as their requirements evolve.
                  </p>
                </div>

              </div>
            </div>

            {/* ============================================================
                DEVELOPMENT TO SUPPLY PROCESS
            ============================================================ */}

            <div
              className="
                mt-10
                bg-white
                border
                border-[#d8eeeb]
                rounded-xl
                p-5
                md:p-6
              "
            >

              <h3 className="text-xl font-semibold text-[#1F524F] mb-5">
                From Development to Regular Supply
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-sm">

                <span className="px-3 py-2 rounded-lg bg-[#e8f7f4] text-[#1F524F] font-medium">
                  Technical Discussion
                </span>

                <span className="text-[#42B3A5] font-bold">
                  →
                </span>

                <span className="px-3 py-2 rounded-lg bg-[#e8f7f4] text-[#1F524F] font-medium">
                  Grade Development
                </span>

                <span className="text-[#42B3A5] font-bold">
                  →
                </span>

                <span className="px-3 py-2 rounded-lg bg-[#e8f7f4] text-[#1F524F] font-medium">
                  Sample
                </span>

                <span className="text-[#42B3A5] font-bold">
                  →
                </span>

                <span className="px-3 py-2 rounded-lg bg-[#e8f7f4] text-[#1F524F] font-medium">
                  Customer Trials
                </span>

                <span className="text-[#42B3A5] font-bold">
                  →
                </span>

                <span className="px-3 py-2 rounded-lg bg-[#e8f7f4] text-[#1F524F] font-medium">
                  Validation
                </span>

                <span className="text-[#42B3A5] font-bold">
                  →
                </span>

                <span className="px-3 py-2 rounded-lg bg-[#e8f7f4] text-[#1F524F] font-medium">
                  Regular Requirement
                </span>

                <span className="text-[#42B3A5] font-bold">
                  →
                </span>

                <span className="px-3 py-2 rounded-lg bg-[#1F524F] text-white font-medium">
                  Planned Production
                </span>

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
                Share your application, target properties, PU system, expected
                consumption and other technical requirements with our team.
                We can discuss your requirement, explore suitable formulations,
                develop specialised grades and provide samples for your trials.
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