/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    exclude: ['/_*', '/api', '/api/*'],
};
