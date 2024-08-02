"use client";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Chapter, Quiz } from "@prisma/client";
import { useQuiz } from "@/hooks/use-quiz";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { AUDIO_CONSTANTS } from "@/lib";
import { Question } from "@/types/typings";
import { createQuizResult } from "@/actions/quiz/create-quiz-result";
import QuizHeader from "@/app/(quiz)/quiz/[quizId]/questions/components/quiz-header";
import Questions from "@/app/(quiz)/quiz/[quizId]/questions/components/questions";
import QuizFooter from "@/app/(quiz)/quiz/[quizId]/questions/components/quiz-footer";

interface QuizContainerProps {
  quiz: QuizWithChapter | null | undefined;
  quizId: string;
}

type QuizWithChapter = Quiz & {
  chapter?: Chapter | null;
};

export const QuizContainer = ({ quiz, quizId }: QuizContainerProps) => {
  // =======================hooks=======================
  const {
    setQuestions,
    submitAnswer,
    status,
    selectedOption,
    nextQuestion,
    tryAgain,
    usersAnswers,
    startTime,
    moveTo,
  } = useQuiz();
  const { showConfetti } = useConfettiStore();
  const router = useRouter();

  // =======================useEffect=======================

  // Set questions when quiz data changes
  useEffect(() => {
    if (quiz) {
      setQuestions(quiz.questions as Question[]);

      // if quiz is already completed, then move to the last question
      if (quiz.isCompleted) {
        moveTo(quiz.questions.length - 1);
      } else {
        const intro = new Audio(AUDIO_CONSTANTS.intro);
        intro.play();
        moveTo(0);
      }
    }
  }, [quiz, setQuestions, moveTo]);

  // Play sound effects based on status
  useEffect(() => {
    if (status === "correct") {
      new Audio(AUDIO_CONSTANTS.correct).play();
    } else if (status === "wrong") {
      new Audio(AUDIO_CONSTANTS.error).play();
    }
  }, [status]);

  // =======================functions=======================
  const handleContinue = useCallback(async () => {
    if (status === "completed") {
      showConfetti();

      // Backend call to save quiz result
      if (quiz && !quiz.isCompleted) {
        try {
          const save = await createQuizResult({
            quizId,
            answers: usersAnswers,
            startTime,
          });

          if ("error" in save) {
            toast.error(save.error);
            return;
          }

          toast.success("Quiz completed successfully");
        } catch (error) {
          toast.error("Failed to save quiz result");
        }
      }

      const redirectTo = quiz?.chapterId
        ? `/courses/${quiz.chapter?.courseId}/chapters/${quiz.chapterId}`
        : "/dashboard";
      setTimeout(() => router.push(redirectTo), 2000);
    }
  }, [status, quiz, quizId, usersAnswers, router, showConfetti]);

  const showAnalytics = useCallback(async () => {
    // if the quiz is completed, then save it and redirect to the analytics page

    if (status === "completed") {
      // Backend call to save quiz result
      if (quiz && !quiz.isCompleted) {
        try {
          const save = await createQuizResult({
            quizId,
            answers: usersAnswers,
            startTime: startTime,
          });

          if ("error" in save) {
            toast.error(save.error);
            return;
          }

          toast.success("Quiz completed successfully");
        } catch (error) {
          toast.error("Failed to save quiz result");
        }
      }
    }

    router.push(`/quiz/${quizId}/analytics`);
  }, [status, quiz, quizId, usersAnswers, router]);

  const handleSubmit = useCallback(async () => {
    if (selectedOption === null) {
      toast.error("Please select an option");
      return;
    }

    switch (status) {
      case "none":
      case "completed":
        submitAnswer();
        await handleContinue();
        break;
      case "correct":
        nextQuestion();
        break;
      case "wrong":
        tryAgain();
        break;
    }
  }, [
    selectedOption,
    status,
    submitAnswer,
    tryAgain,
    nextQuestion,
    handleContinue,
  ]);

  return (
    <>
      <div className="max-w-7xl mx-auto w-full">
        <QuizHeader />
      </div>

      <Questions />

      <QuizFooter
        quizId={quizId}
        status={status}
        disabled={selectedOption === null}
        showAnalytics={showAnalytics}
        onCheck={handleSubmit}
      />
    </>
  );
};
