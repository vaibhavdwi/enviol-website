"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SalesDashboard() {

  const router = useRouter();

  const [from,setFrom] = useState("");
  const [to,setTo] = useState("");

  const [summary,setSummary] = useState({
    revenue:0,
    profit:0,
    gst:0,
    orders:0,
    avg_order:0
  });

  const fetchSales = async () => {

    try{

      let url = "/api/admin/sales/dashboard";

      if(from && to){
        url = `/api/admin/sales/dashboard?from=${from}&to=${to}`;
      }

      const res = await fetch(url);

      const data = await res.json();

      setSummary(data);

    }catch(err){
      console.error("Sales fetch error",err);
    }

  };

  useEffect(()=>{
    fetchSales();
  },[]);

  return(

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Sales Dashboard
      </h2>

      {/* DATE FILTER */}

      <div className="flex gap-4 mb-6">

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
          onClick={fetchSales}
          className="bg-[#42B3A5] text-white px-4 py-2 rounded"
        >
          Apply
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-5 gap-6 mb-8">

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">Revenue</p>
          <p className="text-xl font-bold">₹ {summary.revenue}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">Profit</p>
          <p className="text-xl font-bold">₹ {summary.profit}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">GST Collected</p>
          <p className="text-xl font-bold">₹ {summary.gst}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">Orders</p>
          <p className="text-xl font-bold">{summary.total_orders}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">Avg Order Value</p>
          <p className="text-xl font-bold">₹ {summary.avg_order_value}</p>
        </div>

      </div>

      {/* NAVIGATION TO ANALYTICS + REPORTS */}

      <div className="flex gap-6 mt-10">

        <div
          onClick={()=>router.push("/admin/dashboard/sales/analytics")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >

          <h3 className="text-lg font-semibold mb-2">
            Sales Analytics
          </h3>

          <p className="text-gray-600 text-sm">
            View charts, product performance and growth insights.
          </p>

        </div>

        <div
          onClick={()=>router.push("/admin/dashboard/sales/reports")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >

          <h3 className="text-lg font-semibold mb-2">
            Sales Reports
          </h3>

          <p className="text-gray-600 text-sm">
            Generate detailed sales reports and export CSV.
          </p>

        </div>

      </div>

    </div>

  );
}