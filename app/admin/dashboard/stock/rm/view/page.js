"use client";

import { useEffect, useState } from "react";

export default function ViewRMStock() {

  const [stocks, setStocks] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const statusColor = (status) => {
    if (status === "In Stock") return "text-green-600";
    if (status === "Low Stock") return "text-yellow-600";
    if (status === "Out of Stock") return "text-red-600";
    return "text-gray-600";
  };

  const fetchStock = async () => {

    let url = "/api/admin/stock/rm/list";

    if (fromDate && toDate) {
      url += `?from=${fromDate}&to=${toDate}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setStocks(data.stocks || []);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const toggleSelect = (id) => {

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );

  };

  const handleChange = (index, field, value) => {

    const updated = [...stocks];
    updated[index][field] = value;

    setStocks(updated);

  };

  const updateSelected = async () => {

    const selectedStocks = stocks.filter((s) =>
      selectedIds.includes(s.id)
    );

    if (selectedStocks.length === 0) {
      alert("Please select records to update");
      return;
    }

    await fetch("/api/admin/stock/rm/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stocks: selectedStocks })
    });

    alert("Stock updated successfully");

    setSelectedIds([]);

    fetchStock();

  };

  const exportCSV = () => {

    let csv = "Stock Date,Last Updated,Item,Quantity,Unit,Status\n";

    stocks.forEach((s) => {
      csv += `${formatDate(s.stock_date)},${formatDate(s.created_at)},${s.item_name},${s.quantity},${s.unit},${s.status}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "rm_stock_report.csv";

    a.click();
  };

const printReport = () => {

  const today = new Date().toLocaleDateString("en-IN");

  const reportTitle =
    "Raw Material Stock Report";

  const dateRange =
    fromDate && toDate
      ? `${new Date(fromDate).toLocaleDateString("en-IN")} - ${new Date(toDate).toLocaleDateString("en-IN")}`
      : "All Dates";

  let rows = "";

  stocks.forEach((s, i) => {

    rows += `
      <tr>
        <td>${i + 1}</td>
        <td>${formatDate(s.stock_date)}</td>
        <td>${formatDate(s.created_at)}</td>
        <td>${s.item_name}</td>
        <td>${s.quantity}</td>
        <td>${s.unit}</td>
        <td>${s.status}</td>
      </tr>
    `;

  });

  const html = `
  <html>
  <head>
    <title>${reportTitle}</title>

    <style>

      body{
        font-family: Arial;
        padding:30px;
      }

      h1{
        margin-bottom:5px;
      }

      h2{
        margin-top:0;
        color:#444;
      }

      table{
        width:100%;
        border-collapse:collapse;
        margin-top:20px;
      }

      th,td{
        border:1px solid #999;
        padding:8px;
        text-align:left;
      }

      th{
        background:#eee;
      }

      .header{
        text-align:center;
      }

    </style>

  </head>

  <body>

    <div class="header">
      <h1>Enviol Polytech Solutions Pvt Ltd</h1>
      <h2>${reportTitle}</h2>
      <p>Date Range: ${dateRange}</p>
      <p>Printed On: ${today}</p>
    </div>

    <table>

      <thead>
        <tr>
          <th>#</th>
          <th>Stock Date</th>
          <th>Last Updated</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        ${rows}

      </tbody>

    </table>

  </body>
  </html>
  `;

  const win = window.open("", "", "width=900,height=700");

  win.document.write(html);

  win.document.close();

  win.print();
};

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Raw Material Stock
      </h2>

      <div className="flex gap-3 mb-4">

        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border p-2 rounded" />

        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border p-2 rounded" />

        <button onClick={fetchStock} className="bg-[#42B3A5] text-white px-4 py-2 rounded">
          Filter
        </button>

        <button onClick={exportCSV} className="bg-gray-200 px-4 py-2 rounded">
          Export CSV
        </button>

        <button onClick={printReport} className="bg-gray-200 px-4 py-2 rounded">
          Print
        </button>

      </div>

      <div id="stockTable" className="bg-white shadow rounded-lg overflow-hidden">

        <div className="grid grid-cols-8 bg-gray-100 text-xs font-semibold px-4 py-3">

          <div></div>
          <div>Stock Date</div>
          <div>Last Updated</div>
          <div>Item</div>
          <div>Qty</div>
          <div>Unit</div>
          <div>Status</div>
          <div>Indicator</div>

        </div>

        {stocks.map((stock, index) => (

          <div key={stock.id} className="grid grid-cols-8 px-4 py-3 text-sm border-t items-center">

            <div>
              <input
                type="checkbox"
                checked={selectedIds.includes(stock.id)}
                onChange={() => toggleSelect(stock.id)}
              />
            </div>

            <div>{formatDate(stock.stock_date)}</div>

            <div>{formatDate(stock.created_at)}</div>

            <div>{stock.item_name}</div>

            <div>
              <input
                type="number"
                value={stock.quantity}
                onChange={(e) => handleChange(index, "quantity", e.target.value)}
                className="border rounded px-2 py-1 w-20"
              />
            </div>

            <div>{stock.unit}</div>

            <div>
              <select
                value={stock.status}
                onChange={(e) => handleChange(index, "status", e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            <div className={`font-semibold ${statusColor(stock.status)}`}>
              {stock.status}
            </div>

          </div>

        ))}

      </div>

      <div className="mt-4">

        <button
          onClick={updateSelected}
          className="bg-[#42B3A5] text-white px-6 py-2 rounded"
        >
          Update Selected
        </button>

      </div>

    </div>

  );

}