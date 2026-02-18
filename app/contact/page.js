"use client";

import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      company: e.target.company.value,
      person: e.target.person.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Enquiry submitted successfully!");
        e.target.reset();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-primary mb-10 text-center">
          Contact Enviol Polytech Solutions
        </h1>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Get in Touch
            </h2>

            <p className="mb-6 text-lg">
              Our technical team is ready to support your requirements
              for sustainable polyester and polyether polyols.
            </p>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-lightbg p-8 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6">
              Request Technical Consultation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="company"
                type="text"
                placeholder="Company Name"
                required
                className="w-full p-3 border rounded"
              />

              <input
                name="person"
                type="text"
                placeholder="Contact Person"
                required
                className="w-full p-3 border rounded"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full p-3 border rounded"
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border rounded"
              />

              <textarea
                name="message"
                placeholder="Describe your polyol requirement..."
                rows="4"
                required
                className="w-full p-3 border rounded"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded font-semibold w-full"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
