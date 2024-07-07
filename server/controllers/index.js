const express = require("express"); // Import Express framework
const router = express.Router(); // Create a new Express router

const jobs = require("../services/jobs/index");
const applications = require("../services/applications/index");
const { validateCreateJob } = require("../dataSanitizer/jobs");
const { validateSubmitApplication } = require("../dataSanitizer/application");

// Define routes for jobs
router.post("/jobs", validateCreateJob, jobs.createJob);
router.get("/jobs", jobs.listJobs);
router.get("/jobs/indeed.xml", jobs.getIndeedJobs);

// Define route for applications

router.post(
  "/applications",
  validateSubmitApplication,
  applications.receiveApplication
);

// Export the router
module.exports = router;
