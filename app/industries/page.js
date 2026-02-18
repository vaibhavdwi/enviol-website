export default function Industries() {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="py-20 border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Industries We Serve
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Enviol Polytech Solutions provides regenerated polyols
            tailored for industrial sectors seeking sustainable,
            cost-efficient, and domestically sourced materials.
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div className="border p-8">
            <h3 className="text-xl font-semibold mb-4">
              Coatings Industry
            </h3>
            <p>
              Sustainable polyol inputs for industrial and protective coatings.
            </p>
          </div>

          <div className="border p-8">
            <h3 className="text-xl font-semibold mb-4">
              Adhesives Manufacturers
            </h3>
            <p>
              High-performance regenerated polyols for bonding applications.
            </p>
          </div>

          <div className="border p-8">
            <h3 className="text-xl font-semibold mb-4">
              Sealant Producers
            </h3>
            <p>
              Reliable and cost-efficient raw material alternatives.
            </p>
          </div>

          <div className="border p-8">
            <h3 className="text-xl font-semibold mb-4">
              Elastomer Applications
            </h3>
            <p>
              Structured polyol solutions for durable elastomer systems.
            </p>
          </div>

          <div className="border p-8">
            <h3 className="text-xl font-semibold mb-4">
              Footwear Industry
            </h3>
            <p>
              Future integration of PU sole and rubber scrap regeneration.
            </p>
          </div>

          <div className="border p-8">
            <h3 className="text-xl font-semibold mb-4">
              Packaging & PET Recycling
            </h3>
            <p>
              Circular material solutions supporting polymer reuse initiatives.
            </p>
          </div>

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
          <a
            href="/contact"
            className="bg-[#42b3a5] text-white px-8 py-3 rounded font-semibold"
          >
            Request Technical Consultation
          </a>
        </div>
      </section>

    </div>
  );
}
