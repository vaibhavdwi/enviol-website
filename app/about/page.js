// app/about/page.js
import Image from 'next/image';
import AnimatedHeading from '@/components/AnimatedHeading';

export const metadata = {
  title: "About Enviol | Polyester & Polyether Polyol Manufacturer & Exporter",

  description:
    "Enviol is a manufacturer of polyester and polyether polyols specializing in sustainable chemical recycling of PET and polyurethane waste into high-performance polyols. Serving India and global markets.",

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
    <main className="container mx-auto px-6 pt-20 pb-12 bg-yellow-50">
      
      {/* ✅ Animated Heading with dynamic text */}
      <AnimatedHeading title="About Enviol – Polyester & Polyether Polyol Manufacturer & Exporter" />

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

      {/* Vision + Video Section */}
<section className="mb-16">
  <div className="grid md:grid-cols-2 gap-10 items-center">
    
    {/* Left Content */}
    <div>
      <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
      <p className="text-gray-700 leading-relaxed">
        Our vision is to become a globally recognized polyol manufacturer, driving
        the transition toward sustainable polyurethane raw materials through
        innovation in chemical recycling and circular manufacturing systems.
      </p>

      <p className="text-gray-700 mt-4 leading-relaxed">
        Through advanced recycling technologies, sustainable production practices,
        and industrial innovation, Enviol aims to build a self-reliant circular
        economy that reduces environmental impact while delivering world-class
        polyurethane solutions.
      </p>
    </div>

    {/* Right Side Video */}
    <div className="flex justify-center md:justify-center">
      <div className="w-72 md:w-80 aspect-[9/16] rounded-xl overflow-hidden shadow-xl border border-yellow-200">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/ZAW8eWskipw"
          title="Enviol Vision Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>

  </div>
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
    src="/images/vaibhav1.png"
    alt="Vaibhav Dwivedi polyol manufacturer director Enviol"
    width={150}
    height={150}
    className="rounded-full mb-4"
  />
  <h3 className="text-xl font-semibold mb-2">Mr. Vaibhav Dwivedi</h3>
  <p className="text-gray-700 font-medium mb-3">
    Co-Founder & Director | Enviol Polytech Solutions Pvt. Ltd.
  </p>
  <p className="text-gray-700 text-sm leading-relaxed">
    Mr. Vaibhav Dwivedi is a visionary entrepreneur, strategic business leader, and technology-driven professional with over 14 years of extensive experience across IT, business analytics, ERP systems, supply chain management, finance, logistics, and global operational domains. Holding a B.Tech degree along with an Executive MBA, he brings a highly diversified blend of technical expertise, strategic planning capability, and industrial entrepreneurial ambition.
    <br /><br />
    Throughout his professional journey, Mr. Dwivedi has built deep expertise in advanced business analytics, enterprise resource planning (ERP), operational optimization, supply chain transformation, financial systems, export logistics, business intelligence, and large-scale process management. His strong corporate background across multiple domains has equipped him with the ability to design, streamline, and scale complex business ecosystems with efficiency and precision.
    <br /><br />
    At Enviol Polytech Solutions, Mr. Dwivedi plays a central leadership role in driving the company’s IT division, digital infrastructure, ERP implementation, operational strategy, finance planning, logistics management, export readiness, investor relations, branding, commercial expansion, and long-term industrial growth strategy.
    <br /><br />
    His expertise in ERP process handling and digital operational systems ensures that Enviol is positioned with modern enterprise capabilities essential for scalable specialty chemical manufacturing. His understanding of financial controls, procurement systems, supply chain networks, and logistics operations strengthens the company’s ability to transition efficiently from pilot-scale production to large-scale industrial commercialization.
    <br /><br />
    Driven by a strong commitment to Make in India, Aatmanirbhar Bharat, sustainability, and industrial innovation, Mr. Dwivedi transitioned from a successful corporate career into entrepreneurship with the mission of transforming India’s polyurethane, recycling, and specialty chemical ecosystem through environmentally responsible and economically scalable technologies.
    <br /><br />
    His vision is centered around building a self-reliant, import-reducing circular economy platform by converting PET and PU waste into high-value recycled polyols, specialty polyurethane products, and sustainable industrial solutions that can compete at national and global levels.
    <br /><br />
    Under his leadership, Enviol is committed to reducing India’s dependence on imported polyols, building scalable waste-to-wealth manufacturing systems, lowering industrial carbon emissions, strengthening domestic specialty chemical production, and creating long-term value through innovation-led sustainability.
    <br /><br />
    Mr. Dwivedi’s entrepreneurial philosophy combines technological modernization, operational excellence, sustainability, strategic growth, and industrial scalability, positioning Enviol as a next-generation green chemical enterprise focused on both profitability and environmental transformation.
  </p>
</div>

          {/* Director 2 */}
<div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center">
  <Image
    src="/images/parul1.png"
    alt="Dr Parul Dwivedi chemical engineer polyol research Enviol"
    width={150}
    height={150}
    className="rounded-full mb-4"
  />
  <h3 className="text-xl font-semibold mb-2">Dr. Parul Dwivedi</h3>
  <p className="text-gray-700 font-medium mb-3">
    Co-Founder & Director | Enviol Polytech Solutions Pvt. Ltd.
  </p>
  <p className="text-gray-700 text-sm leading-relaxed">
    Dr. Parul Dwivedi is a highly accomplished chemical engineer, sustainability researcher, and innovation-driven scientific leader with extensive expertise in polymer science, waste recycling technologies, and advanced material recovery systems. Holding a PhD from Harcourt Butler Technical University (HBTU) and an M.Tech from the National Institute of Technology (NIT), she brings a powerful combination of academic excellence, industrial relevance, and research-driven innovation to Enviol’s leadership.
    <br /><br />
    With over 5 years of specialized professional research experience, Dr. Dwivedi is currently serving as a Post-Doctoral Fellow at the National Aerosol Facility, Indian Institute of Technology (IIT) Kanpur, where she continues to advance cutting-edge research in sustainable polymer systems, material recycling, and environmentally responsible chemical technologies.
    <br /><br />
    Her core expertise includes polymer recycling technologies, chemical depolymerization systems, sustainable material recovery, PET and PU waste valorization, specialty polymer innovation, circular economy systems, and industrial R&D and process optimization. Through her extensive scientific background, she has developed deep technical understanding in transforming waste polymers into commercially viable, sustainable industrial solutions.
    <br /><br />
    Dr. Dwivedi has published multiple research works in the field of polymer recycling technology, reinforcing her position as a scientifically credible and innovation-focused leader in sustainable materials development. Her research contributions strengthen Enviol’s technical foundation and support the company’s mission to create scalable, high-performance recycled polyol solutions.
    <br /><br />
    At Enviol Polytech Solutions, she leads research & development, chemical process innovation, product formulation, technical optimization, sustainable recycling technologies, pilot plant technical development, and advanced specialty polyol innovation. Her role is central to building the company’s proprietary technological edge and ensuring the development of high-quality, research-backed polyurethane solutions.
    <br /><br />
    Her vision is centered around transforming plastic and polyurethane waste into high-value industrial feedstocks while significantly reducing landfill burden, lowering carbon emissions, and enabling large-scale industrial adoption of recycled polyurethane systems. She is deeply committed to creating sustainable, science-backed alternatives to conventional resource-intensive polyols.
    <br /><br />
    Through her leadership, Enviol is positioned as a next-generation research-backed specialty chemical enterprise focused on waste valorization, sustainable industrial chemistry, import substitution, and environmentally responsible innovation. Dr. Parul Dwivedi’s commitment to waste recycling for value generation reflects a larger mission to redefine the future of industrial chemistry through scientific excellence and sustainability.
  </p>
</div>

        </div>
      </section>

    </main>
  );
}