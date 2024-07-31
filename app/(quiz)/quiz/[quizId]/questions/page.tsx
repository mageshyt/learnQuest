"use client";

import { redirect } from "next/navigation";
import { useEffect, useMemo } from "react";

import { Quiz } from "@prisma/client";
import { useQuiz } from "@/hooks/use-quiz";
import { Question } from "@/types/typings";

import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "@/actions/quiz/get-quiz-by-id";
import Header from "./components/header";
import Footer from "./components/footer";
import Questions from "./components/questions";

interface QuizTestPageProps {
  params: {
    quizId: string;
  };
}
const QuizTestPage = ({ params }: QuizTestPageProps) => {
  const { setQuestions, questions, currentQuestionIndex, nextQuestion } =
    useQuiz();
  // -----------------State-----------------
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

  if (isPending) {
    // TODO: Add a loading spinner
    return <p>Loading...</p>;
  }

  if (!quiz) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <Header />
      </div>

      {/* body */}

      <Questions />

      <Footer
        quizId={params.quizId}
        status="none"
        disabled={false}
        onCheck={nextQuestion}
      />
    </div>
  );
};

export default QuizTestPage;
