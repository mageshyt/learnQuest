"use client";

import { redirect } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Quiz } from "@prisma/client";
import { useQuiz } from "@/hooks/use-quiz";
import { Question, quizStatusType } from "@/types/typings";

import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "@/actions/quiz/get-quiz-by-id";
import Header from "./components/header";
import Footer from "./components/footer";
import Questions from "./components/questions";
import LoadingScreen from "@/components/global/loading-screen";
import toast from "react-hot-toast";

interface QuizTestPageProps {
  params: {
    quizId: string;
  };
}
const QuizTestPage = ({ params }: QuizTestPageProps) => {
  // -----------------Hooks-----------------
  const {
    setQuestions,
    questions,
    currentQuestionIndex,
    submitAnswer,
    status,
    selectedOption,
  } = useQuiz();
  // -----------------TAN-STACK-----------------
  const {
    data: quiz,
    isPending,
    isLoading,
  } = useQuery<Quiz | null>({
    queryKey: ["quiz", params.quizId],
    queryFn: () => getQuizById({ quizId: params.quizId }),
  });

  useEffect(() => {
    if (quiz) setQuestions(quiz.questions as Question[]);
  }, [quiz, setQuestions]);

  // ------------------ Render ------------------

  if (isPending) {
    // TODO: Add a loading spinner
    return <LoadingScreen />;
  }

  if (!quiz) {
    return redirect("/dashboard");
  }

  // ------------------ handlers------------------
  const handleSubmit = useCallback(() => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }

    submitAnswer();
  }, [selectedOption, submitAnswer]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <Header />
      </div>

      {/* body */}

      <Questions />

      <Footer
        quizId={params.quizId}
        status={status}
        disabled={false}
        onCheck={handleSubmit}
      />
    </div>
  );
};

export default QuizTestPage;
