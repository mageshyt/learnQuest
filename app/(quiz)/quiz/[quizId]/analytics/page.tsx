import { auth } from "@clerk/nextjs/server";
import tw from "tailwind-styled-components";
import { redirect } from "next/navigation";

import { getQuizResultById } from "@/actions/quiz/get-quiz-result";

import { BackToDashboard } from "./components/backto-dashboard";
import ResultCard from "./components/result-card";
import { TimeCard } from "./components/time-card";
import AvgAccuracyCard from "./components/avg-accuracy-card";
import ClientWrapper from "@/components/global/client-wrapper";

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
      <ClientWrapper>
        <ResultSection>
          {/* Result card */}
          <ResultCard score={result.score} />
          {/* average accuracy card */}
          <AvgAccuracyCard
            mistakes={result.errorCount}
            userAnswers={result.answers as any}
          />

          {/* time card */}
          <TimeCard
            startTime={result.startTime}
            endTime={result.endTime}
            totalQuestions={result.quiz.questions.length}
          />
        </ResultSection>
      </ClientWrapper>

      {/* -----------------------------USER ANSWER SECTION --------------------*/}
    </Wrapper>
  );
};

export default QuizResultPage;

const Wrapper = tw.div`p-4 mx-auto max-w-7xl`;

const TopSection = tw.div`flex items-center justify-between space-y-2`;

const Title = tw.h2`text-3xl  font-bold text-gray-800 dark:text-gray-200 tracking-tight`;

const ResultSection = tw.div`grid gap-4 mt-4 md:grid-cols-7`;
