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

// generate();

const quizConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const quizModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are an AI designed to generate quiz questions based on the content o
  f course chapters. Your primary goal is to create a variety of question types that assess comprehension, application, analysis, and synthesis of the material.
   Each question should be clear, accurate, and relevant to the content of the chapter.

1. **Question Types:** Include true/false, multiple-choice and matching questions.
2. **Difficulty Levels:** Vary the difficulty of the questions to cater to different levels of understanding.
3. **Content Coverage:** Ensure that questions cover key concepts, important details, and critical thinking aspects of the chapter.
4. **Answer Key:** Provide correct answers and brief explanations for each question.

When generating questions, consider the following:
- The main ideas and themes of the chapter.
- Specific details and examples provided in the text.
- Potential areas where students might struggle or have misconceptions.
- Opportunities to test higher-order thinking skills.

Provide at least 5 questions per chapter, mix all type of quiz types and difficulty levels. Output requirements: JSON format  Array of  question and answer pairs for a quiz,explanation and type of the question like true/false ,multiple choice.`,
  quizConfig,
});

const generateQuiz = async () => {
  try {
    const prompt = `Create a quiz with 5 multiple-choice questions on the topic of "Flutter Listview builder". i need two true/false question type`;
    const chatSession = quizModel.startChat({ quizConfig });

    // Send the prompt and await the response
    const { response } = await chatSession.sendMessage(prompt);
    const result = response.text();

    // Remove formatting characters
    const cleanedJson = result.replace(/```json|```/g, "");
    console.log(cleanedJson);
    // Parse the JSON data
    try {
      const data = JSON.parse(cleanedJson);
      data.forEach((question) => {
        console.log("===================================");
        console.log("Question:", question.question);
        console.log("Options:", question.options);
        console.log("Answer:", question.answer);
        console.log("Explanation:", question.explanation);
        console.log("Type:", question.type);
        console.log("===================================");
      });
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
    }
  } catch (fetchError) {
    console.error("Error fetching quiz data:", fetchError);
  }
};
generateQuiz();
