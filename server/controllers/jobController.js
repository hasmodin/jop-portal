import Job from "../models/job.js";

//Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    if (jobs.length === 0) {
      console.log("No jobs found");
      return res.json({ success: true, message: "No jobs found" });
    }

    res.json({ success: true, jobs });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Get a single job by Id
export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });
    if (!job) {
      return res.json({
        success: false,
        message: "Job not found!",
      });
    }
    res.json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
