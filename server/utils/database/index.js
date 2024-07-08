require("dotenv").config();
const { Client } = require("pg");
const colors = require("colors");

// Array of schema creation SQL commands
const schemaQueries = [
  // Create the 'jobs' table
  `
  CREATE TABLE IF NOT EXISTS jobs (
    job_id SERIAL PRIMARY KEY,  -- Primary key for the table
    reference_number VARCHAR(100) UNIQUE NOT NULL,  
    title VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,  
    url VARCHAR(255) NOT NULL,  
    description TEXT NOT NULL,
    salary TEXT NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days')
  );
  `,

  // Create the 'job adverts' table
  `
CREATE TABLE IF NOT EXISTS job_adverts (
  id SERIAL PRIMARY KEY,  
  job_id INT REFERENCES jobs(job_id),  
  platform VARCHAR(100) NOT NULL,  
  advert_title VARCHAR(255) NOT NULL,  
  advert_url VARCHAR(255) NOT NULL,  
  advert_details TEXT,  
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  UNIQUE(job_id, platform)  
);

`,
  // Create the 'job_applications' table
];

const databaseConfig = {
  host: process.env.HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

// PostgreSQL client configuration for initial connection
const initialClient = new Client({
  ...databaseConfig,
  database: "postgres", // Connect to the default postgres database initially
});

// PostgreSQL client configuration for the actual database
const client = new Client({
  ...databaseConfig,
  database: process.env.DATABASE_NAME, // Use the existing database
});

// Function to create the database if it doesn't exist
async function createDatabaseIfNotExists() {
  try {
    // Connect to the PostgreSQL server
    await initialClient.connect();
    console.log(colors.green("Connected to the PostgreSQL server"));

    // Check if the database exists
    const dbName = process.env.DATABASE_NAME;
    const result = await initialClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    // If the database does not exist, create it
    if (result.rowCount === 0) {
      await initialClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(colors.green(`Database '${dbName}' created successfully`));
    }

    // Close the initial connection
    await initialClient.end();
  } catch (err) {
    console.error(colors.red("Error creating database", err.stack));
  }
}

// Function to create the schema
async function createSchema() {
  try {
    // Connect to the PostgreSQL database
    await client.connect();

    // Execute all schema creation queries
    for (const query of schemaQueries) {
      await client.query(query);
    }

    console.log(colors.green("Database schema created successfully"));
  } catch (err) {
    console.error(colors.red("Error creating tables", err.stack));
  }
}

// Run the schema creation function
async function initializeDatabase() {
  await createDatabaseIfNotExists();
  await createSchema();
}

// Run the initialization function
initializeDatabase();

// Export the client for use in other modules
module.exports = { client };
