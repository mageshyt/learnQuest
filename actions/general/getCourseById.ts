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
          include: {
            muxData: true,
          },
          take: 1,
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!course) {
      return null;
    }
    console.log("[INFO] app/api/courses/route.ts: GET()", course);

    return course;
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return null;
  }
};
