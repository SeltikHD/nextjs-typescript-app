/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});

//Next Config
const nextConfig = {
    swcMinify: true,
    reactStrictMode: true,
    trailingSlash: true,
    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000/api' // development api
                : 'https://nextjs-typescript-app.vercel.app/api', // production api
    },
    images: {
        domains: ['mui.com', 'localhost', 'avatars.githubusercontent.com'],
    },
    eslint: {
        dirs: ['src'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['log', 'warn', 'error'] } : false,
    },
    output: 'standalone',
};

module.exports = withPWA(nextConfig);
