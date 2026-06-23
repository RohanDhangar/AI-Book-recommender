import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GenrateText = async (prompt) => {
  try {
    for (let i = 0; i < 3; i++) {
      try {
        const response = await client.models.generateContent({
          model: process.env.PRIMARY_MODEL,
          contents: prompt,
        });

        let rawText = response.candidates[0].content.parts[0].text;

        // cleaning
        const cleanText = rawText
          .replace("```json", "")
          .replace("```", "")
          .trim();

        const parsedJSON = JSON.parse(cleanText);

        return parsedJSON;
      } catch (error) {
        console.log(`Retry ${i + 1}`);
      }
    }
    throw new Error("Primary model failed");
  } catch (error) {
    console.log("use OpenAI model");
  }
};

export default GenrateText;
