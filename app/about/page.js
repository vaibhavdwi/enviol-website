// app/about/page.js
import Image from 'next/image';

export const metadata = {
  title: "About Enviol | Polyester & Polyether Polyol Manufacturer & Exporter",

  description:
    "Enviol is a manufacturer of polyester and polyether polyols specializing in sustainable chemical recycling and polyurethane raw materials for coatings, adhesives, sealants, elastomers, and foam applications. Serving India and global markets.",

  keywords: [
    "polyester polyol manufacturer",
    "polyether polyol supplier",
    "polyol exporter India",
    "recycled polyol manufacturer",
    "polyurethane raw materials supplier",
    "industrial chemical manufacturer India",
    "global polyol supplier",
    "sustainable polyol company"
  ],

  alternates: {
    canonical: "https://enviol.com/about",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">
      
      <h1 className="text-4xl font-bold text-center mb-8">
        About Enviol – Polyester & Polyether Polyol Manufacturer
      </h1>

      {/* Who We Are */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-gray-700">
          Enviol is a manufacturer of polyester and polyether polyols, specializing in sustainable chemical recycling of PET and polyurethane waste into high-performance polyols. We serve industries across India and global markets with reliable polyurethane raw materials for coatings, adhesives, sealants, elastomers (CASE), and foam applications.
        </p>
      </section>

      {/* What We Do */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <p className="text-gray-700">
          We develop and manufacture industrial-grade polyester and polyether polyols using advanced depolymerization and regeneration processes. Our solutions are designed to meet global performance standards, enabling manufacturers to reduce dependency on virgin petrochemical feedstock while ensuring consistent hydroxyl value, viscosity, and application performance.
        </p>
      </section>

      {/* Vision */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-700">
          Our vision is to become a globally recognized polyol manufacturer, driving the transition toward sustainable polyurethane raw materials through innovation in chemical recycling and circular manufacturing systems.
        </p>
      </section>

      {/* Aim */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Aim</h2>
        <p className="text-gray-700">
          We aim to reduce import dependency, strengthen domestic manufacturing, and position India as a global hub for sustainable polyol production while supplying high-quality materials to international markets.
        </p>
      </section>

      {/* Impact */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Are Helping Change the World</h2>
        <p className="text-gray-700">
          By advancing chemical recycling technologies and promoting circular manufacturing, Enviol reduces landfill waste and supports industries in adopting sustainable raw materials. Our solutions help manufacturers lower carbon footprint while maintaining industrial-grade performance.
        </p>
      </section>

      {/* Beliefs */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Beliefs</h2>
        <p className="text-gray-700">
          We strongly believe in the Make in India initiative. Our mission is to foster local manufacturing capabilities, create opportunities for domestic industries, and build sustainable economic ecosystems.
        </p>

        <p className="text-gray-700 mt-2">
          We are committed to delivering export-quality polyols with consistent performance, technical documentation, and reliable industrial supply for global clients.
        </p>
      </section>

      {/* NEW SEO SECTION */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Global Supplier of Sustainable Polyol Solutions
        </h2>

        <p className="text-gray-700">
          Enviol supplies polyester polyols, polyether polyols, and recycled polyol solutions to customers across India, the Middle East, Europe, and other global markets. Our focus on sustainable manufacturing, consistent quality, and technical support makes us a preferred partner for polyurethane manufacturers worldwide.
        </p>
      </section>

      {/* Directors */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Directors</h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Director 1 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center">
            <Image
              src="/images/vaibhav.jpeg"
              alt="Vaibhav Dwivedi polyol manufacturer director Enviol"
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Mr. Vaibhav Dwivedi</h3>
            <p className="text-gray-700 mb-2">
              IT Engineer with experience across multinational companies in manufacturing and supply chain operations.
            </p>
            <p className="text-gray-700">
              He focuses on innovation, operational efficiency, and building scalable industrial solutions that create long-term value.
            </p>
          </div>

          {/* Director 2 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center">
            <Image
              src="/images/parul.jpeg"
              alt="Dr Parul Dwivedi chemical engineer polyol research Enviol"
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Dr. Parul Dwivedi</h3>
            <p className="text-gray-700 mb-2">
              Chemical Engineer with expertise in research and development of sustainable materials.
            </p>
            <p className="text-gray-700">
              She leads innovation in chemical recycling and development of high-performance polyols for industrial applications.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}