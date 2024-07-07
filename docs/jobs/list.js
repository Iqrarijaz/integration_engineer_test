/**
 * @swagger
 * /jobs:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: List all active jobs with pagination
 *     description: Retrieve a paginated list of all active jobs. The jobs are ordered by creation date in descending order.
 *     operationId: listJobs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve (1-based index).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of jobs to return per page.
 *     responses:
 *       '200':
 *         description: A paginated list of active jobs.
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
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                       description: The total number of active jobs available.
 *                     page:
 *                       type: integer
 *                       example: 1
 *                       description: The current page number.
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                       description: The number of jobs returned per page.
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
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   nullable: true
 *                 meta:
 *                   type: object
 *                   properties: {}
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
