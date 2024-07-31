import { Progress } from "@/components/ui/progress";
import { useQuiz } from "@/hooks/use-quiz";
import { X } from "lucide-react";
import React from "react";

const Header = () => {
  const { currentQuestionIndex, questions } = useQuiz();

  return (
    <header className="pt-[20px]">
      <X
        onClick={() => {}}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={currentQuestionIndex} max={questions.length} />
    </header>
  );
};

export default Header;
