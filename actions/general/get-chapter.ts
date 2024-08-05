"use server";

import { db } from "@/lib";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}
export const getChapterById = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    // check if user has purchased the course
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    // get the course and chapter

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
        courseType: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    // if no chapter or course found, throw an error

    if (!chapter || !course) {
      throw new Error("Chapter not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      // only get the attachments if the user has purchased the course
      attachments = await db.attachment.findMany({
        where: {
          courseId,
        },
      });
    }
    // get the mux data for the chapter only if the chapter is free or the user has purchased the course
    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId,
        },
      });
    }

    // get the next chapter
    nextChapter = await db.chapter.findFirst({
      where: {
        courseId,
        isPublished: true,
        position: {
          gt: chapter.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    // user progress

    const userProgress = await db.userProgress.findFirst({
      where: {
        userId: userId,
        chapterId: chapterId,
      },
    });

    return {
      chapter,
      course,
      attachments,
      nextChapter,
      userProgress,
      purchase,
      muxData,
    };
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/chapters/getChapterById.ts: getChapterById()",
      err
    );

    return {
      chapter: null,
      course: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
      muxData: null,
    };
  }
};
