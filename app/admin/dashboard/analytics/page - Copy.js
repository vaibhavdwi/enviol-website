"use client";

import { useState } from "react";

export default function AnalyticsDashboard() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // ================================================================
  // VISITOR LIST MODAL
  // ================================================================

  const [visitorModal, setVisitorModal] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [visitorsLoading, setVisitorsLoading] = useState(false);
  const [visitorsError, setVisitorsError] = useState("");

  // ================================================================
  // VISITOR JOURNEY MODAL
  // ================================================================

  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [visitorJourney, setVisitorJourney] = useState([]);
  const [visitorJourneyLoading, setVisitorJourneyLoading] =
    useState(false);
  const [visitorJourneyError, setVisitorJourneyError] =
    useState("");

  // ================================================================
  // FETCH MAIN ANALYTICS
  // ================================================================

  const fetchAnalytics = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both from and to dates");
      return;
    }

    if (fromDate > toDate) {
      setError("From date cannot be after to date");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `/api/reports/analytics?from=${encodeURIComponent(
          fromDate
        )}&to=${encodeURIComponent(toDate)}`
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      const json = await res.json();

      setData(json);
    } catch (err) {
      console.error(err);
      setError("Failed to load analytics");
    }

    setLoading(false);
  };

  // ================================================================
  // OPEN VISITOR LIST
  //
  // type:
  // page
  // country
  // region
  // city
  // ================================================================

  const openVisitors = async (type, value, title) => {
    if (!fromDate || !toDate) {
      setError("Please select a date range first");
      return;
    }

    if (!value) {
      return;
    }

    setVisitorModal({
      type,
      value,
      title,
    });

    setVisitors([]);
    setVisitorsError("");
    setVisitorsLoading(true);

    try {
      const res = await fetch(
        `/api/reports/visitors?type=${encodeURIComponent(
          type
        )}&value=${encodeURIComponent(
          value
        )}&from=${encodeURIComponent(
          fromDate
        )}&to=${encodeURIComponent(toDate)}`
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      const json = await res.json();

      setVisitors(json.visitors || []);
    } catch (err) {
      console.error(err);

      setVisitorsError(
        "Failed to load visitor details"
      );
    }

    setVisitorsLoading(false);
  };

  // ================================================================
  // CLOSE VISITOR LIST
  // ================================================================

  const closeVisitors = () => {
    setVisitorModal(null);
    setVisitors([]);
    setVisitorsError("");
  };

  // ================================================================
  // OPEN VISITOR JOURNEY
  //
  // Uses the SAME visitors API.
  // ================================================================

  const openVisitorJourney = async (visitorId) => {
    if (!visitorId) {
      return;
    }

    if (!fromDate || !toDate) {
      return;
    }

    setSelectedVisitor(visitorId);
    setVisitorJourney([]);
    setVisitorJourneyError("");
    setVisitorJourneyLoading(true);

    try {
      const res = await fetch(
        `/api/reports/visitors?type=visitor&visitor_id=${encodeURIComponent(
          visitorId
        )}&from=${encodeURIComponent(
          fromDate
        )}&to=${encodeURIComponent(toDate)}`
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      const json = await res.json();

      setVisitorJourney(json.events || []);
    } catch (err) {
      console.error(err);

      setVisitorJourneyError(
        "Failed to load visitor journey"
      );
    }

    setVisitorJourneyLoading(false);
  };

  // ================================================================
  // CLOSE VISITOR JOURNEY
  // ================================================================

  const closeVisitorJourney = () => {
    setSelectedVisitor(null);
    setVisitorJourney([]);
    setVisitorJourneyError("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* ============================================================ */}
      {/* HEADER */}
      {/* ============================================================ */}

      <div>
        <h1 className="text-3xl font-bold text-[#1F524F]">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500">
          Range-based traffic analytics
        </p>
      </div>

      {/* ============================================================ */}
      {/* FILTERS */}
      {/* ============================================================ */}

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
          className="bg-[#42B3A5] text-white px-4 py-2 rounded hover:opacity-90"
        >
          Run Report
        </button>
      </div>

      {/* ============================================================ */}
      {/* LOADING */}
      {/* ============================================================ */}

      {loading && (
        <p className="text-gray-500">
          Loading analytics...
        </p>
      )}

      {/* ============================================================ */}
      {/* ERROR */}
      {/* ============================================================ */}

      {error && (
        <div className="text-red-500">
          {error}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUMMARY */}
      {/* ============================================================ */}

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

      {/* ============================================================ */}
      {/* ENY AI CHAT ANALYTICS */}
      {/* ============================================================ */}

      {data && (
        <div className="space-y-4">
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
              value={formatDuration(
                data.chat?.average_chat_duration_seconds
              )}
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

      {/* ============================================================ */}
      {/* GEO ANALYTICS */}
      {/* ============================================================ */}

      {data && (
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    <GeoBarChart
      title="Top Countries"
      items={data.topCountries || []}
      labelKey="country"
      type="country"
      onClick={openVisitors}
    />

    <GeoBarChart
      title="Top Regions"
      items={data.topRegions || []}
      labelKey="region"
      type="region"
      onClick={openVisitors}
    />

    <GeoBarChart
      title="Top Cities"
      items={data.topCities || []}
      labelKey="city"
      type="city"
      onClick={openVisitors}
    />
  </div>
)}

      {/* ============================================================ */}
{/* TOP 20 PAGES */}
{/* ============================================================ */}

{data && (
  <div className="bg-white border p-5 rounded">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="font-semibold text-[#1F524F] text-lg">
          Top 20 Pages
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Click any bar to see individual visitors for that page
        </p>
      </div>

      <span className="text-xs text-gray-400">
        {Math.min(data.topPages?.length || 0, 20)} pages
      </span>
    </div>

    {(!data.topPages || data.topPages.length === 0) ? (
      <p className="text-sm text-gray-400 py-6 text-center">
        No page data available
      </p>
    ) : (
      <div className="space-y-3">

        {(data.topPages || [])
          .slice(0, 20)
          .map((p, i) => {

            const page =
              p.page || "Unknown";

            const views =
              Number(p.views) || 0;

            const maxViews =
              Number(data.topPages?.[0]?.views) || 1;

            const width =
              Math.max(
                2,
                (views / maxViews) * 100
              );

            return (
              <button
                key={`${page}-${i}`}
                onClick={() =>
                  openVisitors(
                    "page",
                    page,
                    "Page Visitor Log"
                  )
                }
                className="w-full text-left group"
                title={`View visitors for ${page}`}
              >

                <div className="flex items-center gap-3">

                  {/* RANK */}

                  <div className="w-7 text-xs text-gray-400 text-right shrink-0">
                    {i + 1}
                  </div>

                  {/* PAGE */}

                  <div
                    className="w-52 md:w-72 lg:w-80 text-sm text-gray-700 truncate shrink-0"
                    title={page}
                  >
                    {page}
                  </div>

                  {/* BAR */}

                  <div className="flex-1 bg-gray-100 rounded-md h-8 overflow-hidden">

                    <div
                      className="h-full bg-[#42B3A5] rounded-md transition-all duration-300 group-hover:bg-[#1F524F]"
                      style={{
                        width: `${width}%`,
                      }}
                    />

                  </div>

                  {/* VIEW COUNT */}

                  <div className="w-16 text-right font-semibold text-[#1F524F] shrink-0">
                    {views}
                  </div>

                </div>

              </button>
            );
          })}

      </div>
    )}
  </div>
)}
      {/* ============================================================ */}
      {/* VISITOR LIST MODAL */}
      {/* ============================================================ */}

      {visitorModal && (
        <VisitorsModal
          type={visitorModal.type}
          value={visitorModal.value}
          title={visitorModal.title}
          visitors={visitors}
          loading={visitorsLoading}
          error={visitorsError}
          onClose={closeVisitors}
          onVisitorClick={openVisitorJourney}
        />
      )}

      {/* ============================================================ */}
      {/* VISITOR JOURNEY MODAL */}
      {/* ============================================================ */}

      {selectedVisitor && (
        <VisitorJourneyModal
          visitorId={selectedVisitor}
          events={visitorJourney}
          loading={visitorJourneyLoading}
          error={visitorJourneyError}
          onClose={closeVisitorJourney}
        />
      )}
    </div>
  );
}

/* ====================================================================== */
/* VISITORS MODAL */
/* ====================================================================== */

function VisitorsModal({
  type,
  value,
  title,
  visitors,
  loading,
  error,
  onClose,
  onVisitorClick,
}) {
  const isPage = type === "page";

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="border-b p-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-[#1F524F]">
              {title}
            </h2>

            <p className="text-sm text-gray-600 mt-1 break-all">
              {value}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {isPage
                ? "Unique visitors who viewed this page during the selected date range"
                : "Unique visitors from this location during the selected date range"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* BODY */}

        <div className="p-5 overflow-auto max-h-[70vh]">
          {loading && (
            <div className="py-10 text-center text-gray-500">
              Loading visitor log...
            </div>
          )}

          {error && (
            <div className="py-6 text-center text-red-500">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            visitors.length === 0 && (
              <div className="py-10 text-center text-gray-500">
                No visitors found.
              </div>
            )}

          {!loading &&
            !error &&
            visitors.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-gray-500">
                      <th className="text-left p-3 whitespace-nowrap">
                        Visitor
                      </th>

                      <th className="text-left p-3">
                        Location
                      </th>

                      <th className="text-left p-3 whitespace-nowrap">
                        First Seen
                      </th>

                      <th className="text-left p-3 whitespace-nowrap">
                        Last Seen
                      </th>

                      <th className="text-right p-3">
                        {isPage
                          ? "Page Views"
                          : "Events"}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {visitors.map((visitor) => (
                      <tr
                        key={
                          visitor.visitor_id ||
                          `${visitor.first_seen}-${visitor.last_seen}`
                        }
                        className="border-b hover:bg-gray-50"
                      >
                        {/* VISITOR */}

                        <td className="p-3">
                          {visitor.visitor_id ? (
                            <button
                              onClick={() =>
                                onVisitorClick(
                                  visitor.visitor_id
                                )
                              }
                              className="text-[#1F524F] font-medium underline decoration-dotted underline-offset-4 hover:text-[#42B3A5]"
                              title="View complete visitor journey"
                            >
                              {shortId(
                                visitor.visitor_id
                              )}
                            </button>
                          ) : (
                            <span className="text-gray-400">
                              Unknown
                            </span>
                          )}
                        </td>

                        {/* LOCATION */}

                        <td className="p-3 whitespace-nowrap">
                          {formatLocation(visitor)}
                        </td>

                        {/* FIRST SEEN */}

                        <td className="p-3 whitespace-nowrap">
                          {formatDateTime(
                            visitor.first_seen
                          )}
                        </td>

                        {/* LAST SEEN */}

                        <td className="p-3 whitespace-nowrap">
                          {formatDateTime(
                            visitor.last_seen
                          )}
                        </td>

                        {/* COUNT */}

                        <td className="p-3 text-right">
                          {isPage
                            ? visitor.page_views || 0
                            : visitor.event_count || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>

        {/* FOOTER */}

        {!loading && (
          <div className="border-t p-4 flex justify-between items-center text-sm">
            <span className="text-gray-500">
              {visitors.length} unique visitor
              {visitors.length === 1 ? "" : "s"}
            </span>

            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </ModalOverlay>
  );
}

/* ====================================================================== */
/* VISITOR JOURNEY MODAL */
/* ====================================================================== */

function VisitorJourneyModal({
  visitorId,
  events,
  loading,
  error,
  onClose,
}) {
  const firstEvent = events[0];

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="border-b p-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-[#1F524F]">
              Visitor Journey
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Visitor ID:{" "}
              <span className="font-mono break-all">
                {visitorId}
              </span>
            </p>

            {firstEvent && (
              <p className="text-sm text-gray-500 mt-1">
                {formatLocation(firstEvent)}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* BODY */}

        <div className="p-5 overflow-auto max-h-[72vh]">
          {loading && (
            <div className="py-10 text-center text-gray-500">
              Loading visitor journey...
            </div>
          )}

          {error && (
            <div className="py-6 text-center text-red-500">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            events.length === 0 && (
              <div className="py-10 text-center text-gray-500">
                No events found for this visitor.
              </div>
            )}

          {!loading &&
            !error &&
            events.length > 0 && (
              <div className="space-y-0">
                {events.map((event, index) => (
                  <JourneyEvent
                    key={event.id}
                    event={event}
                    isLast={
                      index === events.length - 1
                    }
                  />
                ))}
              </div>
            )}
        </div>

        {/* FOOTER */}

        {!loading && (
          <div className="border-t p-4 flex justify-between items-center text-sm">
            <span className="text-gray-500">
              {events.length} events
            </span>

            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </ModalOverlay>
  );
}

/* ====================================================================== */
/* JOURNEY EVENT */
/* ====================================================================== */

function JourneyEvent({ event, isLast }) {
  const isPageView =
    event.event === "page_view";

  const eventLabel = formatEventName(
    event.event
  );

  return (
    <div className="flex gap-4">
      {/* TIMELINE */}

      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full mt-2 ${
            isPageView
              ? "bg-[#42B3A5]"
              : "bg-[#1F524F]"
          }`}
        />

        {!isLast && (
          <div className="w-px bg-gray-200 flex-1 min-h-[70px]" />
        )}
      </div>

      {/* EVENT */}

      <div className="pb-7 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="font-semibold text-[#1F524F]">
            {eventLabel}
          </p>

          <p className="text-xs text-gray-400 whitespace-nowrap">
            {formatDateTime(
              event.event_timestamp ||
                event.server_timestamp
            )}
          </p>
        </div>

        {event.page && (
          <p className="text-sm text-gray-700 mt-1 break-all">
            {event.page}
          </p>
        )}

        {event.full_url && (
          <p className="text-xs text-gray-400 mt-1 break-all">
            {event.full_url}
          </p>
        )}

        {event.session_id && (
          <p className="text-xs text-gray-400 mt-1">
            Session:{" "}
            {shortId(event.session_id)}
          </p>
        )}

        {event.referrer && (
          <p className="text-xs text-gray-400 mt-1 truncate">
            Referrer:{" "}
            {getReferrerName(event.referrer)}
          </p>
        )}

        {event.user_agent && (
          <p
            className="text-xs text-gray-400 mt-1 truncate"
            title={event.user_agent}
          >
            Browser: {getBrowserName(event.user_agent)}
          </p>
        )}
      </div>
    </div>
  );
}

/* ====================================================================== */
/* MODAL OVERLAY */
/* ====================================================================== */

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {children}
    </div>
  );
}

/* ====================================================================== */
/* GEO HORIZONTAL BAR CHART */
/* ====================================================================== */

function GeoBarChart({
  title,
  items = [],
  labelKey,
  type,
  onClick,
}) {
  const visibleItems = items.slice(0, 20);

  const maxVisitors = Math.max(
    ...visibleItems.map((item) =>
      Number(item.visitors) || 0
    ),
    1
  );

  return (
    <div className="bg-white border rounded-xl p-5">
      {/* HEADER */}

      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="font-semibold text-[#1F524F] text-lg">
            {title}
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Top {visibleItems.length} by visitors
          </p>
        </div>

        <span className="text-xs text-gray-400">
          Click bar
        </span>
      </div>

      {/* NO DATA */}

      {visibleItems.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">
          No data available
        </p>
      ) : (
        <div className="space-y-3">
          {visibleItems.map((item, index) => {
            const label =
              item[labelKey] || "Unknown";

            const visitors =
              Number(item.visitors) || 0;

            const width =
              maxVisitors > 0
                ? (visitors / maxVisitors) * 100
                : 0;

            return (
              <button
                key={`${label}-${index}`}
                type="button"
                onClick={() =>
                  onClick(
                    type,
                    label,
                    `${title} Visitor Log`
                  )
                }
                className="w-full text-left group"
                title={`View visitors for ${label}`}
              >
                {/* TOP LINE */}

                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs text-gray-400 w-5 text-right shrink-0">
                      {index + 1}
                    </span>

                    <span
                      className="text-sm text-gray-700 truncate"
                      title={label}
                    >
                      {label}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-[#1F524F] shrink-0">
                    {visitors}
                  </span>
                </div>

                {/* BAR TRACK */}

                <div className="ml-7 w-[calc(100%-1.75rem)] h-7 bg-gray-100 rounded-md overflow-hidden">
                  {/* ACTUAL BAR */}

                  <div
                    className="h-full bg-[#42B3A5] rounded-md transition-all duration-300 group-hover:bg-[#1F524F]"
                    style={{
                      width: `${Math.max(width, 1)}%`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ====================================================================== */
/* SUMMARY CARD */
/* ====================================================================== */

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

/* ====================================================================== */
/* CHAT KPI CARD */
/* ====================================================================== */

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

/* ====================================================================== */
/* CONVERSION CARD */
/* ====================================================================== */

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

/* ====================================================================== */
/* FORMAT DURATION */
/* ====================================================================== */

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

/* ====================================================================== */
/* PERCENTAGE */
/* ====================================================================== */

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

/* ====================================================================== */
/* AVERAGE */
/* ====================================================================== */

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

/* ====================================================================== */
/* FORMAT DATE/TIME */
/* ====================================================================== */

function formatDateTime(value) {
  if (!value) {
    return "Unknown";
  }

  try {
    return new Intl.DateTimeFormat(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "Asia/Kolkata",
      }
    ).format(new Date(value));
  } catch {
    return String(value);
  }
}

/* ====================================================================== */
/* FORMAT LOCATION */
/* ====================================================================== */

function formatLocation(item) {
  const parts = [
    item.city,
    item.region,
    item.country,
  ].filter(Boolean);

  if (parts.length === 0) {
    return "Unknown";
  }

  return parts.join(", ");
}

/* ====================================================================== */
/* SHORT ID */
/* ====================================================================== */

function shortId(value) {
  if (!value) {
    return "Unknown";
  }

  const text = String(value);

  if (text.length <= 16) {
    return text;
  }

  return `${text.slice(0, 8)}...${text.slice(-4)}`;
}

/* ====================================================================== */
/* REFERRER */
/* ====================================================================== */

function getReferrerName(referrer) {
  if (!referrer) {
    return "Direct";
  }

  try {
    const url = new URL(referrer);

    return url.hostname.replace(
      /^www\./,
      ""
    );
  } catch {
    return referrer;
  }
}

/* ====================================================================== */
/* BROWSER NAME */
/* ====================================================================== */

function getBrowserName(userAgent) {
  if (!userAgent) {
    return "Unknown";
  }

  const ua = userAgent.toLowerCase();

  if (ua.includes("edg/")) {
    return "Microsoft Edge";
  }

  if (ua.includes("chrome/") && !ua.includes("edg/")) {
    return "Chrome";
  }

  if (ua.includes("firefox/")) {
    return "Firefox";
  }

  if (
    ua.includes("safari/") &&
    !ua.includes("chrome/")
  ) {
    return "Safari";
  }

  if (ua.includes("opera") || ua.includes("opr/")) {
    return "Opera";
  }

  return "Unknown";
}

/* ====================================================================== */
/* EVENT NAME */
/* ====================================================================== */

function formatEventName(event) {
  if (!event) {
    return "Unknown Event";
  }

  return event
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}