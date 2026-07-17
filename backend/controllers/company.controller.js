import Company from "../models/company.model.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

//to add company{admin}
export const addCompany = async (req, res) => {
  try {
    const { website, name } = req.body;
    if (!website || !name) {
      return res.status(400).json({
        success: false,
        message: "Website is required",
      });
    }
    let logoUrl = "";
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        "jobportal/images",
        "image",
        req.file.originalname,
      );
      logoUrl = uploadResult.secure_url;
    }
    const company = await Company.create({
      name,
      logo: logoUrl,
      website,
      createdBy: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "Company added successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to get company
export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to delete company{admin}
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    await company.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//to update company
export const updateCompany = async (req, res) => {
  try {
    const { name, website } = req.body;

    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    let logoUrl = company.logo;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        "jobportal/images",
        "image",
        req.file.originalname,
      );

      logoUrl = uploadResult.secure_url;
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name,
        website,
        logo: logoUrl,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
