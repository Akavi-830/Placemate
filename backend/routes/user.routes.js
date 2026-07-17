import express from "express";
import { authMiddleware, authorize } from "../middlewares/authMiddleware.js";
import {
  getProfile,
  getResume,
  updateProfile,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/uploadMiddleware.js";
const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.get("/resume/:id", getResume);

// Error handling middleware for multer
userRouter.put(
  "/profile",
  authMiddleware,
  authorize("user"),
  (req, res, next) => {
    console.log("📋 Received request to update profile");
    console.log("📄 Request headers:", {
      contentType: req.headers["content-type"],
      contentLength: req.headers["content-length"],
    });

    upload.single("resume")(req, res, (err) => {
      if (err) {
        console.error("❌ Multer error:", err.message);
        return res.status(400).json({
          success: false,
          message: err.message || "File upload failed",
        });
      }

      console.log("✅ File upload processing completed");
      if (req.file) {
        console.log("📎 File received:", {
          filename: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
        });
      } else {
        console.log("ℹ️ No file in request (update without resume)");
      }

      next();
    });
  },
  updateProfile,
);

export default userRouter;
