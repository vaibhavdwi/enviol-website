import Link from "next/link";
import products from "../../data/products.json";

import AnimatedHeading from "@/components/AnimatedHeading";

export default function ProductsPage() {
  return (
    <main className="bg-yellow-50 min-h-screen">

      <div className="container mx-auto px-6 py-12 pt-20 pb-12">

        <AnimatedHeading title="Our Products" />

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white p-6 shadow rounded-xl transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer group"
            >

              {/* Category */}
              <div className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-[#42b3a5]/10 text-[#42b3a5] group-hover:bg-white/20 group-hover:text-white transition mb-4">
                {product.category}
              </div>

              {/* Product Code */}
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white transition">
                {product.product_code}
              </h3>

              {/* Product Name */}
              <h4 className="text-lg font-semibold text-[#42b3a5] group-hover:text-[#d8fff8] mt-2 transition">
                {product.product_name}
              </h4>

              {/* Description */}
              <p className="my-4 text-gray-600 group-hover:text-white/90 transition leading-relaxed">
                {product.short_description || product.description}
              </p>

              {/* Product Family + TDS */}
              <div className="flex flex-wrap gap-2 mb-5">

                {product.product_family && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 group-hover:bg-white/20 group-hover:text-white transition">
                    {product.product_family}
                  </span>
                )}

                {product.tds_file && (
                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 group-hover:bg-[#b6ff7a]/20 group-hover:text-[#e8ffd2] transition">
                    TDS Available
                  </span>
                )}

              </div>

              {/* Button */}
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center font-semibold text-[#42b3a5] group-hover:text-white transition"
              >
                View Details →
              </Link>

            </div>
          ))}
        </div>

        {/* R&D NOTICE */}
        <div className="mt-16 bg-yellow-100 border border-yellow-300 p-6 rounded-lg">

          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Note: Currently Under R&D Phase
          </h3>

          <p className="text-gray-700">
            Our products are currently in the Research & Development phase.
            We are not accepting or processing commercial orders at this time.
            However, we welcome your technical queries and partnership discussions.
          </p>

        </div>

      </div>

    </main>
  );
}