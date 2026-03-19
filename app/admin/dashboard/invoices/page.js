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

  // Fetch invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(
          `/api/admin/invoices/list?page=${page}&search=${search}&fromDate=${fromDate}&toDate=${toDate}`
        );
        const data = await res.json();
        setInvoices(data.invoices || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
    };

    fetchInvoices();
  }, [page, search, fromDate, toDate]);

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search Company / Order #..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => {
            setPage(1);
            setFromDate(e.target.value);
          }}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => {
            setPage(1);
            setToDate(e.target.value);
          }}
          className="border p-2 rounded"
        />
        <button
          onClick={() => {
            setSearch("");
            setFromDate("");
            setToDate("");
            setPage(1);
          }}
          className="bg-gray-200 px-3 rounded"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] bg-gray-100 text-xs font-semibold px-4 py-2">
          <div>Company</div>
          <div>Invoice #</div>
          <div>Invoice Date</div>
          <div>Due Date</div>
          <div>Total Amount</div>
          <div>Order #</div>
        </div>

        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-2 text-sm border-t cursor-pointer hover:bg-gray-50"
            onClick={() => handleSelectInvoice(inv)}
          >
            <div>{inv.company_name}</div>
            <div>{inv.invoice_number}</div>
            <div>{inv.invoice_date ? new Date(inv.invoice_date).toLocaleDateString() : "-"}</div>
            <div>{inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "-"}</div>
            <div>
              {inv.total_amount != null ? parseFloat(inv.total_amount).toFixed(2) : "-"}
            </div>
            <div>{inv.order_id}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>

      {/* Selected Invoice Summary */}
      {selectedInvoice && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-2">Invoice Summary</h2>
          <p><strong>Company:</strong> {selectedInvoice.company_name}</p>
          <p><strong>Contact:</strong> {selectedInvoice.contact_person}</p>
          <p><strong>Email:</strong> {selectedInvoice.email}</p>
          <p><strong>Phone:</strong> {selectedInvoice.phone}</p>
          <p><strong>Invoice #:</strong> {selectedInvoice.invoice_number}</p>
          <p><strong>Invoice Date:</strong> {selectedInvoice.invoice_date ? new Date(selectedInvoice.invoice_date).toLocaleDateString() : "-"}</p>
          <p><strong>Due Date:</strong> {selectedInvoice.due_date ? new Date(selectedInvoice.due_date).toLocaleDateString() : "-"}</p>
          <p><strong>Total Amount:</strong> {selectedInvoice.total_amount != null ? parseFloat(selectedInvoice.total_amount).toFixed(2) : "-"}</p>

          {/* Order Items Table */}
          {selectedInvoice.items && selectedInvoice.items.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1 text-left">Product Name</th>
                      <th className="border px-2 py-1 text-left">Qty</th>
                      <th className="border px-2 py-1 text-left">Price</th>
                      <th className="border px-2 py-1 text-left">Discounted Price</th>
                      <th className="border px-2 py-1 text-left">Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-2 py-1">{item.product_name}</td>
                        <td className="border px-2 py-1">{item.quantity}</td>
                        <td className="border px-2 py-1">{parseFloat(item.price_offered).toFixed(2)}</td>
                        <td className="border px-2 py-1">
                          {item.discounted_price != null ? parseFloat(item.discounted_price).toFixed(2) : "-"}
                        </td>
                        <td className="border px-2 py-1">
                          {item.line_total != null ? parseFloat(item.line_total).toFixed(2) : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}