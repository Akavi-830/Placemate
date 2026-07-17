import User from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { pdfParse } from "../utils/parser/resumeParser.js";
//to get the profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    //to upload resume for job seeker
    if (req.file && req.user.role === "user") {
      try {
        const originalName = req.file.originalname;
        const extension = originalName.split(".").pop().toLowerCase();

        // Validate it's a PDF
        if (extension !== "pdf") {
          throw new Error(`Invalid file type. Expected PDF, got: ${extension}`);
        }

        // Validate PDF magic bytes
        if (!req.file.buffer.toString("utf8", 0, 4).startsWith("%PDF")) {
          throw new Error(
            "Invalid PDF file. File does not have valid PDF header.",
          );
        }
        const extractedText = await pdfParse(req.file.buffer);

        // Sanitized filename (with extension for raw resource type)
        const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
        const sanitizedBase = nameWithoutExt
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9\-_]/g, "");
        // For raw files, include the extension in the public_id
        const publicId = `${sanitizedBase}.${extension}`;

        // Use 'raw' resource type for PDFs - this ensures they're delivered as files not processed as images
        const resourceType = "raw";

        console.log("Uploading file:", {
          originalName,
          publicId,
          fileSize: req.file.size || req.file.buffer.length,
          mimeType: req.file.mimetype,
          resourceType,
        });

        const uploadResult = await uploadToCloudinary(
          req.file.buffer,
          "PlaceMate/resumes",
          resourceType,
          publicId,
        );
        if (uploadResult) {
          updateData.resume = uploadResult.secure_url;
          updateData.resumePublicId = uploadResult.public_id;
          updateData.resumeExtractedText = extractedText;
          updateData.resumeUploadedAt = new Date();
        }
      } catch (uploadError) {
        console.error("Resume upload error:", uploadError.message);
        return res.status(500).json({
          success: false,
          message: `Resume upload failed: ${uploadError.message}`,
        });
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      returnDocument: "after",
    }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "profile updated successfully!",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};

//to get resume
export const getResume = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    if (!user.resume) {
      return res.status(404).json({
        success: false,
        message: "resume not found",
      });
    }

    const resume = user.resume;
    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
