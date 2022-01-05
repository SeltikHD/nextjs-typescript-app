module.exports = {
    reactStrictMode: true,
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
};
