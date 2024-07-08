const { client } = require("../../utils/database");
const uniqueKey = require("unique-key");

// Create a new job posting

async function createJob(req, res) {
  const {
    title,
    description,
    company_name,
    location,
    salary,
    url,
    contact_email,
  } = req.body;

  try {
    // Generate a unique reference number
    const reference_number = uniqueKey(32, "pk-");

    // Calculate the expiry date (30 days from now)
    const expiry_date = new Date();
    expiry_date.setDate(expiry_date.getDate() + 30);

    // Define the query and values
    const query = `
      INSERT INTO jobs (reference_number, contact_email, title, description, company_name, location, expiry_date, salary, url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING job_id, title, description, company_name, location, created_at, expiry_date
    `;
    const values = [
      reference_number,
      contact_email,
      title,
      description,
      company_name,
      location,
      expiry_date.toISOString(),
      salary,
      url,
    ];

    // Execute the query
    const result = await client.query(query, values);

    // Return the new job
    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      result: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating job:", error); // Log the error for debugging

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [
        {
          code: 500,
          name: "Internal Server Error",
          message: error.message,
        },
      ],
    });
  }
}

// Retrieve all active jobs with pagination

async function listJobs(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate offset
    const offset = (pageNumber - 1) * limitNumber;

    // Define the query to select active jobs with pagination
    const query = `SELECT * FROM jobs WHERE expiry_date > CURRENT_DATE ORDER BY created_at DESC LIMIT $1 OFFSET $2`;

    // Execute the query with pagination
    const result = await client.query(query, [limitNumber, offset]);

    // Get the total count of active jobs
    const total = (
      await client.query(
        `SELECT COUNT(*) FROM jobs WHERE expiry_date > CURRENT_DATE`
      )
    ).rows[0].count;

    // Send the response
    return res.json({
      result: result.rows,
      meta: { total, page: pageNumber, limit: limitNumber },
      errors: [],
    });
  } catch (error) {
    // Error handling
    res.status(500).json({
      result: null,
      meta: {},
      errors: [
        {
          code: 500,
          name: "Internal Server Error",
          message: error.message,
          details: error,
        },
      ],
    });
  }
}

// GET /jobs/indeed.xml - Retrieve all active jobs in XML format

async function getIndeedJobs(req, res) {
  try {
    const result = await client.query(
      "SELECT * FROM jobs WHERE expiry_date > CURRENT_DATE ORDER BY created_at DESC"
    );
    let xml =
      '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n';
    result.rows.forEach((job) => {
      xml += `<item>\n<title>${job.title}</title>\n<description>${
        job.description
      }</description>\n<pubDate>${new Date(
        job.created_at
      ).toUTCString()}</pubDate>\n</item>\n`;
    });
    xml += "</channel>\n</rss>";
    res.header("Content-Type", "application/xml").send(xml);
  } catch (error) {
    res.status(500).json({
      result: null,
      meta: {},
      errors: [
        {
          code: 500,
          name: "Internal Server Error",
          message: error.message,
          details: error,
        },
      ],
    });
  }
}

module.exports = {
  listJobs,
  createJob,
  getIndeedJobs,
};
