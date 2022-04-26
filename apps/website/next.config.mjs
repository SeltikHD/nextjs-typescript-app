/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';
import withPlugins from 'next-compose-plugins';
import nextTranspileModules from 'next-transpile-modules';
import withPreact from 'next-plugin-preact';

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
    experimental: {
        outputStandalone: true,
    }
};

//PWA
const pwa = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development',
    },
});

//Libs
const withLibs = nextTranspileModules(['lib']);

export default withPlugins([withLibs, pwa, withPreact], nextConfig);
