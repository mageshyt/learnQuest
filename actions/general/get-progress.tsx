"use server";

import { db } from "@/lib";

export const getProgress = async (
  courseId: string,
  userId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.findMany({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progress =
      (validCompletedChapters.length / publishedChapters.length) * 100;

    return progress;
  } catch (e) {
    console.error(e);

    return 0;
  }
};
