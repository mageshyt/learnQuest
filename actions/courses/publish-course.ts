"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";
import { auth } from "@clerk/nextjs/server";

import { env } from "@/env";

export const publishCourse = async (courseId: string, isPublished: boolean) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "Unauthorized",
      };
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return {
        error: ERROR_MESSAGE.UNAUTHORIZED,
      };
    }
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/chapters/publishChapter.ts: publishChapter()",
      err
    );
    return {
      error: "Internal Error",
    };
  }
};
