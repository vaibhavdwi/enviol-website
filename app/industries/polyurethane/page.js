import Image from "next/image";

export const metadata = {
  title:
    "Polyurethane Systems & Polyol Technology | Enviol Polytech Solutions",
  description:
    "Enviol Polytech Solutions manufactures polyester and polyether polyols and develops advanced polyurethane systems for foam, coatings, adhesives, elastomers and industrial applications.",
  keywords: [
    "polyurethane systems",
    "polyester polyol manufacturer",
    "polyether polyol supplier",
    "PU system house",
    "rigid polyurethane",
    "flexible polyurethane",
    "industrial polyurethane applications"
  ],
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">

      <h1 className="text-3xl font-bold mb-6">
        Advanced Polyurethane Technology Platform
      </h1>

      <p className="mb-6 text-lg">
        <strong>Enviol Polytech Solutions</strong> is a manufacturer of
        polyester and polyether polyols and a technology partner in
        the development of advanced polyurethane (PU) systems for
        foam, coatings, adhesives, elastomers and specialty applications.
      </p>

      {/* What is PU */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          What is Polyurethane?
        </h2>

        <Image
          src="/images/polyurethane-reaction.jpg"
          alt="Polyurethane reaction between polyol and isocyanate"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Polyurethane is formed by the reaction between a polyol
          (polyester or polyether based) and an isocyanate (MDI, TDI,
          HDI, IPDI or derivatives). By modifying functionality,
          molecular weight and backbone chemistry, a wide range of
          materials can be produced — from soft flexible foam to
          rigid structural insulation and high-performance coatings.
        </p>
      </section>

      {/* Polyester vs Polyether */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Polyester vs Polyether Polyols
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Polyester Polyols:</strong> Higher mechanical strength, chemical resistance and abrasion resistance.</li>
          <li><strong>Polyether Polyols:</strong> Improved flexibility, hydrolysis resistance and low-temperature performance.</li>
          <li><strong>OH Value & Functionality:</strong> Determines crosslink density and final mechanical properties.</li>
        </ul>
      </section>

      {/* PU Classification */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Polyurethane Classification
        </h2>

        <ul className="list-disc pl-6 space-y-4">
          <li>
            <strong>Flexible Polyurethane:</strong> Used in mattresses,
            furniture cushioning and automotive seating.
          </li>
          <li>
            <strong>Rigid Polyurethane:</strong> High insulation systems
            for refrigeration, construction panels and industrial insulation.
          </li>
          <li>
            <strong>Elastomer Systems:</strong> High load-bearing and
            abrasion-resistant components.
          </li>
          <li>
            <strong>Coating & Adhesive Systems:</strong> Protective,
            decorative and bonding applications.
          </li>
          <li>
            <strong>Thermoplastic Polyurethane (TPU):</strong>
            Melt-processable elastomeric systems.
          </li>
        </ul>
      </section>

      {/* Aromatic vs Aliphatic */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Aromatic vs Aliphatic Systems
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Aromatic Isocyanates (MDI/TDI):</strong> Cost-effective, high mechanical strength systems.</li>
          <li><strong>Aliphatic Isocyanates (HDI/IPDI):</strong> Superior UV stability and color retention.</li>
        </ul>
      </section>
	  <section>
	  {/* Polyester Polyols Table */}
  <h3 className="text-2xl font-semibold mb-4">
    Polyester Polyol Grades
  </h3>

  <div className="overflow-x-auto mb-16">
    <table className="min-w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Grade Type</th>
          <th className="border px-4 py-2">Functionality</th>
          <th className="border px-4 py-2">OH Value (mg KOH/g)</th>
          <th className="border px-4 py-2">MW Range</th>
          <th className="border px-4 py-2">Key Characteristics</th>
          <th className="border px-4 py-2">Typical Applications</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Linear Low MW Polyester</td>
          <td className="border px-4 py-2">2</td>
          <td className="border px-4 py-2">150–300</td>
          <td className="border px-4 py-2">400–1000</td>
          <td className="border px-4 py-2">High hardness, fast cure</td>
          <td className="border px-4 py-2">Adhesives, coatings</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Medium MW Polyester</td>
          <td className="border px-4 py-2">2</td>
          <td className="border px-4 py-2">50–150</td>
          <td className="border px-4 py-2">1000–3000</td>
          <td className="border px-4 py-2">Balanced strength & flexibility</td>
          <td className="border px-4 py-2">Sealants, elastomers</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">High MW Polyester</td>
          <td className="border px-4 py-2">2</td>
          <td className="border px-4 py-2">20–50</td>
          <td className="border px-4 py-2">3000–5000</td>
          <td className="border px-4 py-2">Flexibility, impact resistance</td>
          <td className="border px-4 py-2">Artificial leather, elastomers</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Branched Polyester</td>
          <td className="border px-4 py-2">3–4</td>
          <td className="border px-4 py-2">200–450</td>
          <td className="border px-4 py-2">300–800</td>
          <td className="border px-4 py-2">High crosslink density</td>
          <td className="border px-4 py-2">Rigid foam, coatings</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Aromatic Polyester</td>
          <td className="border px-4 py-2">2–3</td>
          <td className="border px-4 py-2">200–400</td>
          <td className="border px-4 py-2">400–1500</td>
          <td className="border px-4 py-2">Thermal stability</td>
          <td className="border px-4 py-2">Rigid insulation systems</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Saturated Polyester Resin</td>
          <td className="border px-4 py-2">2–3</td>
          <td className="border px-4 py-2">Acid Value 25–60</td>
          <td className="border px-4 py-2">2000–6000</td>
          <td className="border px-4 py-2">UV durability, flow control</td>
          <td className="border px-4 py-2">Powder & coil coatings</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Polyether Polyols Table */}
  <h3 className="text-2xl font-semibold mb-4">
    Polyether Polyol Grades
  </h3>

  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">Grade Type</th>
          <th className="border px-4 py-2">Functionality</th>
          <th className="border px-4 py-2">OH Value (mg KOH/g)</th>
          <th className="border px-4 py-2">MW Range</th>
          <th className="border px-4 py-2">Key Characteristics</th>
          <th className="border px-4 py-2">Typical Applications</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Flexible Foam Polyether</td>
          <td className="border px-4 py-2">3</td>
          <td className="border px-4 py-2">25–60</td>
          <td className="border px-4 py-2">3000–6000</td>
          <td className="border px-4 py-2">Softness, resilience</td>
          <td className="border px-4 py-2">Mattress foam</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">High Resilience (HR)</td>
          <td className="border px-4 py-2">3</td>
          <td className="border px-4 py-2">25–40</td>
          <td className="border px-4 py-2">4500–6500</td>
          <td className="border px-4 py-2">Improved rebound</td>
          <td className="border px-4 py-2">Premium mattresses</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Rigid Foam Polyether</td>
          <td className="border px-4 py-2">3–8</td>
          <td className="border px-4 py-2">300–800</td>
          <td className="border px-4 py-2">300–700</td>
          <td className="border px-4 py-2">High crosslink density</td>
          <td className="border px-4 py-2">Insulation panels</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">CASE Polyether</td>
          <td className="border px-4 py-2">2–3</td>
          <td className="border px-4 py-2">50–200</td>
          <td className="border px-4 py-2">1000–4000</td>
          <td className="border px-4 py-2">Flexibility & toughness</td>
          <td className="border px-4 py-2">Adhesives, sealants</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Graft Polyol (POP)</td>
          <td className="border px-4 py-2">3</td>
          <td className="border px-4 py-2">20–35</td>
          <td className="border px-4 py-2">4000–6000</td>
          <td className="border px-4 py-2">Load-bearing improvement</td>
          <td className="border px-4 py-2">HR foam</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">PTMG / Low MW Diol</td>
          <td className="border px-4 py-2">2</td>
          <td className="border px-4 py-2">50–120</td>
          <td className="border px-4 py-2">1000–2000</td>
          <td className="border px-4 py-2">High elasticity</td>
          <td className="border px-4 py-2">PU elastomers</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

      {/* System Capability */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Integrated Polyurethane System Capability
        </h2>

        <p>
          With deep expertise in polyester and polyether chemistry,
          Enviol Polytech Solutions can engineer customized polyurethane
          systems tailored for industrial processing requirements,
          mechanical performance and environmental compliance.
        </p>

        <p className="mt-4">
          Our technology platform supports applications across foam,
          coatings, adhesives, sealants, elastomers and powder systems,
          making us a comprehensive partner in polyurethane development.
        </p>
      </section>

    </main>
  );
}