// const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// dotenv.config();

const gemini_api_key = "";
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

const generate = async () => {
  try {
    const title = "Nest JS ";
    const prompt = `Create a compelling course description that highlights
      the key takeaways, practical applications, and benefits of ${title}.
        Use a tone that is engaging, informative, and concise.
       Please provide a 1-2 sentence summary of what students can expect to learn in this course
       and use joyful language to inspire them to take action.

       output requirements: 1-2 sentences
       
       `;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
  } catch (error) {
    console.log("response error", error);
  }
};

generate();
