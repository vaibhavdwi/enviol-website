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
    <div className="space-y-6 pt-4">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#1F524F]">
          Analytics Reports
        </h1>

        <p className="text-gray-500 mt-1">
          Visitor, engagement and geography analytics
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <div className="flex gap-3 flex-wrap items-center">
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
            className="bg-[#42B3A5] hover:bg-[#36998d] text-white px-5 py-2 rounded"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-white border rounded-lg p-4">
          Loading report...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!loading && !report && (
        <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
          Select dates and generate a report
        </div>
      )}

      {/* REPORT */}
      {report && (
        <div className="space-y-6">
          {/* EXECUTIVE KPI */}
          <Section title="Executive Summary">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
				<Card
  title="Total Events"
  value={report?.summary?.totalEvents || 0}
/>
              <Card
                title="Visitors"
                value={report?.summary?.uniqueVisitors || 0}
              />

              <Card
                title="Sessions"
                value={report?.summary?.sessions || 0}
              />

              <Card
                title="Returning"
                value={report?.summary?.returningVisitors || 0}
              />

              <Card
                title="Countries"
                value={report?.summary?.countries || 0}
              />

              <Card
                title="Regions"
                value={report?.summary?.regions || 0}
              />
            </div>
          </Section>

          {/* ENGAGEMENT KPI */}
          <Section title="Engagement Metrics">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              <Card
                title="Page Views"
                value={report?.summary?.pageViews || 0}
              />

              <Card
                title="Pages / Visitor"
                value={report?.summary?.avgPagesPerVisitor || 0}
              />

              <Card
                title="CTA Clicks"
                value={report?.summary?.ctaClicks || 0}
              />

              <Card
                title="Navigation"
                value={report?.summary?.navigationClicks || 0}
              />

              <Card
                title="Forms"
                value={report?.summary?.formSubmits || 0}
              />
            </div>
          </Section>

          {/* VISITOR ANALYTICS */}
          <Section title="Visitor Analytics">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card
                title="Unique Visitors"
                value={report?.summary?.uniqueVisitors || 0}
              />

              <Card
                title="Returning Visitors"
                value={report?.summary?.returningVisitors || 0}
              />

              <Card
                title="Sessions"
                value={report?.summary?.sessions || 0}
              />

              <Card
                title="Pages / Visitor"
                value={report?.summary?.avgPagesPerVisitor || 0}
              />
            </div>
          </Section>

          {/* GEOGRAPHY */}
          <Section title="Geography">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <TableCard
                title="Top Countries"
                headers={["Country", "Visitors"]}
                data={report?.topCountries || []}
                render={(row) => (
                  <>
                    <td className="p-2 border">
                      {row.country || "Unknown"}
                    </td>
                    <td className="p-2 border">
                      {row.visitors || 0}
                    </td>
                  </>
                )}
              />

              <TableCard
                title="Top Regions"
                headers={["Region", "Visitors"]}
                data={report?.topRegions || []}
                render={(row) => (
                  <>
                    <td className="p-2 border">
                      {row.region || "Unknown"}
                    </td>
                    <td className="p-2 border">
                      {row.visitors || 0}
                    </td>
                  </>
                )}
              />

              <TableCard
                title="Top Cities"
                headers={["City", "Visitors"]}
                data={report?.topCities || []}
                render={(row) => (
                  <>
                    <td className="p-2 border">
                      {row.city || "Unknown"}
                    </td>
                    <td className="p-2 border">
                      {row.visitors || 0}
                    </td>
                  </>
                )}
              />
            </div>
          </Section>

          {/* TOP PAGES */}
          <Section title="Top Pages">
            <Table
              headers={["Page", "Views"]}
              data={report?.topPages || []}
              render={(row) => (
                <>
                  <td className="p-2 border break-all">
                    {row.page || "-"}
                  </td>

                  <td className="p-2 border">
                    {row.views || 0}
                  </td>
                </>
              )}
            />
          </Section>

          {/* CTA + NAVIGATION */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Section title="Top CTAs">
              <Table
                headers={["Target", "Clicks"]}
                data={report?.topCTAs || []}
                render={(row) => (
                  <>
                    <td className="p-2 border">
                      {row.target || "-"}
                    </td>

                    <td className="p-2 border">
                      {row.clicks || 0}
                    </td>
                  </>
                )}
              />
            </Section>

            <Section title="Top Navigation">
              <Table
                headers={["Target", "Clicks"]}
                data={report?.topNavigation || []}
                render={(row) => (
                  <>
                    <td className="p-2 border">
                      {row.target || "-"}
                    </td>

                    <td className="p-2 border">
                      {row.clicks || 0}
                    </td>
                  </>
                )}
              />
            </Section>
          </div>

          {/* EVENT BREAKDOWN */}
          <Section title="Event Breakdown">
            <Table
              headers={["Event", "Count"]}
              data={report?.rawEventCounts || []}
              render={(row) => (
                <>
                  <td className="p-2 border">
                    {row.event}
                  </td>

                  <td className="p-2 border">
                    {row.count}
                  </td>
                </>
              )}
            />
          </Section>
        </div>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({ title, value }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <p className="text-2xl font-bold text-[#1F524F] mt-2">
        {value}
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-5">
      <h2 className="text-lg font-semibold text-[#1F524F] mb-4">
        {title}
      </h2>

      {children}
    </div>
  );
}

function TableCard({
  title,
  headers,
  data,
  render,
}) {
  return (
    <div>
      <h3 className="font-semibold mb-3">
        {title}
      </h3>

      <Table
        headers={headers}
        data={data}
        render={render}
      />
    </div>
  );
}

function Table({
  headers,
  data,
  render,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left p-2 border bg-gray-50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                className="p-3 border text-gray-500"
                colSpan={headers.length}
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                {render(row)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}