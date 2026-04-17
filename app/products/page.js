import Link from "next/link";
import { products } from "../../data/products";
import AnimatedHeading from "@/components/AnimatedHeading";
export default function ProductsPage() {
  return (
    <main className="bg-yellow-50 min-h-screen">
      
      <div className="container mx-auto px-6 py-12">
        
        
          <AnimatedHeading title="Our Products"/>
        

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 shadow rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>

              <p className="my-4 text-gray-600">
                {product.description}
              </p>

              <Link
                href={`/products/${product.slug}`}
                className="text-blue-600 font-semibold hover:underline"
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