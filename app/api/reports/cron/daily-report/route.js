import { generateDailyReport } from "@/analytics/reports/generateDailyReport";

export async function GET() {
  try {
    // ----------------------------------
    // GET YESTERDAY (SAFE YYYY-MM-DD)
    // ----------------------------------

    const date = new Date();
    date.setDate(date.getDate() - 1);

    const reportDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    console.log("[CRON] Generating daily report for:", reportDate);

    // ----------------------------------
    // FORCE REGENERATE (NO CACHE)
    // ----------------------------------

    const report = await generateDailyReport(reportDate, true);

    console.log("[CRON] Report generated successfully for:", reportDate);

    // ----------------------------------
    // LIGHTWEIGHT RESPONSE (IMPORTANT FOR VERCEL)
    // ----------------------------------

    return Response.json({
      success: true,
      reportDate,
      totalEvents: report?.summary?.totalEvents || 0,
      uniqueVisitors: report?.summary?.uniqueVisitors || 0,
    });
  } catch (error) {
    console.error("[CRON ERROR]", error);

    return Response.json(
      {
        success: false,
        message: "Daily report generation failed",
      },
      { status: 500 }
    );
  }
}