"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/constants/error-message";
import { auth } from "@clerk/nextjs/server";

export const ReOrderCourseChapters = async (
  courseId: string,
  updateData: { id: string; position: number }[]
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

    //    update course one by one
    for (const { id, position } of updateData) {
      await db.chapter.update({
        where: {
          id,
        },
        data: {
          position,
        },
      });
    }
    return {
      success: true,
    };
  } catch (err) {
    console.log(
      `[ERROR] actions/courses/reorder-course-chapter.ts: ReOrderCourseChapters()`,
      err
    );
    return {
      error: "Internal Error",
    };
  }
};
