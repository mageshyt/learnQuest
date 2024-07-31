"use client";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/hooks/use-modal";
import { useQuiz } from "@/hooks/use-quiz";
import { X } from "lucide-react";
import React from "react";

const Header = () => {
  const { currentQuestionIndex, questions } = useQuiz();
  const { openModal } = useModal();
  const value = (currentQuestionIndex / questions.length) * 100;

  return (
    <header className="pt-[20px] flex items-center px-4 gap-x-2">
      <X
        onClick={() => openModal("exit-model")}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={value} max={questions.length} />
    </header>
  );
};

export default Header;
