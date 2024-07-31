"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

import { Quiz } from "@prisma/client";
import { useQuiz } from "@/hooks/use-quiz";
import { Question } from "@/types/typings";

import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "@/actions/quiz/get-quiz-by-id";

import Header from "./components/header";

interface QuizTestPageProps {
  params: {
    quizId: string;
  };
}
const QuizTestPage = ({ params }: QuizTestPageProps) => {
  const { setQuestions } = useQuiz();
  // -----------------State-----------------
  const { data: quiz, isPending } = useQuery<Quiz | null>({
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

  // console.log("[QuizTestPage] quizData", quizData);
  return (
    <div className="p-4">
      {/* progress bar */}
      <Header />

      <main>{/* question */}</main>

      {/* footer */}
    </div>
  );
};

export default QuizTestPage;
