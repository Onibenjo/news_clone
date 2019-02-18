const withOffline = require("next-offline");

module.exports = withOffline({
  target: "serverless",
  workboxOpts: {
    skipWaiting: true,
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "networkFirst",
        options: {
          cacheName: "hack-news",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: new RegExp("https://api.hackerwebapp.com/news"),
        handler: "networkFirst",
        options: {
          cacheName: "api-cache",
          cacheableResponse: {
            statuses: [200]
          }
        }
      }
    ]
  }
});
