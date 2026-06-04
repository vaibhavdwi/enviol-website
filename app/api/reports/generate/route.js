import { generateDailyReport } from "@/analytics/reports/generateDailyReport";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // fallback
  const reportDate = from || new Date().toISOString().split("T")[0];

  const report = await generateDailyReport(reportDate);

  return Response.json(report);
}