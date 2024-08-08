"use server";

import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { Quiz, QuizResult } from "@prisma/client";

export const getUserQuiz = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return null;
    }

    // get the quiz

    const quiz = await db.quiz.findMany({
      where: {
        userId,
      },
      include: {
        result: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return quiz;
  } catch (error) {
    console.log("[createQuiz] error", error);
    return [];
  }
};
