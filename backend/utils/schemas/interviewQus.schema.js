export const interviewQuestionsSchema = {
  type: "json_schema",

  name: "interview_questions",

  schema: {
    type: "object",

    properties: {
      technicalQuestions: {
        type: "array",

        items: {
          type: "string",
        },
      },

      projectQuestions: {
        type: "array",

        items: {
          type: "string",
        },
      },

      problemSolvingQuestions: {
        type: "array",

        items: {
          type: "string",
        },
      },

      behavioralQuestions: {
        type: "array",

        items: {
          type: "string",
        },
      },
    },

    required: [
      "technicalQuestions",
      "projectQuestions",
      "problemSolvingQuestions",
      "behavioralQuestions",
    ],

    additionalProperties: false,
  },
};
