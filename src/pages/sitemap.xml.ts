import fs from 'fs';
import { GetServerSideProps } from 'next';
import path from 'path';

export default function Sitemap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const baseUrl = {
        test: 'http://localhost:3000',
        development: 'http://localhost:3000',
        production: 'https://mydomain.com',
    }[process.env.NODE_ENV];

    //Pages that should not be part of the sitemap.xml
    const notIncludedPages = [
        '_app.js',
        '_app.jsx',
        '_app.ts',
        '_app.tsx',
        '_document.js',
        '_document.jsx',
        '_document.ts',
        '_document.tsx',
        '_error.js',
        '_error.jsx',
        '_error.ts',
        '_error.tsx',
        'sitemap.xml.js',
    ];

    const staticPages = fs
        .readdirSync('src/pages')
        .filter((staticPage) => {
            return !notIncludedPages.includes(staticPage);
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${path.parse(staticPagePath).name}`;
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
