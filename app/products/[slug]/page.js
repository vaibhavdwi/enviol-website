import { products } from "../../../data/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export default function ProductDetail({ params }) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) notFound();

  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
      <p className="mb-6">{product.description}</p>
      <a href={product.tds} className="bg-primary text-white px-6 py-3 rounded">
        Download TDS
      </a>
    </section>
  );
}