/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000/api' // development api
                : 'http://localhost:3000/api', // production api
    },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

module.exports = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development',
    },
});
