import { generateAIResponse } from "../services/aiservice.js";
import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import { resumeMatchSchema } from "../utils/schemas/resumeMatch.schema.js";
import { resumeMatchSystemPrompt } from "../utils/prompts/resumeMatch.js";
import { interviewQuestionsSystemPrompt } from "../utils/prompts/interviewQuestion.js";
import { interviewQuestionsSchema } from "../utils/schemas/interviewQus.schema.js";
import { coverLetterSystemPrompt } from "../utils/prompts/coverLetter.js";
import { coverLetterSchema } from "../utils/schemas/coverLetter.schema.js";

export const resumeMatch = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { id } = req.params;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (!user.resumeExtractedText) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume first.",
      });
    }
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // 5. Create Job Description
    const jobDescription = `
Role: ${job.roleName}

Experience: ${job.experience}

Tech Stack:
${job.techStack.join(", ")}

Overview:
${job.overview}

Responsibilities:
${job.responsibilities.join("\n")}

Requirements:
${job.jobCriteria.join("\n")}
`;

    // 6. Create User Prompt
    const userPrompt = `
Resume:

${user.resumeExtractedText}

Job Description:

${jobDescription}
`;
    const result = await generateAIResponse({
      systemPrompt: resumeMatchSystemPrompt,
      userPrompt,
      schema: resumeMatchSchema,
    });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Resume Match Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};
export const generateInterviewQus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { id } = req.params;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (!user.resumeExtractedText) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume first.",
      });
    }
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // 5. Create Job Description
    const jobDescription = `
Role: ${job.roleName}

Experience: ${job.experience}

Tech Stack:
${job.techStack.join(", ")}

Overview:
${job.overview}

Responsibilities:
${job.responsibilities.join("\n")}

Requirements:
${job.jobCriteria.join("\n")}
`;

    // 6. Create User Prompt
    const userPrompt = `

Resume:

${user.resumeExtractedText}
Job Description:

${jobDescription}
`;
    const result = await generateAIResponse({
      systemPrompt: interviewQuestionsSystemPrompt,
      userPrompt,
      schema: interviewQuestionsSchema,
      temperature: 0.7,
    });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Interview qus Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};
export const generateCoverLetter = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { id } = req.params;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (!user.resumeExtractedText) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume first.",
      });
    }
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // 5. Create Job Description
    const jobDescription = `
Role: ${job.roleName}

Experience: ${job.experience}

Tech Stack:
${job.techStack.join(", ")}

Overview:
${job.overview}

Responsibilities:
${job.responsibilities.join("\n")}

Requirements:
${job.jobCriteria.join("\n")}
`;

    // 6. Create User Prompt
    const userPrompt = `

Resume:

${user.resumeExtractedText}
Job Description:

${jobDescription}
`;
    const result = await generateAIResponse({
      systemPrompt: coverLetterSystemPrompt,
      userPrompt,
      schema: coverLetterSchema,
      temperature: 0.4,
    });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Cover Letter error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};
