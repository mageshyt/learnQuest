"use server";

import { db } from "@/lib";
import { Question } from "@/types/typings";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface quizProps {
  quizId: string;
}

export const getQuizById = async ({ quizId }: quizProps) => {
  try {
    const { userId } = auth();

    if (!userId) {
      redirect("/");
      // return null;
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
      return redirect("/dashboard");
    }
    return quiz;
  } catch (error) {
    console.log("[createQuiz] error", error);
    return null;
  }
};
