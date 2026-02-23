import { products } from "../../../data/products";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ProductDetail({ params }) {
  const { slug } = await params;

  const product = products.find(
    (p) => p.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">

      {/* HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>
        </div>

        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-lg shadow"
          />
        )}
      </div>

      {/* APPLICATIONS */}
      {product.applications && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Applications
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {product.applications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* TECHNICAL SPECIFICATIONS */}
      {product.specifications && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Technical Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Property</th>
                  <th className="p-3 text-left">Test Condition</th>
                  <th className="p-3 text-left">Value</th>
                  <th className="p-3 text-left">Unit</th>
                  <th className="p-3 text-left">Standard</th>
                </tr>
              </thead>
              <tbody>
                {product.specifications.map((spec, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{spec.property}</td>
                    <td className="p-3">{spec.testCondition || "-"}</td>
                    <td className="p-3">{spec.value}</td>
                    <td className="p-3">{spec.unit || "-"}</td>
                    <td className="p-3">{spec.standard || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COMPATIBILITY */}
      {product.compatibility && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Compatibility
          </h2>
          <p>{product.compatibility}</p>
        </div>
      )}

      {/* STORAGE */}
      {product.storage && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Storage
          </h2>
          <p>{product.storage}</p>
        </div>
      )}

      {/* SOLUBILITY */}
      {product.solubility && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Solubility
          </h2>
          <p>{product.solubility}</p>
        </div>
      )}

      {/* DOWNLOAD TDS */}
{product.tds && (
  <div className="mt-10">
    <a
      href={product.tds}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary text-white px-6 py-3 rounded hover:opacity-90 transition inline-block"
    >
      Download Technical Data Sheet
    </a>
  </div>
)}

    </section>
  );
}