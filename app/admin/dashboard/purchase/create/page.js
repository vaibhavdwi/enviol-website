"use client";

import { useState } from "react";

export default function CreatePurchase() {

  const [supplier, setSupplier] = useState({
    supplier_name: "",
    contact_person: "",
    email: "",
    phone: "",
    gst_number: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [items, setItems] = useState([
    { product_name: "", quantity: 1, price: 0, discount: 0 }
  ]);

  const handleSupplierChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value
    });
  };

  const handleItemChange = (index, e) => {

    const updated = [...items];

    updated[index][e.target.name] = e.target.value;

    setItems(updated);
  };

  const addItem = () => {

    if (items.length >= 5) {
      alert("Maximum 5 products allowed");
      return;
    }

    setItems([
      ...items,
      { product_name: "", quantity: 1, price: 0, discount: 0 }
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
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

  const handleSubmit = async () => {

    const payload = {
      supplier,
      items
    };

    const res = await fetch("/api/admin/purchase/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {

      alert("Purchase Created");

      window.open(
        `/api/admin/purchase/download/${data.purchase.id}`,
        "_blank"
      );

    } else {

      alert(data.message);

    }

  };

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Create Purchase Order
      </h2>

      <div className="bg-white p-6 rounded shadow space-y-6">

        {/* Supplier Details */}

        <div className="space-y-3">

          <input
            name="supplier_name"
            placeholder="Supplier Name"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="contact_person"
            placeholder="Contact Person"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="gst_number"
            placeholder="GST Number"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="address"
            placeholder="Address"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />
		  
   <input
            name="city"
            placeholder="City"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="state"
            placeholder="State"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="pincode"
            placeholder="Pin Code"
            onChange={handleSupplierChange}
            className="w-full border p-3 rounded"
          />


        </div>

        {/* Products */}

        <div>

          <h3 className="text-lg font-semibold mb-4">
            Products
          </h3>

          {items.map((item, index) => (

            <div key={index} className="border p-4 mb-4 rounded space-y-3">

              <input
                name="product_name"
                placeholder="Product Name"
                value={item.product_name}
                onChange={(e)=>handleItemChange(index,e)}
                className="w-full border p-2 rounded"
              />

              <div className="grid grid-cols-3 gap-4">

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e)=>handleItemChange(index,e)}
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Purchase Price"
                  value={item.price}
                  onChange={(e)=>handleItemChange(index,e)}
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  name="discount"
                  placeholder="Discount %"
                  value={item.discount}
                  onChange={(e)=>handleItemChange(index,e)}
                  className="border p-2 rounded"
                />

              </div>

              <div className="text-right font-semibold">

                Line Total: ₹ {calculateLineTotal(item).toFixed(2)}

              </div>

              {items.length > 1 && (

                <button
                  onClick={()=>removeItem(index)}
                  className="text-red-600 text-sm"
                >
                  Remove
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

        <div className="text-right">

          <button
            onClick={handleSubmit}
            className="bg-[#42B3A5] text-white px-6 py-3 rounded"
          >
            Create Purchase Order
          </button>

        </div>

      </div>

    </div>

  );

}