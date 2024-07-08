const { client } = require("../../utils/database");

// Receive an application
async function receiveApplication(req, res) {
  try {
    const data = req.body;
    console.log(data);

    // Extract data from the request body
    const {
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
      VALUES ($1, $2, $3, $4, $5, $6 , $7) RETURNING id;
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
      INSERT INTO job_applications (job_id, candidate_id, application_details)
      VALUES ($1, $2, $3) RETURNING *;
    `;

    // Insert job application data
    const applicationValues = [
      jobId,
      candidateId,
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

module.exports = { receiveApplication };
