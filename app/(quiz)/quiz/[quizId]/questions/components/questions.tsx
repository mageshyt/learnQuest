"use client";
import { useQuiz } from "@/hooks/use-quiz";
import React, { useMemo } from "react";
import QuestionOptions from "./question-options";

const Questions = () => {
  const {
    questions,
    currentQuestionIndex,
    status,
    selectedOption,
    setSelectedOption,
  } = useQuiz();

  const title = useMemo(() => {
    return questions.length > 0 && questions[currentQuestionIndex].question;
  }, [questions, currentQuestionIndex, status]);

  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex, status]);

  const currentOptions = useMemo(() => {
    return currentQuestion?.options;
  }, [currentQuestion, status, currentQuestionIndex]);

  return (
    <div className="h-full flex-1  flex items-center justify-center">
      {/* question */}
      <div className="lg:min-h-[350px] lg:max-w-5xl mx-auto   w-full px-4  flex flex-col space-y-12">
        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
          {title}
        </h1>

        {/* options */}
        <QuestionOptions
          options={currentOptions}
          status={status}
          selectedOption={selectedOption}
          onSelect={(option) => setSelectedOption(option)}
          disabled={status !== "none"}
          type={currentQuestion?.type}
        />
      </div>
    </div>
  );
};

export default Questions;
