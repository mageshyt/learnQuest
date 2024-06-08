"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";

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

    console.log(
      `[INFO] actions/courses/chapters/getChapterById.ts: getChapterById()`,
      chapter
    );
    return chapter;
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/chapters/getChapterById.ts: getChapterById()",
      err
    );

    return null;
  }
};
