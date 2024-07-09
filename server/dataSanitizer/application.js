const { check, validationResult } = require("express-validator");
const { client } = require("../utils/database");

// Custom validation function to check if the job exists and is not expired
const checkJobExistsAndNotExpired = async (jobId) => {
  try {
    const result = await client.query(
      "SELECT expiry_date FROM jobs WHERE job_id = $1",
      [jobId]
    );
    if (result.rows.length === 0) {
      return { exists: false }; // Job does not exist
    }
    const expiryDate = new Date(result.rows[0].expiry_date);
    const currentDate = new Date();
    if (expiryDate < currentDate) {
      return { exists: true, expired: true }; // Job is expired
    }
    return { exists: true, expired: false }; // Job exists and is not expired
  } catch (error) {
    console.error("Error checking job existence and expiry:", error);
    throw new Error("Database error occurred");
  }
};

// Custom validation function to check for duplicate applications
const checkDuplicateApplication = async (jobId, email) => {
  try {
    const result = await client.query(
      "SELECT COUNT(*) FROM job_applications WHERE job_id = $1 AND candidate_email = $2",
      [jobId, email]
    );
    const count = parseInt(result.rows[0].count, 10);
    return count > 0; // Return true if a duplicate application exists
  } catch (error) {
    console.error("Error checking duplicate application:", error);
    throw new Error("Database error occurred");
  }
};

const submitApplicationValidatorSchema = [
  // Validate request body using express-validator
  check("job.jobId")
    .isInt()
    .withMessage("Job ID is required and must be an integer")
    .notEmpty()
    .withMessage("Job ID cannot be empty")
    .custom(async (value, { req }) => {
      const jobStatus = await checkJobExistsAndNotExpired(value);
      if (!jobStatus.exists) {
        throw new Error("Job is invalid, does not exist");
      }
      if (jobStatus.expired) {
        throw new Error("The job is expired or no longer available");
      }

      const duplicateApplication = await checkDuplicateApplication(
        value,
        req.body.applicant.email
      );
      if (duplicateApplication) {
        throw new Error("Duplicate Application already in the system");
      }
    }),

  check("id")
    .isString()
    .withMessage("Indeed ID is required and must be a string")
    .notEmpty()
    .withMessage("Indeed ID cannot be empty"),

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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorArray = errors.array();
      const jobError = errorArray.find(
        (err) => err.msg === "Job is invalid, does not exist"
      );
      if (jobError) {
        return res.status(404).json({
          message: "Job is invalid, does not exist",
          errors: errorArray,
        });
      }
      const expiredError = errorArray.find(
        (err) => err.msg === "The job is expired or no longer available"
      );
      if (expiredError) {
        return res.status(410).json({
          message: "The job is expired or no longer available",
          errors: errorArray,
        });
      }
      const duplicateError = errorArray.find(
        (err) => err.msg === "Duplicate Application already in the system"
      );
      if (duplicateError) {
        return res.status(409).json({
          message: "Duplicate Application already in the system",
          errors: errorArray,
        });
      }
      return res.status(400).json({
        message: "JSON payload is missing a required key",
        errors: errorArray,
      });
    }
    next();
  },
];

module.exports = { validateSubmitApplication };
