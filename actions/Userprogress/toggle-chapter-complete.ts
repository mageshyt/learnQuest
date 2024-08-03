"use server";

import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

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

    const user = await clerkClient.users.getUser(userId);
    const xp = (user.publicMetadata.xp as number) || 0;
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


    //  if it  completed give 10px
    if (isCompleted) {
      // update in clerk
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          xp: xp + 10,
        },
      });

    } else {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          xp: Math.max(xp - 10, 0),
        },
      });
    }

    return userProgress;
  } catch (error) {
    console.log("[toggleChapterComplete] Error: ", error);
    return {
      error: "Failed to update progress",
    };
  }
};
