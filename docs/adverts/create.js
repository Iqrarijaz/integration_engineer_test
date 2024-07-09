/**
 * @swagger
 * /adverts:
 *   post:
 *     tags:
 *       - Adverts
 *     summary: Create a new job advert
 *     description: This endpoint allows you to create a new job advert associated with a specific job on a specified platform.
 *     operationId: createAdvert
 *     requestBody:
 *       description: Job advert object that needs to be added to the database.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the job for which the advert is being created.
 *               platform:
 *                 type: string
 *                 example: Glassdoor
 *                 description: The platform where the job advert will be published.
 *               advert_title:
 *                 type: string
 *                 example: Senior Backend Developer at Tech Innovations Inc.
 *                 description: The title of the job advert.
 *               advert_url:
 *                 type: string
 *                 format: uri
 *                 example: https://www.techinnovations.com/careers/senior-backend-developer
 *                 description: The URL where the job advert can be found.
 *               advert_details:
 *                 type: string
 *                 example: We are looking for a skilled Senior Backend Developer to join our team at Tech Innovations Inc. The ideal candidate should have experience in building scalable applications. Apply now!
 *                 description: Additional details about the job advert.
 *               published_at:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-07-09T12:00:00Z
 *                 description: The date and time when the job advert was published.
 *             required:
 *               - job_id
 *               - platform
 *               - advert_title
 *               - advert_url
 *     responses:
 *       '201':
 *         description: Advertisement created successfully.
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
 *                       description: The unique identifier for the job advert.
 *                     job_id:
 *                       type: integer
 *                       example: 1
 *                       description: The ID of the job associated with the advert.
 *                     platform:
 *                       type: string
 *                       example: Glassdoor
 *                       description: The platform where the job advert was published.
 *                     advert_title:
 *                       type: string
 *                       example: Senior Backend Developer at Tech Innovations Inc.
 *                       description: The title of the job advert.
 *                     advert_url:
 *                       type: string
 *                       format: uri
 *                       example: https://www.techinnovations.com/careers/senior-backend-developer
 *                       description: The URL where the job advert can be found.
 *                     advert_details:
 *                       type: string
 *                       example: We are looking for a skilled Senior Backend Developer to join our team at Tech Innovations Inc. The ideal candidate should have experience in building scalable applications. Apply now!
 *                       description: Additional details about the job advert.
 *                     published_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-07-09T12:00:00Z
 *                       description: The date and time when the job advert was published.
 *                 meta:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Advertisement created successfully
 *                       description: A message indicating the result of the request.
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
 *                         example: DuplicateAdvert
 *                       message:
 *                         type: string
 *                         example: An advert for job ID 1 on platform Glassdoor already exists.
 *                       details:
 *                         type: string
 *                         example: Duplicate entry for job ID 1 and platform Glassdoor.
 *       '400':
 *         description: Invalid input or duplicate advert.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                         example: ValidationError
 *                       message:
 *                         type: string
 *                         example: Job ID is required and must be an integer
 *                       details:
 *                         type: string
 *                         example: The 'job_id' field must be an integer.
 *       '404':
 *         description: Job not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: integer
 *                         example: 404
 *                       name:
 *                         type: string
 *                         example: JobNotFound
 *                       message:
 *                         type: string
 *                         example: The specified job does not exist.
 *                       details:
 *                         type: string
 *                         example: Job ID 1 does not correspond to an existing job.
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                         example: An error occurred while creating the advertisement.
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
 *     JobAdvert:
 *       type: object
 *       properties:
 *         job_id:
 *           type: integer
 *           description: The ID of the job for which the advert is being created.
 *         platform:
 *           type: string
 *           description: The platform where the job advert will be published.
 *         advert_title:
 *           type: string
 *           description: The title of the job advert.
 *         advert_url:
 *           type: string
 *           format: uri
 *           description: The URL where the job advert can be found.
 *         advert_details:
 *           type: string
 *           description: Additional details about the job advert.
 *         published_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the job advert was published.
 */
module.exports = {};
