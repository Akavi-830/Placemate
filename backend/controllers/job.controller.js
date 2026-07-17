import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

import Company from "../models/company.model.js";
//to create a job
export const createJob = async (req, res) => {
  try {
    let {
      roleName,
      company,
      techStack,
      location,
      experience,
      salary,
      salaryType,
      jobType,
      postDate,
      category,
      openings,
      overview,
      responsibilities,
      jobCriteria,
      education,
    } = req.body;

    //handle array if sent in json string from frontend
    if (typeof techStack === "string") techStack = JSON.parse(techStack);
    if (typeof responsibilities === "string")
      responsibilities = JSON.parse(responsibilities);
    if (typeof jobCriteria === "string") jobCriteria = JSON.parse(jobCriteria);
    if (typeof education === "string") education = JSON.parse(education);

    let postDateValue;
    if (postDate) {
      if (
        typeof postDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(postDate)
      ) {
        const [year, month, day] = postDate.split("-");
        // Use UTC to prevent timezone shifts across days
        postDateValue = new Date(
          Date.UTC(Number(year), Number(month) - 1, Number(day)),
        );
      } else {
        postDateValue = new Date(postDate);
      }
      if (isNaN(postDateValue.getTime())) {
        postDateValue = new Date();
      }
    } else {
      postDateValue = new Date();
    }
    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Admins can update any job

    const job = await Job.create({
      roleName,
      company,
      techStack,
      location,
      experience,
      salary,
      salaryType,
      jobType,
      jobCriteria,
      category,
      openings,
      overview,
      responsibilities,
      education,
      postDate: postDateValue,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to get all jobs or with search query
export const getAllJobs = async (req, res) => {
  try {
    const { search, jobType, category, limit } = req.query;

    let query = {};
    if (!req.query.admin) {
      query.status = "active";
    }
    let companyIds = [];
    // Search
    if (search) {
      const companies = await Company.find({
        name: {
          $regex: search,
          $options: "i",
        },
      });
      companyIds = companies.map((c) => c._id);
      query.$or = [
        {
          roleName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          techStack: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $in: companyIds,
          },
        },
      ];
    }

    // Filters
    if (jobType) {
      query.jobType = jobType;
    }

    if (category) {
      query.category = category;
    }

    let jobsQuery = Job.find(query).populate("company").sort({ createdAt: -1 });

    if (limit) {
      jobsQuery = jobsQuery.limit(Number(limit));
    }

    const jobs = await jobsQuery;

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//get job by id
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company");
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to update the job
export const updateJob = async (req, res) => {
  try {
    let {
      roleName,
      company,
      techStack,
      location,
      experience,
      salary,
      salaryType,
      jobType,
      category,
      openings,
      overview,
      responsibilities,
      jobCriteria,
      education,
    } = req.body;
    if (typeof techStack === "string") techStack = JSON.parse(techStack);
    if (typeof responsibilities === "string")
      responsibilities = JSON.parse(responsibilities);
    if (typeof jobCriteria === "string") jobCriteria = JSON.parse(jobCriteria);
    if (typeof education === "string") education = JSON.parse(education);

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Admins can update any job

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        roleName,
        company,

        techStack,
        location,
        experience,
        salary,
        salaryType,
        jobType,
        category,
        openings,
        overview,
        responsibilities,
        jobCriteria,
        education,
      },
      { returnDocument: "after", runValidators: true },
    );
    return res.status(200).json({
      success: true,
      message: "updated job successfully",
      updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to close the openings{admin}
export const closeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    job.status = "closed";
    await job.save();
    return res.status(200).json({
      success: true,
      message: "Job closed successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to delete the job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    await Application.deleteMany({
      job: req.params.id,
    });
    await Job.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "delete job successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
