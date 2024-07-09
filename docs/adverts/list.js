/**
 * @swagger
 * /adverts:
 *   get:
 *     tags:
 *       - Adverts
 *     summary: List job adverts with pagination
 *     description: Retrieve a paginated list of job adverts.
 *     operationId: listAdverts
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
 *         description: The number of job adverts to retrieve per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *     responses:
 *       '200':
 *         description: Adverts retrieved successfully.
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
 *                       id:
 *                         type: integer
 *                         example: 1
 *                         description: The unique identifier for the job advert.
 *                       job_id:
 *                         type: integer
 *                         example: 100
 *                         description: The unique identifier for the job.
 *                       platform:
 *                         type: string
 *                         example: Indeed
 *                         description: The platform where the advert is published.
 *                       advert_title:
 *                         type: string
 *                         example: Software Engineer
 *                         description: The title of the advert.
 *                       advert_url:
 *                         type: string
 *                         example: "https://www.indeed.com/job/software-engineer"
 *                         description: The URL for the advert.
 *                       advert_details:
 *                         type: string
 *                         example: "Detailed job advert information."
 *                         description: Detailed information about the advert.
 *                       published_at:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-07-07T12:34:56Z'
 *                         description: The date and time when the advert was published.
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
 *                       description: The number of adverts per page.
 *                     total_count:
 *                       type: integer
 *                       example: 100
 *                       description: The total number of adverts.
 *                     total_pages:
 *                       type: integer
 *                       example: 10
 *                       description: The total number of pages.
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
 *                         example: Internal Server Error
 *                       message:
 *                         type: string
 *                         example: An error occurred while retrieving adverts.
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
 *                         example: An error occurred while retrieving adverts.
 *                       details:
 *                         type: string
 *                         example: Detailed error information.
 */
module.exports = {};
