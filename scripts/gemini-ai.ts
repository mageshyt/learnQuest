// const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// dotenv.config();

const gemini_api_key = "AIzaSyDFS-bqfda7Wb0cReBdXmMy4oF_HbAV2-k";
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
    const option = "description";
    const title = "Advanced JavaScript Course";
    const prompt = `Assume Your  are a helper in making course setup for a teacher.
    the want to write the  ${option} of the ${title} course. please write the ${option} of the course.
    `;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
  } catch (error) {
    console.log("response error", error);
  }
};

generate();
