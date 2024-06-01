"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";
import { auth } from "@clerk/nextjs/server";

export const getAllUserCourses = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: ERROR_MESSAGE.UNAUTHORIZED,
      };
    }

    const course = await db.course.findMany({
      where: {
        userId,
      },
    });

    if (!course) {
      return {
        error: ERROR_MESSAGE.NO_RECORD_FOUND,
      };
    }

    return course;
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return {
      error: ERROR_MESSAGE.INTERNAL_ERROR,
    };
  }
};
