const { client } = require("../../utils/database");

async function receiveApplication(req, res) {
  try {
    const data = req.body;
    console.log(data);

    // Define query to store candidate data
    const query = `
     INSERT INTO candidates (full_name, first_name, last_name, phone_number, email, resume, verified)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
   `;

    const values = [
      fullName,
      firstName,
      lastName,
      phoneNumber,
      email,
      resume.buffer,
      verified,
    ];
    const result = await client.query(query, values);
    // Send the response
    return res.json({
      result: data,
      meta: {},
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

module.exports = { receiveApplication };
