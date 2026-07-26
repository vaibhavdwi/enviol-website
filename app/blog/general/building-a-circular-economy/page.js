import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function BuildingCircularEconomyPage() {
  return (
    <main className="bg-yellow-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">

        <AnimatedHeading
          title="Building a Circular Economy: How Chemical Recycling Gives Plastic Waste a Second Life"
        />

        <div className="mt-4 text-sm text-gray-500">
          Published: July 2026 • Author: Anonymous
        </div>

        {/* HERO IMAGE */}

        <div className="mt-8 h-80 rounded-xl bg-gray-200 flex items-center justify-center">
          [Circular Economy Illustration]
        </div>

        {/* INTRODUCTION */}

        <div className="mt-10 space-y-6 text-gray-700 leading-relaxed">

          <p>
            Modern industries face a growing challenge: how can economic
            development continue while reducing environmental impact and
            conserving valuable natural resources? The answer increasingly
            lies in the transition from a traditional linear economy to a
            circular economy.
          </p>

          <p>
            Instead of treating products as disposable after a single use,
            a circular economy focuses on keeping materials in circulation
            for as long as possible through reuse, repair, recycling and
            recovery. Advanced chemical recycling technologies now enable
            plastic waste to become a valuable industrial resource rather
            than an environmental burden.
          </p>

          <p>
            This transformation is helping manufacturers reduce waste,
            conserve raw materials, lower carbon emissions and build a
            more sustainable future for generations to come.
          </p>

        </div>

        {/* WHAT IS A CIRCULAR ECONOMY */}

        <section className="mt-14">

          <h2 className="text-3xl font-bold text-primary mb-6">
            What is a Circular Economy?
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">

            <p>
              A circular economy is an economic model designed to maximize
              the value of materials and products by keeping them in use
              for as long as possible. Rather than extracting raw materials,
              manufacturing products, using them once and disposing of them,
              circular systems recover valuable resources and return them
              back into manufacturing.
            </p>

            <p>
              Recycling, remanufacturing, refurbishment and responsible
              product design all play important roles in extending the life
              cycle of materials while minimizing waste generation.
            </p>

          </div>

        </section>

        {/* LINEAR VS CIRCULAR */}

        <section className="mt-14">

          <h2 className="text-3xl font-bold text-primary mb-6">
            From a Linear Economy to a Circular Economy
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">

            <p>
              Traditional manufacturing has largely followed a linear model:
              extract resources, manufacture products, use them, and discard
              them. While this approach has supported industrial growth, it
              also places increasing pressure on natural resources and waste
              management systems.
            </p>

            <p>
              A circular economy replaces this model with one where materials
              are continuously recovered and reused, reducing dependence on
              virgin resources while minimizing environmental impact.
            </p>

          </div>

        </section>

        {/* IMAGE */}

        <div className="mt-12 h-80 rounded-xl bg-gray-200 flex items-center justify-center">
          [Circular Economy Lifecycle Diagram]
        </div>

        {/* ROLE OF CHEMICAL RECYCLING */}

        <section className="mt-14">

          <h2 className="text-3xl font-bold text-primary mb-6">
            The Role of Chemical Recycling
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">

            <p>
              Chemical recycling complements traditional mechanical recycling
              by converting certain plastic waste streams back into valuable
              chemical building blocks. These recovered materials can then be
              used to manufacture high-performance products for industrial
              applications.
            </p>

            <p>
              This approach expands recycling opportunities for plastics that
              may be difficult to recycle using conventional methods, helping
              divert more waste from landfills and supporting efficient
              resource utilization.
            </p>

          </div>

        </section>

        {/* BENEFITS */}

        <section className="mt-14">

          <h2 className="text-3xl font-bold text-primary mb-6">
            Benefits of a Circular Economy
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">

            <ul className="list-disc ml-6 space-y-3">
              <li>Reduces plastic waste sent to landfills.</li>
              <li>Conserves valuable natural resources.</li>
              <li>Supports lower carbon emissions.</li>
              <li>Improves resource efficiency.</li>
              <li>Encourages innovation in sustainable manufacturing.</li>
              <li>Strengthens long-term industrial resilience.</li>
            </ul>

          </div>

        </section>

        {/* ENVIOL */}

        <section className="mt-14">

          <h2 className="text-3xl font-bold text-primary mb-6">
            How Enviol Supports the Circular Economy
          </h2>

          <div className="space-y-5 text-gray-700 leading-relaxed">

            <p>
              At Enviol, we believe waste should be viewed as a valuable
              resource rather than a disposal problem. By developing recycled
              polyester polyols through advanced chemical recycling of PET
              waste, we aim to support more sustainable polyurethane
              manufacturing while contributing to responsible resource
              management.
            </p>

            <p>
              Our vision is to help industries transition toward cleaner,
              more circular manufacturing practices that balance economic
              growth with environmental responsibility.
            </p>

          </div>

        </section>

        {/* RELATED RESOURCES */}

        <section className="mt-14 bg-white p-8 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Related Resources
          </h2>

          <div className="flex flex-col gap-3">

            <Link
              href="/blog/general/why-plastic-recycling-matters"
              className="text-[#42b3a5] font-semibold"
            >
              → Why Plastic Recycling Matters
            </Link>

            <Link
              href="/blog/general/pet-chemical-recycling"
              className="text-[#42b3a5] font-semibold"
            >
              → From PET Waste to High-Performance Materials
            </Link>

            <Link
              href="/products/polyester-polyols"
              className="text-[#42b3a5] font-semibold"
            >
              → Explore Recycled Polyester Polyols
            </Link>

            <Link
              href="/contact"
              className="text-[#42b3a5] font-semibold"
            >
              → Contact Enviol
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}
