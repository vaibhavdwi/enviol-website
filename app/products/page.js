import Link from "next/link";
import { products } from "../../data/products";

export default function ProductsPage() {
  return (
    <section className="bg-yellow-50">
      <h1 className="text-4xl font-bold mb-10">Our Products</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="my-4">{product.description}</p>
            <Link href={`/products/${product.slug}`} className="text-primary font-semibold">
              View Details →
            </Link>
          </div>
        ))}
      </div>
	  
	  {/* R&D NOTICE */}
<div className="mt-16 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
    Note: Currently Under R&D Phase
  </h3>
  <p className="text-gray-700">
    Our products are currently in the Research & Development phase. 
    We are not accepting or processing commercial orders at this time. 
    However, we welcome your technical queries and partnership discussions.
  </p>
</div>
    </section>
	
  );
}