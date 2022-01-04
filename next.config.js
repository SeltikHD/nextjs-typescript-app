module.exports = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING',
    },
    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000/api' // development api
                : 'http://localhost:3000/api', // production api
        rootUrl:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000' // development url
                : 'http://localhost:3000', // production url
    },
    images: {
        domains: ['assets.vercel.com'],
    },
};
