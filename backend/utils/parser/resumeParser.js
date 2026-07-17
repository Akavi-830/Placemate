import pdfParseLib from "pdf-parse/lib/pdf-parse.js";

export const pdfParse = async (buffer) => {
  try {
    const data = await pdfParseLib(buffer);
    const cleanedText = data.text
      .replace(/\r/g, "")
      .replace(/\n{2,}/g, "\n")
      .replace(/[ \t]+/g, " ")
      .trim();
    return cleanedText;
  } catch (error) {
    throw new Error("Failed to parse resume.");
  }
};
