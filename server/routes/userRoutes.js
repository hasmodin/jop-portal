import express from "express";
import upload from "../config/multer.js";

import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";

const router = express.Router();

// Get user data

router.get("/user", getUserData);

// Apply for job

router.get("/apply", applyForJob);

// Get applied job data

router.get("/applications", getUserJobApplications);

// Update user profile

router.post("/update-resume", upload.single("image"), updateUserResume);

export default router;
