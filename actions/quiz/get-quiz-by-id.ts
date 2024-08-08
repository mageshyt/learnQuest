"use server";

import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";

interface quizProps {
  quizId: string;
}

export const getQuizById = async ({ quizId }: quizProps) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return null;
    }

    // get the quiz
    const quiz = await db.quiz.findUnique({
      where: {
        id: quizId,
        userId,
      },
      include: {
        chapter: true,
      },
    });

    if (!quiz) {
      return null;
    }
    return quiz;
  } catch (error) {
    console.log("[createQuiz] error", error);
    return null;
  }
};
