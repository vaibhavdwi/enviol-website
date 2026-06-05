import { getSessionId } from "./session";
import { getVisitorId } from "./visitor";
/**
 * Main tracking function
 * Sends event to:
 * 1. Google Analytics (GA4)
 * 2. Your backend (/api/track)
 */
export function track(eventName, payload = {}) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: eventName,

    // core context
    page: window.location.pathname,
    full_url: window.location.href,
    referrer: document.referrer || null,

    visitor_id:getVisitorId(),
    // session
    session_id: getSessionId(),

    // timestamp
    timestamp: new Date().toISOString(),

    // extra custom data
    ...payload
  };

  // ----------------------------
  // 1. GOOGLE ANALYTICS (GA4)
  // ----------------------------
  if (window.gtag) {
    window.gtag("event", eventName, {
      page_path: eventData.page,
      ...payload
    });
  }

  // ----------------------------
  // 2. YOUR BACKEND (DB STORAGE)
  // ----------------------------
  fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  }).catch((err) => {
    console.error("Tracking failed:", err);
  });
}