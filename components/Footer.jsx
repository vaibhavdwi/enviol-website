import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* COMPANY INFO */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Enviol Polytech Solutions
          </h3>
          <p className="text-sm leading-relaxed">
            Advancing India’s circular polymer economy through
            scientific regeneration of waste into high-performance
            polyols for CASE applications.
          </p>

          <p className="mt-4 text-sm">
            Supporting <span className="font-semibold text-white">Make in India </span>  
            and promoting industrial self-reliance.
          </p>
		  {/* ✅ Make in India Logo Added Here */}
            <div className="mt-3">
              <Image
                src="/images/make-in-india.jpg"
                alt="Make in India Initiative"
                width={130}
                height={65}
                className="object-contain w-28 sm:w-32 md:w-36"
              />
            </div>
        </div>

      {/* QUICK LINKS */}
<div>
  <h4 className="text-white font-semibold mb-4">
    Quick Links
  </h4>

  <ul className="space-y-2 text-sm">
    <li>
      <Link
        href="/"
        className="relative inline-block text-gray-300 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Home
      </Link>
    </li>

    <li>
      <Link
        href="/about"
        className="relative inline-block text-gray-300 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        About Us
      </Link>
    </li>

    <li>
      <Link
        href="/technology"
        className="relative inline-block text-gray-300 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Technology
      </Link>
    </li>

    <li>
      <Link
        href="/sustainability"
        className="relative inline-block text-gray-300 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Sustainability
      </Link>
    </li>

    <li>
      <Link
        href="/industries"
        className="relative inline-block text-gray-300 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Industries
      </Link>
    </li>

    <li>
      <Link
        href="/products"
        className="relative inline-block text-gray-300 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Products
      </Link>
    </li>

    <li>
      <Link
        href="/contact"
        className="relative inline-block text-gray-300 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Contact
      </Link>
    </li>
  </ul>
</div>

        {/* TECHNOLOGY FOCUS */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Our Focus Areas
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Polymer Waste Regeneration</li>
            <li>PET & PU Recycling</li>
            <li>Low Carbon Manufacturing</li>
            <li>Import Substitution</li>
            <li>Circular Economy Solutions</li>
          </ul>
        </div>

        {/* CONTACT DETAILS */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Contact Information
          </h4>

          <p className="text-sm leading-relaxed">
            Khasra No.164, Prasiddhpur Bhant,<br />
            Near Parshuram Mandir,<br />
            Khanchandpur Road,<br />
            Rania Industrial Area,<br />
            Tehsil Akbarpur,<br />
            Kanpur Dehat, Uttar Pradesh India
          </p>

          <p className="mt-4 text-sm">
            Phone: +91 96250 93722
          </p>

          <p className="text-sm">
            Email: info@enviol.com
          </p>
        </div>

      </div>

      {/* BOTTOM STRIP */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
        © 2026 Enviol Polytech Solutions. All Rights Reserved. <br />
        Building India’s Sustainable Polymer Future.
      </div>

    </footer>
  );
}
