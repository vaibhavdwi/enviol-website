"use client";

import { useState } from "react";

export default function AnalyticsDashboard() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // ================================================================
  // PAGE VISITOR MODAL
  // ================================================================

  const [selectedPage, setSelectedPage] = useState(null);
  const [pageVisitors, setPageVisitors] = useState([]);
  const [pageVisitorsLoading, setPageVisitorsLoading] =
    useState(false);
  const [pageVisitorsError, setPageVisitorsError] =
    useState("");

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
  // OPEN PAGE VISITOR MODAL
  // ================================================================

  const openPageVisitors = async (page) => {
    if (!fromDate || !toDate) {
      setError("Please select a date range first");
      return;
    }

    setSelectedPage(page);
    setPageVisitors([]);
    setPageVisitorsError("");
    setPageVisitorsLoading(true);

    try {
      const res = await fetch(
        `/api/reports/page-visitors?page=${encodeURIComponent(
          page
        )}&from=${encodeURIComponent(
          fromDate
        )}&to=${encodeURIComponent(toDate)}`
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      const json = await res.json();

      setPageVisitors(json.visitors || []);
    } catch (err) {
      console.error(err);

      setPageVisitorsError(
        "Failed to load page visitor details"
      );
    }

    setPageVisitorsLoading(false);
  };

  // ================================================================
  // CLOSE PAGE VISITOR MODAL
  // ================================================================

  const closePageVisitors = () => {
    setSelectedPage(null);
    setPageVisitors([]);
    setPageVisitorsError("");
  };

  // ================================================================
  // OPEN VISITOR JOURNEY
  // ================================================================

  const openVisitorJourney = async (visitorId) => {
    if (!visitorId) {
      return;
    }

    setSelectedVisitor(visitorId);
    setVisitorJourney([]);
    setVisitorJourneyError("");
    setVisitorJourneyLoading(true);

    try {
      const res = await fetch(
        `/api/reports/visitor-journey?visitorId=${encodeURIComponent(
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GeoCard
            title="Top Countries"
            items={data.topCountries || []}
            labelKey="country"
          />

          <GeoCard
            title="Top Regions"
            items={data.topRegions || []}
            labelKey="region"
          />

          <GeoCard
            title="Top Cities"
            items={data.topCities || []}
            labelKey="city"
          />
        </div>
      )}

      {/* ============================================================ */}
      {/* TOP PAGES */}
      {/* ============================================================ */}

      {data && (
        <div className="bg-white border p-4 rounded">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold text-[#1F524F]">
                Top Pages
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Click the view count to see individual visitors
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="text-left py-2">
                    Page
                  </th>

                  <th className="text-right py-2">
                    Views
                  </th>
                </tr>
              </thead>

              <tbody>
                {(data.topPages || []).map((p, i) => (
                  <tr
                    key={`${p.page}-${i}`}
                    className="border-b last:border-b-0"
                  >
                    <td className="py-2 pr-4 break-all">
                      {p.page}
                    </td>

                    <td className="py-2 text-right">
                      <button
                        onClick={() =>
                          openPageVisitors(p.page)
                        }
                        className="font-semibold text-[#1F524F] underline decoration-dotted underline-offset-4 hover:text-[#42B3A5]"
                        title="View individual visitors"
                      >
                        {p.views || 0}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PAGE VISITOR MODAL */}
      {/* ============================================================ */}

      {selectedPage && (
        <PageVisitorsModal
          page={selectedPage}
          visitors={pageVisitors}
          loading={pageVisitorsLoading}
          error={pageVisitorsError}
          onClose={closePageVisitors}
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
/* PAGE VISITORS MODAL */
/* ====================================================================== */

function PageVisitorsModal({
  page,
  visitors,
  loading,
  error,
  onClose,
  onVisitorClick,
}) {
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
              Page Visitor Log
            </h2>

            <p className="text-sm text-gray-500 mt-1 break-all">
              {page}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Individual page_view events for the selected date range
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
                No individual page-view events found.
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
                        Date & Time
                      </th>

                      <th className="text-left p-3">
                        Visitor
                      </th>

                      <th className="text-left p-3">
                        Location
                      </th>

                      <th className="text-left p-3">
                        Device
                      </th>

                      <th className="text-left p-3">
                        Referrer
                      </th>

                      <th className="text-left p-3">
                        Session
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {visitors.map((visitor) => (
                      <tr
                        key={visitor.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3 whitespace-nowrap">
                          {formatDateTime(
                            visitor.server_timestamp
                          )}
                        </td>

                        <td className="p-3">
                          {visitor.visitor_id ? (
                            <button
                              onClick={() =>
                                onVisitorClick(
                                  visitor.visitor_id
                                )
                              }
                              className="text-[#1F524F] font-medium underline decoration-dotted underline-offset-4 hover:text-[#42B3A5]"
                              title="View visitor journey"
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

                        <td className="p-3 whitespace-nowrap">
                          {formatLocation(visitor)}
                        </td>

                        <td className="p-3">
                          {visitor.device || "Unknown"}
                        </td>

                        <td className="p-3 max-w-[220px]">
                          <span
                            className="block truncate"
                            title={
                              visitor.referrer ||
                              "Direct"
                            }
                          >
                            {getReferrerName(
                              visitor.referrer
                            )}
                          </span>
                        </td>

                        <td className="p-3">
                          <span
                            className="text-xs text-gray-500"
                            title={
                              visitor.session_id || ""
                            }
                          >
                            {shortId(
                              visitor.session_id
                            )}
                          </span>
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
              {visitors.length} individual page-view events
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
          <div>
            <h2 className="text-xl font-bold text-[#1F524F]">
              Visitor Journey
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Visitor ID:{" "}
              <span className="font-mono">
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
/* GEO CARD */
/* ====================================================================== */

function GeoCard({
  title,
  items,
  labelKey,
}) {
  return (
    <div className="bg-white border p-4 rounded">
      <h2 className="font-semibold mb-2">
        {title}
      </h2>

      {items.map((item, i) => (
        <div
          key={`${item[labelKey]}-${i}`}
          className="flex justify-between border-b py-1"
        >
          <span>
            {item[labelKey] || "Unknown"}
          </span>

          <span>
            {item.visitors || 0}
          </span>
        </div>
      ))}
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

    return url.hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
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