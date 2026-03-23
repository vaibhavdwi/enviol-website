"use client";

import { useEffect, useState } from "react";

export default function QuotationViewPage() {

  const [quotations, setQuotations] = useState([]);
  const [selected, setSelected] = useState(null);

  // ✅ FETCH DATA
  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const res = await fetch("/api/admin/quotation/list");
      const data = await res.json();

      let arr = [];

      if (Array.isArray(data)) arr = data;
      else if (Array.isArray(data.data)) arr = data.data;
      else if (Array.isArray(data.quotations)) arr = data.quotations;

      // ✅ sort latest first
      arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setQuotations(arr);

    } catch (err) {
      console.error(err);
      setQuotations([]);
    }
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch("/api/admin/quotation/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) {
        alert("Failed to update status");
        return;
      }

      alert("Status updated");

      fetchQuotations();

      // update selected also
      if (selected) {
        setSelected({ ...selected, status });
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Quotation List
      </h2>

      <div className="bg-white p-6 shadow rounded">

        {/* TABLE */}
        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Quotation No</th>
              <th className="p-3">Company</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>

            {Array.isArray(quotations) && quotations.map((q) => (

              <tr key={q.id} className="border-t">

                <td className="p-3">{q.quotation_number}</td>
                <td className="p-3">{q.company_name}</td>
                <td className="p-3">
                  {new Date(q.created_at).toLocaleDateString()}
                </td>
                <td className="p-3">₹ {q.total_amount}</td>
                <td className="p-3">{q.status || "Pending"}</td>

                <td className="p-3">
                  <button
                    onClick={() => setSelected(q)}
                    className="text-blue-600"
                  >
                    View Details
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {selected && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-[700px] max-h-[90vh] overflow-auto">

            <h3 className="text-xl font-bold mb-4">
              Quotation #{selected.quotation_number}
            </h3>

            <p><b>Company:</b> {selected.company_name}</p>
            <p><b>Contact:</b> {selected.contact_person}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Phone:</b> {selected.phone}</p>

            <hr className="my-4" />

            {/* ITEMS */}
            <table className="w-full border mb-4">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Product</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Discount</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>

              <tbody>

                {Array.isArray(selected.items) && selected.items.map((item, i) => {

                  const total = item.quantity * item.price;
                  const discount = (total * item.discount) / 100;

                  return (
                    <tr key={i} className="border-t">
                      <td className="p-2">{item.product_name}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{item.price}</td>
                      <td className="p-2">{item.discount}%</td>
                      <td className="p-2">
                        ₹ {(total - discount).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}

              </tbody>

            </table>

            <div className="text-right font-bold text-lg">
              Total: ₹ {selected.total_amount}
            </div>

            {/* STATUS UPDATE */}
            <div className="mt-6">

              <label className="mr-2 font-semibold">Update Status:</label>

              <select
                value={selected.status || "Pending"}
                onChange={(e) =>
                  updateStatus(selected.id, e.target.value)
                }
                className="border p-2 rounded"
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>

            </div>

            {/* CLOSE */}
            <div className="text-right mt-6">
              <button
                onClick={() => setSelected(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}