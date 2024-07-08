const { check, validationResult } = require("express-validator");

// Validator schema for creating a new job
const createJobValidatorSchema = [
  // Title validation
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required and cannot be empty")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters long"),

  // Description validation
  check("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required and cannot be empty")
    .isString()
    .withMessage("Description must be a string"),

  // Salary validation
  check("salary")
    .trim()
    .notEmpty()
    .withMessage("Salary is required and cannot be empty")
    .isString()
    .withMessage("Salary must be a string"),

  // URL validation
  check("url")
    .trim()
    .notEmpty()
    .withMessage("URL is required and cannot be empty")
    .isURL()
    .withMessage("URL must be a valid URL"),

  // Contact email validation
  check("contact_email")
    .trim()
    .notEmpty()
    .withMessage("Contact email is required and cannot be empty")
    .isEmail()
    .withMessage("Contact email must be a valid email address"),

  // Company name validation
  check("company_name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required and cannot be empty")
    .isString()
    .withMessage("Company name must be a string")
    .isLength({ max: 100 })
    .withMessage("Company name must be at most 100 characters long"),

  // Location validation (optional)
  check("location")
    .optional()
    .trim()
    .isString()
    .withMessage("Location must be a string")
    .isLength({ max: 100 })
    .withMessage("Location must be at most 100 characters long"),
];

// Middleware to validate create job requests
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
