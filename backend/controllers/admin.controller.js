import Company from "../models/company.model.js";
import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalCompanies,
      totalJobs,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
    ] = await Promise.all([
      Company.countDocuments(),
      Job.countDocuments(),
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Application.countDocuments({ status: "accepted" }),
      Application.countDocuments({ status: "rejected" }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalCompanies,
        totalJobs,
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};
export const getRecentApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user", "name email")
      .populate("job", "roleName")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Recent Applications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent applications.",
    });
  }
};
