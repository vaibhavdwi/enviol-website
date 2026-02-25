import Image from "next/image";

export const metadata = {
  title:
    "Saturated Polyester Resins & Polyols for Powder & Coil Coatings | Enviol Polytech Solutions",
  description:
    "Enviol Polytech Solutions manufactures polyester polyols and saturated polyester resins for powder coatings, coil coatings, architectural systems and industrial metal finishing applications.",
  keywords: [
    "saturated polyester resin",
    "polyester powder coating resin",
    "TGIC polyester",
    "HAA polyester powder",
    "coil coating polyester resin",
    "super durable powder coating",
    "PU powder coating"
  ],
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">

      <h1 className="text-3xl font-bold mb-6">
        Polyester & Saturated Polyester Resin Solutions for Powder and Coil Coatings
      </h1>

      {/* Strategic Brand Positioning */}
      <p className="mb-6 text-lg">
        <strong>Enviol Polytech Solutions</strong> manufactures advanced polyester
        polyols and is expanding into saturated polyester resin production for
        high-performance powder coating and coil coating applications. Our
        materials are engineered to deliver controlled acid value, hydroxyl value,
        molecular weight distribution and glass transition temperature (Tg)
        required for exterior durable and industrial coating systems.
      </p>

      {/* Polyester Powder Coatings */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Polyester Powder Coating Systems
        </h2>

        <Image
          src="/images/polyester-powder-coating-metal.jpg"
          alt="Polyester powder coating applied on architectural aluminum"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Saturated polyester resins form the backbone of modern powder coating
          formulations. By precisely controlling functionality and backbone
          structure, coatings can achieve excellent flow, impact resistance,
          gloss retention and UV durability.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-3">
          <li><strong>TGIC Cured Systems:</strong> Exterior durable architectural coatings</li>
          <li><strong>HAA (Primid) Systems:</strong> Low toxicity, environmentally preferred systems</li>
          <li><strong>Hybrid Epoxy-Polyester Systems:</strong> Interior industrial coatings</li>
          <li><strong>Super Durable Polyester Systems:</strong> Enhanced UV stability for facade applications</li>
        </ul>
      </section>

      {/* PU Powder Coatings */}
<section className="mb-16">
  <h2 className="text-2xl font-semibold mb-4">
    Polyurethane (PU) Powder Coatings
  </h2>

  <Image
    src="/images/pu-powder-coating-application.jpg"
    alt="Polyurethane powder coating on industrial metal component"
    width={900}
    height={500}
    className="rounded-lg mb-4"
  />

  <p>
    Polyurethane powder coatings are premium-performance systems
    formulated using hydroxyl-functional polyester resins reacted
    with blocked isocyanate curing agents. During baking, the
    isocyanate deblocks and reacts with the polyester backbone,
    forming a highly crosslinked urethane network.
  </p>

  <p className="mt-4">
    These systems are selected where superior exterior durability,
    chemical resistance and smooth surface finish are required.
    Compared to standard polyester systems, PU powders offer
    enhanced resistance to solvents, fuels, cleaning agents and
    environmental exposure.
  </p>

  <ul className="list-disc pl-6 mt-4 space-y-3">
    <li><strong>Curing Mechanism:</strong> Hydroxyl-functional polyester + blocked isocyanate</li>
    <li><strong>Cure Profile:</strong> Typically 160–200°C metal temperature depending on system</li>
    <li><strong>Performance Benefit:</strong> Excellent gloss retention and UV stability</li>
    <li><strong>Chemical Resistance:</strong> Superior resistance to oils, fuels and detergents</li>
    <li><strong>Surface Finish:</strong> Smooth flow, low orange peel and high DOI</li>
  </ul>

  <h3 className="text-xl font-semibold mt-8 mb-3">
    Typical Applications
  </h3>

  <ul className="list-disc pl-6 space-y-3">
    <li>Architectural aluminum extrusions</li>
    <li>High-end outdoor furniture</li>
    <li>Automotive components</li>
    <li>Industrial machinery housings</li>
    <li>Appliance exterior panels</li>
  </ul>

  <p className="mt-6">
    By controlling hydroxyl value, molecular weight and backbone
    composition, Enviol Polytech Solutions can tailor polyester
    polyols and saturated polyester resins specifically for
    polyurethane powder coating performance requirements.
  </p>
</section>

      {/* Coil Coating */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Coil Coating Polyester Systems
        </h2>

        <Image
          src="/images/coil-coating-line.jpg"
          alt="Continuous coil coating production line"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Saturated polyester resins are widely used in liquid coil coating
          applications for pre-coated metal sheets. These systems require
          precise molecular weight control to balance flexibility,
          adhesion and weather resistance during high-speed continuous processing.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-3">
          <li>Architectural metal roofing and facades</li>
          <li>Pre-painted galvanized steel</li>
          <li>Appliance and white goods panels</li>
        </ul>
      </section>
{/* Can Coating Systems */}
<section className="mb-16">
  <h2 className="text-2xl font-semibold mb-4">
    Can Coating Polyester Systems
  </h2>

  <Image
    src="/images/can-coating-line.jpg"
    alt="Metal can coating production line"
    width={900}
    height={500}
    className="rounded-lg mb-4"
  />

  <p>
    Saturated polyester resins are widely used in metal packaging
    coatings for beverage and food cans. These systems are applied
    via high-speed coil coating or spray processes and must deliver
    exceptional flexibility, adhesion and chemical resistance.
  </p>

  <p className="mt-4">
    Can coatings are engineered to withstand forming operations,
    pasteurization or sterilization cycles, and long-term contact
    with beverages, oils and acidic food products without film
    cracking or loss of adhesion.
  </p>

  <h3 className="text-xl font-semibold mt-8 mb-3">
    Performance Requirements
  </h3>

  <ul className="list-disc pl-6 space-y-3">
    <li><strong>High Flexibility:</strong> Resistance to cracking during deep drawing</li>
    <li><strong>Adhesion Strength:</strong> Strong bonding to aluminum and tinplate</li>
    <li><strong>Chemical Resistance:</strong> Protection against acids, alcohols and oils</li>
    <li><strong>Thermal Stability:</strong> Withstand sterilization temperatures</li>
    <li><strong>Regulatory Compliance:</strong> Designed for food-contact applications</li>
  </ul>

  <p className="mt-6">
    By precisely controlling acid value, molecular weight and backbone
    chemistry, Enviol Polytech Solutions can formulate saturated
    polyester resins optimized for high-performance can coating systems.
  </p>
</section>
      {/* Application Segmentation */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Industrial Application Coverage
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li>Architectural aluminum extrusions</li>
          <li>Steel structures and fabricated components</li>
          <li>Automotive metal parts</li>
          <li>Appliance and white goods housing</li>
          <li>Metal furniture and fixtures</li>
          <li>Infrastructure and construction materials</li>
        </ul>
      </section>

      {/* Technical Control */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Resin Engineering Parameters
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Acid Value Control:</strong> Critical for TGIC & HAA curing efficiency</li>
          <li><strong>Hydroxyl Value:</strong> Essential in PU powder systems</li>
          <li><strong>Glass Transition Temperature (Tg):</strong> Storage stability & film hardness</li>
          <li><strong>Molecular Weight Distribution:</strong> Flow and leveling behavior</li>
          <li><strong>Backbone Composition:</strong> Determines UV and weather resistance</li>
        </ul>
      </section>

      <section className="mt-16">
        <p className="text-lg">
          With integrated polyester chemistry expertise, Enviol Polytech Solutions
          is positioned to supply both polyester polyols and saturated polyester
          resins for next-generation powder and coil coating technologies.
        </p>
      </section>

    </main>
  );
}