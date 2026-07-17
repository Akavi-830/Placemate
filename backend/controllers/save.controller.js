import User from "../models/user.model.js";
//toggle saved job
export const toggleSaveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!jobId) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }
    const isSaved = user.savedJobs.some((id) => id.toString() === jobId);

    if (isSaved) {
      user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();
    const updatedUser = await User.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      message: isSaved
        ? "Job removed from saved jobs."
        : "Job saved successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to get saved jobs
export const getsavedJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate({
      path: "savedJobs",
      populate: {
        path: "company",
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
