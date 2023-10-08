const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy requests to your Node.js server
  app.use(
    "/api", // Specify the API endpoint path you want to proxy
    createProxyMiddleware({
      target: "http://localhost:3001", // Specify the URL of your Node.js server
      changeOrigin: true, // Add this line to enable CORS
    })
  );
};
