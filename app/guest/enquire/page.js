"use client";

import { useState } from "react";

export default function EnquiryPage() {

  const [form, setForm] = useState({
    company: "",
    person: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/guest/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Enquiry submitted successfully!");
        setForm({
          company: "",
          person: "",
          email: "",
          phone: "",
          category: "",
          message: "",
        });
      } else {
        alert(data.message || "Error submitting enquiry");
      }

    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Product Enquiry
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full border px-4 py-3 rounded"
            required
          />

          <input
            name="person"
            value={form.person}
            onChange={handleChange}
            placeholder="Contact Person"
            className="w-full border px-4 py-3 rounded"
            required
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border px-4 py-3 rounded"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border px-4 py-3 rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded"
            required
          >
            <option value="">Select Enquiry Type</option>
            <option value="General Enquiry">General Enquiry</option>
            <option value="Technical">Technical</option>
            <option value="Pricing">Pricing</option>
            <option value="Bulk Order">Bulk Order</option>
          </select>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your requirement..."
            rows="5"
            className="w-full border px-4 py-3 rounded"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#42b3a5] text-white px-6 py-3 rounded w-full font-semibold hover:scale-105 transition"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>

        </form>

      </div>

    </main>
  );
}