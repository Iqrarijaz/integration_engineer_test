/**
 * @swagger
 * /job-adverts:
 *   get:
 *     tags:
 *       - Job Adverts
 *     summary: List all job adverts with pagination
 *     description: Retrieve a paginated list of job adverts from the database.
 *     operationId: listAdverts
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (starting from 1).
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of adverts per page.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of job adverts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     adverts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                             description: The unique identifier for the job advert.
 *                           job_id:
 *                             type: integer
 *                             example: 1
 *                             description: The ID of the job associated with the advert.
 *                           platform:
 *                             type: string
 *                             example: Glassdoor
 *                             description: The platform where the job advert was published.
 *                           advert_title:
 *                             type: string
 *                             example: Senior Backend Developer at Tech Innovations Inc.
 *                             description: The title of the job advert.
 *                           advert_url:
 *                             type: string
 *                             format: uri
 *                             example: https://www.techinnovations.com/careers/senior-backend-developer
 *                             description: The URL where the job advert can be found.
 *                           advert_details:
 *                             type: string
 *                             example: We are looking for a skilled Senior Backend Developer to join our team at Tech Innovations Inc. The ideal candidate should have experience in building scalable applications. Apply now!
 *                             description: Additional details about the job advert.
 *                           published_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-07-09T12:00:00Z
 *                             description: The date and time when the job advert was published.
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                           description: Current page number.
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                           description: Number of adverts per page.
 *                         total_count:
 *                           type: integer
 *                           example: 25
 *                           description: Total number of adverts available.
 *                         total_pages:
 *                           type: integer
 *                           example: 3
 *                           description: Total number of pages available based on the limit.
 *                 meta:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Adverts retrieved successfully
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
 *                         example: InternalServerError
 *                       message:
 *                         type: string
 *                         example: An error occurred while retrieving the adverts.
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
 *                   example: null
 *                 meta:
 *                   type: object
 *                   example: {}
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
 *                         example: InternalServerError
 *                       message:
 *                         type: string
 *                         example: An error occurred while retrieving the adverts.
 *                       details:
 *                         type: string
 *                         example: Detailed error information.
 *     security:
 *       - BearerAuth: []
 *     servers:
 *       - url: http://localhost:3020
 *         description: Local server
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Current page number.
 *         limit:
 *           type: integer
 *           description: Number of adverts per page.
 *         total_count:
 *           type: integer
 *           description: Total number of adverts available.
 *         total_pages:
 *           type: integer
 *           description: Total number of pages available.
 */
module.exports = {};
