import products from "@/data/products.json";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {

  const { slug } = await params;

  const product = products.find(
    (p) => p.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="p-20">

      <h1 className="text-4xl font-bold">
        {product.product_code}
      </h1>

      <h2 className="text-2xl mt-4 text-[#42b3a5]">
        {product.product_name}
      </h2>

    </div>
  );
}