"use server";

import { env } from "@/env";
import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/constants/error-message";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: env.MUX_TOKEN_ID,
  tokenSecret: env.MUX_TOKEN_SECRET,
});

export const deleteChapter = async (courseId: string, chapterId: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "Unauthorized",
      };
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
      include: {
        course: true,
      },
    });

    if (!chapter) {
      return {
        error: "Chapter not found",
      };
    }

    // if the current user is not the owner of the course
    if (chapter.course.userId !== userId) {
      return {
        error: ERROR_MESSAGE.UNAUTHORIZED,
      };
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    // if there are no chapters left in the course, unpublish the course
    const PublishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (!PublishedChapters.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    console.log(
      "[INFO] actions/courses/chapters/delete-chapter.ts: deleteChapter()",
      deletedChapter
    );

    return deletedChapter;
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/chapters/delete-chapter.ts: deleteChapter()",
      err
    );
    return {
      error: "Internal Error",
    };
  }
};
