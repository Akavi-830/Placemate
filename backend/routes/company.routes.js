import express from "express";
import {
  addCompany,
  deleteCompany,
  getCompany,
  getAllCompanies,
  updateCompany,
} from "../controllers/company.controller.js";

import { authMiddleware, authorize } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const companyRouter = express.Router();

// Get All Companies
companyRouter.get("/", authMiddleware, authorize("admin"), getAllCompanies);

// Get Single Company
companyRouter.get("/:id", authMiddleware, authorize("admin"), getCompany);

// Add Company
companyRouter.post(
  "/",
  authMiddleware,
  authorize("admin"),
  upload.single("logo"),
  addCompany,
);

// Update Company
companyRouter.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  upload.single("logo"),
  updateCompany,
);

// Delete Company
companyRouter.delete("/:id", authMiddleware, authorize("admin"), deleteCompany);

export default companyRouter;
