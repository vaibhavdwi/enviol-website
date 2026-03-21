"use client";

import { useEffect, useState } from "react";

export default function ViewBatchPlan() {
  const [batchPlans, setBatchPlans] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [jobCards, setJobCards] = useState([]);

  const [filters, setFilters] = useState({
    date: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Format DB → input
  const formatForInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);

    return local.toISOString().slice(0, 16);
  };

  // ✅ Format for display (PRINT + CSV)
  const formatForDisplay = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Convert to ISO before saving
  const convertToISO = (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  };

  // ✅ Fetch batch plans
  const fetchBatchPlans = async () => {
    try {
      let query = "?";

      if (filters.date) query += `date=${filters.date}&`;
      if (filters.status) query += `status=${filters.status}`;

      const res = await fetch(`/api/admin/production/batch_plan${query}`);
      const data = await res.json();

      setBatchPlans(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch job cards
  const fetchJobCards = async (batchId) => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/production/batch_plan/job_cards", {
        method: "POST",
        body: JSON.stringify({ batch_plan_id: batchId }),
      });

      const data = await res.json();
      setJobCards(data.job_cards);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchPlans();
  }, [filters]);

  useEffect(() => {
    if (selectedBatch?.id) {
      fetchJobCards(selectedBatch.id);
    }
  }, [selectedBatch]);

  // ✅ Handle change
  const handleChange = (index, field, value) => {
    const updated = [...jobCards];

    if (field === "status") {
      if (value === "In Progress" && !updated[index].start_time) {
        updated[index].start_time = new Date().toISOString();
      }

      if (value === "Done" && !updated[index].end_time) {
        updated[index].end_time = new Date().toISOString();
      }
    }

    updated[index][field] = value;
    setJobCards(updated);
  };

  // ✅ Save
  const handleSave = async () => {
    try {
      setLoading(true);

      await fetch("/api/admin/production/batch_plan/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batch_plan_id: selectedBatch.id,
          batch_status: selectedBatch.status,
          job_card_updates: jobCards.map((jc) => ({
            ...jc,
            start_time: convertToISO(jc.start_time),
            end_time: convertToISO(jc.end_time),
          })),
        }),
      });

      alert("✅ Updated successfully");
      fetchJobCards(selectedBatch.id);

    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Export CSV
  const exportToCSV = () => {
    if (!selectedBatch || jobCards.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Batch Plan",
      "Job Number",
      "Product",
      "Batch Size",
      "Operator",
      "Status",
      "Start Time",
      "End Time",
      "Remarks",
    ];

    const rows = jobCards.map((jc) => [
      selectedBatch.batch_plan_number,
      jc.job_number,
      jc.product_name,
      jc.batch_size,
      jc.operator_name,
      jc.status,
      formatForDisplay(jc.start_time),
      formatForDisplay(jc.end_time),
      jc.remarks || "",
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${selectedBatch.batch_plan_number}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Print
  const handlePrint = () => {
    if (!selectedBatch) return;

    const printWindow = window.open("", "", "width=900,height=650");

    const html = `
      <html>
      <head>
        <title>Batch Report</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 6px; font-size: 12px; }
          th { background: #eee; }
        </style>
      </head>
      <body>
        <h2>Batch Plan: ${selectedBatch.batch_plan_number}</h2>
        <p>Status: ${selectedBatch.status}</p>

        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Product</th>
              <th>Batch Size</th>
              <th>Operator</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${jobCards.map((jc) => `
              <tr>
                <td>${jc.job_number}</td>
                <td>${jc.product_name}</td>
                <td>${jc.batch_size}</td>
                <td>${jc.operator_name}</td>
                <td>${jc.status}</td>
                <td>${formatForDisplay(jc.start_time)}</td>
                <td>${formatForDisplay(jc.end_time)}</td>
                <td>${jc.remarks || ""}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Batch Plan Tracker</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, date: e.target.value })
          }
        />

        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option>Draft</option>
          <option>Initialise</option>
          <option>In Process</option>
          <option>Completion</option>
        </select>
      </div>

      {/* Batch Dropdown */}
      <select
        className="border p-2 rounded w-full mb-4"
        onChange={(e) =>
          setSelectedBatch(
            batchPlans.find((bp) => bp.id == e.target.value)
          )
        }
      >
        <option value="">Select Batch Plan</option>
        {batchPlans.map((bp) => (
          <option key={bp.id} value={bp.id}>
            {bp.batch_plan_number}
          </option>
        ))}
      </select>

      {/* Batch Status */}
      {selectedBatch && (
        <div className="mb-4 flex items-center gap-4">
          <span className="font-medium">Batch Status:</span>

          <select
            value={selectedBatch.status || "Draft"}
            onChange={(e) =>
              setSelectedBatch({
                ...selectedBatch,
                status: e.target.value,
              })
            }
            className="border p-2 rounded"
          >
            <option>Draft</option>
            <option>Initialise</option>
            <option>In Process</option>
            <option>Completion</option>
          </select>
        </div>
      )}

      {/* Export + Print */}
      {selectedBatch && (
        <div className="flex gap-3 mb-4">
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>

          <button
            onClick={handlePrint}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Print
          </button>
        </div>
      )}

      {/* Table */}
      {loading && <p>Loading...</p>}

      {!loading && jobCards.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border w-[120px]">Job #</th>
                <th className="p-2 border w-[200px]">Product</th>
                <th className="p-2 border w-[120px]">Batch Size</th>
                <th className="p-2 border w-[150px]">Operator</th>
                <th className="p-2 border w-[140px]">Status</th>
                <th className="p-2 border w-[180px]">Start Time</th>
                <th className="p-2 border w-[180px]">End Time</th>
                <th className="p-2 border w-[320px]">Remarks / Issue</th>
              </tr>
            </thead>

            <tbody>
              {jobCards.map((jc, index) => (
                <tr key={jc.id}>
                  <td className="p-2 border">{jc.job_number}</td>
                  <td className="p-2 border">{jc.product_name}</td>
                  <td className="p-2 border">{jc.batch_size}</td>
                  <td className="p-2 border">{jc.operator_name}</td>

                  <td className="p-2 border">
                    <select
                      value={jc.status || "New"}
                      onChange={(e) =>
                        handleChange(index, "status", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    >
                      <option>New</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </select>
                  </td>

                  <td className="p-2 border">
                    <input
                      type="datetime-local"
                      value={formatForInput(jc.start_time)}
                      onChange={(e) =>
                        handleChange(index, "start_time", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>

                  <td className="p-2 border">
                    <input
                      type="datetime-local"
                      value={formatForInput(jc.end_time)}
                      onChange={(e) =>
                        handleChange(index, "end_time", e.target.value)
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>

                  <td className="p-2 border">
                    <textarea
                      value={jc.remarks || ""}
                      onChange={(e) =>
                        handleChange(index, "remarks", e.target.value)
                      }
                      className="border p-2 rounded w-full h-20"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Save */}
      {selectedBatch && (
        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Updates
        </button>
      )}
    </div>
  );
}