import { generateDailyReport } from "@/analytics/reports/generateDailyReport";

/**
 * Cron Job: Generate Daily Analytics Report
 * Runs once per day (Vercel Cron or external scheduler)
 */
export async function GET() {
  try {
    // Get yesterday's date (we always finalize previous day)
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const reportDate = date.toISOString().split("T")[0];

    console.log("Generating daily report for:", reportDate);

    // Force refresh = true (always recompute in cron)
    const report = await generateDailyReport(reportDate, true);

    return Response.json({
      success: true,
      message: "Daily report generated successfully",
      reportDate,
      summary: {
        totalEvents: report?.summary?.totalEvents || 0,
        uniqueVisitors: report?.summary?.uniqueVisitors || 0,
      },
    });
  } catch (error) {
    console.error("Daily report cron error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to generate daily report",
      },
      { status: 500 }
    );
  }
}