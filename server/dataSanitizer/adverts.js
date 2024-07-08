const { check, validationResult } = require("express-validator");
const { client } = require("../utils/database");
const createAdvertisementValidator = [
  // Validate job_id
  check("job_id")
    .isInt()
    .notEmpty()
    .withMessage("Job ID is required and must be an integer"),

  // Validate platform
  check("platform")
    .isString()
    .notEmpty()
    .withMessage("Platform is required and must be a string")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Platform must be at most 100 characters long"),

  // Validate advert_title
  check("advert_title")
    .isString()
    .notEmpty()
    .withMessage("Advert Title is required and must be a string")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Advert Title must be at most 255 characters long"),

  // Validate advert_url
  check("advert_url")
    .isURL()
    .notEmpty()
    .withMessage("Advert URL is required and must be a valid URL")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Advert URL must be at most 255 characters long"),

  // Validate advert_details
  check("advert_details")
    .optional()
    .isString()
    .withMessage("Advert Details must be a string"),

  // Validate published_at
  check("published_at")
    .optional()
    .isISO8601()
    .withMessage("Published At must be a valid ISO 8601 date"),

  // Validate updated_at
  check("updated_at")
    .optional()
    .isISO8601()
    .withMessage("Updated At must be a valid ISO 8601 date"),

  // Check if the job_id and platform combination already exists
  async (req, res, next) => {
    const { job_id, platform } = req.body;

    try {
      // Query to check for existing record with the same job_id and platform
      const result = await client.query(
        `SELECT 1 FROM job_adverts WHERE job_id = $1 AND platform = $2`,
        [job_id, platform]
      );

      // If a record is found, return a 400 error
      if (result.rowCount > 0) {
        return res.status(400).json({
          errors: [
            {
              code: 400,
              name: "DuplicateAdvert",
              message: `An advert for job ID ${job_id} on platform ${platform} already exists.`,
              details: `Duplicate entry for job ID ${job_id} and platform ${platform}.`,
            },
          ],
        });
      }
    } catch (error) {
      return res.status(500).json({
        errors: [
          {
            code: 500,
            name: "InternalServerError",
            message:
              "An error occurred while checking for duplicate advertisements.",
            details: error.message,
          },
        ],
      });
    }

    next();
  },
];

const validateCreateAdvertisement = [
  createAdvertisementValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCreateAdvertisement };
