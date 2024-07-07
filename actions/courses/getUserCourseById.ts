"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";
import { auth } from "@clerk/nextjs/server";

export const getUserCourseById = async (id: string) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        error: "Unauthorized",
      };
    }
    const course = await db.course.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
        attachments: {
          orderBy: {
            createdAt: "asc",
          },
        },
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
