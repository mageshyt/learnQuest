import tw from "tailwind-styled-components";
import { getQuizResultById } from "@/actions/quiz/get-quiz-result";
import { auth } from "@clerk/nextjs/server";
import { Layout } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { BackToDashboard } from "./components/backto-dashboard";
import ResultCard from "./components/result-card";
import { TimeCard } from "./components/time-card";
import AvgAccuracyCard from "./components/avg-accuracy-card";

interface QuizResultPageProps {
  params: {
    quizId: string;
  };
}

const QuizResultPage = async ({ params }: QuizResultPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const result = await getQuizResultById({ quizId: params.quizId });

  if (!result) {
    return redirect("/dashboard");
  }

  return (
    <Wrapper>
      {/* -----------------------------TOP SECTION --------------------*/}
      <TopSection>
        <Title>Statistic</Title>
        {/* back to dashboard */}
        <BackToDashboard />
      </TopSection>

      {/* -----------------------------Results SECTION --------------------*/}

      <ResultSection>
        {/* Result card */}
        <ResultCard />
        {/* average accuracy card */}
        <AvgAccuracyCard />

        {/* time card */}
        <TimeCard />
      </ResultSection>

      {/* -----------------------------USER ANSWER SECTION --------------------*/}
    </Wrapper>
  );
};

export default QuizResultPage;

const Wrapper = tw.div`p-4 mx-auto max-w-7xl`;

const TopSection = tw.div`flex items-center justify-between space-y-2`;

const Title = tw.h2`text-3xl  font-bold text-gray-800 dark:text-gray-200 tracking-tight`;

const ResultSection = tw.div`grid gap-4 mt-4 md:grid-cols-7`;
