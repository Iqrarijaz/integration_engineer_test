"use strict";

// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Initialize the Express server
const server = express();

// Function to configure middleware and routes
const create = function () {
  // Middleware to parse JSON and URL-encoded data with increased limits
  server.use(express.json({ limit: "50mb" }));
  server.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Enable Cross-Origin Resource Sharing (CORS)
  server.use(cors({ origin: "*" }));

  // Serve static files from the 'public' directory
  server.use(express.static("public"));

  // HTTP request logger middleware
  server.use(morgan("dev"));

  // OpenAPI Specification
  const swaggerOptions = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Integration Engineer Test",
        version: "1.0.0",
      },
      servers: [
        {
          url: `${process.env.DOMAIN}:${process.env.PORT}`,
          description: "Development server",
        },
      ],
    },
    apis: ["./docs/**/*.js"], // Point to the directory containing documentation files
  };

  const specs = swaggerJSDoc(swaggerOptions);
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  // Initialize routes
  routes.init(server);

  // Connect to the database
  require("./utils/database");
};

// Function to start listening for connections
const start = function () {
  server.listen(process.env.PORT, () => {
    console.log(
      `Starting Backend Server at: ${process.env.DOMAIN}:${process.env.PORT}`
    );
  });
};

// Export the create and start functions
module.exports = {
  create,
  start,
};
