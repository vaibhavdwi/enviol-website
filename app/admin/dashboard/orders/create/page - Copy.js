"use client";

import { useState, useEffect } from "react";

export default function CreateOrder() {

  const [products, setProducts] = useState([]);

  const [items, setItems] = useState([
    {
      product_name: "",
      product_id: "",
      quantity: 1,
      price_offered: "",
      discount_percent: 0,
    },
  ]);

  const [customer, setCustomer] = useState({
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

  const [loading, setLoading] = useState(false);

  // Load products from FG stock
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

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, field, value) => {

    const updated = [...items];

    updated[index][field] = value;

    setItems(updated);

  };

  const handleProductChange = (index, productName) => {

    const product = products.find((p) => p.name === productName);

    const updated = [...items];

    updated[index].product_name = product.name;
    updated[index].product_id = product.id;

    setItems(updated);

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
        price_offered: "",
        discount_percent: 0,
      },
    ]);

  };

  const calculateTotals = () => {

    let grandTotal = 0;

    const calculatedItems = items.map((item) => {

      const qty = Number(item.quantity);
      const price = Number(item.price_offered);
      const discount = Number(item.discount_percent);

      const discountAmount = (price * discount) / 100;
      const discounted_price = price - discountAmount;
      const line_total = discounted_price * qty;

      grandTotal += line_total;

      return {
        ...item,
        discounted_price,
        line_total,
      };

    });

    return { calculatedItems, grandTotal };

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    const { calculatedItems, grandTotal } = calculateTotals();

    try {

      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          items: calculatedItems,
          total_amount: grandTotal,
        }),
      });

      const data = await res.json();

      if (res.ok) {

        alert("Order Created Successfully");

        setItems([
          {
            product_name: "",
            product_id: "",
            quantity: 1,
            price_offered: "",
            discount_percent: 0,
          },
        ]);

        setCustomer({
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

  const { grandTotal } = calculateTotals();

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Create New Order
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-8 space-y-8 max-w-4xl"
      >

        {/* PRODUCTS */}

        <div className="space-y-6">

          <h3 className="text-lg font-semibold text-[#42B3A5]">
            Products
          </h3>

          {items.map((item, index) => (

            <div
              key={index}
              className="border rounded p-4 space-y-3"
            >

              <p className="font-semibold">
                Product {index + 1}
              </p>

              <select
                value={item.product_name}
                onChange={(e) =>
                  handleProductChange(index, e.target.value)
                }
                className="w-full border rounded px-4 py-3"
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
                className="w-full border rounded px-4 py-3 bg-gray-100"
              />

              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                placeholder="Quantity"
                className="w-full border rounded px-4 py-3"
              />

              <input
                type="number"
                value={item.price_offered}
                onChange={(e) =>
                  handleItemChange(index, "price_offered", e.target.value)
                }
                placeholder="Price per Unit"
                className="w-full border rounded px-4 py-3"
              />

              <input
                type="number"
                value={item.discount_percent}
                onChange={(e) =>
                  handleItemChange(index, "discount_percent", e.target.value)
                }
                placeholder="Discount %"
                className="w-full border rounded px-4 py-3"
              />

            </div>

          ))}

          <button
            type="button"
            onClick={addItem}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>

        </div>

        {/* TOTAL */}

        <div className="bg-gray-100 p-4 rounded">
          <p className="font-semibold">
            Order Total: ₹ {grandTotal.toFixed(2)}
          </p>
        </div>

        {/* CUSTOMER */}

        <div className="space-y-4">

          <h3 className="text-lg font-semibold text-[#42B3A5]">
            Customer Information
          </h3>

          {Object.keys(customer).map((field) => (

            <input
              key={field}
              name={field}
              value={customer[field]}
              onChange={handleCustomerChange}
              placeholder={field.replace("_", " ")}
              className="w-full border rounded px-4 py-3"
            />

          ))}

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#42B3A5] text-white px-8 py-3 rounded"
        >
          {loading ? "Saving..." : "Create Order"}
        </button>

      </form>

    </div>
  );
}