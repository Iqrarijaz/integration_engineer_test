const { client } = require("../../utils/database");

// Create a new job advert
async function createAdvert(req, res) {
  // Extract job advert details from the request body
  const {
    job_id,
    platform,
    advert_title,
    advert_url,
    advert_details,
    published_at,
  } = req.body;

  try {
    // Check if the job_id provided in the request body corresponds to an existing job
    const jobExists = await client.query(
      `SELECT 1 FROM jobs WHERE job_id = $1`,
      [job_id]
    );

    // If no job with the provided job_id exists, respond with a 404 error
    if (jobExists.rowCount === 0) {
      return res.status(404).json({
        result: null,
        meta: null,
        errors: [
          {
            code: 404,
            name: "JobNotFound",
            message: "The specified job does not exist.",
            details: `Job ID ${job_id} does not correspond to an existing job.`,
          },
        ],
      });
    }

    // Insert a new job advert into the `job_adverts` table
    const result = await client.query(
      `
        INSERT INTO job_adverts (
          job_id,
          platform,
          advert_title,
          advert_url,
          advert_details,
          published_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          COALESCE($6, CURRENT_TIMESTAMP)
        )
        RETURNING
          id,
          job_id,
          platform,
          advert_title,
          advert_url,
          advert_details,
          published_at
      `,
      [job_id, platform, advert_title, advert_url, advert_details, published_at]
    );

    // Respond with a success message and the details of the newly created advert
    res.status(201).json({
      result: result.rows[0], // The newly created advert's details
      meta: {
        message: "Advertisement created successfully", // Success message
      },
      errors: [], // No errors
    });
  } catch (error) {
    // Catch and handle any errors that occur during the query execution
    console.error("Error creating advertisement:", error);
    res.status(500).json({
      result: null, // No result
      meta: null, // No metadata
      errors: [
        {
          code: 500, // HTTP status code for the error
          name: "InternalServerError", // Type of error
          message: "An error occurred while creating the advertisement.", // Error message
          details: error.message, // Detailed error message from the caught exception
        },
      ],
    });
  }
}

// List all job adverts with pagination
async function listAdverts(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate offset
    const offset = (pageNumber - 1) * limitNumber;

    // Define the query to select job adverts with pagination
    const query = `
        SELECT id, job_id, platform, advert_title, advert_url, advert_details, published_at
        FROM job_adverts
        ORDER BY published_at DESC
        LIMIT $1 OFFSET $2
      `;

    // Execute the query with pagination
    const result = await client.query(query, [limitNumber, offset]);

    // Get the total count of job adverts
    const total = (await client.query(`SELECT COUNT(*) FROM job_adverts`))
      .rows[0].count;

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
        message: "Adverts retrieved successfully",
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

module.exports = {
  createAdvert,
  listAdverts,
};
