import Image from "next/image";

export const metadata = {
  title:
    "Polyurethane Elastomers | Polyester Polyols for Cast & TPU Systems | Enviol Polytech Solutions",
  description:
    "Enviol Polytech Solutions supplies polyester polyols and customized PU systems for cast elastomers, TPU and industrial polyurethane elastomer applications requiring high strength, abrasion resistance and durability.",
  keywords: [
    "polyurethane elastomers",
    "polyester polyol for elastomers",
    "PU cast elastomer",
    "thermoplastic polyurethane TPU",
    "MDI elastomer system",
    "industrial polyurethane elastomer",
    "Enviol Polytech Solutions"
  ],
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">
        Polyester Polyols for Polyurethane Elastomers
      </h1>

      <p className="mb-6 text-lg">
        <strong>Enviol Polytech Solutions</strong> provides high-performance
        polyester polyols and customized PU systems engineered for polyurethane
        elastomer applications. Our materials are designed to deliver superior
        tensile strength, abrasion resistance, load-bearing capacity and
        long-term durability across industrial environments.
      </p>

      {/* Cast Elastomers */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Cast Polyurethane Elastomers (MDI Based)
        </h2>

        <Image
          src="/images/cast-pu-elastomer.jpg"
          alt="Cast polyurethane elastomer industrial component"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Cast elastomers are typically formulated using polyester polyols
          reacted with MDI or prepolymer systems. Polyester chemistry enhances
          hardness, tear strength, and resistance to oils and solvents.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Preferred Polyol:</strong> Polyester, medium to high molecular weight</li>
          <li><strong>Key Properties:</strong> High tensile strength, abrasion resistance</li>
          <li><strong>Applications:</strong> Rollers, wheels, industrial liners, seals</li>
        </ul>
      </section>

      {/* TPU */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Thermoplastic Polyurethane (TPU)
        </h2>

        <Image
          src="/images/tpu-elastomer-granules.jpg"
          alt="Thermoplastic polyurethane TPU granules"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          TPU systems based on polyester polyols provide enhanced mechanical
          strength and wear resistance compared to polyether grades. They are
          widely used where high dynamic performance and surface durability are
          required.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Polyol Type:</strong> Linear polyester</li>
          <li><strong>Performance Focus:</strong> Abrasion resistance, load capacity</li>
          <li><strong>Applications:</strong> Cables, footwear soles, films, hoses</li>
        </ul>
      </section>

      {/* Selection Guide */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Polyester vs Polyether in Elastomers
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Polyester Polyols:</strong> Higher mechanical strength, better oil and solvent resistance.</li>
          <li><strong>Polyether Polyols:</strong> Improved hydrolysis resistance and low-temperature flexibility.</li>
          <li><strong>Aromatic Systems (MDI):</strong> High strength and cost efficiency.</li>
          <li><strong>Aliphatic Systems:</strong> UV-stable specialty elastomers.</li>
        </ul>
      </section>

    </main>
  );
}