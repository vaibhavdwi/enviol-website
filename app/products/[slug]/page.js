import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }) {

  const { slug } = await params;

  const product = products.find(
    (p) => p.slug === slug
  );

  if (!product) {
    return {
      title: "Product Not Found | ENVIOL",
    };
  }

  return {
    title: `${product.product_code} | ${product.product_name} | ENVIOL`,

    description:
      product.short_description || product.description,
  };
}

export default async function ProductPage({ params }) {
	const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (p) =>
      p.category === product.category &&
      p.slug !== product.slug
  );

  return (
    <main className="bg-yellow-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#42b3a5] transition">
            Home
          </Link>

          <span>/</span>

          <Link
            href="/products"
            className="hover:text-[#42b3a5] transition"
          >
            Products
          </Link>

          <span>/</span>

          <span className="text-[#42b3a5] font-medium">
            {product.product_name}
          </span>
        </div>

        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Product Image */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.product_name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Content */}
          <div>

            {/* Category */}
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#42b3a5]/10 text-[#42b3a5] text-sm font-semibold mb-5">
              {product.category}
            </div>

            {/* Product Code */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {product.product_code}
            </h1>

            {/* Product Name */}
            <h2 className="text-2xl md:text-3xl font-semibold text-[#42b3a5] mt-3">
              {product.product_name}
            </h2>

            {/* Description */}
            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Features */}
            {product.features && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 text-gray-700"
                    >
                      ✓ {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

  {/* Enquire Now */}
  <Link
    href="/guest/enquire"
    className="px-6 py-3 rounded-xl bg-[#42b3a5] hover:bg-[#36998d] text-white font-semibold transition shadow-lg"
  >
    Enquire Now
  </Link>

  {/* Order Now */}
  <Link
    href="/guest/quick-order"
    className="px-6 py-3 rounded-xl border border-[#42b3a5] text-[#42b3a5] hover:bg-[#42b3a5] hover:text-white font-semibold transition"
  >
    Order Now
  </Link>

</div>
          </div>
        </div>

        {/* Applications */}
        {product.applications && (
          <section className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Applications
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.applications.map((application, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="text-[#42b3a5] font-semibold text-lg">
                    {application}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Data */}
        {product.technical_data && (
          <section className="mt-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Technical Data
            </h3>

            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#42b3a5] text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      Property
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Value
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(product.technical_data).map(
                    ([key, value], index) => (
                      <tr
                        key={key}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 font-medium text-gray-800 capitalize">
                          {key.replaceAll("_", " ")}
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          {value}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
		{product.tds_file && (

  <div className="mt-6">

    <a
      href={product.tds_file}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-5 py-3 rounded-xl bg-[#1f2937] hover:bg-[#111827] text-white font-semibold transition shadow-lg"
    >
      Download Technical Data Sheet
    </a>

  </div>
)}

        {/* Compatibility & Storage */}
        <section className="mt-20 grid lg:grid-cols-2 gap-8">

          {product.compatibility && (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Compatibility
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {product.compatibility}
              </p>
            </div>
          )}

          {product.storage && (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Storage Guidelines
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {product.storage}
              </p>
            </div>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h3 className="text-3xl font-bold text-gray-900 mb-10">
              Related Products
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
                >
                  <div className="relative h-56 w-full bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">

                    <div className="text-xs font-semibold text-[#42b3a5] uppercase tracking-wide mb-2">
                      {item.category}
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 leading-snug">
                      {item.product_code}
                    </h4>

                    <p className="text-[#42b3a5] font-medium mt-2">
                      {item.product_name}
                    </p>

                    <p className="mt-4 text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {item.short_description}
                    </p>

                    <Link
                      href={`/products/${item.slug}`}
                      className="inline-flex items-center mt-6 font-semibold text-[#42b3a5] hover:text-[#2d8e83] transition"
                    >
                      View Product →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
