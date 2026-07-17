import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getsavedJobs, toggleSaveJob } from "../controllers/save.controller.js";

const savedRouter = express.Router();
savedRouter.post("/job/:id", authMiddleware, toggleSaveJob);
savedRouter.get("/", authMiddleware, getsavedJobs);
export default savedRouter;
