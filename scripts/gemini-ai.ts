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

const generateQuiz = async () => {
  try {
    const prompt = `Create a quiz with 5 multiple-choice questions on the topic of "L Cut in Editing course". i need two true/false question type`;
    // const chatSession = quizModel.startChat({ quizConfig });

    // Send the prompt and await the response
    const { response } = await quizModel.generateContent(prompt);
    const result = response.text();

    // Remove formatting characters
    const cleanedJson = result.replace(/```json|```/g, "");
    console.log(cleanedJson);
    // Parse the JSON data
    try {
      const data = JSON.parse(cleanedJson);
      // @ts-ignore
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

      return generateQuiz();
    }
  } catch (fetchError) {
    console.error("Error fetching quiz data:", fetchError);

    return generateQuiz();
  }
};
generateQuiz();

const helperConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

const helperModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
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

//@ts-ignore
const generateHelper = async (prompt) => {
  try {
    const chatSession = helperModel.startChat({
      helperConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: 'I have a video transcript for you. Please read it carefully and answer any questions I have about the video\'s content.\n\nHere is the transcript:\n## Python For Loop Demo Transcript\n\n**Narrator:** Welcome to this demo of Python\'s for loop! Let\'s dive in and see how this powerful tool works.\n\n**Code:**\n\n```python\n# Example 1: Iterating through a list\nfruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n  print(fruit)\n```\n\n**Narrator:**  In this example, we have a list called `fruits` containing three items. The `for` loop iterates through each item in the list, assigning it to the variable `fruit`. For each iteration, we print the value of `fruit`.\n\n**Output:**\n\n```\napple\nbanana\ncherry\n```\n\n**Narrator:**  As you can see, the loop prints each fruit on a separate line.\n\n**Code:**\n\n```python\n# Example 2: Iterating through a string\nname = "Python"\n\nfor letter in name:\n  print(letter)\n```\n\n**Narrator:** Here, we iterate through each character in the string `name`. \n\n**Output:**\n\n```\nP\ny\nt\nh\no\nn\n```\n\n**Narrator:** The loop prints each letter of the word "Python" on a separate line.\n\n**Code:**\n\n```python\n# Example 3: Iterating through a range\nfor i in range(5):\n  print(i)\n```\n\n**Narrator:**  In this example, we use the `range` function to generate a sequence of numbers from 0 to 4 (exclusive). The loop iterates through each number in this sequence. \n\n**Output:**\n\n```\n0\n1\n2\n3\n4\n```\n\n**Narrator:**  The loop prints each number in the sequence.\n\n**Code:**\n\n```python\n# Example 4: Looping with else\nfor i in range(3):\n  print(i)\nelse:\n  print("Loop finished")\n```\n\n**Narrator:**  The `else` block in a `for` loop executes after the loop completes normally.\n\n**Output:**\n\n```\n0\n1\n2\nLoop finished\n```\n\n**Narrator:**  The loop prints the numbers 0, 1, and 2, and then the `else` block prints "Loop finished".\n\n**Narrator:**  This was a quick demo of Python\'s `for` loop. You can use it to iterate through lists, strings, ranges, and other iterable objects. Experiment with different examples to learn more about its flexibility and power!\n',
            },
          ],
        },
      ],
    });

    // Send the prompt and await the response
    const { response } = await chatSession.sendMessage(prompt);
    const result = response.text();

    console.log(result);
  } catch (fetchError) {
    console.error("Error fetching helper data:", fetchError);
  }
};

const startConversation = async () => {
  while (true) {
    const input = prompt("Enter your question: ");
    if (input == "exit") break;
    await generateHelper(input);
  }
};

// startConversation();
