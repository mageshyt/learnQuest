"use client";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/hooks/use-modal";
import { useQuiz } from "@/hooks/use-quiz";
import { X } from "lucide-react";
import React from "react";

const QuizHeader = () => {
  const { currentQuestionIndex, questions, status } = useQuiz();
  const { openModal } = useModal();
  const value = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <header className="pt-[20px] flex items-center px-4 gap-x-2">
      <X
        onClick={() => openModal("exit-model")}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress
        variants={status === "completed" ? "success" : "default"}
        value={value}
        max={questions?.length || 100}
      />
    </header>
  );
};

export default QuizHeader;
