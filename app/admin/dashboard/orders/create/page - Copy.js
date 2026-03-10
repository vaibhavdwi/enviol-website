"use client";

import { useState } from "react";

export default function CreateOrder() {
  const [form, setForm] = useState({
    product_name: "",
    product_id: "",
    quantity: 1,
    price_offered: "",
    discount_percent: 0,

    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    gst_number: "", // NEW field
    address: "",
    city: "",
    state: "",
    pincode: "",

    notes: "", // optional, not stored in DB
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const calculatePricing = () => {
    const qty = Number(form.quantity);
    const price = Number(form.price_offered);
    const discount = Number(form.discount_percent);

    if (!qty || !price) {
      return { discounted_price: 0, total_amount: 0 };
    }

    const discountAmount = (price * discount) / 100;
    const discounted_price = price - discountAmount;
    const total_amount = discounted_price * qty;

    return { discounted_price, total_amount };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { discounted_price, total_amount } = calculatePricing();

    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: form.product_name,
          product_id: form.product_id,
          quantity: Number(form.quantity),
          price_offered: Number(form.price_offered),
          discount_percent: Number(form.discount_percent),
          discounted_price,
          total_amount,

          company_name: form.company_name,
          contact_person: form.contact_person,
          email: form.email,
          phone: form.phone,
          gst_number: form.gst_number, // NEW
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order Created Successfully!");
        setForm({
          product_name: "",
          product_id: "",
          quantity: 1,
          price_offered: "",
          discount_percent: 0,
          company_name: "",
          contact_person: "",
          email: "",
          phone: "",
          gst_number: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          notes: "",
        });
      } else {
        alert(data.message || "Error creating order");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  const { discounted_price, total_amount } = calculatePricing();

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Create New Order
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-8 space-y-8 max-w-4xl"
      >
        {/* Product Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#42B3A5]">
            Product Information
          </h3>

          <input
            name="product_name"
            value={form.product_name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            name="product_id"
            value={form.product_id}
            onChange={handleChange}
            placeholder="Product ID"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="1"
            placeholder="Quantity"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            type="number"
            name="price_offered"
            value={form.price_offered}
            onChange={handleChange}
            placeholder="Price per Unit"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            type="number"
            name="discount_percent"
            value={form.discount_percent}
            onChange={handleChange}
            placeholder="Discount %"
            className="w-full border rounded px-4 py-3"
          />
        </div>

        {/* Pricing Summary */}
        <div className="bg-gray-100 p-4 rounded text-sm">
          <p>Discounted Price per Unit: ₹ {discounted_price.toFixed(2)}</p>
          <p className="font-semibold mt-2">
            Total Amount: ₹ {total_amount.toFixed(2)}
          </p>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#42B3A5]">
            Customer Information
          </h3>

          <input
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            name="contact_person"
            value={form.contact_person}
            onChange={handleChange}
            placeholder="Contact Person"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            name="gst_number"
            value={form.gst_number}
            onChange={handleChange}
            placeholder="Customer GST Number"
            className="w-full border rounded px-4 py-3"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Company Address"
            rows="3"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="w-full border rounded px-4 py-3"
          />

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
            className="w-full border rounded px-4 py-3"
          />
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#42B3A5]">
            Additional Notes
          </h3>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes (Optional)"
            rows="4"
            className="w-full border rounded px-4 py-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#42B3A5] text-white px-8 py-3 rounded hover:opacity-90"
        >
          {loading ? "Saving..." : "Create Order"}
        </button>
      </form>
    </div>
  );
}