import { Question, quizStatusType } from "@/types/typings";
import { create } from "zustand";

// Interface for Quiz State
interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedOption: number | null;
  usersAnswers: Record<string, string>;
  score: number;
  errorCount: number;
  status: quizStatusType;

  setQuestions: (questions: Question[]) => void;
  submitAnswer: () => void;
  setSelectedOption: (optionIndex: number) => void;
  reset: () => void;
}

export const useQuiz = create<QuizState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  usersAnswers: {},
  score: 0,
  errorCount: 0,
  status: "none",
  selectedOption: null,

  setSelectedOption: (optionIndex) =>
    set((state) => {
      return {
        selectedOption: optionIndex,
      };
    }),

  // Set questions for the quiz
  setQuestions: (questions) => set({ questions, status: "none" }),

  // Submit an answer for the current question
  submitAnswer: () =>
    set((state) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];

      // if no option is selected, return the current state
      if (state.selectedOption === null) return state;

      const selectedAnswer = currentQuestion.options[state.selectedOption];
      const isCorrect =
        currentQuestion.answer === selectedAnswer ? true : false;

      let newStatus: quizStatusType = "none";
      let newErrorCount = state.errorCount;

      if (state.currentQuestionIndex === state.questions.length - 1) {
        newStatus = "completed"; // Last question has been answered
      } else if (isCorrect) {
        newStatus = "correct";
      } else {
        newStatus = "wrong";
        newErrorCount += 1; // Increment error count for incorrect answer
      }

      return {
        usersAnswers: {
          ...state.usersAnswers,
          [currentQuestion.question]: selectedAnswer,
        },
        score: isCorrect ? state.score + 1 : state.score,
        errorCount: newErrorCount,
        status: newStatus,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    }),

  // Reset the quiz state
  reset: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      usersAnswers: {},
      score: 0,
      errorCount: 0,
      status: "none",
    }),
}));
