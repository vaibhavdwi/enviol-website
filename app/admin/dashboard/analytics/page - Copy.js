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
      {/* ================================================================ */}
      {/* HEADER */}
      {/* ================================================================ */}

      <div>
        <h1 className="text-3xl font-bold text-[#1F524F]">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500">
          Range-based traffic analytics
        </p>
      </div>

      {/* ================================================================ */}
      {/* FILTERS */}
      {/* ================================================================ */}

      <div className="bg-white border p-4 rounded flex gap-3 flex-wrap">
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

      {/* ================================================================ */}
      {/* LOADING */}
      {/* ================================================================ */}

      {loading && <p>Loading analytics...</p>}

      {/* ================================================================ */}
      {/* ERROR */}
      {/* ================================================================ */}

      {error && (
        <div className="text-red-500">
          {error}
        </div>
      )}

      {/* ================================================================ */}
      {/* SUMMARY */}
      {/* ================================================================ */}

      {data && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            title="Events"
            value={data.summary?.total_events}
          />

          <Card
            title="Visitors"
            value={data.summary?.unique_visitors}
          />

          <Card
            title="Sessions"
            value={data.summary?.sessions}
          />

          <Card
            title="Page Views"
            value={data.summary?.page_views}
          />
        </div>
      )}

      {/* ================================================================ */}
      {/* ENY AI CHAT ANALYTICS */}
      {/* ================================================================ */}

      {data && (
        <div className="space-y-4">
          {/* SECTION HEADER */}

          <div>
            <h2 className="text-xl font-bold text-[#1F524F]">
              ENY AI Chat Analytics
            </h2>

            <p className="text-sm text-gray-500">
              AI enquiry chat engagement and conversion metrics
            </p>
          </div>

          {/* CHAT KPI CARDS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ChatCard
              title="Chat Opens"
              value={data.chat?.chat_opens}
            />

            <ChatCard
              title="Messages Sent"
              value={data.chat?.chat_messages}
            />

            <ChatCard
              title="Enquiries Submitted"
              value={data.chat?.chat_enquiries}
            />

            <ChatCard
              title="Chat Extensions"
              value={data.chat?.chat_extensions}
            />
          </div>

          {/* SECONDARY CHAT METRICS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ChatCard
              title="Minimized Chats"
              value={data.chat?.chat_minimizations}
            />

            <ChatCard
              title="Sessions Ended"
              value={data.chat?.chat_sessions_ended}
            />

            <ChatCard
              title="Duration Events"
              value={data.chat?.duration_events}
            />

            <ChatCard
              title="Avg. Chat Duration"
              value={`${formatDuration(
                data.chat?.average_chat_duration_seconds
              )}`}
            />
          </div>

          {/* TOTAL ACTIVE CHAT TIME */}

          <div className="bg-white border rounded p-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-gray-500">
                  Total Active Chat Time
                </p>

                <p className="text-3xl font-bold text-[#1F524F]">
                  {formatDuration(
                    data.chat?.total_chat_active_seconds
                  )}
                </p>
              </div>

              <div className="text-sm text-gray-400">
                Based on ENY active chat duration events
              </div>
            </div>
          </div>

          {/* CHAT CONVERSION */}

          <div className="bg-white border rounded p-5">
            <h3 className="font-semibold text-[#1F524F] mb-4">
              Chat Conversion
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ConversionCard
                title="Chat → Enquiry"
                value={calculatePercentage(
                  data.chat?.chat_enquiries,
                  data.chat?.chat_opens
                )}
              />

              <ConversionCard
                title="Messages / Chat"
                value={calculateAverage(
                  data.chat?.chat_messages,
                  data.chat?.chat_opens
                )}
              />

              <ConversionCard
                title="Extensions / Chat"
                value={calculateAverage(
                  data.chat?.chat_extensions,
                  data.chat?.chat_opens
                )}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* GEO ANALYTICS */}
      {/* ================================================================ */}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* COUNTRIES */}

          <div className="bg-white border p-4 rounded">
            <h2 className="font-semibold mb-2">
              Top Countries
            </h2>

            {(data.topCountries || []).map((c, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-1"
              >
                <span>
                  {c.country || "Unknown"}
                </span>

                <span>
                  {c.visitors}
                </span>
              </div>
            ))}
          </div>

          {/* REGIONS */}

          <div className="bg-white border p-4 rounded">
            <h2 className="font-semibold mb-2">
              Top Regions
            </h2>

            {(data.topRegions || []).map((r, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-1"
              >
                <span>
                  {r.region || "Unknown"}
                </span>

                <span>
                  {r.visitors}
                </span>
              </div>
            ))}
          </div>

          {/* CITIES */}

          <div className="bg-white border p-4 rounded">
            <h2 className="font-semibold mb-2">
              Top Cities
            </h2>

            {(data.topCities || []).map((c, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-1"
              >
                <span>
                  {c.city || "Unknown"}
                </span>

                <span>
                  {c.visitors}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TOP PAGES */}
      {/* ================================================================ */}

      {data && (
        <div className="bg-white border p-4 rounded">
          <h2 className="font-semibold mb-2">
            Top Pages
          </h2>

          {(data.topPages || []).map((p, i) => (
            <div
              key={i}
              className="flex justify-between border-b py-1"
            >
              <span className="break-all">
                {p.page}
              </span>

              <span>
                {p.views}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================================================================== */
/* EXISTING SUMMARY CARD */
/* ======================================================================== */

function Card({ title, value }) {
  return (
    <div className="bg-white border p-4 rounded">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className="text-2xl font-bold text-[#1F524F]">
        {value || 0}
      </p>
    </div>
  );
}

/* ======================================================================== */
/* CHAT KPI CARD */
/* ======================================================================== */

function ChatCard({ title, value }) {
  return (
    <div className="bg-white border rounded p-4">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className="text-2xl font-bold text-[#1F524F] mt-1">
        {value || 0}
      </p>
    </div>
  );
}

/* ======================================================================== */
/* CONVERSION CARD */
/* ======================================================================== */

function ConversionCard({ title, value }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-xl font-bold text-[#1F524F] mt-1">
        {value}
      </p>
    </div>
  );
}

/* ======================================================================== */
/* FORMAT DURATION */
/* ======================================================================== */

function formatDuration(seconds) {
  const totalSeconds = Math.max(
    0,
    Math.round(Number(seconds) || 0)
  );

  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const remainingSeconds =
    totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  return `${remainingSeconds}s`;
}

/* ======================================================================== */
/* PERCENTAGE */
/* ======================================================================== */

function calculatePercentage(
  numerator,
  denominator
) {
  const num = Number(numerator) || 0;
  const den = Number(denominator) || 0;

  if (den === 0) {
    return "0%";
  }

  return `${((num / den) * 100).toFixed(1)}%`;
}

/* ======================================================================== */
/* AVERAGE */
/* ======================================================================== */

function calculateAverage(
  numerator,
  denominator
) {
  const num = Number(numerator) || 0;
  const den = Number(denominator) || 0;

  if (den === 0) {
    return "0";
  }

  return (num / den).toFixed(1);
}