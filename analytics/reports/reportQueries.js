import pool from "@/lib/db";

/**
 * Total events by type
 */
export async function getEventCounts(reportDate) {
  const result = await pool.query(
    `
    SELECT
      event,
      COUNT(*)::int AS count
    FROM events
    WHERE DATE(event_timestamp) = $1
    GROUP BY event
    ORDER BY count DESC
    `,
    [reportDate]
  );

  return result.rows;
}


export async function getUniqueVisitors(reportDate) {
  const result = await pool.query(
    `
    SELECT COUNT(DISTINCT visitor_id)::int AS unique_visitors
    FROM events
    WHERE DATE(event_timestamp) = $1
	AND visitor_id IS NOT NULL
    `,
    [reportDate]
  );

  return result.rows[0]?.unique_visitors || 0;
}

export async function getSessions(reportDate) {
  const result = await pool.query(
    `
    SELECT COUNT(DISTINCT session_id)::int AS sessions
    FROM events
    WHERE DATE(event_timestamp) = $1
      AND session_id IS NOT NULL
    `,
    [reportDate]
  );

  return result.rows[0]?.sessions || 0;
}

export async function getCountries(reportDate) {
  const result = await pool.query(
    `
    SELECT COUNT(DISTINCT country)::int AS countries
    FROM events
    WHERE DATE(event_timestamp) = $1
      AND country IS NOT NULL
      AND country <> 'Unknown'
    `,
    [reportDate]
  );

  return result.rows[0]?.countries || 0;
}

export async function getRegions(reportDate) {
  const result = await pool.query(
    `
    SELECT COUNT(DISTINCT region)::int AS regions
    FROM events
    WHERE DATE(event_timestamp) = $1
      AND region IS NOT NULL
      AND region <> 'Unknown'
    `,
    [reportDate]
  );

  return result.rows[0]?.regions || 0;
}

export async function getReturningVisitors(reportDate) {
  const result = await pool.query(
    `
    SELECT COUNT(*)::int AS returning_visitors
    FROM (
      SELECT visitor_id
      FROM events
      WHERE DATE(event_timestamp) = $1
        AND visitor_id IS NOT NULL
      GROUP BY visitor_id
      HAVING COUNT(DISTINCT session_id) > 1
    ) t
    `,
    [reportDate]
  );

  return result.rows[0]?.returning_visitors || 0;
}

export async function getTopCountries(
  reportDate,
  limit = 10
) {
  const result = await pool.query(
    `
    SELECT
      country,
      COUNT(DISTINCT visitor_id)::int AS visitors
    FROM events
    WHERE DATE(event_timestamp) = $1
      AND country IS NOT NULL
      AND country <> 'Unknown'
    GROUP BY country
    ORDER BY visitors DESC
    LIMIT $2
    `,
    [reportDate, limit]
  );

  return result.rows;
}

export async function getTopRegions(
  reportDate,
  limit = 10
) {
  const result = await pool.query(
    `
    SELECT
      region,
      COUNT(DISTINCT visitor_id)::int AS visitors
    FROM events
    WHERE DATE(event_timestamp) = $1
      AND region IS NOT NULL
      AND region <> 'Unknown'
    GROUP BY region
    ORDER BY visitors DESC
    LIMIT $2
    `,
    [reportDate, limit]
  );

  return result.rows;
}

export async function getTopCities(
  reportDate,
  limit = 10
) {
  const result = await pool.query(
    `
    SELECT
      city,
      COUNT(DISTINCT visitor_id)::int AS visitors
    FROM events
    WHERE DATE(event_timestamp) = $1
      AND city IS NOT NULL
      AND city <> 'Unknown'
    GROUP BY city
    ORDER BY visitors DESC
    LIMIT $2
    `,
    [reportDate, limit]
  );

  return result.rows;
}

export async function getConversions(reportDate) {
  const result = await pool.query(
    `
    SELECT COUNT(*)::int AS conversions
    FROM events
    WHERE DATE(event_timestamp) = $1
      AND event IN ('form_submit', 'enquiry', 'cta_click')
    `,
    [reportDate]
  );

  return result.rows[0]?.conversions || 0;
}
/**
 * Top visited pages
 */
export async function getTopPages(reportDate, limit = 10) {
  const result = await pool.query(
    `
    SELECT
      page,
      COUNT(*)::int AS views
    FROM events
    WHERE event = 'page_view'
      AND DATE(event_timestamp) = $1
    GROUP BY page
    ORDER BY views DESC
    LIMIT $2
    `,
    [reportDate, limit]
  );

  return result.rows;
}

/**
 * Top CTA targets
 */
export async function getTopCTAs(reportDate, limit = 10) {
  const result = await pool.query(
    `
    SELECT
      metadata->>'target' AS target,
      COUNT(*)::int AS clicks
    FROM events
    WHERE event = 'cta_click'
      AND DATE(event_timestamp) = $1
    GROUP BY target
    ORDER BY clicks DESC
    LIMIT $2
    `,
    [reportDate, limit]
  );

  return result.rows;
}

/**
 * Top navigation clicks
 */
export async function getTopNavigation(reportDate, limit = 20) {
  const result = await pool.query(
    `
    SELECT
      metadata->>'target' AS target,
      COUNT(*)::int AS clicks
    FROM events
    WHERE event = 'navigation_click'
      AND DATE(event_timestamp) = $1
    GROUP BY target
    ORDER BY clicks DESC
    LIMIT $2
    `,
    [reportDate, limit]
  );

  return result.rows;
}

/**
 * Total event count
 */
export async function getTotalEvents(reportDate) {
  const result = await pool.query(
    `
    SELECT COUNT(*)::int AS total
    FROM events
    WHERE DATE(event_timestamp) = $1
    `,
    [reportDate]
  );

  return result.rows[0]?.total || 0;
}