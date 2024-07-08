/**
 * @swagger
 * /jobs:
 *   post:
 *     tags:
 *       - Jobs
 *     summary: Create a new job listing
 *     description: This endpoint allows you to create a new job listing.
 *     operationId: createJob
 *     requestBody:
 *       description: Job object that needs to be added to the database.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Software Engineer
 *                 description: The title of the job.
 *               description:
 *                 type: string
 *                 example: Develop and maintain software applications.
 *                 description: A detailed description of the job responsibilities.
 *               company_name:
 *                 type: string
 *                 example: TechCorp
 *                 description: The name of the company offering the job.
 *               location:
 *                 type: string
 *                 example: New York, NY
 *                 description: The location where the job is based.
 *               salary:
 *                 type: string
 *                 example: 120000
 *                 description: The salary for the job.
 *               url:
 *                 type: string
 *                 example: "https://www.techcorp.com/jobs/software-engineer"
 *                 description: The URL for the job listing.
 *               contact_email:
 *                 type: string
 *                 example: hr@techcorp.com
 *                 description: The contact email for the job application.
 *             required:
 *               - title
 *               - description
 *               - company_name
 *               - location
 *     responses:
 *       '201':
 *         description: Job created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates whether the job was created successfully.
 *                 message:
 *                   type: string
 *                   example: Job created successfully
 *                   description: A message indicating the result of the request.
 *                 result:
 *                   type: object
 *                   properties:
 *                     job_id:
 *                       type: integer
 *                       example: 1
 *                       description: The unique identifier for the job.
 *                     title:
 *                       type: string
 *                       example: Software Engineer
 *                       description: The title of the job.
 *                     description:
 *                       type: string
 *                       example: Develop and maintain software applications.
 *                       description: A detailed description of the job responsibilities.
 *                     company_name:
 *                       type: string
 *                       example: TechCorp
 *                       description: The name of the company offering the job.
 *                     location:
 *                       type: string
 *                       example: New York, NY
 *                       description: The location where the job is based.
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-07-07T12:34:56Z'
 *                       description: The date and time when the job was created.
 *                     expiry_date:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-08-06T00:00:00Z'
 *                       description: The date and time when the job listing will expire.
 *       '400':
 *         description: Invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates that there was an error with the request.
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *                   description: A message indicating the error.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: integer
 *                         example: 400
 *                       name:
 *                         type: string
 *                         example: Bad Request
 *                       message:
 *                         type: string
 *                         example: The request data is invalid.
 *                       details:
 *                         type: string
 *                         example: The 'title' field is required.
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates that there was an internal server error.
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                   description: A message indicating the error.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: integer
 *                         example: 500
 *                       name:
 *                         type: string
 *                         example: Internal Server Error
 *                       message:
 *                         type: string
 *                         example: An error occurred while creating the job.
 *                       details:
 *                         type: string
 *                         example: Detailed error information.
 */
module.exports = {};
