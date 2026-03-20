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

  const [paymentInput, setPaymentInput] = useState("");

  // Fetch invoices
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

  useEffect(() => {
    fetchInvoices();
  }, [page, search, fromDate, toDate]);

  const handleSelectInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setPaymentInput("");
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
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-gray-100 text-xs font-semibold px-4 py-2">
          <div>Company</div>
          <div>Invoice #</div>
          <div>Invoice Date</div>
          <div>Due Date</div>
          <div>Total</div>
          <div>Received</div>
          <div>Due</div>
          <div>Status</div>
          <div>Order #</div>
        </div>

        {invoices.map((inv) => {
          const total = Number(inv.total_amount || 0);
          const received = Number(inv.amount_received || 0);
          const due = total - received;

          let status = "No Payment";
          if (received > 0 && received < total) status = "Part Payment";
          if (received >= total) status = "Full Payment";

          return (
            <div
              key={inv.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-2 text-sm border-t cursor-pointer hover:bg-gray-50"
              onClick={() => handleSelectInvoice(inv)}
            >
              <div>{inv.company_name}</div>
              <div>{inv.invoice_number}</div>
              <div>
                {inv.invoice_date
                  ? new Date(inv.invoice_date).toLocaleDateString()
                  : "-"}
              </div>
              <div>
                {inv.due_date
                  ? new Date(inv.due_date).toLocaleDateString()
                  : "-"}
              </div>
              <div>{total.toFixed(2)}</div>
              <div>{received.toFixed(2)}</div>
              <div>{due.toFixed(2)}</div>
              <div
                className={`font-semibold ${
                  status === "Full Payment"
                    ? "text-green-600"
                    : status === "Part Payment"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {status}
              </div>
              <div>{inv.order_id}</div>
            </div>
          );
        })}
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

          {(() => {
            const total = Number(selectedInvoice.total_amount || 0);
            const received = Number(selectedInvoice.amount_received || 0);
            const due = total - received;

            let status = "No Payment";
            if (received > 0 && received < total) status = "Part Payment";
            if (received >= total) status = "Full Payment";

            return (
              <>
                <p><strong>Total:</strong> ₹{total.toFixed(2)}</p>

                {/* Payment Section */}
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Payment Details</h3>

                  <p><strong>Received:</strong> ₹{received.toFixed(2)}</p>
                  <p><strong>Due:</strong> ₹{due.toFixed(2)}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        status === "Full Payment"
                          ? "text-green-600"
                          : status === "Part Payment"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {status}
                    </span>
                  </p>

                  <div className="flex gap-2 mt-3">
                    <input
                      type="number"
                      placeholder="Enter payment"
                      value={paymentInput}
                      onChange={(e) => setPaymentInput(e.target.value)}
                      className="border p-2 rounded"
                    />

                    <button
                      onClick={async () => {
                        if (!paymentInput) return;

                        await fetch(
                          `/api/admin/invoices/${selectedInvoice.id}/payment`,
                          {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              amount: Number(paymentInput),
                            }),
                          }
                        );

                        setPaymentInput("");
                        await fetchInvoices();

                        const updated = invoices.find(
                          (i) => i.id === selectedInvoice.id
                        );
                        if (updated) setSelectedInvoice(updated);
                      }}
                      className="bg-blue-600 text-white px-3 rounded"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </>
            );
          })()}

          {/* Order Items */}
          {selectedInvoice.items && selectedInvoice.items.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">Product</th>
                      <th className="border px-2 py-1">Qty</th>
                      <th className="border px-2 py-1">Price</th>
                      <th className="border px-2 py-1">Disc Price</th>
                      <th className="border px-2 py-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-2 py-1">{item.product_name}</td>
                        <td className="border px-2 py-1">{item.quantity}</td>
                        <td className="border px-2 py-1">{parseFloat(item.price_offered).toFixed(2)}</td>
                        <td className="border px-2 py-1">
                          {item.discounted_price
                            ? parseFloat(item.discounted_price).toFixed(2)
                            : "-"}
                        </td>
                        <td className="border px-2 py-1">
                          {parseFloat(item.line_total).toFixed(2)}
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