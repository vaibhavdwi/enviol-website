"use client";

import { useState } from "react";

export default function AnalyticsDashboard() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both from and to dates");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `/api/reports/analytics?from=${fromDate}&to=${toDate}`
      );

      if (!res.ok) throw new Error("Failed");

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Failed to load analytics");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#1F524F]">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500">
          Range-based traffic analytics
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border p-4 rounded flex gap-3">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={fetchAnalytics}
          className="bg-[#42B3A5] text-white px-4 py-2 rounded"
        >
          Run Report
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading analytics...</p>}

      {/* ERROR */}
      {error && (
        <div className="text-red-500">{error}</div>
      )}

      {/* SUMMARY */}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Events" value={data.summary?.total_events} />
          <Card title="Visitors" value={data.summary?.unique_visitors} />
          <Card title="Sessions" value={data.summary?.sessions} />
          <Card title="Page Views" value={data.summary?.page_views} />
        </div>
      )}

      {/* GEO ANALYTICS */}
{data && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
    <div className="bg-white border p-4 rounded">
      <h2 className="font-semibold mb-2">Top Countries</h2>

      {(data.topCountries || []).map((c, i) => (
        <div key={i} className="flex justify-between border-b py-1">
          <span>{c.country || "Unknown"}</span>
          <span>{c.visitors}</span>
        </div>
      ))}
    </div>

    <div className="bg-white border p-4 rounded">
      <h2 className="font-semibold mb-2">Top Regions</h2>

      {(data.topRegions || []).map((r, i) => (
        <div key={i} className="flex justify-between border-b py-1">
          <span>{r.region || "Unknown"}</span>
          <span>{r.visitors}</span>
        </div>
      ))}
    </div>

    <div className="bg-white border p-4 rounded">
      <h2 className="font-semibold mb-2">Top Cities</h2>

      {(data.topCities || []).map((c, i) => (
        <div key={i} className="flex justify-between border-b py-1">
          <span>{c.city || "Unknown"}</span>
          <span>{c.visitors}</span>
        </div>
      ))}
    </div>

  </div>
)}
	  
	  

      {/* TOP PAGES */}
      {data && (
        <div className="bg-white border p-4 rounded">
          <h2 className="font-semibold mb-2">Top Pages</h2>

          {(data.topPages || []).map((p, i) => (
            <div key={i} className="flex justify-between border-b py-1">
              <span className="break-all">{p.page}</span>
              <span>{p.views}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white border p-4 rounded">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-[#1F524F]">
        {value || 0}
      </p>
    </div>
  );
}