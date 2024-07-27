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

const helperConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

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
export {
  geminiModel,
  getCourseDescription,
  getCourseChapterDescription,
  generateHelper,
};
