"use client";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/reports/generate?from=${from}&to=${to}`
      );

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={fetchReports}
          className="bg-[#42B3A5] text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {loading && <p>Loading analytics...</p>}

      {data && (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-4 gap-4 mb-6">

            <div className="bg-white shadow rounded p-4">
              <h3 className="text-sm text-gray-500">Page Views</h3>
              <p className="text-2xl font-bold">
                {data.summary.pageViews}
              </p>
            </div>

            <div className="bg-white shadow rounded p-4">
              <h3 className="text-sm text-gray-500">Events</h3>
              <p className="text-2xl font-bold">
                {data.summary.events}
              </p>
            </div>

            <div className="bg-white shadow rounded p-4">
              <h3 className="text-sm text-gray-500">Unique Visitors</h3>
              <p className="text-2xl font-bold">
                {data.summary.uniqueVisitors}
              </p>
            </div>

            <div className="bg-white shadow rounded p-4">
              <h3 className="text-sm text-gray-500">Conversions</h3>
              <p className="text-2xl font-bold">
                {data.summary.conversions || 0}
              </p>
            </div>

          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="grid grid-cols-2 gap-6">

            {/* TOP PAGES */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="font-semibold mb-3">
                Top Pages
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th>Page</th>
                    <th>Views</th>
                  </tr>
                </thead>

                <tbody>
                  {data.topPages?.map((p, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-2">{p.page}</td>
                      <td>{p.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TOP REGIONS */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="font-semibold mb-3">
                Top Regions
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th>Region</th>
                    <th>Users</th>
                  </tr>
                </thead>

                <tbody>
                  {data.topRegions?.map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-2">{r.region}</td>
                      <td>{r.users}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </>
      )}
    </div>
  );
}