"use server";

import { env } from "@/env";
import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
const { video } = new Mux({
  tokenId: env.MUX_TOKEN_ID,
  tokenSecret: env.MUX_TOKEN_SECRET,
});

export const deleteCourse = async ( courseId: string) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return {
        error: "Unauthorized",
      };
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!courseOwner) {
      return {
        error: ERROR_MESSAGE.UNAUTHORIZED,
      };
    }

    // get all the assets related to the attachment
    for (const chapter of courseOwner.chapters) {
      if (chapter.muxData) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const course = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    console.log(
      "[INFO] actions/courses/delete-course.ts: deleteCourse()",
      course
    );

    return course;
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return {
      error: "Internal Error",
    };
  }
};
