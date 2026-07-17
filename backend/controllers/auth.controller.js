import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  sendForgotPasswordEmail,
  sendVerificationEmail,
} from "../utils/emailService.js";
import jwt from "jsonwebtoken";

// to register a user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = "user";

    //to generate 6 digit otp
    const verificationOtp = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const verificationOtpExpires = Date.now() + 10 * 60 * 1000;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      verificationOtp,
      verificationOtpExpires,
    });

    //to send the verification email
    try {
      await sendVerificationEmail(email, name, verificationOtp);
    } catch (error) {
      console.error("Failed to send the verification email:", error);
    }
    res.status(201).json({
      success: true,
      message:
        "Account created successfully.Please check your email for 6-digit verification code",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: false,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//to login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //to genrate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.status(200).json({
      success: true,
      message: "Login successfull",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Token is valid",
      user,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//to verify the email
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and otp is required",
      });
    }
    const user = await User.findOne({
      email,
      verificationOtp: otp,
      verificationOtpExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }
    user.isVerified = true;
    user.verificationOtp = undefined;
    user.verificationOtpExpires = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Email verified successfully. Now you can login",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//to forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user with this email is not found ",
      });
    }
    const resetPasswordOtp = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const resetPasswordOtpExpires = Date.now() + 10 * 60 * 1000;
    user.resetPasswordOtp = resetPasswordOtp;
    user.resetPasswordOtpExpires = resetPasswordOtpExpires;
    await user.save();
    try {
      await sendForgotPasswordEmail(email, user.name, resetPasswordOtp);
    } catch (error) {
      console.error("failed to send otp", error);
    }
    res.status(200).json({
      success: true,
      message: "Reset password otp sent to your email",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "email ,otp and new password required",
      });
    }
    const user = await User.findOne({
      email,
      resetPasswordOtp: otp,
      resetPasswordOtpExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid or expired otp",
      });
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as your old password.",
      });
    }
    //to hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;

    await user.save();
    return res.status(200).json({
      success: true,
      message:
        "Reset password successfull . Now you can login with your new password",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
