import Image from "next/image";

export const metadata = {
  title:
    "Polyester Polyols & PU Systems for Artificial Leather | Enviol Polytech Solutions",
  description:
    "Enviol Polytech Solutions provides sustainable polyester and polyether polyols along with customized PU resin systems for artificial leather manufacturing. Supporting wet process, dry process and microfiber PU production lines.",
  keywords: [
    "polyester polyol for artificial leather",
    "PU synthetic leather raw materials",
    "polyurethane system supplier",
    "wet process PU leather",
    "dry process PU leather",
    "microfiber synthetic leather",
    "PU resin for artificial leather",
    "Enviol Polytech Solutions"
  ],
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Polyester Polyols & PU Systems for Artificial Leather
      </h1>

      {/* Brand Positioned Introduction */}
      <p className="mb-6 text-lg">
        <strong>Enviol Polytech Solutions</strong> provides sustainable polyester
        and polyether polyols optimized for artificial leather production. Our
        materials are engineered to support wet process, dry process, and
        microfiber PU manufacturing lines with controlled viscosity, consistent
        molecular weight distribution, and enhanced hydrolysis resistance. By
        combining advanced polyester chemistry with customized polyurethane
        resin systems, we enable artificial leather manufacturers to achieve
        superior abrasion resistance, soft-touch performance, durability, and
        long-term stability across footwear, automotive, furniture, and fashion
        applications.
      </p>

      {/* Wet Process Section */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Wet Process PU Leather (DMF Coagulation)
        </h2>

        <Image
          src="/images/wet-process-pu-leather.jpg"
          alt="Wet process polyurethane synthetic leather manufacturing line"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Wet process PU leather is produced by dissolving PU resin in DMF and
          coagulating in a water bath to form a microporous structure. Polyester
          polyols are widely selected due to their superior mechanical strength,
          strong grain adhesion, and excellent abrasion resistance.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Preferred Polyol:</strong> Linear polyester, medium molecular weight</li>
          <li><strong>Performance Focus:</strong> Tear strength, surface durability</li>
          <li><strong>Industries:</strong> Footwear uppers, upholstery, industrial fabrics</li>
        </ul>
      </section>

      {/* Dry Process Section */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Dry Process PU Leather
        </h2>

        <Image
          src="/images/dry-process-pu-leather.jpg"
          alt="Dry process polyurethane artificial leather coating line"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Dry process systems involve direct coating of PU resin onto release
          paper or textile substrates followed by thermal curing. Balanced
          molecular weight polyester polyols provide improved surface hardness,
          scratch resistance, and controlled gloss levels.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Polyol Type:</strong> Polyester with optimized OH value</li>
          <li><strong>Key Properties:</strong> Abrasion resistance, grain definition</li>
          <li><strong>Applications:</strong> Bags, fashion leather, decorative laminates</li>
        </ul>
      </section>

      {/* Microfiber Section */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Microfiber PU Leather Systems
        </h2>

        <Image
          src="/images/microfiber-pu-leather.jpg"
          alt="Microfiber polyurethane synthetic leather structure"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Microfiber synthetic leather requires uniform pore formation,
          excellent flex crack resistance, and long-term hydrolysis stability.
          Polyester polyols ensure high mechanical integrity, while polyether
          segments may be introduced to enhance moisture resistance in demanding
          environments such as automotive interiors.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Key Requirements:</strong> Flex resistance, tear strength, softness</li>
          <li><strong>Industries:</strong> Automotive seating, premium upholstery</li>
        </ul>
      </section>

      {/* PU System Capability */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Customized PU Resin Systems for Production Lines
        </h2>

        <p>
          In addition to polyester polyol manufacturing, Enviol Polytech
          Solutions supplies customized PU resin systems tailored to artificial
          leather production parameters. Our systems are designed to ensure
          viscosity stability, controlled reactivity, and consistent film
          formation in continuous coating lines.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Hydrolysis-resistant grades for humid environments</li>
          <li>Soft-touch and high-elasticity formulations</li>
          <li>High abrasion and scratch-resistant systems</li>
          <li>UV-stable aliphatic systems (HDI/IPDI based)</li>
          <li>Automotive-compliant interior grades</li>
        </ul>
      </section>

      {/* Polyester vs Polyether */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Polyester vs Polyether Selection in Artificial Leather
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Polyester Polyols:</strong> Higher mechanical strength, superior abrasion resistance, better solvent stability.</li>
          <li><strong>Polyether Polyols:</strong> Enhanced hydrolysis resistance and low-temperature flexibility.</li>
          <li><strong>Aromatic Systems (MDI/TDI):</strong> Cost-effective and mechanically robust.</li>
          <li><strong>Aliphatic Systems (HDI/IPDI):</strong> UV stable and non-yellowing for premium segments.</li>
        </ul>
      </section>

    </main>
  );
}