import { env } from "@/env";
import { Question, questionType } from "@/types/typings";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ======================== Configurations ========================
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
const helperConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};
const quizConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
// ======================== Models ========================
const googleAI = new GoogleGenerativeAI(env.NEXT_PUBLIC_GEMINI_API_KEY);

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: geminiConfig,
});

const helperModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: helperConfig,
  systemInstruction: `
  You are a knowledgeable and friendly assistant who helps users understand video content by providing answers based on the provided transcript. 🌟 Feel free to use emojis to make the conversation more engaging and interactive. 😊
	1.	Request Specific Details:
	•	“Could you please provide more details about your question or concern? 🤔”
	•	“Please specify the aspect or topic you need help with. 📝”
	2.	Clarify Context:
	•	“To give you a precise answer, it would be helpful to understand the context. Could you describe the scenario or background related to your question? 🔍”
	3.	Acknowledge and Confirm:
	•	“Thank you for providing that information! Let me confirm that I understand correctly: [brief summary of the user’s query]. Is that accurate? ✅”
	4.	Provide Clear and Concise Answers:
	•	“Based on the details you’ve provided, here’s what I can tell you: [provide a clear, concise answer]. 💡”
	•	“For your query about [specific aspect], [explanation or solution]. 🔎”
	5.	Offer Further Assistance:
	•	“If you have any more questions or need further clarification, feel free to ask! 😊”
	•	“Let me know if there’s anything else I can help with. 👍”
  `,
});

const quizModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You’re an adept educational content creator specializing in generating quizzes tailored to specific chapter titles and descriptions. Your strength lies in crafting engaging and informative questions that challenge learners while being aligned with curriculum standards.

Your task is to create a quiz based on a provided chapter title and chapter description. The output should be formatted as a JSON array containing question and answer pairs, explanations for each question, and the type of question such as true/false or multiple choice.

Here are the details you need to include:
- Chapter Title: __
- Chapter Description: __
- Number of Questions: __
- Desired Question Types (e.g., true/false, multiple choice): __

Make sure that the generated JSON array includes the following structure for each question:
- "question": "__"
- "options": [__] (for multiple choice questions)
- "answer": "__"
- "explanation": "__"
- "type": "__" (e.g., true/false, multiple choice)`,
  generationConfig: quizConfig,
});

// ======================== Functions ========================

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

const getCourseChapterDescription = async (description: string) => {
  try {
    const prompt = `Create a compelling course description that highlights
        the key takeaways, practical applications, and benefits from this info ${description}.
            Use a tone that is engaging, informative, and concise.
         Please provide a 4-5 sentence summary of what students can expect to learn in this course
         and use joyful language to inspire them to take action use emoji to make it more engaging.

         output requirements: 4-5 sentences that summarize the chapter content and inspire students to take action

         `;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.log("response error", error);

    return "";
  }
};

const generateHelper = async ({
  transcript,
  user_msg,
}: {
  transcript: string;
  user_msg: string;
}) => {
  try {
    const chatSession = helperModel.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `I have a video transcript for you. Please read it carefully and answer any questions
              I have about the video\'s content.\n\nHere is the transcript:\ ${transcript} `,
            },
          ],
        },
      ],
    });

    // Send the prompt and await the response
    const { response } = await chatSession.sendMessage(user_msg);
    const result = response.text();

    return result;
  } catch (fetchError) {
    console.error("Error fetching helper data:", fetchError);
  }
};

interface GenerateQuizProps {
  question_types: questionType[];
  chapter_title: string;
  chapter_description: string;
  num_questions: number;
}
const generateQuiz = async ({
  chapter_title,
  chapter_description,
  num_questions,
  question_types,
}: GenerateQuizProps): Promise<Question[]> => {
  const prompt = `Create a quiz with ${num_questions} multiple-choice questions on the topic of "${chapter_title}". i need ${question_types.length} ${question_types.join(" ")} question type`;

  try {
    // Send the prompt and await the response
    const { response } = await quizModel.generateContent(prompt);
    const result = response.text();

    // Remove formatting characters
    const cleanedJson = result.replace(/```json|```/g, "");

    // Parse the JSON data
    try {
      const data = JSON.parse(cleanedJson);
      return data;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      return [];
    }
  } catch (fetchError) {
    console.error("Error fetching quiz data:", fetchError);
    return [];
  }
};

const generateQuizWithRetry = async (
  props: GenerateQuizProps,
  retryCount = 0
): Promise<Question[]> => {
  try {
    return await generateQuiz(props);
  } catch (error) {
    if (retryCount < 3) {
      console.log(`Retrying... Attempt ${retryCount + 1}`);
      return generateQuizWithRetry(props, retryCount + 1);
    } else {
      console.error("Exceeded maximum retry attempts");
      return [];
    }
  }
};

export {
  geminiModel,
  getCourseDescription,
  getCourseChapterDescription,
  generateHelper,
  generateQuizWithRetry,
  generateQuiz,
};
