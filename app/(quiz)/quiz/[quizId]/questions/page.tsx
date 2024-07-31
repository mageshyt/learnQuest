"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "@/actions/quiz/get-quiz-by-id";
import { useQuiz } from "@/hooks/use-quiz";
import Header from "./components/header";
import Footer from "./components/footer";
import Questions from "./components/questions";
import LoadingScreen from "@/components/global/loading-screen";
import toast from "react-hot-toast";
import { Question } from "@/types/typings";
import { Chapter, Quiz } from "@prisma/client";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface QuizTestPageProps {
  params: {
    quizId: string;
  };
}

type QuizWithChapter = Quiz & {
  chapter?: Chapter | null;
};

const QuizTestPage = ({ params }: QuizTestPageProps) => {
  // Hooks
  const {
    setQuestions,
    submitAnswer,
    status,
    selectedOption,
    nextQuestion,
    tryAgain,
    setSelectedOption,
  } = useQuiz();
  const { showConfetti } = useConfettiStore();
  const router = useRouter();

  // Fetch quiz data
  const { data: quiz, isLoading } = useQuery<QuizWithChapter | null>({
    queryKey: ["quiz", params.quizId],
    queryFn: () => getQuizById({ quizId: params.quizId }),
  });

  // Set questions when quiz data changes
  useEffect(() => {
    if (quiz) setQuestions(quiz.questions as Question[]);
  }, [quiz, setQuestions]);

  const handleContinue = useCallback(() => {
    if (status === "completed") {
      showConfetti();
      // TODO ::backend call to save the results
      // if quiz is from chapter then redirect to chapter page
      if (quiz?.chapterId) {
        // wait for 2 seconds before redirecting
        setTimeout(() => {
          router.push(
            `/courses/${quiz?.chapter?.courseId}/chapters/${quiz.chapterId}`
          );
        }, 2000);
      } else {
        // wait for 2 seconds before redirecting
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    }
  }, [status]);

  // Handle submit action
  const handleSubmit = useCallback(() => {
    if (selectedOption === null) {
      toast.error("Please select an option");
      return;
    }

    switch (status) {
      case "none":
        submitAnswer();
        break;
      case "completed":
        submitAnswer();
        // showConfetti if the answer is correct
        handleContinue();
        break;
      case "correct":
        nextQuestion();
        break;
      case "wrong":
        tryAgain();
        break;
    }
  }, [selectedOption, status, submitAnswer, tryAgain, nextQuestion]);

  // Render
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!quiz) {
    return router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <Header />
      </div>

      {/* Body */}
      <Questions />

      <Footer
        quizId={params.quizId}
        status={status}
        disabled={selectedOption === null}
        onCheck={handleSubmit}
      />
    </div>
  );
};

export default QuizTestPage;
