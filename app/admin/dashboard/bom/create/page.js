"use client";

import { useEffect, useState } from "react";

export default function CreateBOM() {

  const [productName, setProductName] = useState("");
  const [customProduct, setCustomProduct] = useState("");

  const [rmList, setRmList] = useState([]);

  const [items, setItems] = useState([
    { rm_item_name: "", ratio_percent: "" }
  ]);

  // ---------------- Fetch Raw Materials ----------------

  useEffect(() => {
    fetch("/api/admin/stock/rm/materials")
      .then(res => res.json())
      .then(data => setRmList(data.items || []));
  }, []);

  // ---------------- Handle RM Change ----------------

  const handleItemChange = (index, e) => {

    const updated = [...items];

    updated[index][e.target.name] = e.target.value;

    setItems(updated);
  };

  // ---------------- Add RM ----------------

  const addItem = () => {

    if (items.length >= 10) return;

    setItems([
      ...items,
      { rm_item_name: "", ratio_percent: "" }
    ]);
  };

  // ---------------- Remove RM ----------------

  const removeItem = (index) => {

    const updated = items.filter((_, i) => i !== index);

    setItems(updated);
  };

  // ---------------- Calculate Total Ratio ----------------

  const totalRatio = items.reduce(
    (sum, item) => sum + Number(item.ratio_percent || 0),
    0
  );

  // ---------------- Save BOM ----------------

  const handleSubmit = async () => {

    if (totalRatio !== 100) {
      alert("Total ratio must equal 100%");
      return;
    }

    const finalProductName =
      productName === "custom"
        ? customProduct
        : productName;

    if (!finalProductName) {
      alert("Please select product");
      return;
    }

    const payload = {
      product_name: finalProductName,
      items
    };

    const res = await fetch("/api/admin/bom/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {

      alert("BOM created successfully");

      setItems([{ rm_item_name: "", ratio_percent: "" }]);

    } else {

      alert(data.message || "Error creating BOM");
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Create BOM
      </h2>

      <div className="bg-white p-6 shadow rounded space-y-6">

        {/* Product Dropdown */}

        <div>

          <label className="block mb-2 font-semibold">
            Product
          </label>

          <select
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-3 rounded w-full"
          >
            <option value="">Select Product</option>
            <option value="RePolyester 2100">RePolyester 2100</option>
            <option value="RePolyester 2300">RePolyester 2300</option>
            <option value="RePolyester 2700">RePolyester 2700</option>
            <option value="RePolyether 3300">RePolyether 3300</option>
            <option value="RePolyether 4000">RePolyether 4000</option>
            <option value="custom">➕ Add New Product</option>
          </select>

          {productName === "custom" && (

            <input
              type="text"
              placeholder="Enter New Product Name"
              value={customProduct}
              onChange={(e) =>
                setCustomProduct(e.target.value)
              }
              className="border p-3 rounded w-full mt-3"
            />

          )}

        </div>

        {/* Raw Materials */}

        <div>

          <h3 className="font-semibold mb-3">
            Raw Materials
          </h3>

          {items.map((item, index) => (

            <div
              key={index}
              className="grid grid-cols-3 gap-4 mb-3"
            >

              <select
                name="rm_item_name"
                value={item.rm_item_name}
                onChange={(e) =>
                  handleItemChange(index, e)
                }
                className="border p-2 rounded"
              >

                <option value="">
                  Select Raw Material
                </option>

                {rmList.map((rm, i) => (

                  <option
                    key={i}
                    value={rm.item_name}
                  >
                    {rm.item_name}
                  </option>

                ))}

              </select>

              <input
                type="number"
                name="ratio_percent"
                placeholder="Ratio %"
                value={item.ratio_percent}
                onChange={(e) =>
                  handleItemChange(index, e)
                }
                className="border p-2 rounded"
              />

              <div className="flex gap-2">

                {items.length > 1 && (

                  <button
                    onClick={() =>
                      removeItem(index)
                    }
                    className="text-red-600"
                  >
                    Remove
                  </button>

                )}

              </div>

            </div>

          ))}

          <button
            onClick={addItem}
            className="bg-gray-200 px-4 py-2 rounded mt-2"
          >
            + Add Raw Material
          </button>

        </div>

        {/* Ratio Total */}

        <div className="text-right font-semibold">

          Total Ratio: {totalRatio} %

        </div>

        {/* Submit */}

        <div className="text-right">

          <button
            onClick={handleSubmit}
            className="bg-[#42B3A5] text-white px-6 py-3 rounded"
          >
            Save BOM
          </button>

        </div>

      </div>

    </div>
  );
}