import { Question, quizStatusType } from "@/types/typings";
import { create } from "zustand";

type userAnswerType = {
  question: string;
  answer: string;
  isCorrect: boolean;
};
// Interface for Quiz State
interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedOption: number | null;
  usersAnswers: userAnswerType[];
  score: number;
  status: quizStatusType;
  startTime: number;

  setQuestions: (questions: Question[]) => void;
  submitAnswer: () => void;
  setSelectedOption: (optionIndex: number) => void;
  nextQuestion: () => void;
  moveTo: (index: number, status: quizStatusType) => void;
  tryAgain: () => void;
  reset: () => void;
}

export const useQuiz = create<QuizState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  usersAnswers: [],
  score: 0,
  status: "none",
  selectedOption: null,
  startTime: Date.now(),

  setSelectedOption: (optionIndex) =>
    set((state) => {
      return {
        selectedOption: optionIndex,
      };
    }),

  // Set questions for the quiz
  setQuestions: (questions) =>
    set({ questions, status: "none", startTime: Date.now() }),

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
      let nextQuestion = state.currentQuestionIndex + 1;

      if (
        state.currentQuestionIndex === state.questions.length - 1 &&
        isCorrect
      ) {
        newStatus = "completed"; // Last question has been answered
      } else if (isCorrect) {
        newStatus = "correct";
      } else {
        newStatus = "wrong";
      }

      return {
        usersAnswers: [
          ...state.usersAnswers,
          {
            question: currentQuestion.question,
            answer: selectedAnswer,
            isCorrect,
          },
        ],
        score: isCorrect ? state.score + 1 : state.score,
        status: newStatus,
        selectedOption: state.selectedOption,
      };
    }),

  // Reset the quiz state
  reset: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      usersAnswers: [],
      score: 0,
      status: "none",
    }),

  // Move to the next question
  nextQuestion: () =>
    set((state) => {
      if (state.currentQuestionIndex === state.questions.length - 1) {
        return {
          status: "completed",
          currentQuestionIndex: state.questions.length - 1,
        };
      }
      return {
        selectedOption: null,
        status: "none",
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      };
    }),

  // Reset the quiz state
  tryAgain: () =>
    set({
      status: "none",
      selectedOption: null,
    }),

  moveTo: (index, status) =>
    set((state) => {
      return {
        currentQuestionIndex: index,
        status: status,
        selectedOption: null,
      };
    }),
}));
