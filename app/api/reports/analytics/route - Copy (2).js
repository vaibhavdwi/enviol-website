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

    // ----------------------------------
    // PAGE VIEWS (NEW VIEW)
    // ----------------------------------
    const pagesResult = await pool.query(
      `
      SELECT
        page,
        SUM(total_views) AS views
      FROM analytics_page_views_daily
      WHERE date BETWEEN $1 AND $2
      GROUP BY page
      ORDER BY views DESC
      `,
      [from, to]
    );

    // ----------------------------------
    // GEO (KEEP YOUR EXISTING VIEW FOR NOW)
    // ----------------------------------
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

	const geoRegion = await pool.query(
`
SELECT region, SUM(visitors) AS visitors
FROM analytics_geo_region
WHERE date BETWEEN $1 AND $2
GROUP BY region
ORDER BY visitors DESC
`,
[from, to]
);

const geoCity = await pool.query(
`
SELECT city, SUM(visitors) AS visitors
FROM analytics_geo_city
WHERE date BETWEEN $1 AND $2
GROUP BY city
ORDER BY visitors DESC
`,
[from, to]
);

    // ----------------------------------
    // KPIs (KEEP UNTIL YOU MIGRATE LATER)
    // ----------------------------------
    const kpiResult = await pool.query(
      `
      SELECT *
      FROM analytics_daily
      WHERE date BETWEEN $1 AND $2
      `,
      [from, to]
    );

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
      topPages: pagesResult.rows,
      topCountries: geoCountry.rows,
	  topRegions: geoRegion.rows,
	  topCities: geoCity.rows,
      daily: kpiResult.rows,
    });
  } catch (err) {
    console.error("[ANALYTICS ERROR]", err);

    return Response.json(
      { error: "Analytics fetch failed" },
      { status: 500 }
    );
  }
}