"use server";

import { db } from "@/lib";

export const getCourseById = async (id: string) => {
  try {
    const course = await db.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!course) {
      return null;
    }

    return course;
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return null;
  }
};
