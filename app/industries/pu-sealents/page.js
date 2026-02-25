import Image from "next/image";

export const metadata = {
  title:
    "Polyurethane (PU) Sealants | Polyester & Polyether Polyols for Industrial Sealant Formulation",
  description:
    "Technical overview of PU sealant systems including 1K moisture cure, 2K structural, low modulus and high modulus formulations. Learn how polyester and polyether polyols influence flexibility, durability and movement capability.",
  keywords: [
    "PU sealants",
    "polyurethane sealant manufacturer",
    "polyester polyol for sealants",
    "polyether polyol sealant",
    "1K PU sealant",
    "2K polyurethane sealant",
    "construction PU sealant",
    "automotive seam sealer"
  ],
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">
	<p className="mb-6 text-lg">
  <strong>Enviol Polytech Solutions</strong> provides advanced polyester and 
  polyether polyols tailored for polyurethane sealant manufacturing. Our 
  chemistry supports optimized crosslink density, controlled reactivity and 
  enhanced movement capability in MDI, TDI and aliphatic isocyanate-based 
  sealant systems used across construction, glazing and automotive applications.
</p>
      <h1 className="text-3xl font-bold mb-6">
        Polyurethane (PU) Sealant Systems & Polyol Selection
      </h1>

      <p className="mb-6 text-lg">
        Polyurethane (PU) sealants are formulated by reacting polyester or
        polyether polyols with diisocyanates such as MDI, TDI, HDI or IPDI.
        Sealant performance depends on polyol molecular weight, OH value,
        functionality, and isocyanate selection. Key parameters for sealant
        manufacturers include modulus, elongation, movement capability,
        weather resistance, and adhesion to construction substrates.
      </p>

      {/* 1K Moisture Cure Sealants */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          1K Moisture-Curing PU Sealants (MDI Based)
        </h2>

        <Image
          src="/images/1k-pu-sealant-construction.jpg"
          alt="One component polyurethane sealant applied in construction expansion joint"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          One-component PU sealants are NCO-terminated prepolymers typically
          derived from high molecular weight polyols reacted with MDI or
          polymeric MDI. Curing occurs via atmospheric moisture, forming an
          elastomeric network.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Preferred Polyol:</strong> High MW polyether (low modulus systems)</li>
          <li><strong>Alternative:</strong> Polyester for improved chemical and abrasion resistance</li>
          <li><strong>Key Properties:</strong> High elongation, flexibility, sag resistance</li>
          <li><strong>Applications:</strong> Expansion joints, façade sealing, flooring joints</li>
        </ul>
      </section>

      {/* 2K PU Sealants */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          2K PU Sealants (Controlled Cure Systems)
        </h2>

        <Image
          src="/images/2k-pu-sealant-industrial.jpg"
          alt="Two component polyurethane sealant used in industrial joint sealing"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Two-component PU sealants combine polyol blends with MDI or TDI
          curing agents. These systems allow controlled curing independent of
          atmospheric moisture and are used where thicker sections or faster
          through-cure are required.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Preferred Polyol:</strong> Polyether (high elongation) or Polyester (higher modulus)</li>
          <li><strong>Key Properties:</strong> Controlled cure, structural stability</li>
          <li><strong>Applications:</strong> Industrial flooring, tank joints, heavy construction</li>
        </ul>
      </section>

      {/* Low vs High Modulus */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Low Modulus vs High Modulus PU Sealants
        </h2>

        <p>
          Modulus selection is critical in sealant formulation and directly
          influenced by polyol type and crosslink density.
        </p>

        <ul className="list-disc pl-6 mt-4 space-y-3">
          <li>
            <strong>Low Modulus Sealants:</strong> Typically based on high
            molecular weight polyether polyols. Provide movement capability
            above ±25%, excellent flexibility and crack resistance.
          </li>
          <li>
            <strong>High Modulus Sealants:</strong> Often use polyester polyols
            or higher functionality systems. Deliver improved mechanical
            strength and abrasion resistance.
          </li>
        </ul>
      </section>

      {/* Automotive Seam Sealers */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Automotive PU Seam Sealers
        </h2>

        <Image
          src="/images/automotive-pu-seam-sealer.jpg"
          alt="Polyurethane seam sealer applied in automotive body assembly"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Automotive sealants are typically MDI-based systems formulated for
          vibration resistance, adhesion to coated metals, and paint shop
          compatibility. Polyether polyols enhance flexibility, while polyester
          systems improve mechanical durability.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Key Requirements:</strong> Vibration damping, corrosion resistance</li>
          <li><strong>Applications:</strong> Body seams, floor joints, trunk sealing</li>
        </ul>
      </section>

      {/* Aliphatic Systems */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Aliphatic PU Sealants (HDI / IPDI Based)
        </h2>

        <p>
          Aliphatic isocyanate systems are selected for UV stability and
          non-yellowing performance in exterior applications. These systems are
          commonly combined with polyether polyols for long-term weather
          resistance.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Key Benefit:</strong> UV resistance and color stability</li>
          <li><strong>Applications:</strong> Exterior façade joints, glazing, architectural sealing</li>
        </ul>
      </section>

      {/* Polyol Selection Guide */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Polyester vs Polyether Polyol Selection in PU Sealants
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Polyether Polyols:</strong> Superior hydrolysis resistance, high elongation, ideal for movement joints.</li>
          <li><strong>Polyester Polyols:</strong> Higher mechanical strength, better chemical and abrasion resistance.</li>
          <li><strong>Higher Molecular Weight:</strong> Lower modulus, improved flexibility.</li>
          <li><strong>Higher Functionality:</strong> Increased crosslink density and hardness.</li>
          <li><strong>Aromatic Isocyanates (MDI/TDI):</strong> Cost-efficient and mechanically strong.</li>
          <li><strong>Aliphatic Isocyanates (HDI/IPDI):</strong> UV stable and non-yellowing.</li>
        </ul>
      </section>
    </main>
  );
}