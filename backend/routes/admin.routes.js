import express from "express";
import { authMiddleware, authorize } from "../middlewares/authMiddleware.js";
import { getDashboardStats } from "../controllers/admin.controller.js";
import { getRecentApplications } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get(
  "/dashboard",
  authMiddleware,
  authorize("admin"),
  getDashboardStats,
);
adminRouter.get(
  "/recent-applications",
  authMiddleware,
  authorize("admin"),
  getRecentApplications,
);

export default adminRouter;
