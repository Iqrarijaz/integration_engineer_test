"use strict";
const apiRoute = require("../controllers/index");
const path = require("path");
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
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Integration Engineer Test Server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
          }
          .container {
            text-align: center;
          }
          h1 {
            margin-bottom: 20px;
          }
          button {
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Integration Engineer Test Server</h1>
          <a href="${process.env.DOMAIN}:${process.env.PORT}/api-docs" target="_blank">
            <button>Go to API Documentation</button>
          </a>
        </div>
      </body>
      </html>
    `);
  });

  // API route
  server.use(apiRoute);

  // 404 Not Found route
  server.use((req, res) => {
    res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Page Not Found</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
        }
        .container {
          text-align: center;
        }
        h1 {
          margin-bottom: 20px;
          color: #dc3545;
        }
        p {
          font-size: 18px;
          color: #333;
        }
        a {
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        a:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="${process.env.DOMAIN}:${process.env.PORT}/" target="_self">Go Back to Home</a>
      </div>
    </body>
    </html>
  `);
  });
}

module.exports = { init };
