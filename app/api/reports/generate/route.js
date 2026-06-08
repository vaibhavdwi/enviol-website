import { generateDailyReport } from "@/analytics/reports/generateDailyReport";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const refresh = searchParams.get("refresh") === "true";

  // default fallback (today only)
  const fromDate =
    from || new Date().toISOString().split("T")[0];

  const toDate =
    to || fromDate;

  console.log("[REPORT API] from:", fromDate, "to:", toDate, "refresh:", refresh);

  const report = await generateDailyReport(fromDate, toDate, refresh);

  return Response.json(report);
}