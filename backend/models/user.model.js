import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resume: {
      type: String,
      default: "",
    },
    resumePublicId: {
      type: String,
      default: "",
    },
    resumeExtractedText: {
      type: String,
      default: "",
    },

    resumeUploadedAt: {
      type: Date,
      default: null,
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationOtp: String,
    verificationOtpExpires: Date,
    resetPasswordOtp: String,
    resetPasswordOtpExpires: Date,
  },
  { timestamps: true },
);
export default mongoose.model("User", userSchema);
