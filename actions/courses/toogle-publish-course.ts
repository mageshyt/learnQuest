"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";
import { auth } from "@clerk/nextjs/server";

import { env } from "@/env";

export const toggleCoursePublishStatus = async (
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

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: true,
      },
    });

    if (!course) {
      return {
        error: ERROR_MESSAGE.UNAUTHORIZED,
      };
    }

    // if isPublished is true, then check it has chapters,title,description,thumbnail
    if (isPublished) {
      const hasPublishedChapters = course.chapters.some(
        (chapter) => chapter.isPublished
      );

      if (
        !hasPublishedChapters ||
        !course.title ||
        !course.description ||
        !course.imageUrl ||
        !course.categoryId
      ) {
        return {
          error: "Missing Required Fields",
        };
      }
    }

    const res = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: isPublished,
      },
    });
    console.log(
      `[INFO] actions/courses/toogle-publish-course.ts: toggleCoursePublishStatus()`,
      res
    );

    return res;
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/chapters/toggleCoursePublishStatus.ts: toggleCoursePublishStatus()",
      err
    );
    return {
      error: "Internal Error",
    };
  }
};
