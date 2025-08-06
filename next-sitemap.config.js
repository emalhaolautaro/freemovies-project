/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://publicdomainmovies.vercel.app',
  generateRobotsTxt: true, // Genera robots.txt automáticamente
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/private/*'], // Páginas a excluir
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://publicdomainmovies.vercel.app/sitemap.xml',
    ],
  },
}