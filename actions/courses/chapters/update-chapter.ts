"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";
import { auth } from "@clerk/nextjs/server";

import { Chapter } from "@prisma/client";

type UpdateChapter = Partial<Chapter>;

export const updateChapter = async (
  chapterId: string,
  courseId: string,
  value: UpdateChapter
) => {
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

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: value,
    });

    console.log(
      `[INFO] actions/courses/chapters/updateChapter.ts: updateChapter()`,
      chapter
    );

    return chapter;
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/chapters/updateChapter.ts: updateChapter()",
      err
    );
    return {
      error: "Internal Error",
    };
  }
};
