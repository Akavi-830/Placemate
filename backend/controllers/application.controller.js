import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
//to apply for a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: " invalid job id ",
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      user: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You already applied for this job",
      });
    }
    const application = await Application.create({
      job: jobId,
      user: userId,
    });
    return res.status(201).json({
      success: true,
      message: "applied for job successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to get all application {admin}
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    const applications = await Application.find({
      job: jobId,
    })
      .populate("user", "-password")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to get all application by user
export const getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const application = await Application.find({ user: userId })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({
        createdAt: -1,
      });
    const validApplication = application.filter((app) => app.job !== null);
    return res.status(200).json({
      success: true,
      validApplication,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get all applications (Admin)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user", "name email")
      .populate({
        path: "job",
        select: "roleName company",
        populate: {
          path: "company",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update application status (Admin)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    application.status = status;

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
