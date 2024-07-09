/**
 * @swagger
 * /applications:
 *   get:
 *     tags:
 *       - Applications
 *     summary: List job applications
 *     description: Retrieve a paginated list of job applications.
 *     operationId: listApplications
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (default is 1).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of results per page (default is 10).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       '200':
 *         description: A paginated list of job applications.
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
 *                       indeed_id:
 *                         type: string
 *                         example: "c647bfbb3f895afacb2aeceb3d0bc241d303b4c2666209550cace3277f6b99df"
 *                       job_id:
 *                         type: integer
 *                         example: 2
 *                       candidate_id:
 *                         type: integer
 *                         example: 1
 *                       candidate_email:
 *                         type: string
 *                         example: "iqrarijaz788@gmail.com"
 *                       application_details:
 *                         type: string
 *                         example: "Detailed application information here."
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-09T12:34:56Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total_count:
 *                       type: integer
 *                       example: 50
 *                     total_pages:
 *                       type: integer
 *                       example: 5
 *                 meta:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Applications retrieved successfully."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: null
 *                   example: null
 *                 meta:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error."
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
 *                         example: "Internal Server Error"
 *                       message:
 *                         type: string
 *                         example: "An error occurred while retrieving the applications."
 *                       details:
 *                         type: object
 *                         example: "Detailed error information here."
 */


module.exports = {};