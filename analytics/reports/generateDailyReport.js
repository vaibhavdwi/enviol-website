import pool from "@/lib/db";

import {
  getTotalEvents,
  getEventCounts,
  getTopPages,
  getTopCTAs,
  getTopNavigation,

  getUniqueVisitors,
  getSessions,
  getCountries,
  getRegions,
  getReturningVisitors,

  getTopCountries,
  getTopRegions,
  getTopCities,
} from "./reportQueries";

import { buildDashboardMetrics } from "./dashboardMetrics";

/**
 * Generate Daily Analytics Report
 *
 * Example:
 * await generateDailyReport("2026-06-04");
 */
export async function generateDailyReport(reportDate) {
  try {
    // ----------------------------------
    // FETCH RAW DATA
    // ----------------------------------

    const [
  totalEvents,
  eventCounts,
  topPages,
  topCTAs,
  topNavigation,

  uniqueVisitors,
  sessions,
  countries,
  regions,
  returningVisitors,

  topCountries,
  topRegions,
  topCities,
] = await Promise.all([
  getTotalEvents(reportDate),
  getEventCounts(reportDate),
  getTopPages(reportDate),
  getTopCTAs(reportDate),
  getTopNavigation(reportDate),

  getUniqueVisitors(reportDate),
  getSessions(reportDate),
  getCountries(reportDate),
  getRegions(reportDate),
  getReturningVisitors(reportDate),

  getTopCountries(reportDate),
  getTopRegions(reportDate),
  getTopCities(reportDate),
]);

    // ----------------------------------
    // BUILD DASHBOARD METRICS
    // ----------------------------------

    const dashboardMetrics = buildDashboardMetrics({
  totalEvents,
  eventCounts,
  topPages,
  topCTAs,
  topNavigation,

  uniqueVisitors,
  sessions,
  countries,
  regions,
  returningVisitors,

  topCountries,
  topRegions,
  topCities,
});

    // ----------------------------------
    // FINAL REPORT JSON
    // ----------------------------------

    const report = {
  reportDate,

  generatedAt: new Date().toISOString(),

  summary: dashboardMetrics.summary,

  topPages: dashboardMetrics.topPages,

  topCTAs: dashboardMetrics.topCTAs,

  topNavigation: dashboardMetrics.topNavigation,

  topCountries: dashboardMetrics.topCountries,

  topRegions: dashboardMetrics.topRegions,

  topCities: dashboardMetrics.topCities,

  rawEventCounts: eventCounts,
};

    // ----------------------------------
    // UPSERT INTO daily_reports
    // ----------------------------------

    await pool.query(
      `
      INSERT INTO daily_reports
      (
        report_date,
        report_type,
        report_json
      )
      VALUES
      (
        $1,
        'daily',
        $2
      )

      ON CONFLICT (report_date, report_type)

      DO UPDATE SET
        report_json = EXCLUDED.report_json,
        updated_at = NOW()
      `,
      [
        reportDate,
        JSON.stringify(report),
      ]
    );

    console.log(
      `Daily report generated successfully for ${reportDate}`
    );

    return report;
  } catch (error) {
    console.error(
      "generateDailyReport error:",
      error
    );

    throw error;
  }
}

/**
 * Generate report for today
 */
export async function generateTodayReport() {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  return generateDailyReport(today);
}

/**
 * Generate report for yesterday
 */
export async function generateYesterdayReport() {
  const yesterday = new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const reportDate = yesterday
    .toISOString()
    .split("T")[0];

  return generateDailyReport(reportDate);
}