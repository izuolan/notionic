const BLOG = require('./blog.config')

module.exports = {
  siteUrl: BLOG.link,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000
  // ...other options
  // https://github.com/iamvishnusankar/next-sitemap#configuration-options
}
