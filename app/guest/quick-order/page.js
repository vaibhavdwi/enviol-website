"use client";

import { useState, useEffect } from "react";

export default function GuestOrder() {

  const [products, setProducts] = useState([]);

  const [items, setItems] = useState([
    { product_name: "", product_id: "", quantity: 1 },
  ]);

  const [customer, setCustomer] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.products || []).map((p) => ({
          name: p.item_name,
          id: p.item_name.match(/\d+/)?.[0] || "",
        }));
        setProducts(formatted);
      });
  }, []);

  const handleProductChange = (index, productName) => {
    const product = products.find((p) => p.name === productName);
    const updated = [...items];
    updated[index].product_name = product.name;
    updated[index].product_id = product.id;
    setItems(updated);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    if (items.length >= 5) {
      alert("Maximum 5 products allowed");
      return;
    }
    setItems([...items, { product_name: "", product_id: "", quantity: 1 }]);
  };

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/guest/quick-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer, items }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order submitted successfully!");
      } else {
        alert(data.message || "Error");
      }

    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <main className="container mx-auto px-6 py-12 bg-yellow-50">

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Quick Order Management
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* PRODUCTS */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#42b3a5]">
              Select Products
            </h2>

            {items.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-3">

                <select
                  value={item.product_name}
                  onChange={(e) =>
                    handleProductChange(index, e.target.value)
                  }
                  className="w-full border px-4 py-3 rounded"
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <input
                  value={item.product_id}
                  readOnly
                  placeholder="Product ID"
                  className="w-full border px-4 py-3 bg-gray-100 rounded"
                />

                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  placeholder="Quantity"
                  className="w-full border px-4 py-3 rounded"
                  min="1"
                />

              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="bg-green-600 text-white px-4 py-2 rounded hover:scale-105 transition"
            >
              + Add Product
            </button>
          </div>

          {/* CUSTOMER */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#42b3a5]">
              Customer Information
            </h2>

            {Object.keys(customer).map((field) => (
              <input
                key={field}
                name={field}
                value={customer[field]}
                onChange={handleCustomerChange}
                placeholder={field.replace("_", " ")}
                className="w-full border px-4 py-3 rounded"
              />
            ))}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#42b3a5] text-white px-6 py-3 rounded w-full font-semibold hover:scale-105 transition"
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>

        </form>

      </div>

    </main>
  );
}