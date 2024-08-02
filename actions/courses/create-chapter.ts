"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/constants/error-message";
import { auth } from "@clerk/nextjs/server";
import { env } from "@/env";

export const createCourseChapter = async (courseId: string, title: string) => {
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

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const position = lastChapter ? lastChapter.position + 1 : 0;
    const chapter = await db.chapter.create({
      data: {
        courseId,
        title,
        position: position,
        isFree: courseOwner.courseType === "FREE" ? true : false,
      },
    });

    console.log(
      `[INFO] actions/courses/create-chapter.ts: createCourseChapter()`,
      chapter
    );
    return chapter;
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/create-chapter.ts: createCourseChapter()",
      err
    );
    return {
      error: "Internal Error",
    };
  }
};
