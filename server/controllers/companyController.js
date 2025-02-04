import Company from "../models/company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import upload from "../config/multer.js";
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.js";
import jobApplication from "../models/jobApplication.js";

//Regiseter new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;
  console.log(req.body);
  console.log(imageFile);
  if (!name || !email || !password || !imageFile) {
    res.json({ success: false, message: "Missing Details!" });
  }
  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });
    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Company Login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({
        success: false,
        message: "Invalid email or password, Please try again!",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get Company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({
      success: true,
      company,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      level,
      category,
      salary,
      companyId,
      date: Date.now(),
    });
    await newJob.save();
    res.json({
      success: true,
      newJob,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {};

//Get Company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId: companyId });

    // adding numbers of applicants info in data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await jobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );
    res.json({
      seccess: true,
      jobsData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Change job application status
export const changeJobApplicationStatus = async (req, res) => {};

//Change job visibility

export const changeJobVisibility = async (req, res) => {
  const { id } = req.body;
  try {
    const companyId = req.company._id;
    const job = await Job.findById(id);
    if (companyId.toString() == job.companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
