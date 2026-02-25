// app/about/page.js
import Image from 'next/image';
import Head from 'next/head';

export const metadata = {
  title: 'About Us - EnvioL',
  description: 'Learn about EnvioL: our vision, mission, directors, and commitment to Make in India and sustainable growth.',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      {/* Existing Sections */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-gray-700">
          Enviol is a forward-thinking enterprise committed to building sustainable solutions for a better tomorrow. Our team is driven by innovation, integrity, and a passion for creating impact in our communities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <p className="text-gray-700">
          We develop cutting-edge solutions that bridge technology with environmental and economic progress. From fostering local markets to reducing import dependencies, our goal is to empower Indian businesses and promote self-reliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-700">
          To create a world where sustainable growth and innovation coexist, transforming the way businesses and communities operate for the betterment of society.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Aim</h2>
        <p className="text-gray-700">
          We aim to reduce import dependency, create thriving local markets, and enable Indian businesses to compete globally while maintaining sustainability at the core of every initiative.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Are Helping Change the World</h2>
        <p className="text-gray-700">
          By promoting locally-made products, reducing reliance on imports, and building technology-driven solutions, EnvioL is contributing to a greener, more self-sufficient future for India and beyond.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Beliefs</h2>
        <p className="text-gray-700">
          We strongly believe in the <strong>Make in India</strong> initiative. Our mission is to foster local talent, create market opportunities for homegrown businesses, and grow sustainable economic ecosystems within India.
        </p>
      </section>

      {/* Directors Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Directors</h2>

        <div className="grid md:grid-cols-2 gap-8">
  {/* Director 1 */}
  <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center">
    <Image
      src="/images/vaibhav.jpeg"
      alt="Mr. Vaibhav Dwivedi"
      width={150}
      height={150}
      className="rounded-full mb-4"
    />
    <h3 className="text-xl font-semibold mb-2">Mr. Vaibhav Dwivedi</h3>
    <p className="text-gray-700 mb-2">
      IT Engineer with extensive experience across multinational companies in manufacturing and supply chain.
    </p>
    <p className="text-gray-700">
      He has a vision for problem-solving, believes in innovation, and is committed to building solutions that create lasting impact in industry and society.
    </p>
  </div>

  {/* Director 2 */}
  <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center">
    <Image
      src="/images/parul.jpeg"
      alt="Dr. Parul Dwivedi"
      width={150}
      height={150}
      className="rounded-full mb-4"
    />
    <h3 className="text-xl font-semibold mb-2">Dr. Parul Dwivedi</h3>
    <p className="text-gray-700 mb-2">
      Chemical Engineer by profession with a strong interest in research and innovation.
    </p>
    <p className="text-gray-700">
      She specializes in finding sustainable solutions and drives innovation in developing technologies that help industries and communities achieve long-term sustainability goals.
    </p>
  </div>
</div>

      </section>
    </main>
  );
}
