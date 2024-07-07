/**
 * @swagger
 * /jobs/indeed.xml:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Get job listings in XML format for Indeed
 *     description: Retrieve a list of all active jobs in XML format suitable for Indeed.
 *     operationId: getIndeedJobs
 *     responses:
 *       '200':
 *         description: A list of active jobs in XML format.
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *               example: |
 *                 <?xml version="1.0" encoding="UTF-8"?>
 *                 <rss version="2.0">
 *                   <channel>
 *                     <item>
 *                       <title>Software Engineer</title>
 *                       <description>Develop and maintain software applications.</description>
 *                       <pubDate>Mon, 07 Jul 2024 12:34:56 GMT</pubDate>
 *                     </item>
 *                     <!-- more items -->
 *                   </channel>
 *                 </rss>
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
                  
