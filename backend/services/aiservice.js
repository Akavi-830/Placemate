import client from "../config/groq.js";

export const generateAIResponse = async ({
  systemPrompt,
  userPrompt,
  schema,
  temperature = 0.3,
}) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `${userPrompt}\n\nRespond ONLY with valid JSON matching this exact schema (no markdown, no extra text):\n${JSON.stringify(
            schema.schema,
          )}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature,
    });

    const raw = response.choices[0].message.content;

    const parsed = JSON.parse(raw);

    return parsed;
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Failed to generate AI response.");
  }
};
