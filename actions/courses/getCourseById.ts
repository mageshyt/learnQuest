"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/constants/error-message";

export const getCourseById = async (id: string) => {
  try {
    const course = await db.course.findUnique({
      where: {
        id,
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
      error: "Internal Error",
    };
  }
};
