"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/constants/error-message";
import { auth } from "@clerk/nextjs/server";

import Mux from "@mux/mux-node";
import { env } from "@/env";

export const publishChapter = async (
  chapterId: string,
  courseId: string,
  isPublished: boolean
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
      data: {
        isPublished,
      },
    });

    // check only if the chapter get unpublished
    if (!isPublished) {
      const publishedChapters = await db.chapter.findMany({
        where: {
          courseId,
          isPublished: true,
        },
      });

      // if the course has no published chapters, set the course status to draft
      if (publishedChapters.length === 0) {
        await db.course.update({
          where: {
            id: courseId,
          },
          data: {
            isPublished: false,
          },
        });
      }
    }
    console.log(
      "[INFO] actions/courses/chapters/publishChapter.ts: publishChapter()"
    );
    return chapter;
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
