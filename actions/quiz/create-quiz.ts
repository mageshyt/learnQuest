"use server";

import { db } from "@/lib";
import { Question } from "@/types/typings";
import { auth } from "@clerk/nextjs/server";

interface quizProps {
  title: string;
  chapterId?: string;
  questions: Question[];
}

export const createQuiz = async ({
  title,
  chapterId,
  questions,
}: quizProps) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "User not authenticated",
      };
    }

    // create the quiz

    const quiz = await db.quiz.create({
      data: {
        title,
        chapterId,
        userId,
        questions: {
          set: questions, // add question data here
        },
      },
    });
    // }

    console.log("[createQuiz] quiz", quiz);

    return quiz;
  } catch (error) {
    console.log("[createQuiz] error", error);

    return {
      error: "An error occurred while creating the quiz",
    };
  }
};
