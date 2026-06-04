/**
 * Convert raw report data into dashboard metrics
 */
export function buildDashboardMetrics({
  totalEvents,
  eventCounts,
  topPages,
  topCTAs,
  topNavigation,
}) {
  const pageViews =
    eventCounts.find((e) => e.event === "page_view")?.count || 0;

  const navigationClicks =
    eventCounts.find((e) => e.event === "navigation_click")?.count || 0;

  const ctaClicks =
    eventCounts.find((e) => e.event === "cta_click")?.count || 0;

  const formSubmits =
    eventCounts.find((e) => e.event === "form_submit")?.count || 0;

  const emailClicks =
    eventCounts.find((e) => e.event === "email_click")?.count || 0;

  const phoneClicks =
    eventCounts.find((e) => e.event === "phone_click")?.count || 0;

  const conversionRate =
    pageViews > 0
      ? Number(((formSubmits / pageViews) * 100).toFixed(2))
      : 0;

  return {
    summary: {
      totalEvents,
      pageViews,
      navigationClicks,
      ctaClicks,
      formSubmits,
      emailClicks,
      phoneClicks,
      conversionRate,
    },

    topPages,

    topCTAs,

    topNavigation,
  };
}