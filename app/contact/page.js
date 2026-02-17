export default function Contact() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-primary mb-10 text-center">
          Contact Enviol Polytech Solutions
        </h1>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT SIDE - CONTACT DETAILS */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Get in Touch
            </h2>

            <p className="mb-6 text-lg">
              Our technical team is ready to support your requirements
              for sustainable polyester and polyether polyols.
              Reach out for product specifications, technical consultation,
              and enquiry-based pricing.
            </p>

            <div className="space-y-4 text-lg">
              <p>
                <strong>Address:</strong><br />
                Enviol Polytech Solutions<br />
                Khasra No.164, Prasiddhpur Bhant,<br />
                Near Parshuram Mandir,<br />
                Khanchandpur Road,<br />
                Rania Industrial Area,<br />
                Tehsil Akbarpur,<br />
                Kanpur Dehat, India
              </p>

              <p>
                <strong>Phone:</strong><br />
                <a href="tel:+919625093722" className="text-primary">
                  +91 96250 93722
                </a>
              </p>

              <p>
                <strong>Email:</strong><br />
                <a href="mailto:info@enviol.com" className="text-primary">
                  info@enviol.com
                </a>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="bg-lightbg p-8 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6">
              Request Technical Consultation
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-3 border rounded"
              />

              <input
                type="text"
                placeholder="Contact Person"
                className="w-full p-3 border rounded"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border rounded"
              />

              <textarea
                placeholder="Describe your polyol requirement..."
                rows="4"
                className="w-full p-3 border rounded"
              ></textarea>

              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded font-semibold w-full"
              >
                Submit Enquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
