import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { getQuizById } from "@/actions/quiz/get-quiz-by-id";
interface QuizTestPageProps {
  params: {
    quizId: string;
  };
}
const QuizTestPage = async ({ params }: QuizTestPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const quizData = await getQuizById({ quizId: params.quizId });

  console.log("[QuizTestPage] quizData", quizData);
  return (
    <div className="p-4">
      <p>Quiz Result Page</p>
    </div>
  );
};

export default QuizTestPage;
