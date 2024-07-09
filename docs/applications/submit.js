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
 *               id:
 *                 type: string
 *                 example: 'f803bae2b310e99128293d4e3737a032e8e13072176945a10cace3277f6b99df'
 *               job:
 *                 type: object
 *                 properties:
 *                   jobId:
 *                     type: integer
 *                     example: 14
 *                   jobKey:
 *                     type: string
 *                     example: 'ef6a185864da5b5d'
 *                   jobTitle:
 *                     type: string
 *                     example: 'Full Stack Developer'
 *                   jobCompany:
 *                     type: string
 *                     example: 'Cloud Solutions'
 *                   jobLocation:
 *                     type: string
 *                     example: 'Seattle, WA'
 *                   jobUrl:
 *                     type: string
 *                     example: 'https://www.cloudsolutions.com/careers/full-stack-developer'
 *               applicant:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: 'Iqrar Ijaz'
 *                   firstName:
 *                     type: string
 *                     example: 'Iqrar'
 *                   lastName:
 *                     type: string
 *                     example: 'Ijaz'
 *                   phoneNumber:
 *                     type: string
 *                     example: '+92 321 2358844'
 *                   email:
 *                     type: string
 *                     example: 'iqrarijaz788@gmail.com'
 *                   resume:
 *                     type: object
 *                     properties:
 *                       file:
 *                         type: object
 *                         properties:
 *                           data:
 *                             type: string
 *                             format: base64
 *                             example: 'JVBERi0xLjQKJcTl8uXr...'
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
 *                       example: 14
 *                     candidate_id:
 *                       type: integer
 *                       example: 1
 *                     candidate_email:
 *                       type: string
 *                       example: 'iqrarijaz788@gmail.com'
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
 *       '413':
 *         description: Payload Too Large.
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
 *                         example: 413
 *                       name:
 *                         type: string
 *                         example: Payload Too Large
 *                       message:
 *                         type: string
 *                         example: Payload is too large
 *                       details:
 *                         type: string
 *                         example: Detailed error information.
 *       '422':
 *         description: Unable to save application.
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
 *                         example: 422
 *                       name:
 *                         type: string
 *                         example: Unable to save application
 *                       message:
 *                         type: string
 *                         example: An error occurred while receiving the application.
 *                       details:
 *                         type: string
 *                         example: Detailed error information.
 */
module.exports = {};
