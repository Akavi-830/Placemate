export const resumeMatchSchema = {
  type: "json_schema",

  name: "resume_match",

  schema: {
    type: "object",

    properties: {
      matchScore: {
        type: "number",
      },

      strengths: {
        type: "array",

        items: {
          type: "string",
        },
      },

      missingSkills: {
        type: "array",

        items: {
          type: "string",
        },
      },

      summary: {
        type: "string",
      },
    },

    required: ["matchScore", "strengths", "missingSkills", "summary"],

    additionalProperties: false,
  },
};
