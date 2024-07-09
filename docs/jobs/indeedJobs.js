/**
 * @swagger
 * /jobs/indeed.xml:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Get a list of job postings in XML format
 *     description: Retrieves job postings that have not yet expired and returns them in XML format suitable for Indeed.
 *     operationId: getIndeedJobs
 *     responses:
 *       '200':
 *         description: A list of job postings in XML format
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *               example: |
 *                 <?xml version="1.0" encoding="utf-8"?>
 *                 <source>
 *                   <publisher>Creative Agency</publisher>
 *                   <publisherurl>https://www.creativeagency.com</publisherurl>
 *                   <job>
 *                     <title><![CDATA[UX/UI Designer]]></title>
 *                     <date><![CDATA[2024-07-09T06:57:54.187Z]]></date>
 *                     <referencenumber><![CDATA[pk-MQ917shWsVrww0Kuyyt9RlrA12cb97pB]]></referencenumber>
 *                     <requisitionid><![CDATA[36]]></requisitionid>
 *                     <url><![CDATA[https://www.creativeagency.com/careers/ux-ui-designer]]></url>
 *                     <company><![CDATA[Creative Agency]]></company>
 *                     <sourcename><![CDATA[Creative Agency]]></sourcename>
 *                     <email><![CDATA[jobs@creativeagency.com]]></email>
 *                     <description><![CDATA[We are hiring a UX/UI Designer to create intuitive and engaging user interfaces. Experience with Sketch, Figma, and Adobe XD is required.]]></description>
 *                     <salary><![CDATA[$70,000 - $85,000 per year]]></salary>
 *                     <expirationdate><![CDATA[2024-08-08]]></expirationdate>
 *                   </job>
 *                 </source>
 *       '500':
 *         description: Internal Server Error
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
 *     security:
 *       - api_key: []
 */
module.exports = {};
