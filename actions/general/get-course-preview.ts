"use server";

import { db } from "@/lib";

export const getCoursePreviewById = async (id: string, userId: string) => {
  try {
    const course = await db.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          where: {
            courseId: id,
          },
          orderBy: {
            position: "asc",
          },
          include: {
            userProgress: {
              where: {
                userId,
              },
            },
          },
        },
      },
    });

    return course;
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return null;
  }
};
