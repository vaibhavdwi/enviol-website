export default function Footer() {
  return (
    <footer className="bg-darkgreen text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* COMPANY INFO */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Enviol Polytech Solutions
          </h3>
          <p>
            Transforming consumption into sustainability through
            innovative recycled polyol manufacturing.
          </p>
        </div>

        {/* CONTACT DETAILS */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p>
            Khasra No.164, Prasiddhpur Bhant,<br />
            Near Parshuram Mandir,<br />
            Khanchandpur Road,<br />
            Rania Industrial Area,<br />
            Tehsil Akbarpur,<br />
            Kanpur Dehat, India
          </p>
          <p className="mt-4">
            Phone: +91 96250 93722<br />
            Email: info@enviol.com
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

      </div>

      <div className="text-center mt-10 border-t border-white/20 pt-6">
        © 2026 Enviol Polytech Solutions — Transforming Consumption into Sustainability.
      </div>
    </footer>
  );
}
