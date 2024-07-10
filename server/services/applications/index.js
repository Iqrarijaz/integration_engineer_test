const { client } = require("../../utils/database");

// Receive an application
async function receiveApplication(req, res) {
  try {
    // Extract data from the request body
    const data = req.body;
    console.log(data);

    // Destructure relevant data from the request body
    const {
      id,
      job: { jobId },
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

    // Convert resume base64 string to buffer
    const resumeBuffer = Buffer.from(resume?.file?.data, "base64");

    // Check if the candidate already exists in the database
    const checkCandidateQuery = `
      SELECT id
      FROM candidates
      WHERE email = $1
    `;
    const checkCandidateResult = await client.query(checkCandidateQuery, [
      email,
    ]);

    if (checkCandidateResult.rows.length > 0) {
      const candidateId = checkCandidateResult.rows[0].id;

      // Check if the application already exists for this job and candidate
      const checkApplicationQuery = `
        SELECT id
        FROM job_applications
        WHERE job_id = $1 AND candidate_id = $2
      `;
      const checkApplicationResult = await client.query(checkApplicationQuery, [
        jobId,
        candidateId,
      ]);

      // If application already exists, return a 409 error
      if (checkApplicationResult.rows.length > 0) {
        return res.status(409).json({
          errors: [
            {
              code: 409,
              name: "DuplicateApplication",
              message: "You have already applied for this job.",
            },
          ],
        });
      }

      // Insert a new application for the existing candidate
      const applicationQuery = `
        INSERT INTO job_applications (job_id, candidate_id, resume, application_details)
        VALUES ($1, $2, $3, $4) RETURNING *;
      `;
      const applicationValues = [
        jobId,
        candidateId,
        resumeBuffer,
        "Application received from Indeed's testing tool for existing candidate",
      ];
      const applicationResult = await client.query(
        applicationQuery,
        applicationValues
      );

      return res.json({
        result: applicationResult.rows[0],
        meta: {},
        errors: [],
      });
    }

    // Insert a new candidate if they do not exist
    const candidateQuery = `
      INSERT INTO candidates (full_name, first_name, last_name, phone_number, email, verified)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
    `;
    const candidateValues = [
      fullName,
      firstName,
      lastName,
      phoneNumber,
      email,
      verified,
    ];
    const candidateResult = await client.query(candidateQuery, candidateValues);
    const candidateId = candidateResult.rows[0].id;

    // Insert a new application for the new candidate
    const applicationQuery = `
      INSERT INTO job_applications (job_id, candidate_id, resume, application_details)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const applicationValues = [
      jobId,
      candidateId,
      resumeBuffer,
      "Application received from Indeed's testing tool",
    ];
    const applicationResult = await client.query(
      applicationQuery,
      applicationValues
    );

    // Send the response with the application result
    return res.json({
      result: applicationResult.rows[0],
      meta: {},
      errors: [],
    });
  } catch (error) {
    console.error("Error receiving application:", error);

    // Handle payload too large error
    if (error.code === "413") {
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

    // Define the query to select applications with candidate details and pagination
    const query = `
      SELECT ja.*, c.full_name, c.email, c.phone_number
      FROM job_applications ja
      JOIN candidates c ON ja.candidate_id = c.id
      ORDER BY ja.created_at DESC
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
    console.error("Error retrieving applications:", error);
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

module.exports = { receiveApplication, listApplications };
