import Image from "next/image";

export default function Sustainability() {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="py-20 border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Enabling India’s Circular Polymer Economy
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Transforming polymer waste into structured industrial value,
            aligned with India’s sustainability and self-reliance goals.
          </p>
        </div>
      </section>

      {/* CIRCULAR MODEL */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Circular Economy Model
            </h2>
            <p className="mb-4">
              Our operating model reintroduces polymer waste into productive
              manufacturing cycles, reducing landfill pressure and conserving
              non-renewable crude resources.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Waste Collection</li>
              <li>Scientific Processing</li>
              <li>Polymer Regeneration</li>
              <li>Industrial Reapplication</li>
            </ul>
          </div>

          {/* Image Placeholder */}
          <div className="relative h-80 w-full">
  <Image
    src="/images/economy.jpg"
    alt="Circular Economy Model"
    fill
    className="object-cover rounded"
  />
</div>

        </div>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Environmental Responsibility
          </h2>
          <p className="max-w-4xl mx-auto text-center">
            With a target capacity of 30 Tons per day recycling,
            Enviol contributes toward reducing landfill accumulation,
            minimizing uncontrolled burning, and lowering carbon intensity
            associated with virgin polymer production.
          </p>
        </div>
      </section>

      {/* MAKE IN INDIA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">
            Make in India Commitment
          </h2>
          <p>
            Enviol actively supports national self-reliance by reducing
            import dependency, strengthening domestic supply chains,
            and promoting industrial sustainability through material regeneration.
          </p>
        </div>
      </section>

      {/* INDUSTRY PARTNERSHIP */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-6">
            Industry Partnership Model
          </h2>
          <p className="max-w-4xl mx-auto">
            Industries may utilize their internal waste streams or provide
            them to Enviol for regeneration into high-quality recycled
            polyols, enabling closed-loop manufacturing at competitive
            cost structures.
          </p>
        </div>
      </section>

    </div>
  );
}
