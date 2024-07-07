require("dotenv").config();
const { Client } = require("pg");
const colors = require("colors");

// Array of schema creation SQL commands
const schemaQueries = [
  // Create the 'jobs' table
  `
  CREATE TABLE IF NOT EXISTS jobs (
    job_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days')
  );
  `,

  // // Create the 'job_adverts' table
  // `
  // CREATE TABLE IF NOT EXISTS job_adverts (
  //   id SERIAL PRIMARY KEY,
  //   job_id INT REFERENCES jobs(job_id),
  //   advert_details TEXT,
  //   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  // );
  // `,

  // Create the 'candidates' table
  `
  CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    resume BYTEA, -- Storing the file as binary data
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `,

  // Create the 'job_applications' table
  `
  CREATE TABLE IF NOT EXISTS job_applications (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(job_id),
    candidate_id INT REFERENCES candidates(id),
    application_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `,
];

// PostgreSQL client configuration
const client = new Client({
  host: process.env.HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME, // Use the existing database
});

async function createSchema() {
  try {
    // Connect to the PostgreSQL database
    await client.connect();
    console.log(colors.green("Connected to the PostgreSQL database"));

    // // Execute all schema creation queries
    for (const query of schemaQueries) {
      await client.query(query);
      console.log("Executed schema query");
    }
  } catch (err) {
    console.error(colors.red("Error creating tables", err.stack));
  }
}

// Run the schema creation function
createSchema();

module.exports = { client };
