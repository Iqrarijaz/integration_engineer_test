const express = require("express"); // Import Express framework
const router = express.Router(); // Create a new Express router

const jobs = require("../services/jobs/index");
const applications = require("../services/applications/index");
const adverts = require("../services/adverts/index");
const { validateCreateJob } = require("../dataSanitizer/jobs");
const { validateSubmitApplication } = require("../dataSanitizer/application");
const { validateCreateAdvertisement } = require("../dataSanitizer/adverts");

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

// Define route for jobs adverts
router.post("/adverts", validateCreateAdvertisement, adverts.createAdvert);

// Define route for job adverts list
router.get("/adverts", adverts.listAdverts);

// Export the router
module.exports = router;
