"use client";
import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "@/actions/quiz/get-quiz-by-id";
import { Chapter, Quiz } from "@prisma/client";
import { QuizContainer } from "@/components/containers/quiz/quiz-container";
import LoadingScreen from "@/components/global/loading-screen";

interface QuizTestPageProps {
  params: {
    quizId: string;
  };
}

type QuizWithChapter = Quiz & {
  chapter?: Chapter | null;
};

const QuizTestPage = ({ params }: QuizTestPageProps) => {
  // Fetch quiz data
  const { data: quiz, isLoading } = useQuery<QuizWithChapter | null>({
    queryKey: ["quiz", params.quizId],
    queryFn: () => getQuizById({ quizId: params.quizId }),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }


  return (
    <div className="min-h-screen flex flex-col">
      <QuizContainer quiz={quiz} quizId={params.quizId} />
    </div>
  );
};

export default QuizTestPage;
