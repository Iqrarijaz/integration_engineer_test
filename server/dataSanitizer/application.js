// validators/jobValidator.js
const { checkSchema, validationResult } = require("express-validator");
const { client } = require("../utils/database");

const submitApplicationValidatorSchema = checkSchema({
  job: {
    in: ["body"],
    isObject: true,
    notEmpty: true,
    errorMessage: "Job object is required",
    custom: {
      options: async (value) => {
        const jobId = value.jobId;
        const result = await client.query(
          "SELECT 1 FROM jobs WHERE job_id = $1",
          [jobId]
        );
        if (result.rowCount === 0) {
          return Promise.reject("Job ID does not exist");
        }
        return true;
      },
    },
    jobId: {
      in: ["body.job"],
      isInt: true,
      notEmpty: true,
      errorMessage: "Job ID is required and must be an integer",
    },
  },
  applicant: {
    in: ["body"],
    isObject: true,
    notEmpty: true,
    errorMessage: "Applicant object is required",
    fullName: {
      in: ["body.applicant"],
      isString: true,
      notEmpty: true,
      errorMessage: "Full Name is required and must be a string",
      trim: true,
      isLength: {
        options: { max: 100 },
        errorMessage: "Full Name must be at most 100 characters long",
      },
    },
    firstName: {
      in: ["body.applicant"],
      isString: true,
      notEmpty: true,
      errorMessage: "First Name is required and must be a string",
      trim: true,
      isLength: {
        options: { max: 100 },
        errorMessage: "First Name must be at most 100 characters long",
      },
    },
    lastName: {
      in: ["body.applicant"],
      isString: true,
      notEmpty: true,
      errorMessage: "Last Name is required and must be a string",
      trim: true,
      isLength: {
        options: { max: 100 },
        errorMessage: "Last Name must be at most 100 characters long",
      },
    },
    phoneNumber: {
      in: ["body.applicant"],
      isString: true,
      notEmpty: true,
      errorMessage: "Phone number is required and must be a string",
      trim: true,
      isLength: {
        options: { max: 13 },
        errorMessage: "Phone number must be at most 13 characters long",
      },
    },
    email: {
      in: ["body.applicant"],
      isEmail: true,
      isString: true,
      notEmpty: true,
      errorMessage: "Email is required and must be a valid email address",
      trim: true,
    },
    resume: {
      in: ["body.applicant"],
      isObject: true,
      notEmpty: true,
      errorMessage: "Resume is required and must be an object",
    },
    verified: {
      in: ["body.applicant"],
      isBoolean: true,
      optional: true,
      errorMessage: "Verified must be a boolean",
    },
    applicationDetails: {
      in: ["body.applicant"],
      isString: true,
      optional: true,
      errorMessage: "Application details must be a string",
    },
  },
});

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
