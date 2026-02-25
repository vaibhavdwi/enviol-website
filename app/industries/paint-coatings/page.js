import Image from "next/image";

export const metadata = {
  title:
    "Polyester Polyols for PU Paints, Enamels, Primers & Emulsions | Enviol Polytech Solutions",
  description:
    "Enviol Polytech Solutions supplies polyester and polyether polyols for 1K and 2K PU coatings, PU enamels, primers, emulsions and high-performance industrial paint systems.",
  keywords: [
    "PU coating polyol",
    "1K polyurethane coating",
    "2K polyurethane paint",
    "PU enamel system",
    "PU primer polyol",
    "polyurethane emulsion PUD",
    "industrial polyurethane coating"
  ],
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">

      <h1 className="text-3xl font-bold mb-6">
        Advanced Polyol Solutions for PU Paints & Coatings
      </h1>

      {/* Brand Introduction */}
      <p className="mb-6 text-lg">
        <strong>Enviol Polytech Solutions</strong> manufactures sustainable
        polyester and polyether polyols designed for high-performance
        polyurethane paints, enamels, primers and emulsion systems.
        Our polyols are engineered to control crosslink density,
        hardness, flexibility, chemical resistance and weather stability
        across industrial and decorative coating applications.
      </p>

      {/* 1K PU Coatings */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          1K Polyurethane Coatings
        </h2>

        <Image
          src="/images/1k-pu-floor-coating.jpg"
          alt="Moisture cure 1K polyurethane floor coating application"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          One-component PU coatings are moisture-cure or blocked-isocyanate
          systems that react upon exposure to ambient humidity or heat.
          Polyester polyols contribute to hardness, abrasion resistance and
          solvent resistance.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Industrial floor coatings</li>
          <li>Concrete sealers</li>
          <li>Protective maintenance coatings</li>
          <li>Clear wood finishes</li>
        </ul>
      </section>

      {/* 2K PU Coatings */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          2K Polyurethane Paint Systems
        </h2>

        <Image
          src="/images/2k-automotive-pu-coating.jpg"
          alt="Two component polyurethane automotive coating spray application"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Two-component PU coatings combine hydroxyl-functional polyols
          with isocyanate hardeners such as HDI, IPDI, MDI or TDI derivatives.
          Polyester polyols are widely used where high gloss retention,
          chemical resistance and mechanical durability are required.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Aliphatic Systems:</strong> Automotive and UV-stable topcoats</li>
          <li><strong>Aromatic Systems:</strong> Industrial protective coatings</li>
          <li><strong>High Solids Systems:</strong> Reduced VOC formulations</li>
        </ul>
      </section>

      {/* PU Enamel */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          PU Enamel Systems
        </h2>

        <Image
          src="/images/pu-enamel-metal-finish.jpg"
          alt="Polyurethane enamel coating on metal surface"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          PU enamels provide smooth flow, high gloss, surface hardness
          and decorative finish quality. Controlled molecular weight
          polyester polyols improve leveling, scratch resistance and
          long-term film durability.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Metal furniture coatings</li>
          <li>Appliance coatings</li>
          <li>Structural steel finishes</li>
        </ul>
      </section>

      {/* PU Primer */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          PU Primers
        </h2>

        <Image
          src="/images/pu-primer-application.jpg"
          alt="Polyurethane primer applied on steel structure"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          PU primers enhance adhesion, corrosion resistance and
          substrate compatibility. Polyester polyols with optimized OH
          value improve film strength and chemical resistance in
          anti-corrosion systems.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Anti-corrosion metal primers</li>
          <li>Concrete bonding primers</li>
          <li>Automotive primer surfacers</li>
        </ul>
      </section>

      {/* PU Emulsions / PUD */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          PU Emulsions & Polyurethane Dispersions (PUD)
        </h2>

        <Image
          src="/images/pu-emulsion-wood-coating.jpg"
          alt="Water based polyurethane coating on wood surface"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Water-based polyurethane dispersions are developed using modified
          polyester or polyether polyols to meet environmental regulations.
          These systems deliver low VOC emissions while maintaining flexibility,
          adhesion and abrasion resistance.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Wood coatings and furniture finishes</li>
          <li>Textile and leather coatings</li>
          <li>Low-VOC architectural coatings</li>
        </ul>
      </section>

      {/* Technical Control */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Technical Formulation Control
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>OH Value:</strong> Controls crosslink density and hardness</li>
          <li><strong>Molecular Weight:</strong> Influences leveling and flexibility</li>
          <li><strong>Polyester Backbone:</strong> Enhances chemical & abrasion resistance</li>
          <li><strong>Polyether Backbone:</strong> Improves flexibility & hydrolysis resistance</li>
          <li><strong>Isocyanate Selection:</strong> Determines UV stability and cure profile</li>
        </ul>
      </section>
	  <section className="mt-16">
  <h2 className="text-2xl font-semibold mb-4">
    PU Paint & Coating Application Classification
  </h2>

  <p>
    Polyurethane coating systems are selected based on substrate,
    environmental exposure and performance requirements. Polyester
    and polyether polyols are engineered accordingly to balance
    hardness, flexibility, chemical resistance and weather durability.
  </p>

  <ul className="list-disc pl-6 mt-4 space-y-4">

    <li>
      <strong>Automotive OEM & Refinish Coatings:</strong>
      High-gloss aliphatic 2K PU systems using HDI/IPDI hardeners.
      Requires UV stability, scratch resistance and chemical durability.
    </li>

    <li>
      <strong>Industrial Protective Coatings:</strong>
      Aromatic or aliphatic systems designed for structural steel,
      heavy machinery and fabrication industries. Focus on corrosion
      protection and impact resistance.
    </li>

    <li>
      <strong>Floor & Concrete Coatings:</strong>
      1K or 2K PU systems engineered for abrasion resistance,
      chemical resistance and load-bearing durability in industrial
      warehouses and commercial spaces.
    </li>

    <li>
      <strong>Marine & Offshore Coatings:</strong>
      High-performance systems resistant to salt spray,
      moisture and aggressive environments. Enhanced hydrolysis
      resistance required.
    </li>

    <li>
      <strong>Wood & Furniture Coatings:</strong>
      Clear and pigmented PU systems offering smooth leveling,
      scratch resistance and long-term gloss retention.
    </li>

    <li>
      <strong>Coil Coatings:</strong>
      Pre-coated metal sheet applications requiring controlled
      flexibility, adhesion and weather resistance.
    </li>

    <li>
      <strong>Plastic & Composite Substrate Coatings:</strong>
      Modified PU systems with improved adhesion and flexibility
      for engineered plastics and FRP components.
    </li>

    <li>
      <strong>Oil, Gas & Chemical Tank Linings:</strong>
      High crosslink density systems providing resistance to
      chemicals, fuels and industrial solvents.
    </li>

  </ul>

  <p className="mt-4">
    Precise selection of polyol backbone, functionality and OH value
    enables coating formulators to optimize hardness (pencil hardness),
    flexibility (mandrel bend), adhesion and long-term weather performance.
  </p>
</section>

      <section className="mt-16">
        <p className="text-lg">
          Enviol Polytech Solutions supports coating formulators worldwide
          with consistent polyol grades tailored for high-performance
          polyurethane paint systems.
        </p>
      </section>

    </main>
  );
}