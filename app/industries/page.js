import Link from "next/link";
import ApplicationsTable from "../../components/ApplicationsTable";

export default function IndustriesPage() {
  return (
    <div className="bg-yellow-50">

      {/* HERO */}
      <section className="py-20 border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Industries & Applications We Support
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Enviol Polytech Solutions provides regenerated polyols
            tailored for industrial sectors seeking sustainable,
            cost-efficient, and domestically sourced materials.
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-20 border-b">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <Link href="/industries/polyurethane">
            <div className="border p-8 rounded-lg transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">
                Polyurethane Manufacturing
              </h3>
              <p className="text-sm leading-relaxed">
                High-quality regenerated polyols tailored for PU system manufacturers.
              </p>
            </div>
          </Link>

          <Link href="/industries/foam-production">
            <div className="border p-8 rounded-lg transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">
                Foam Production
              </h3>
              <p className="text-sm leading-relaxed">
                Sustainable raw materials supporting rigid and flexible foam production.
              </p>
            </div>
          </Link>

          <Link href="/industries/paint-coatings">
            <div className="border p-8 rounded-lg transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">
                Paint & Coatings
              </h3>
              <p className="text-sm leading-relaxed">
                Reliable polyol inputs for industrial and protective coating systems.
              </p>
            </div>
          </Link>

          <Link href="/industries/adhesives">
            <div className="border p-8 rounded-lg transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">
                Adhesives
              </h3>
              <p className="text-sm leading-relaxed">
                Performance-driven solutions for advanced bonding applications.
              </p>
            </div>
          </Link>

          <Link href="/industries/pu-sealents">
            <div className="border p-8 rounded-lg transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">
                Sealants
              </h3>
              <p className="text-sm leading-relaxed">
                Cost-efficient regenerated inputs for durable sealing systems.
              </p>
            </div>
          </Link>

          <Link href="/industries/powder-coating">
            <div className="border p-8 rounded-lg transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">
                Powder Coating
              </h3>
              <p className="text-sm leading-relaxed">
                Supporting circular material innovation in powder coating technologies.
              </p>
            </div>
          </Link>

          <Link href="/industries/elastomers">
            <div className="border p-8 rounded-lg transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">
                Elastomers
              </h3>
              <p className="text-sm leading-relaxed">
                Structured polyol systems for resilient and durable elastomer products.
              </p>
            </div>
          </Link>

          <Link href="/industries/artificial-leather">
            <div className="border p-8 rounded-lg transition-all duration-300 hover:bg-[#55BAAE] hover:text-white hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-3">
                Artificial Leather
              </h3>
              <p className="text-sm leading-relaxed">
                Sustainable material solutions for synthetic leather manufacturing.
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* APPLICATIONS TABLE */}
      <section className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Explore Applications
          </h2>
          <ApplicationsTable />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">
            Partner With Enviol
          </h2>
          <p className="mb-8">
            Join us in building a circular polymer economy and
            strengthening India’s industrial self-reliance.
          </p>
          <Link
            href="/contact"
            className="bg-[#55BAAE] text-white px-8 py-3 rounded font-semibold"
          >
            Request Technical Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}