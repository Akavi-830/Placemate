import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/verify-token", authMiddleware, verifyToken);

export default authRouter;
