import React from 'react'

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

import { getUserQuiz } from "@/actions/quiz/get-user-quizes";

import { DashboardCardWrapper } from "@/components/global/dashboard-card-wrapper";
import Heading from "@/components/global/heading";
const QuizTable =async () => {

  const quiz = await getUserQuiz();

  return (
    <>
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

    </>

  )
}

export default QuizTable;

