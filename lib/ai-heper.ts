import { env } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

const googleAI = new GoogleGenerativeAI(env.NEXT_PUBLIC_GEMINI_API_KEY);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: geminiConfig,
});

const getCourseDescription = async (title: string) => {
  try {
    const prompt = `Create a compelling course description that highlights
        the key takeaways, practical applications, and benefits of ${title}.
            Use a tone that is engaging, informative, and concise.
         Please provide a 1-2 sentence summary of what students can expect to learn in this course
         and use joyful language to inspire them to take action.
    
         output requirements: 1-2 sentences
         
         `;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.log("response error", error);

    return "";
  }
};
export { geminiModel, getCourseDescription };
