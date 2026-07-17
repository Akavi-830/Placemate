import express from "express";
import {
  generateCoverLetter,
  generateInterviewQus,
  resumeMatch,
} from "../controllers/ai.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const aiRouter = express.Router();
aiRouter.post("/resume-match/:id", authMiddleware, resumeMatch);
aiRouter.post("/interview-qus/:id", authMiddleware, generateInterviewQus);
aiRouter.post("/cover-letter/:id", authMiddleware, generateCoverLetter);

export default aiRouter;
