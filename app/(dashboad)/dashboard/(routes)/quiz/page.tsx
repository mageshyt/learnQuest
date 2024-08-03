import Heading from "@/components/global/heading";
import React from "react";

const QuizPage = () => {
  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto pb-10 container">
      {/* ---------------------------header--------------------------- */}
      <div className="mb-6">
        <Heading
          title="Test Your Knowledge"
          isUnderlined={false}
          description="Challenge yourself with a variety of quizzes and track your progress. Whether you're preparing for exams or just looking to learn something new, our quizzes are designed to help you succeed."
        />
      </div>
    </div>
  );
};

export default QuizPage;
