export const coverLetterSchema = {
  type: "json_schema",

  name: "cover_letter",

  schema: {
    type: "object",

    properties: {
      greeting: {
        type: "string",
      },

      introduction: {
        type: "string",
      },

      body: {
        type: "string",
      },

      closing: {
        type: "string",
      },

      signature: {
        type: "string",
      },
    },

    required: ["greeting", "introduction", "body", "closing", "signature"],

    additionalProperties: false,
  },
};
