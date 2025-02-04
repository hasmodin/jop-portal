import express from "express";
import { getJobs, getJobById } from "../controllers/jobController.js";

const router = express.Router();

//Route to get all jobs data

router.get("/jobs", getJobs);

//Route to get single data by Id
router.get("/jobs/:id", getJobById);

export default router;
