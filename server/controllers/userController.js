import User from "../models/user.js";
import JobApplication from "../models/jobApplication.js";

import Job from "../models/job.js";
import { v2 as cloudinary } from "cloudinary";

// Get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
      res.json({
        success: true,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      sucess: false,
      message: error.message,
    });
  }
};

// Apply for Job
export const applyForJob = async (req, res) => {
  const userId = req.auth.userId;
  const { jobId } = req.body;
  try {
    const isAlreadyApplied = await JobApplication.findById(userId, jobId);
    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already applied" });
    }
    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.json({
        success: false,
        message: "Job data not found!",
      });
    }
    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });
    res.json({
      success: true,
      message: "Applied successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title, description, location category level salary");

    if (!applications) {
      return res.jsob({
        success: false,
        message: "No job application found for this user!",
      });
    }
    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update user profile

export const updateUserResume = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userData = await User.findById(userId);
    const resumeFile = req.file;

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }
    await userData.save();
    return res.json({
      success: true,
      message: "Resume updated!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
