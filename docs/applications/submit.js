/**
 * @swagger
 * /applications:
 *   post:
 *     tags:
 *       - Applications
 *     summary: Receive a job application
 *     description: Handle incoming job applications from Indeed.
 *     operationId: receiveApplication
 *     requestBody:
 *       description: Job application data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job:
 *                 type: object
 *                 properties:
 *                   jobId:
 *                     type: integer
 *                     example: 1
 *               applicant:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: John Doe
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   phoneNumber:
 *                     type: string
 *                     example: "123-456-7890"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   resume:
 *                     type: object
 *                     properties:
 *                       file:
 *                         type: object
 *                         properties:
 *                           data:
 *                             type: string
 *                             format: base64
 *                             example: "JVBERi0xLjQKJcTl8uXr..."
 *                   verified:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       '200':
 *         description: Application received successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     job_id:
 *                       type: integer
 *                       example: 1
 *                     candidate_id:
 *                       type: integer
 *                       example: 1
 *                     application_details:
 *                       type: string
 *                       example: "Application received from Indeed's testing tool"
 *                 meta:
 *                   type: object
 *                   properties: {}
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: {}
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
 *                         example: An error occurred while receiving the application.
 *                       details:
 *                         type: string
 *                         example: Detailed error information.
 */
module.exports = {};
