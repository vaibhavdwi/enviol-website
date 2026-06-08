import pool from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return Response.json(
        { error: "from and to are required" },
        { status: 400 }
      );
    }

    // KPI data
    const kpiResult = await pool.query(
      `
      SELECT *
      FROM analytics_daily
      WHERE date BETWEEN $1 AND $2
      ORDER BY date
      `,
      [from, to]
    );

    // GEO country
    const geoCountry = await pool.query(
      `
      SELECT country, SUM(visitors) AS visitors
      FROM analytics_geo_country
      WHERE date BETWEEN $1 AND $2
      GROUP BY country
      ORDER BY visitors DESC
      `,
      [from, to]
    );

    // Pages
    const pages = await pool.query(
      `
      SELECT page, SUM(views) AS views
      FROM analytics_pages
      WHERE date BETWEEN $1 AND $2
      GROUP BY page
      ORDER BY views DESC
      `,
      [from, to]
    );

    // Aggregate KPIs (SUM across days)
    const summary = kpiResult.rows.reduce(
      (acc, row) => {
        acc.total_events += Number(row.total_events || 0);
        acc.unique_visitors += Number(row.unique_visitors || 0);
        acc.sessions += Number(row.sessions || 0);
        acc.page_views += Number(row.page_views || 0);
        acc.cta_clicks += Number(row.cta_clicks || 0);
        acc.form_submits += Number(row.form_submits || 0);
        return acc;
      },
      {
        total_events: 0,
        unique_visitors: 0,
        sessions: 0,
        page_views: 0,
        cta_clicks: 0,
        form_submits: 0,
      }
    );

    return Response.json({
      summary,
      daily: kpiResult.rows,
      topCountries: geoCountry.rows,
      topPages: pages.rows,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Analytics fetch failed" },
      { status: 500 }
    );
  }
}