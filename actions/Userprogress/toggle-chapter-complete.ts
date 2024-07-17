"use server";

import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";

interface ToggleChapterCompleteProps {
  chapterId: string;
  courseId: string;
  isCompleted: boolean;
}

export const toggleChapterComplete = async ({
  chapterId,
  isCompleted,
}: ToggleChapterCompleteProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        error: "User not authenticated",
      };
    }

    //   update user progress

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: userId,
          chapterId: chapterId,
        },
      },
      update: {
        isCompleted: isCompleted,
      },
      create: {
        userId: userId,
        chapterId: chapterId,
        isCompleted: isCompleted,
      },
    });

    return userProgress;
  } catch (error) {
    console.log("[toggleChapterComplete] Error: ", error);
    return {
      error: "Failed to update progress",
    };
  }
};
