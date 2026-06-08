import { generateDailyReport } from "@/analytics/reports/generateDailyReport";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const refresh = searchParams.get("refresh") === "true";

  const reportDate =
    from || new Date().toISOString().split("T")[0];

  // IMPORTANT CHANGE
  const report = await generateDailyReport(reportDate, refresh);

  return Response.json(report);
}