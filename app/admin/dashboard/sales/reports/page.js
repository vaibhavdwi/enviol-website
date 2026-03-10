"use client";

import { useEffect, useState } from "react";

export default function SalesReports(){

  const [reports,setReports] = useState([]);
  const [from,setFrom] = useState("");
  const [to,setTo] = useState("");

  const loadReports = async ()=>{

    let url="/api/admin/sales/reports";

    if(from && to){
      url+=`?from=${from}&to=${to}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setReports(data.reports || []);

  };

  useEffect(()=>{
    loadReports();
  },[]);

  const exportCSV = () => {

    if(reports.length === 0){
      alert("No data to export");
      return;
    }

    const headers=[
      "Invoice",
      "Company",
      "State",
      "Revenue",
      "GST",
      "Profit",
      "Date"
    ];

    const rows = reports.map(r=>[
      r.invoice_number,
      r.company_name,
      r.state,
      r.revenue,
      r.gst_collected,
      r.net_profit,
      r.sale_date
    ]);

    const csv=[
      headers.join(","),
      ...rows.map(r=>r.join(","))
    ].join("\n");

    const blob = new Blob([csv],{type:"text/csv"});

    const url = URL.createObjectURL(blob);

    const a=document.createElement("a");
    a.href=url;
    a.download="sales_report.csv";
    a.click();

  };

  return(

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Sales Reports
      </h2>

      {/* Filters */}

      <div className="flex gap-3 mb-6">

        <input
          type="date"
          value={from}
          onChange={(e)=>setFrom(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={to}
          onChange={(e)=>setTo(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={loadReports}
          className="bg-[#42B3A5] text-white px-4 py-2 rounded"
        >
          Apply
        </button>

        <button
          onClick={exportCSV}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>

        <button
          onClick={()=>window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Print
        </button>

      </div>


      {/* Table */}

      <div className="bg-white shadow rounded">

        <div className="grid grid-cols-7 bg-gray-100 p-3 font-semibold">

          <div>Invoice</div>
          <div>Company</div>
          <div>State</div>
          <div>Revenue</div>
          <div>GST</div>
          <div>Profit</div>
          <div>Date</div>

        </div>

        {reports.map((r,i)=>(

          <div
            key={i}
            className="grid grid-cols-7 p-3 border-t text-sm"
          >

            <div>{r.invoice_number}</div>
            <div>{r.company_name}</div>
            <div>{r.state}</div>
            <div>₹ {r.revenue}</div>
            <div>₹ {r.gst_collected}</div>
            <div>₹ {r.net_profit}</div>
            <div>{r.sale_date}</div>

          </div>

        ))}

        {reports.length===0 &&(

          <p className="p-4 text-gray-500">
            No sales found
          </p>

        )}

      </div>

    </div>

  );

}