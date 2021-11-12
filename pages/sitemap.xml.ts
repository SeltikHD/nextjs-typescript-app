import fs from 'fs';
import { GetServerSideProps } from 'next';

export default function Sitemap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const baseUrl = {
        test: 'http://localhost:3000',
        development: 'http://localhost:3000',
        production: 'https://mydomain.com',
    }[process.env.NODE_ENV];

    //Pages that should not be part of the sitemap.xml
    const notStaticPages = ['_app.js', '_document.js', '_error.js', 'sitemap.xml.js'];

    const staticPages = fs
        .readdirSync('pages')
        .filter((staticPage) => {
            return !notStaticPages.includes(staticPage);
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath}`;
        });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
          .map((url) => {
              return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join('')}
    </urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};
