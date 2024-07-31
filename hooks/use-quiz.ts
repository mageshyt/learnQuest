import { Question } from "@/types/typings";
import { create } from "zustand";

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  usersAnswers: Record<number, number>;
  score: number;

  setQuestions: (questions: Question[]) => void;

  nextQuestion: () => void;
  prevQuestion: () => void;

  submitAnswer: (answerIndex: number) => void;

  reset: () => void;
}

export const useQuiz = create<QuizState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  usersAnswers: {},
  score: 0,

  setQuestions: (questions) => set({ questions }),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  prevQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex - 1,
    })),

  submitAnswer: (answerIndex) =>
    set((state) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect =
        currentQuestion.answer === currentQuestion.options[answerIndex];

      return {
        usersAnswers: {
          ...state.usersAnswers,
          [state.currentQuestionIndex]: answerIndex,
        },
        score: isCorrect ? state.score + 1 : state.score,
      };
    }),

  reset: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      usersAnswers: {},
      score: 0,
    }),
}));
