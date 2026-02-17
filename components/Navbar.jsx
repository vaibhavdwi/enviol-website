import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    //<header className="bg-gradient-to-r from-white to-green-50 border-b border-gray-200">
	<header className="bg-[#42b3a5] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-5 group">
          <Image
            src="/images/logo.png"
            alt="Enviol Polytech Solutions"
            width={100}
            height={100}
            priority
            className="transition duration-300 group-hover:scale-105"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              Enviol Polytech Solutions
            </h1>

            <p className="text-xl font-black text-green-700 tracking-wide uppercase">
              Reuse What You Waste
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-10 text-lg font-medium text-gray-700">
          <Link href="/" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-700 transition-all group-hover:w-full"></span>
          </Link>

          <Link href="/products" className="relative group">
            Products
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-700 transition-all group-hover:w-full"></span>
          </Link>

          <Link href="/contact" className="relative group">
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-700 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

      </div>
    </header>
  );
}
