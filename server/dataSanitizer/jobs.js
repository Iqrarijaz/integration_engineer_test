const { check, validationResult } = require("express-validator");

// Validator for creating a new job
const createJobValidatorSchema = [
  check("title")
    .isString()
    .withMessage("Title is required and must be a string")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters long"),

  check("description")
    .isString()
    .withMessage("Description is required and must be a string")
    .notEmpty()
    .withMessage("Description cannot be empty")
    .trim(),

  check("company_name")
    .isString()
    .withMessage("Company name is required and must be a string")
    .notEmpty()
    .withMessage("Company name cannot be empty")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name must be at most 100 characters long"),

  check("location")
    .optional()
    .isString()
    .withMessage("Location must be a string")
    .trim()
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
