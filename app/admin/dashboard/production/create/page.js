"use client";

import { useState, useEffect } from "react";

export default function CreateBatchPlan() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [jobCards, setJobCards] = useState([]);
  const [selectedJobCards, setSelectedJobCards] = useState([]);
  const [batchPlan, setBatchPlan] = useState({
    batch_plan_number: "",
    batch_date: new Date().toISOString().split("T")[0], // default today
  });
  const [loading, setLoading] = useState(false);

  // Load products
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

  // Fetch job cards when selected products change
  useEffect(() => {
    if (selectedProducts.length === 0) {
      setJobCards([]);
      return;
    }

    fetch("/api/admin/production/job_cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: selectedProducts }),
    })
      .then((res) => res.json())
      .then((data) => setJobCards(data.job_cards || []))
      .catch((err) => console.error("Failed to fetch job cards:", err));
  }, [selectedProducts]);

  const handleBatchPlanChange = (e) => {
    setBatchPlan({ ...batchPlan, [e.target.name]: e.target.value });
  };

  const toggleJobCard = (id) => {
    setSelectedJobCards((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!batchPlan.batch_plan_number || selectedJobCards.length === 0) {
      alert("Enter batch plan number and select job cards");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/production/batch_plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batchPlan,
          job_card_ids: selectedJobCards,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Batch Plan Created Successfully!");

        // Reset form
        setBatchPlan({
          batch_plan_number: "",
          batch_date: new Date().toISOString().split("T")[0],
        });
        setSelectedProducts([]);
        setJobCards([]);
        setSelectedJobCards([]);
      } else {
        alert(data.message || "Error creating batch plan");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Create New Batch Plan
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-8 space-y-8 max-w-4xl"
      >
        {/* Batch Plan Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#42B3A5]">
            Batch Plan Information
          </h3>
          <input
            name="batch_plan_number"
            value={batchPlan.batch_plan_number}
            onChange={handleBatchPlanChange}
            placeholder="Batch Plan Number"
            className="w-full border rounded px-4 py-3"
            required
          />
          <input
            type="date"
            name="batch_date"
            value={batchPlan.batch_date}
            onChange={handleBatchPlanChange}
            className="w-full border rounded px-4 py-3"
          />
        </div>

        {/* Product Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#42B3A5]">
            Select Products
          </h3>
          <select
            multiple
            value={selectedProducts}
            onChange={(e) =>
              setSelectedProducts(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            className="w-full border rounded px-4 py-3 h-32"
          >
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Job Cards Table */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#42B3A5]">
            Select Job Cards
          </h3>
          <div className="overflow-x-auto border rounded">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Select</th>
                  <th className="px-4 py-2">Job Number</th>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Batch Size</th>
                  <th className="px-4 py-2">Operator</th>
                </tr>
              </thead>
              <tbody>
                {jobCards.length > 0 ? (
                  jobCards.map((jc) => (
                    <tr key={jc.id} className="border-b">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedJobCards.includes(jc.id)}
                          onChange={() => toggleJobCard(jc.id)}
                        />
                      </td>
                      <td className="px-4 py-2">{jc.job_number}</td>
                      <td className="px-4 py-2">{jc.product_name}</td>
                      <td className="px-4 py-2">{jc.batch_size}</td>
                      <td className="px-4 py-2">{jc.operator_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-2 text-center text-gray-400"
                    >
                      No job cards found. Select products to load job cards.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || selectedJobCards.length === 0}
          className="bg-[#42B3A5] text-white px-8 py-3 rounded"
        >
          {loading ? "Saving..." : "Create Batch Plan"}
        </button>
      </form>
    </div>
  );
}