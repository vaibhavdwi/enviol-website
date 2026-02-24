import Image from "next/image";

export const metadata = {
  title:
    "PU Adhesives for Industrial Manufacturing | Polyester & Polyether Polyols",
  description:
    "Technical overview of polyurethane adhesive systems including 1K, 2K, solvent-based, PUD and reactive hot melt (PUR). Learn how polyester and polyether polyols are selected for high-performance adhesive formulations.",
  keywords: [
    "PU adhesives",
    "polyurethane adhesive systems",
    "polyester polyol for adhesives",
    "polyether polyol adhesive",
    "MDI adhesive",
    "TDI polyurethane adhesive",
    "reactive hot melt PUR",
    "water based PU dispersion",
    "industrial adhesive manufacturer"
  ],
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12">
	<p className="mb-6 text-lg">
  <strong>Enviol Polytech Solutions</strong> provides advanced polyester and 
  polyether polyols tailored for industrial polyurethane adhesive manufacturing. 
  Our chemistry supports optimized NCO/OH balance, controlled molecular weight 
  distribution, and enhanced adhesion performance in MDI, TDI and aliphatic 
  isocyanate-based systems used across construction, automotive, footwear and 
  lamination industries.
</p>
      <h1 className="text-3xl font-bold mb-6">
        Polyurethane (PU) Adhesive Systems & Polyol Selection
      </h1>

      <p className="mb-6 text-lg">
        Polyurethane (PU) adhesives are produced by reacting polyester or
        polyether polyols with diisocyanates such as MDI, TDI, HDI or IPDI.
        Polyol structure, molecular weight, and OH value determine crosslink
        density, green strength, flexibility, hydrolysis resistance and long-term
        adhesion performance. Below is a formulation-focused overview tailored
        for industrial adhesive manufacturers.
      </p>

      {/* 1K Moisture Cure */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          1K Moisture-Curing PU Adhesives (MDI / pMDI Based)
        </h2>

        <Image
          src="/images/1k-pu-adhesive-application.jpg"
          alt="One component polyurethane adhesive used in wooden flooring installation"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          One-component PU adhesives are NCO-terminated prepolymers typically
          derived from medium molecular weight polyester polyols reacted with
          MDI or polymeric MDI. Upon exposure to atmospheric moisture,
          progressive curing increases crosslink density.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Preferred Polyol:</strong> Polyester, medium MW, moderate OH value</li>
          <li><strong>Why Polyester:</strong> Higher tensile strength, superior adhesion to wood and mineral substrates</li>
          <li><strong>Key Performance:</strong> High cohesive strength, moisture resistance, durability</li>
          <li><strong>Applications:</strong> Wood flooring, construction bonding, panel assembly</li>
        </ul>
      </section>

      {/* 2K Structural */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          2K Structural PU Adhesives (MDI / TDI Systems)
        </h2>

        <Image
          src="/images/2k-structural-pu-adhesive.jpg"
          alt="Two component polyurethane adhesive used in automotive structural bonding"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Two-component PU adhesives combine high OH polyester polyols with
          aromatic isocyanates such as MDI or TDI. Increased OH functionality
          enhances crosslink density, improving load-bearing capacity and impact
          resistance.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Preferred Polyol:</strong> Polyester, high OH value</li>
          <li><strong>Why Polyester:</strong> Higher modulus, improved chemical resistance</li>
          <li><strong>Key Performance:</strong> Structural strength, thermal stability</li>
          <li><strong>Applications:</strong> Automotive panels, composites, sandwich structures</li>
        </ul>
      </section>

      {/* Solvent Based */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Solvent-Based PU Adhesives (Flexible Bonding)
        </h2>

        <Image
          src="/images/solvent-based-pu-adhesive.jpg"
          alt="Polyurethane adhesive used in footwear sole bonding process"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Linear polyester polyols reacted with TDI or MDI are widely used in
          solvent-based PU adhesives. Polyester chemistry improves peel strength,
          heat resistance and adhesion to leather and synthetic materials.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Preferred Polyol:</strong> Linear polyester, medium MW</li>
          <li><strong>Alternative:</strong> Polyether for improved hydrolysis resistance</li>
          <li><strong>Key Performance:</strong> Flexibility with strong bond retention</li>
          <li><strong>Applications:</strong> Footwear, artificial leather, flexible laminates</li>
        </ul>
      </section>

      {/* PUD */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Water-Based PU Dispersions (PUD)
        </h2>

        <Image
          src="/images/water-based-pud-adhesive.jpg"
          alt="Water based polyurethane dispersion used in textile lamination"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          PU dispersions are produced from internally emulsified polyester or
          polyether polyols with MDI or IPDI. Choice of polyol determines balance
          between mechanical strength and hydrolysis resistance.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Polyester PUD:</strong> Higher strength and chemical resistance</li>
          <li><strong>Polyether PUD:</strong> Better moisture resistance and flexibility</li>
          <li><strong>Applications:</strong> Textile lamination, flexible packaging, low-VOC systems</li>
        </ul>
      </section>

      {/* PUR Hot Melt */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Reactive Hot Melt PU (PUR)
        </h2>

        <Image
          src="/images/pur-hot-melt-adhesive.jpg"
          alt="Reactive hot melt polyurethane adhesive in furniture edge banding process"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          PUR hot melt adhesives are NCO-terminated MDI prepolymers derived from
          low molecular weight polyester polyols. They deliver fast green
          strength followed by secondary moisture curing for enhanced thermal and
          mechanical performance.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Preferred Polyol:</strong> Low MW polyester</li>
          <li><strong>Key Benefit:</strong> Rapid setting with high final bond strength</li>
          <li><strong>Applications:</strong> Furniture edge banding, panel lamination</li>
        </ul>
      </section>

      {/* Selection Guide */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Polyester vs Polyether Polyol Selection Guide
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Polyester Polyols:</strong> Higher tensile strength, superior solvent resistance, improved adhesion to polar substrates.</li>
          <li><strong>Polyether Polyols:</strong> Enhanced hydrolysis resistance, better flexibility, superior low-temperature performance.</li>
          <li><strong>High OH Value:</strong> Increased crosslink density and structural strength.</li>
          <li><strong>Lower MW:</strong> Faster cure and higher hardness.</li>
          <li><strong>Aromatic Isocyanates (MDI/TDI):</strong> High strength and cost efficiency.</li>
          <li><strong>Aliphatic Isocyanates (HDI/IPDI):</strong> UV stability and non-yellowing performance.</li>
        </ul>
      </section>
    </main>
  );
}