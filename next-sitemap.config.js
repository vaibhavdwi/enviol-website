/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://enviol.com',

  generateRobotsTxt: true,

  changefreq: 'weekly',

  priority: 0.7,

  sitemapSize: 5000,

  exclude: [
    '/admin/*',
    '/admin/**',
    '/api/*',
    '/api/**',
    '/guest/*',
    '/guest/**',
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/guest/*',
        ],
      },
    ],
  },
};