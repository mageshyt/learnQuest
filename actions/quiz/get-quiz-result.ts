"use server";

import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface quizProps {
  quizId: string;
}

export const getQuizResultById = async ({ quizId }: quizProps) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return null;
    }

    // get the quiz
    const quiz = await db.quizResult.findFirst({
      where: {
        quizId: quizId,
        userId,
      },
      include: {
        quiz: true,
      },
    });

    console.log("[getQuizResultById] quiz", quiz);
    return quiz;
  } catch (error) {
    console.log("[createQuiz] error", error);
    return null;
  }
};
