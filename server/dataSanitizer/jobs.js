// validators/jobValidator.js
const { body, checkSchema, validationResult } = require("express-validator");

const createJobValidatorSchema = checkSchema({
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Title is required and must be a string",
    trim: true,
    isLength: {
      options: { max: 100 },
      errorMessage: "Title must be at most 100 characters long",
    },
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Description is required and must be a string",
    trim: true,
  },
  company_name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Company name is required and must be a string",
    trim: true,
    isLength: {
      options: { max: 100 },
      errorMessage: "Company name must be at most 100 characters long",
    },
  },
  location: {
    in: ["body"],
    isString: true,
    optional: true,
    trim: true,
    isLength: {
      options: { max: 100 },
      errorMessage: "Location must be at most 100 characters long",
    },
  },
});

const validateCreateJob = [
  createJobValidatorSchema,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCreateJob };
