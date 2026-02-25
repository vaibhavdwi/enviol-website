import Image from "next/image";

export const metadata = {
  title:
    "Polyester & Polyether Polyols for Flexible and Rigid PU Foam | Enviol Polytech Solutions",
  description:
    "Enviol Polytech Solutions supplies polyester and polyether polyols for flexible slabstock, HR foam, memory foam, molded foam, rigid insulation foam, PIR and spray systems.",
  keywords: [
    "flexible PU foam polyol",
    "rigid PU foam polyol",
    "HR foam polyol",
    "memory foam polyol",
    "polyester polyol for foam",
    "polyether polyol for mattress",
    "PIR foam polyol",
    "spray foam system"
  ],
};

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">

      <h1 className="text-3xl font-bold mb-6">
        Advanced Polyol Solutions for Flexible & Rigid Polyurethane Foam
      </h1>

      <p className="mb-6 text-lg">
        <strong>Enviol Polytech Solutions</strong> manufactures sustainable
        polyester and polyether polyols engineered for high-volume flexible
        and rigid polyurethane foam production. Our portfolio supports slabstock,
        molded, HR, viscoelastic, rebonded and insulation-grade systems with
        controlled functionality, optimized OH values and consistent reactivity
        profiles for industrial processing stability.
      </p>

      {/* FLEXIBLE FOAM SECTION */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Flexible Polyurethane Foam Systems
        </h2>

        <Image
          src="/images/flexible-foam-production.jpg"
          alt="Flexible slabstock polyurethane foam production line"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Flexible foams are primarily produced using polyether polyols reacted
          with TDI or MDI systems. Polyester polyols are introduced where higher
          mechanical strength and improved compression set resistance are required.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Conventional Slabstock Foam:</strong> Polyether polyols (OH 40–60 mg KOH/g), TDI-based systems</li>
          <li><strong>High Resilience (HR) Foam:</strong> High functionality polyether polyols (functionality 3–6), MDI systems</li>
          <li><strong>Viscoelastic / Memory Foam:</strong> Modified polyether systems with controlled crosslink density</li>
          <li><strong>Molded Foam:</strong> Automotive seating, dual hardness systems</li>
          <li><strong>Rebonded Foam:</strong> Scrap foam bonded using PU binders</li>
        </ul>

        <p className="mt-4">
          Mattress and bedding applications demand precise control over density,
          airflow, recovery rate and compression set — parameters directly
          influenced by polyol molecular weight and functionality.
        </p>
		<section className="mt-10">
  <h3 className="text-xl font-semibold mb-4">
    Flexible Foam Classification in Mattress Applications
  </h3>

  <p>
    Mattress-grade flexible polyurethane foam is classified based on density,
    resilience, recovery behavior and load-bearing capacity. Polyether polyols
    are predominantly used, while polyester polyols are introduced where
    enhanced compression set resistance and structural durability are required.
  </p>

  <ul className="list-disc pl-6 mt-4 space-y-3">
    <li>
      <strong>Conventional Foam (Low to Medium Density – 18–28 kg/m³):</strong>
      Standard slabstock foam used in entry-level mattresses and quilting layers.
      Based on polyether polyols (OH 45–60 mg KOH/g) with TDI systems.
    </li>

    <li>
      <strong>High Density Foam (28–40 kg/m³):</strong>
      Improved durability and load-bearing performance for support cores.
      Modified polyether systems with controlled crosslinking.
    </li>

    <li>
      <strong>High Resilience (HR) Foam:</strong>
      Higher functionality polyether polyols (3–6 functionality) combined with MDI
      systems. Offers superior rebound, breathability and comfort performance.
      Used in premium mattress segments.
    </li>

    <li>
      <strong>Viscoelastic / Memory Foam:</strong>
      Low resilience, slow recovery foam engineered through precise
      crosslink density control. Used in comfort layers for pressure
      redistribution and orthopedic support.
    </li>

    <li>
      <strong>Orthopedic / Firm Support Foam:</strong>
      Higher crosslink density systems with increased load-bearing capacity.
      Polyester-modified systems improve compression set resistance.
    </li>

    <li>
      <strong>Hybrid Layer Systems:</strong>
      Multi-layer constructions combining conventional, HR and viscoelastic
      grades to achieve targeted comfort and durability profiles.
    </li>
  </ul>

  <p className="mt-4">
    Precise control of molecular weight, functionality and OH value enables
    optimization of density, airflow, indentation force deflection (IFD)
    and long-term compression set behavior in mattress-grade foams.
  </p>
</section>
      </section>

      {/* RIGID FOAM SECTION */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Rigid Polyurethane & PIR Foam Systems
        </h2>

        <Image
          src="/images/rigid-foam-panel-line.jpg"
          alt="Rigid polyurethane insulation panel manufacturing"
          width={900}
          height={500}
          className="rounded-lg mb-4"
        />

        <p>
          Rigid foam systems utilize high functionality polyester or aromatic
          polyols combined with polymeric MDI (pMDI) to achieve high crosslink
          density and low thermal conductivity.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Continuous Panel Systems:</strong> Sandwich panels, insulation boards</li>
          <li><strong>Refrigeration & Cold Storage:</strong> Low lambda value formulations</li>
          <li><strong>Spray Foam Systems:</strong> Controlled cream and gel time profiles</li>
          <li><strong>Block Rigid Foam:</strong> Structural core materials</li>
          <li><strong>PIR Systems:</strong> Modified isocyanurate structures for enhanced fire performance</li>
        </ul>

        <p className="mt-4">
          High OH value polyester polyols (200–450 mg KOH/g) enable increased
          crosslink density, dimensional stability and compressive strength in
          insulation-grade systems.
        </p>
		<section className="mt-10">
  <h3 className="text-xl font-semibold mb-4">
    Industrial Rigid Foam Application Segmentation
  </h3>

  <p>
    Rigid polyurethane and PIR foam systems are classified based on application
    environment, processing method and thermal performance requirements.
    High functionality polyester and aromatic polyols are typically combined
    with polymeric MDI (pMDI) to achieve superior crosslink density and
    structural integrity.
  </p>

  <ul className="list-disc pl-6 mt-4 space-y-3">

    <li>
      <strong>Continuous Sandwich Panel Systems:</strong>
      High reactivity systems designed for steel-faced insulation panels.
      Requires dimensional stability, compressive strength and low lambda value.
    </li>

    <li>
      <strong>Discontinuous Panel / Block Foam:</strong>
      Used for custom insulation boards and fabrication industries.
      Controlled cream time and uniform cell structure are critical.
    </li>

    <li>
      <strong>Refrigeration & Cold Storage Insulation:</strong>
      Ultra-low thermal conductivity systems with enhanced moisture resistance.
      High crosslink density polyester polyols preferred.
    </li>

    <li>
      <strong>Spray Polyurethane Foam (SPF):</strong>
      On-site insulation systems requiring balanced gel time,
      flow characteristics and adhesion to substrates.
    </li>

    <li>
      <strong>Appliance Insulation (OEM Systems):</strong>
      Refrigerator and freezer cavity filling with precise expansion control
      and dimensional stability.
    </li>

    <li>
      <strong>PIR (Polyisocyanurate) Systems:</strong>
      Modified isocyanate-rich systems for enhanced fire performance
      and improved thermal stability in building insulation.
    </li>

    <li>
      <strong>Pipe & Tank Insulation:</strong>
      High compressive strength foam for industrial pipelines,
      LNG tanks and petrochemical installations.
    </li>

  </ul>

  <p className="mt-4">
    Selection of OH value (200–500 mg KOH/g), functionality (3–6+),
    and aromatic content directly influences compressive strength,
    fire behavior, dimensional stability and long-term insulation efficiency.
  </p>
</section>
      </section>

      {/* TECHNICAL DIFFERENTIATION */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">
          Polyether vs Polyester in Foam Applications
        </h2>

        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Polyether Polyols:</strong> Preferred for flexible foam softness, hydrolysis resistance and resilience.</li>
          <li><strong>Polyester Polyols:</strong> Higher tensile strength, improved dimensional stability and better fire performance potential.</li>
          <li><strong>Functionality Control:</strong> Direct impact on hardness, resilience and cell structure.</li>
          <li><strong>OH Value Optimization:</strong> Determines density, reactivity and crosslink density.</li>
          <li><strong>Isocyanate Pairing:</strong> TDI for slabstock; MDI/pMDI for HR and rigid systems.</li>
        </ul>
      </section>

      <section className="mt-16">
        <p className="text-lg">
          With scalable manufacturing capacity and strict quality control,
          Enviol Polytech Solutions partners with foam producers to supply
          consistent polyol grades for mattress manufacturers, automotive
          seating producers, insulation panel lines and spray foam contractors.
        </p>
      </section>

    </main>
  );
}