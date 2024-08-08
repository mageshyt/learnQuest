import { getUserQuiz } from "@/actions/quiz/get-user-quizes";
import { DashboardCardWrapper } from "@/components/global/dashboard-card-wrapper";
import Heading from "@/components/global/heading";
import { DataTable } from "@/components/ui/data-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { columns } from "./components/columns";

const QuizPage = async() => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const quiz = await getUserQuiz();

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

      <DashboardCardWrapper title="Quiz">
        <div>
          <DataTable
          columns={columns}
          data={quiz!}
          />
        </div>
      </DashboardCardWrapper>
    </div>
  );
};

export default QuizPage;
