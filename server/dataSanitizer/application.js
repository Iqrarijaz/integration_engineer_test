const { check, validationResult } = require("express-validator");
const { client } = require("../utils/database");

// Custom validation function to check if applicant has already applied three times
const checkApplicationLimit = async (jobId, email) => {
  try {
    const result = await client.query(
      "SELECT COUNT(*) FROM job_applications WHERE job_id = $1 AND email = $2",
      [jobId, email]
    );
    const count = parseInt(result.rows[0].count, 10);
    return count < 3; // Return true if less than 3 applications exist
  } catch (error) {
    console.error("Error checking application limit:", error);
    throw new Error("Database error occurred");
  }
};

const submitApplicationValidatorSchema = [
  // Validate request body using express-validator
  check("job.jobId")
    .isInt()
    .withMessage("Job ID is required and must be an integer")
    .notEmpty()
    .withMessage("Job ID cannot be empty"),

  check("applicant.fullName")
    .isString()
    .withMessage("Full Name is required and must be a string")
    .notEmpty()
    .withMessage("Full Name cannot be empty"),

  check("applicant.firstName")
    .isString()
    .withMessage("First Name is required and must be a string")
    .notEmpty()
    .withMessage("First Name cannot be empty"),

  check("applicant.lastName")
    .isString()
    .withMessage("Last Name is required and must be a string")
    .notEmpty()
    .withMessage("Last Name cannot be empty"),

  check("applicant.phoneNumber")
    .isString()
    .withMessage("Phone number is required and must be a string")
    .notEmpty()
    .withMessage("Phone number cannot be empty"),

  check("applicant.email")
    .isEmail()
    .withMessage("Email is required and must be a valid email address")
    .isString()
    .withMessage("Email must be a string")
    .notEmpty()
    .withMessage("Email cannot be empty"),

  check("applicant.resume")
    .isObject()
    .withMessage("Resume is required and must be an object")
    .notEmpty()
    .withMessage("Resume cannot be empty"),

  check("applicant.verified")
    .optional()
    .isBoolean()
    .withMessage("Verified must be a boolean"),

  check("applicant.applicationDetails")
    .optional()
    .isString()
    .withMessage("Application details must be a string"),
];

const validateSubmitApplication = [
  submitApplicationValidatorSchema,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateSubmitApplication };
