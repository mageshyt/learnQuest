"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/constants/error-message";
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
      include: {
        chapters: true,
        category: true,
      },
    });

    if (!course) {
      return {
        error: ERROR_MESSAGE.NO_RECORD_FOUND,
      };
    }

    console.log("[INFO] app/api/courses/route.ts: GET()", userId);

    return course;
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return {
      error: ERROR_MESSAGE.INTERNAL_ERROR,
    };
  }
};
