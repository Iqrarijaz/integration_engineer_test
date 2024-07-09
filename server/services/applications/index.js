const { client } = require("../../utils/database");

// Receive an application
async function receiveApplication(req, res) {
  try {
    // Extract data from the request body
    const data = req.body;
    console.log(data);

    const {
      id,
      job: { jobId }, // Extract job ID from request body
      applicant: {
        fullName,
        firstName,
        lastName,
        phoneNumber,
        email,
        resume,
        verified,
      },
    } = data;

    // Ensure resume is a buffer
    const resumeBuffer = Buffer.from(resume?.file?.data, "base64");

    // Define query for inserting data into candidates table
    const candidateQuery = `
      INSERT INTO candidates (full_name, first_name, last_name, phone_number, email, resume ,verified)
      VALUES ($1, $2, $3, $4, $5, $6 , $7 ) RETURNING id;
    `;

    // Insert candidate data
    const candidateValues = [
      fullName,
      firstName,
      lastName,
      phoneNumber,
      email,
      resumeBuffer,
      verified,
    ];

    const candidateResult = await client.query(candidateQuery, candidateValues);
    const candidateId = candidateResult.rows[0].id;

    // Define query for inserting data into job_applications table
    const applicationQuery = `
      INSERT INTO job_applications (job_id, indeed_id, candidate_id, candidate_email, application_details)
      VALUES ($1, $2, $3 , $4 , $5) RETURNING *;
    `;

    // Insert job application data
    const applicationValues = [
      jobId,
      id,
      candidateId,
      email,
      "Application received from Indeed's testing tool",
    ];

    const applicationResult = await client.query(
      applicationQuery,
      applicationValues
    );

    // Send the response
    return res.json({
      result: applicationResult.rows[0],
      meta: {},
      errors: [],
    });
  } catch (error) {

    console.error("Error receiving application:", error);

    if (error.code === '413') {
      // Handle payload too large error
      return res.status(413).json({
        result: null,
        meta: {},
        errors: [
          {
            code: 413,
            name: "Payload Too Large",
            message: "Payload is too large",
            details: error.message,
          },
        ],
      });
    }

    // General error handling
    res.status(422).json({
      result: null,
      meta: {},
      errors: [
        {
          code: 422,
          name: "Unable to save application",
          message: error.message,
          details: error,
        },
      ],
    });
  }
}

// List all job applications
async function listApplications(req, res) {
  try {
    // Extract page and limit from query parameters with default values
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate offset
    const offset = (pageNumber - 1) * limitNumber;

    // Define the query to select applications with pagination
    const query = `
      SELECT * FROM job_applications 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;

    // Execute the query with pagination
    const result = await client.query(query, [limitNumber, offset]);

    // Get the total count of applications
    const totalResult = await client.query(
      `SELECT COUNT(*) FROM job_applications`
    );
    const total = parseInt(totalResult.rows[0].count, 10);

    // Calculate total pages
    const totalPages = Math.ceil(total / limitNumber);

    // Send the response
    res.json({
      result: result.rows,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total_count: total,
        total_pages: totalPages,
      },
      meta: {
        message: "Applications retrieved successfully",
      },
      errors: [],
    });
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
module.exports = { receiveApplication ,listApplications};
