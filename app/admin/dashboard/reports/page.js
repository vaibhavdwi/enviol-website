"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    setLoading(true);
    setError("");
    setReport(null);

    try {
      const url = fromDate
        ? `/api/reports/generate?from=${fromDate}&to=${toDate}`
        : `/api/reports/generate`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch report");
      }

      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load report");
    }

    setLoading(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-[#1F524F] mb-4">
        Analytics Reports
      </h1>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6 flex-wrap">
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
          onClick={fetchReport}
          className="bg-[#42B3A5] text-white px-4 py-2 rounded"
        >
          Generate
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-600">Loading report...</p>}

      {/* ERROR */}
      {error && <p className="text-red-500">{error}</p>}

      {/* EMPTY STATE */}
      {!loading && !report && (
        <p className="text-gray-500">Select a date and generate report</p>
      )}

      {/* REPORT */}
      {report && (
        <div className="space-y-6">

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card title="Total Events" value={report?.summary?.total || 0} />
            <Card title="Page Views" value={report?.summary?.pageViews || 0} />
            <Card title="CTA Clicks" value={report?.summary?.ctaClicks || 0} />
            <Card title="Navigation" value={report?.summary?.navClicks || 0} />
          </div>

          {/* TOP PAGES */}
          <Section title="Top Pages">
            <Table
              headers={["Page", "Views"]}
              data={report?.topPages || []}
              render={(row) => (
                <>
                  <td className="p-2 border">{row.page || "-"}</td>
                  <td className="p-2 border">{row.views || 0}</td>
                </>
              )}
            />
          </Section>

          {/* TOP CTAs */}
          <Section title="Top CTAs">
            <Table
              headers={["Target", "Clicks"]}
              data={report?.topCTAs || []}
              render={(row) => (
                <>
                  <td className="p-2 border">{row.target || "-"}</td>
                  <td className="p-2 border">{row.clicks || 0}</td>
                </>
              )}
            />
          </Section>

          {/* TOP NAVIGATION */}
          <Section title="Top Navigation">
            <Table
              headers={["Target", "Clicks"]}
              data={report?.topNavigation || []}
              render={(row) => (
                <>
                  <td className="p-2 border">{row.target || "-"}</td>
                  <td className="p-2 border">{row.clicks || 0}</td>
                </>
              )}
            />
          </Section>

          {/* RAW EVENTS (DEBUG VIEW) */}
          <Section title="Event Breakdown">
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
              {JSON.stringify(report?.rawEventCounts || [], null, 2)}
            </pre>
          </Section>

        </div>
      )}
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-[#1F524F]">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Table({ headers, data, render }) {
  return (
    <table className="w-full text-sm border">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="text-left p-2 border bg-gray-50">
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td className="p-2 border text-gray-500" colSpan={headers.length}>
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i}>{render(row)}</tr>
          ))
        )}
      </tbody>
    </table>
  );
}