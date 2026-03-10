"use client";

import { useState } from "react";

const PRODUCTS = [
  { name: "RePolyester 2100", id: "2100" },
  { name: "RePolyester 2300", id: "2300" },
  { name: "RePolyester 2700", id: "2700" },
  { name: "RePolyether 3300", id: "3300" },
  { name: "RePolyether 4000", id: "4000" },
];

export default function QuotationPage() {

  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gst_number: "",
  });

  const [items, setItems] = useState([
    {
      product_name: "",
      product_id: "",
      quantity: 1,
      price: 0,
      discount: 0,
    },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...items];
    const { name, value } = e.target;

    updatedItems[index][name] = value;

    if (name === "product_name") {
      const selected = PRODUCTS.find((p) => p.name === value);
      updatedItems[index].product_id = selected ? selected.id : "";
    }

    setItems(updatedItems);
  };

  const addItem = () => {

    if (items.length >= 5) {
      alert("Maximum 5 products allowed");
      return;
    }

    setItems([
      ...items,
      {
        product_name: "",
        product_id: "",
        quantity: 1,
        price: 0,
        discount: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateLineTotal = (item) => {
    const qty = Number(item.quantity);
    const price = Number(item.price);
    const discount = Number(item.discount);

    const total = qty * price;
    const discountAmount = (total * discount) / 100;

    return total - discountAmount;
  };

  const calculateGrandTotal = () => {
    return items.reduce(
      (sum, item) => sum + calculateLineTotal(item),
      0
    );
  };

  const handleGeneratePDF = async () => {

    const payload = {
      ...form,
      items,
    };

    const res = await fetch("/api/admin/quotation/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
  const text = await res.text();
  console.error(text);
  alert("Quotation generation failed. Check server logs.");
  return;
}

const blob = await res.blob();
const url = window.URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "quotation.pdf";
a.click();
  };

  return (
    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Create Quotation
      </h2>

      <div className="bg-white p-6 shadow rounded space-y-6">

        {/* Customer Details */}

        <div className="space-y-4">

          <input
            name="company_name"
            placeholder="Company Name"
            value={form.company_name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="contact_person"
            placeholder="Contact Person"
            value={form.contact_person}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="gst_number"
            placeholder="GST Number"
            value={form.gst_number}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

        </div>

        {/* Products */}

        <div>

          <h3 className="text-lg font-semibold mb-4">
            Products
          </h3>

          {items.map((item, index) => (

            <div key={index} className="border p-4 rounded mb-4 space-y-3">

              <select
                name="product_name"
                value={item.product_name}
                onChange={(e) => handleItemChange(index, e)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Product</option>

                {PRODUCTS.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>

              <input
                name="product_id"
                placeholder="Product ID"
                value={item.product_id}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />

              <div className="grid grid-cols-3 gap-4">

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  name="discount"
                  placeholder="Discount %"
                  value={item.discount}
                  onChange={(e) => handleItemChange(index, e)}
                  className="border p-2 rounded"
                />

              </div>

              <div className="text-right font-semibold">
                Line Total: ₹ {calculateLineTotal(item).toFixed(2)}
              </div>

              {items.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-600 text-sm"
                >
                  Remove Item
                </button>
              )}

            </div>

          ))}

          {items.length < 5 && (

            <button
              onClick={addItem}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              + Add Product
            </button>

          )}

        </div>

        {/* Grand Total */}

        <div className="text-right text-xl font-bold">
          Grand Total: ₹ {calculateGrandTotal().toFixed(2)}
        </div>

        {/* Generate Button */}

        <div className="text-right">

          <button
            onClick={handleGeneratePDF}
            className="bg-[#42B3A5] text-white px-6 py-3 rounded hover:opacity-90"
          >
            Generate Quotation PDF
          </button>

        </div>

      </div>

    </div>
  );
}