import Link from "next/link";
import { products } from "../../data/products";

export default function ProductsPage() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
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
    </section>
  );
}