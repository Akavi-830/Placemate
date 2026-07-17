import express from "express";
import { authMiddleware, authorize } from "../middlewares/authMiddleware.js";
import {
  closeJob,
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/job.controller.js";

const jobRouter = express.Router();
jobRouter.post(
  "/",
  authMiddleware,
  authorize("admin"),

  createJob,
);
jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getJobById);
jobRouter.put(
  "/:id",
  authMiddleware,
  authorize("admin"),

  updateJob,
);
jobRouter.delete("/:id", authMiddleware, authorize("admin"), deleteJob);
jobRouter.patch("/:id/close", authMiddleware, authorize("admin"), closeJob);
export default jobRouter;
