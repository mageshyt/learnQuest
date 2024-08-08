"use client";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
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
  // =======================STATEw=======================
  const [isPending, setPending] = useState(false);
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
        moveTo(quiz.questions.length - 1, "completed");
      } else {
        const intro = new Audio(AUDIO_CONSTANTS.intro);
        intro.play();
        moveTo(0, "none");
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
  const saveQuizResult = useCallback(async () => {
    if (!quiz || quiz.isCompleted) return;

    try {
      setPending(true);
      const save = await createQuizResult({
        quizId,
        answers: usersAnswers,
        startTime,
      });

      if ("error" in save) {
        toast.error(save.error);
        return false;
      }

      toast.success("Quiz completed successfully");
      return true;
    } catch (error) {
      toast.error("Failed to save quiz result");
      return false;
    } finally {
      setPending(false);
    }
  }, [quiz, quizId, usersAnswers, startTime]);

  const handleContinue = useCallback(async () => {
    if (status !== "completed") return;

    showConfetti();
    const success = await saveQuizResult();
    if (!success) return;

    const redirectTo = quiz?.chapterId
      ? `/courses/${quiz.chapter?.courseId}/chapters/${quiz.chapterId}`
      : "/dashboard";
    setTimeout(() => router.push(redirectTo), 2000);
  }, [status, quiz, saveQuizResult, router, showConfetti]);
  const showAnalytics = useCallback(async () => {
    if (status !== "completed") return;

    const success = await saveQuizResult();
    if (!success) return;

    router.push(`/quiz/${quizId}/analytics`);
  }, [status, saveQuizResult, quizId, router]);

  const handleSubmit = useCallback(async () => {
    if (selectedOption === null) {
      toast.error("Please select an option");
      return;
    }

    if (status === "none" || status === "completed") {
      submitAnswer();
      await handleContinue();
    } else if (status === "correct") {
      nextQuestion();
    } else if (status === "wrong") {
      tryAgain();
    }
  }, [
    selectedOption,
    status,
    submitAnswer,
    handleContinue,
    nextQuestion,
    tryAgain,
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
        disabled={selectedOption === null || isPending}
        showAnalytics={showAnalytics}
        onCheck={handleSubmit}
      />
    </>
  );
};
