"use client";
import { useQuiz } from "@/hooks/use-quiz";
import React, { useMemo } from "react";

const Questions = () => {
  const { questions, currentQuestionIndex } = useQuiz();

  const title = useMemo(() => {
    return questions.length > 0 && questions[currentQuestionIndex].question;
  }, [questions, currentQuestionIndex]);


  return (
    <div className="h-full flex-1  flex items-center justify-center">
      {/* question */}
      <div className="lg:min-h-[350px] lg:w-[600px] w-full px-4 lg:px-0 flex flex-col space-y-12">
        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
          {title}
        </h1>

        {/* options */}
        <div className="flex flex-col gap-4 mt-8">
          {questions[currentQuestionIndex]?.options.map((option, index) => (
            <button
              key={index}
              className="w-full p-4 rounded-lg bg-neutral-100 text-neutral-700"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
