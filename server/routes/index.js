"use strict";
const apiRoute = require("../controllers/index");

function init(server) {
  // Normalize query parameters and request body keys to lower case
  server.use((req, res, next) => {
    for (let key in req.query) {
      req.query[key.toLowerCase()] = req.query[key];
    }
    for (let key in req.body) {
      req.body[key.toLowerCase()] = req.body[key];
    }
    next();
  });



  // Set headers for CORS
  server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization"
    );
    next();
  });

  // Root route
  server.get("/", (req, res) => {
    res.send("<--- Integration Engineer Test Server --------->");
  });

  // API route
  server.use(apiRoute);

  // Handle 404 - Route not found
  server.use((req, res) => {
     res.status(404).json({
      result: null,
      meta: null,
      errors: [
        {
          code: 404,
          name: "NotFound",
          message: "The requested resource was not found.",
          details: null,
        },
      ],
    });
  });
}

module.exports = { init };
