import express from "express";
const router = express.Router();
import {
  changeJobApplicationStatus,
  changeJobVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";

import { protectedCompany } from "../middleware/authMiddleware.js";

import upload from "../config/multer.js";

//Register a company
router.post("/register", upload.single("image"), registerCompany);

// Company login
router.post("/login", loginCompany);

//Get Company data
router.get("/", protectedCompany, getCompanyData);

//Post a job
router.post("/post-job", protectedCompany, postJob);

//Get Applicants Data of Company
router.get("/applicants", protectedCompany, getCompanyJobApplicants);

//Get company job list
router.get("/list-jobs", protectedCompany, getCompanyPostedJobs);

//Change Application Status
router.post("/change-status", protectedCompany, changeJobApplicationStatus);

//Change Application Visibilty
router.post("/change-visibility", protectedCompany, changeJobVisibility);

export default router;
