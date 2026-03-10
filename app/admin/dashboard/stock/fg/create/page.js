"use client";

import { useState } from "react";

export default function CreateFGStock() {

  const [stockDate, setStockDate] = useState("");

  const [items, setItems] = useState([
    { item_name: "", quantity: "", unit: "kg", status: "In Stock" }
  ]);

  // ---------------- Handle Change ----------------

  const handleItemChange = (index, e) => {

    const updated = [...items];

    updated[index][e.target.name] = e.target.value;

    setItems(updated);

  };

  // ---------------- Add Item ----------------

  const addItem = () => {

    if (items.length >= 10) {
      alert("Maximum 10 items allowed");
      return;
    }

    setItems([
      ...items,
      { item_name: "", quantity: "", unit: "kg", status: "In Stock" }
    ]);

  };

  // ---------------- Remove Item ----------------

  const removeItem = (index) => {

    const updated = items.filter((_, i) => i !== index);

    setItems(updated);

  };

  // ---------------- Submit ----------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {
      stock_date: stockDate,
      items
    };

    const res = await fetch("/api/admin/stock/fg/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {

      alert("Stock added successfully");

      setItems([
        { item_name: "", quantity: "", unit: "kg", status: "In Stock" }
      ]);

      setStockDate("");

    }

  };

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Add Finished Material Stock
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-3xl space-y-6"
      >

        {/* Stock Date */}

        <input
          type="date"
          value={stockDate}
          onChange={(e) => setStockDate(e.target.value)}
          className="border p-3 rounded w-full"
          required
        />

        {/* Items */}

        {items.map((item, index) => (

          <div
            key={index}
            className="border p-4 rounded space-y-3"
          >

            <div className="grid grid-cols-4 gap-3">

              <input
                name="item_name"
                placeholder="Item Name"
                value={item.item_name}
                onChange={(e) => handleItemChange(index, e)}
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                className="border p-2 rounded"
                required
              />

              <select
                name="unit"
                value={item.unit}
                onChange={(e) => handleItemChange(index, e)}
                className="border p-2 rounded"
              >
                <option value="kg">Kg</option>
                <option value="ton">Ton</option>
                <option value="pcs">Pieces</option>
              </select>

              <select
                name="status"
                value={item.status}
                onChange={(e) => handleItemChange(index, e)}
                className="border p-2 rounded"
              >
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>

            </div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            )}

          </div>

        ))}

        {/* Add Item */}

        <button
          type="button"
          onClick={addItem}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          + Add Item
        </button>

        {/* Submit */}

        <button
          type="submit"
          className="bg-[#42B3A5] text-white px-6 py-3 rounded"
        >
          Save Stock
        </button>

      </form>

    </div>

  );

}