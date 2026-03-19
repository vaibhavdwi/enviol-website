"use client";

import { useEffect, useState } from "react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchInvoices = async () => {
    try {
      const res = await fetch(
        `/api/admin/invoices/fetch?page=${page}&search=${search}&fromDate=${fromDate}&toDate=${toDate}`
      );
      const data = await res.json();
      setInvoices(data.invoices || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [page, search, fromDate, toDate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search Company..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => { setFromDate(e.target.value); setPage(1); }}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => { setToDate(e.target.value); setPage(1); }}
          className="border p-2 rounded"
        />
        <button onClick={() => { setSearch(""); setFromDate(""); setToDate(""); setPage(1); }} className="bg-gray-200 px-3 rounded">
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] bg-gray-100 text-xs font-semibold px-4 py-2">
          <div>Company</div>
          <div>Invoice Date</div>
          <div>Amount</div>
          <div>Order ID</div>
          <div>Status</div>
          <div>Download</div>
        </div>

        {invoices.map((inv) => (
          <div key={inv.id}
               className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] px-4 py-2 text-sm border-t items-center cursor-pointer hover:bg-gray-50"
               onClick={() => setSelectedInvoice(inv)}>
            <div>{inv.company_name}</div>
            <div>{new Date(inv.invoice_date).toLocaleDateString()}</div>
            <div>{inv.total_amount != null ? Number(inv.total_amount).toFixed(2) : "-"}</div>
            <div>{inv.order_id}</div>
            <div>{inv.order_status}</div>
            <div>{inv.order_status === "Completed" ? <a href={`/api/admin/invoices/download/${inv.id}`} className="text-blue-600 hover:underline" target="_blank">Download</a> : "-"}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded">Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>

      {/* Invoice Summary */}
      {selectedInvoice && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold mb-2">{selectedInvoice.company_name}</h3>
          <p><strong>Contact:</strong> {selectedInvoice.contact_person || "-"}</p>
          <p><strong>Email:</strong> {selectedInvoice.email || "-"}</p>
          <p><strong>Phone:</strong> {selectedInvoice.phone || "-"}</p>
          <p><strong>Status:</strong> {selectedInvoice.order_status}</p>
          <p><strong>Invoice Amount:</strong> {Number(selectedInvoice.total_amount).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}