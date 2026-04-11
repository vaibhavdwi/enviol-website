import Image from "next/image";
import SustainabilityWasteCards from "../../components/SustainabilityWasteCards";

export const metadata = {
  title:
    "Sustainability & Circular Economy in Polyols | Enviol Green Chemical Manufacturing",

  description:
    "Enviol promotes circular economy and sustainable chemical manufacturing by converting polymer waste into high-performance polyester and polyether polyols. Supporting ESG goals, Make in India initiative, and global green industrial transformation.",

  keywords: [
    "sustainable polyol manufacturer",
    "circular economy chemical industry",
    "green polyurethane raw materials",
    "recycled polyester polyol",
    "ESG compliant chemical manufacturing",
    "waste to polyol recycling",
    "plastic waste chemical recycling India",
    "low carbon polyol production",
    "Make in India sustainability",
    "eco friendly polyol supplier"
  ],

  alternates: {
    canonical: "https://enviol.com/sustainability",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Sustainability() {
  return (
    <div className="bg-yellow-50">

      {/* HERO */}
      <section className="py-20 border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Driving Circular Economy in Sustainable Polyol Manufacturing
          </h1>

          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            Enviol transforms polymer waste into high-performance polyester and polyether polyols, enabling ESG-compliant manufacturing and supporting global sustainability goals across coatings, adhesives, sealants, elastomers, and polyurethane foam systems.
          </p>

        </div>
      </section>

      {/* CIRCULAR MODEL */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Circular Economy Model in Chemical Manufacturing
            </h2>

            <p className="mb-4 text-gray-700">
              Our circular economy model integrates polymer waste recovery into industrial manufacturing cycles, reducing dependency on virgin petrochemical resources and enabling sustainable production of polyols for polyurethane applications.
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Waste Collection & Segregation of PET & PU materials</li>
              <li>Controlled Chemical Recycling & Depolymerization</li>
              <li>Polyol Regeneration with Consistent OH Value</li>
              <li>Industrial Reapplication in CASE Industries</li>
              <li>Closed-loop Manufacturing Ecosystem</li>
            </ul>
          </div>

          <div className="relative h-80 w-full">
            <Image
              src="/images/economy.jpg"
              alt="Circular economy model for polymer recycling into polyols"
              fill
              className="object-cover rounded"
            />
          </div>

        </div>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-semibold mb-6">
            Environmental Impact & Carbon Reduction
          </h2>

          <p className="max-w-4xl mx-auto text-gray-700">
            With a target capacity of 30 tons per day, Enviol reduces landfill accumulation, prevents uncontrolled polymer burning, and significantly lowers carbon emissions by replacing virgin petrochemical-based polyols with recycled alternatives. This supports global ESG frameworks and sustainable industrial transformation.
          </p>

        </div>
      </section>

      {/* LOW VOC */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-semibold mb-6">
            Low VOC & Environmental Compliance in Polyol Production
          </h2>

          <p className="max-w-4xl mx-auto text-gray-700">
            Enviol’s recycled polyester and polyether polyols support low VOC formulations in polyurethane systems, helping industries meet global environmental regulations, reduce emissions, and improve sustainability performance across coatings, adhesives, sealants, elastomers, and foam applications.
          </p>

        </div>
      </section>

      {/* WASTE + POLLUTION */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-semibold mb-6">
            Waste Reduction & Pollution Control Through Chemical Recycling
          </h2>

          <p className="max-w-4xl mx-auto mb-10 text-gray-700">
            Polymer waste, especially PET and polyurethane materials, contributes significantly to landfill accumulation, plastic pollution, and environmental degradation when not properly managed. Enviol’s chemical recycling approach converts this waste into high-value polyols, preventing disposal in landfills and reducing environmental burden.
          </p>

          <SustainabilityWasteCards />

        </div>
      </section>

      {/* MAKE IN INDIA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Make in India & Industrial Self-Reliance
            </h2>

            <p className="text-gray-700">
              Enviol actively supports India’s Make in India initiative by reducing import dependency on petrochemical raw materials and strengthening domestic chemical manufacturing through circular economy innovation and sustainable industrial practices.
            </p>
          </div>

          <div className="relative h-80 w-full rounded overflow-hidden shadow-lg bg-yellow-50 flex items-center justify-center">
            <Image
              src="/images/make-in-india.jpg"
              alt="Make in India sustainability initiative"
              fill
              className="object-contain p-6"
            />
          </div>

        </div>
      </section>

      {/* INDUSTRY PARTNERSHIP */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-semibold mb-6">
            Closed-Loop Industry Partnership Model
          </h2>

          <p className="max-w-4xl mx-auto text-gray-700">
            Industries can collaborate with Enviol by supplying polymer waste streams, which are chemically recycled into high-performance polyols. This closed-loop system enables cost efficiency, sustainability, and ESG compliance across global manufacturing supply chains.
          </p>

        </div>
      </section>

    </div>
  );
}