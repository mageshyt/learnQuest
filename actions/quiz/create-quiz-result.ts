"use server";

import { db } from "@/lib";
import { userAnswerType } from "@/types/typings";
import { auth } from "@clerk/nextjs/server";

interface quizProps {
  quizId: string;
  answers: userAnswerType[];
  startTime: number;
}

export const createQuizResult = async ({
  quizId,
  answers,
  startTime,
}: quizProps) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "User not authenticated",
      };
    }

    const IsExitingResult = await db.quizResult.findFirst({
      where: {
        userId,
        quizId,
      },
    });

    if (IsExitingResult) {
      return {
        error: "Quiz result already exists",
      };
    }

    const totalAttempts = answers.length;
    const correctAnswersCount = answers.filter(
      (answer) => answer.isCorrect
    ).length;
    const score = (correctAnswersCount / totalAttempts) * 100;
    const errorCount = totalAttempts - correctAnswersCount;
    // create the quiz result

    const quizResult = await db.quizResult.create({
      data: {
        userId,
        quizId,
        score,
        errorCount,
        startTime: new Date(startTime),
        answers: {
          set: answers,
        },
      },
    });

    // update the quiz with the status

    await db.quiz.update({
      where: {
        id: quizId,
        userId,
      },
      data: {
        isCompleted: true,
      },
    });

    console.log("[createQuizResult] quizResult", quizResult);

    return quizResult;
  } catch (error) {
    console.log("[createQuizResult] error", error);

    return {
      error: "An error occurred while creating the quiz result",
    };
  }
};
