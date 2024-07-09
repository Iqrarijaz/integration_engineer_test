const { client } = require("../../utils/database");
const uniqueKey = require("unique-key");

// POST /jobs - Create a new job posting
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

// GET /jobs - Retrieve all active jobs with pagination
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

    // Calculate total pages
    const totalPages = Math.ceil(total / limitNumber);

    // Send the response
    return res.json({
      result: result.rows,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total_count: parseInt(total, 10),
        total_pages: totalPages,
      },
      meta: {
        message: "Jobs retrieved successfully",
      },
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

    let xml = `<?xml version="1.0" encoding="utf-8"?>\n<source>\n`;
    xml += `  <publisher>Creative Agency</publisher>\n`; // Example ATS Name
    xml += `  <publisherurl>https://www.creativeagency.com</publisherurl>\n`; // Example ATS URL

    result.rows.forEach((job) => {
      xml += `  <job>\n`;
      xml += `    <title><![CDATA[${job.title}]]></title>\n`;
      xml += `    <date><![CDATA[${new Date(
        job.created_at
      ).toISOString()}]]></date>\n`;
      xml += `    <referencenumber><![CDATA[${job.reference_number}]]></referencenumber>\n`;
      xml += `    <requisitionid><![CDATA[${job.job_id}]]></requisitionid>\n`;
      xml += `    <url><![CDATA[${job.url}]]></url>\n`;
      xml += `    <company><![CDATA[${job.company_name}]]></company>\n`;
      xml += `    <sourcename><![CDATA[Creative Agency]]></sourcename>\n`; // Example Source Name
      xml += `    <city><![CDATA[${job.location
        .split(",")[0]
        .trim()}]]></city>\n`;
      xml += `    <state><![CDATA[${
        job.location.split(",")[1]?.trim() || ""
      }]]></state>\n`;
      xml += `    <streetaddress><![CDATA[${job.location.replace(
        ",",
        " "
      )}]]></streetaddress>\n`;
      xml += `    <email><![CDATA[${job.contact_email}]]></email>\n`;
      xml += `    <description><![CDATA[${job.description}]]></description>\n`;
      xml += `    <salary><![CDATA[${job.salary}]]></salary>\n`;
      xml += `    <expirationdate><![CDATA[${
        new Date(job.expiry_date).toISOString().split("T")[0]
      }]]></expirationdate>\n`;
      xml += `  </job>\n`;
    });

    xml += `</source>`;

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
