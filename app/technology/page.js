import Image from "next/image";

export default function Technology() {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO SECTION */}
      <section className="py-20 border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Advanced Polymer Regeneration Technology
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Enviol Polytech Solutions leverages structured scientific processes
            to convert polymer waste into high-performance polyols,
            strengthening India’s material independence.
          </p>
        </div>
      </section>

      {/* TECHNOLOGICAL FRAMEWORK */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Technological Framework
            </h2>
            <p className="mb-4">
              Our core process focuses on structured polymer regeneration
              through controlled chemical conversion systems.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>PET Waste Processing</li>
              <li>PU Foam & Thermocol Recycling</li>
              <li>Future: Carry Bags, PU Soles, Rubber Scrap</li>
              <li>Depolymerization & Molecular Restructuring</li>
              <li>CASE Application Integration</li>
            </ul>
          </div>

          {/* Image Placeholder */}
          <div className="relative h-80 w-full">
  <Image
    src="/images/technology-use.jpg"
    alt="Polymer Regeneration Process"
    fill
    className="object-cover rounded"
  />
</div>
        </div>
      </section>

      {/* R&D SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Research & Technical Validation
          </h2>
          <p className="max-w-4xl mx-auto text-center">
            Enviol operates an in-house R&D laboratory focused on feedstock
            characterization, reaction optimization, and formulation
            refinement. External certified agencies validate material
            performance and ensure transparency and compliance.
          </p>
        </div>
      </section>

      {/* MANUFACTURING ROADMAP */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">
            Manufacturing Roadmap
          </h2>
          <p>
            Currently in pilot phase, Enviol is developing infrastructure
            targeted toward achieving a recycling capacity of 30 Tons per day.
            Our facility is being designed for scalability, quality control,
            and operational efficiency.
          </p>
        </div>
      </section>

      {/* STRATEGIC ADVANTAGES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Strategic Advantages
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="border p-6">
              <h3 className="font-semibold mb-2">Import Substitution</h3>
              <p>Reducing reliance on crude-oil-derived and imported polyols.</p>
            </div>

            <div className="border p-6">
              <h3 className="font-semibold mb-2">Circular Production</h3>
              <p>Converting waste polymers into reusable industrial inputs.</p>
            </div>

            <div className="border p-6">
              <h3 className="font-semibold mb-2">Cost Efficiency</h3>
              <p>Providing competitive, high-quality recycled alternatives.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
