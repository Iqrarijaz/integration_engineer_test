/**
 * @swagger
 * /jobs:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: List active jobs with pagination
 *     description: Retrieve a paginated list of active jobs.
 *     operationId: listJobs
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: The number of jobs to retrieve per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *     responses:
 *       '200':
 *         description: Jobs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       job_id:
 *                         type: integer
 *                         example: 1
 *                         description: The unique identifier for the job.
 *                       reference_number:
 *                         type: string
 *                         example: pk-abcdefgh12345678
 *                         description: The reference number for the job.
 *                       title:
 *                         type: string
 *                         example: Software Engineer
 *                         description: The title of the job.
 *                       description:
 *                         type: string
 *                         example: Develop and maintain software applications.
 *                         description: A detailed description of the job responsibilities.
 *                       company_name:
 *                         type: string
 *                         example: TechCorp
 *                         description: The name of the company offering the job.
 *                       location:
 *                         type: string
 *                         example: New York, NY
 *                         description: The location where the job is based.
 *                       salary:
 *                         type: string
 *                         example: 120000
 *                         description: The salary for the job.
 *                       url:
 *                         type: string
 *                         example: "https://www.techcorp.com/jobs/software-engineer"
 *                         description: The URL for the job listing.
 *                       contact_email:
 *                         type: string
 *                         example: hr@techcorp.com
 *                         description: The contact email for the job application.
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-07-07T12:34:56Z'
 *                         description: The date and time when the job was created.
 *                       expiry_date:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-08-06T00:00:00Z'
 *                         description: The date and time when the job listing will expire.
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                       description: The current page number.
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                       description: The number of jobs per page.
 *                     total_count:
 *                       type: integer
 *                       example: 100
 *                       description: The total number of jobs.
 *                     total_pages:
 *                       type: integer
 *                       example: 10
 *                       description: The total number of pages.
 *                 meta:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Jobs retrieved successfully
 *                       description: A message indicating the result of the request.
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
 *                         example: An error occurred while retrieving jobs.
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   example: null
 *                   description: No result due to an error.
 *                 meta:
 *                   type: object
 *                   example: {}
 *                   description: Empty metadata due to an error.
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
 *                         example: An error occurred while retrieving jobs.
 *                       details:
 *                         type: string
 *                         example: Detailed error information.
 */
module.exports = {};
