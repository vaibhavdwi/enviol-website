"use client";

import { useState, useEffect } from "react";

export default function QuotationPage() {

  const [products, setProducts] = useState([]);

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

  // ✅ FETCH PRODUCTS (SAFE FOR ALL API FORMATS)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/bom/products");
        const data = await res.json();

        console.log("PRODUCT API:", data); // debug once

        let productArray = [];

        if (Array.isArray(data)) {
          productArray = data;
        } else if (Array.isArray(data.products)) {
          productArray = data.products;
        } else if (Array.isArray(data.data)) {
          productArray = data.data;
        }

        // ✅ Normalize structure
        const normalized = productArray.map((p) => ({
          id: p.id || p.product_id,
          name: p.name || p.product_name,
        }));

        setProducts(normalized);

      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...items];
    const { name, value } = e.target;

    updatedItems[index][name] = value;

    // ✅ When product selected → set name also
    if (name === "product_id") {
      const selected = products.find((p) => p.id == value);

      updatedItems[index].product_name = selected
        ? selected.name
        : "";
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

    try {
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
        alert("Quotation generation failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "quotation.pdf";
      a.click();

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Create Quotation
      </h2>

      <div className="bg-white p-6 shadow rounded space-y-6">

        {/* Customer Details */}
        <div className="space-y-4">

          <input name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} className="w-full border p-3 rounded" />
          <input name="contact_person" placeholder="Contact Person" value={form.contact_person} onChange={handleChange} className="w-full border p-3 rounded" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-3 rounded" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border p-3 rounded" />
          <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full border p-3 rounded" />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full border p-3 rounded" />
          <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="w-full border p-3 rounded" />
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="w-full border p-3 rounded" />
          <input name="gst_number" placeholder="GST Number" value={form.gst_number} onChange={handleChange} className="w-full border p-3 rounded" />

        </div>

        {/* Products */}
        <div>

          <h3 className="text-lg font-semibold mb-4">
            Products
          </h3>

          {items.map((item, index) => (

            <div key={index} className="border p-4 rounded mb-4 space-y-3">

              <select
                name="product_id"
                value={item.product_id}
                onChange={(e) => handleItemChange(index, e)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>

              <input
                name="product_name"
                value={item.product_name}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />

              <div className="grid grid-cols-3 gap-4">

                <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} className="border p-2 rounded" />
                <input type="number" name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} className="border p-2 rounded" />
                <input type="number" name="discount" value={item.discount} onChange={(e) => handleItemChange(index, e)} className="border p-2 rounded" />

              </div>

              <div className="text-right font-semibold">
                Line Total: ₹ {calculateLineTotal(item).toFixed(2)}
              </div>

              {items.length > 1 && (
                <button onClick={() => removeItem(index)} className="text-red-600 text-sm">
                  Remove Item
                </button>
              )}

            </div>

          ))}

          {items.length < 5 && (
            <button onClick={addItem} className="bg-gray-200 px-4 py-2 rounded">
              + Add Product
            </button>
          )}

        </div>

        {/* Grand Total */}
        <div className="text-right text-xl font-bold">
          Grand Total: ₹ {calculateGrandTotal().toFixed(2)}
        </div>

        {/* Button */}
        <div className="text-right">
          <button
            onClick={handleGeneratePDF}
            className="bg-[#42B3A5] text-white px-6 py-3 rounded"
          >
            Generate Quotation PDF
          </button>
        </div>

      </div>

    </div>
  );
}