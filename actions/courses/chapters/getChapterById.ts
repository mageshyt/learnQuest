"use server";

import { db } from "@/lib";

export const getChapterById = async (id: string, courseId: string) => {
  try {
    const chapter = await db.chapter.findUnique({
      where: {
        id,
        courseId,
      },
      include: {
        muxData: true,
      },
    });

    return chapter;
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/chapters/getChapterById.ts: getChapterById()",
      err
    );

    return null;
  }
};
