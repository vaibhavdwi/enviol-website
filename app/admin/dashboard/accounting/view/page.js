"use client";

import { useState, useEffect } from "react";

export default function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  // Fetch years
  const fetchYears = async () => {
    try {
      const res = await fetch("/api/admin/accounting/years");
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        setYears(data);
        setSelectedYear(data[0]);
      }
    } catch (err) {
      console.error(err);
      setYears([]);
    }
  };

  // Fetch months for selected year
  const fetchMonths = async () => {
    if (!selectedYear) return;
    try {
      const res = await fetch(`/api/admin/accounting/months?year=${selectedYear}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMonths(data);
        setSelectedMonths(data.map(m => m.month));
      } else {
        setMonths([]);
        setSelectedMonths([]);
      }
    } catch (err) {
      console.error(err);
      setMonths([]);
      setSelectedMonths([]);
    }
  };

  // Fetch categories and groups
  const fetchCategoriesGroups = async () => {
    try {
      const res = await fetch("/api/admin/accounting/categories");
      const data = await res.json();
      setCategories(Array.isArray(data.categories) ? data.categories : []);
      setGroups(Array.isArray(data.groups) ? data.groups : []);
    } catch (err) {
      console.error(err);
      setCategories([]);
      setGroups([]);
    }
  };

  // Fetch expenses based on filters
  const fetchExpenses = async () => {
    if (!selectedYear || selectedMonths.length === 0) {
      setExpenses([]);
      return;
    }

    const query = new URLSearchParams();
    query.append("year", selectedYear);
    query.append("months", selectedMonths.join(","));
    if (selectedCategory) query.append("category", selectedCategory);
    if (selectedGroup) query.append("group", selectedGroup);

    try {
      const res = await fetch(`/api/admin/accounting/view?${query.toString()}`);
      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setExpenses([]);
    }
  };

  useEffect(() => { fetchYears(); fetchCategoriesGroups(); }, []);
  useEffect(() => { fetchMonths(); }, [selectedYear]);
  useEffect(() => { fetchExpenses(); }, [selectedYear, selectedMonths, selectedCategory, selectedGroup]);

  const handleMonthChange = (month) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter(m => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  // Totals
  const groupTotals = expenses.reduce((acc, e) => {
    if (!acc[e.group]) acc[e.group] = 0;
    acc[e.group] += Number(e.amount);
    return acc;
  }, {});

  const grandTotal = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // Export CSV
  const exportCSV = () => {
    if (!expenses.length) return;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Group,Category,Amount,Date,Incurred For,Reason,Notes\n";
    expenses.forEach(e => {
      csvContent += `${e.group},${e.category},${e.amount},${new Date(e.expense_date).toLocaleDateString()},${e.incurred_for || ""},${e.reason || ""},${e.notes || ""}\n`;
    });
    csvContent += "\nGroup Totals,,,\n";
    Object.keys(groupTotals).forEach(g => {
      csvContent += `${g},,${groupTotals[g].toFixed(2)}\n`;
    });
    csvContent += `Grand Total,,${grandTotal.toFixed(2)}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `expenses_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  // Print report
  const printReport = () => {
    if (!expenses.length) return;
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Expenses Report</title></head><body>");

    // Header
    printWindow.document.write(`
      <div style="display:flex; align-items:center; margin-bottom:20px;">
        <img src="/images/logo.png" style="height:60px; margin-right:20px;" />
        <h2 style="margin:0;">Enviol Polytech Solutions</h2>
      </div>
    `);

    // Table
    const tableHtml = document.getElementById("expensesTable").outerHTML;
    printWindow.document.write(`
      <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #000; padding: 6px; }
        th { background-color: #f0f0f0; }
      </style>
    `);
    printWindow.document.write(tableHtml);

    // Signatures
    printWindow.document.write(`
      <div style="margin-top:50px; display:flex; justify-content:flex-end; flex-direction:column; align-items:flex-end;">
        <p>Accountant Signature: ___________________</p>
        <p>Chartered Accountant Signature: ___________________</p>
        <p>Authorised Stamp/Seal: ___________________</p>
        <p>Date: __/__/____</p>
        <p>Place: Lucknow</p>
      </div>
    `);

    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Sort expenses by group
  const sortedExpenses = [...expenses].sort((a, b) => a.group.localeCompare(b.group));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#42B3A5]">View Expenses</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4 items-start md:items-center">
        {/* Year */}
        <div>
          <label className="font-semibold mr-2">Year:</label>
          <select
            value={selectedYear || ""}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Months */}
        <div className="flex gap-2 flex-wrap">
          {months
            .filter(m => m.year === selectedYear)
            .map(m => (
              <label key={m.month} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={m.month}
                  checked={selectedMonths.includes(m.month)}
                  onChange={() => handleMonthChange(m.month)}
                />
                {new Date(0, m.month - 1).toLocaleString("default", { month: "short" })}
              </label>
            ))}
        </div>

        {/* Group filter */}
        <div>
          <label className="font-semibold mr-2">Group:</label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">All</option>
            {groups.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Category filter */}
        <div>
          <label className="font-semibold mr-2">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Export / Print */}
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-blue-500 text-white px-4 py-2 rounded">Export CSV</button>
          <button onClick={printReport} className="bg-green-500 text-white px-4 py-2 rounded">Print</button>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="overflow-x-auto">
        <table id="expensesTable" className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Group</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Incurred For</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.length > 0 ? (
              sortedExpenses.map((e, idx) => (
                <tr key={idx} className="text-sm">
                  <td className="border p-2">{e.group}</td>
                  <td className="border p-2">{e.category}</td>
                  <td className="border p-2">{e.amount}</td>
                  <td className="border p-2">{new Date(e.expense_date).toLocaleDateString()}</td>
                  <td className="border p-2">{e.incurred_for || ""}</td>
                  <td className="border p-2">{e.reason || ""}</td>
                  <td className="border p-2">{e.notes || ""}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4">No expenses found for selected period.</td>
              </tr>
            )}

            {/* Group totals */}
            {Object.keys(groupTotals).map((group, idx) => (
              <tr key={`total-${idx}`} className="bg-gray-200 font-bold">
                <td className="border p-2">{group} Total</td>
                <td className="border p-2" colSpan={1}></td>
                <td className="border p-2">{groupTotals[group].toFixed(2)}</td>
                <td className="border p-2" colSpan={4}></td>
              </tr>
            ))}

            <tr className="bg-gray-300 font-bold">
              <td className="border p-2">Grand Total</td>
              <td className="border p-2" colSpan={1}></td>
              <td className="border p-2">{grandTotal.toFixed(2)}</td>
              <td className="border p-2" colSpan={4}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}