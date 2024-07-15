"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";
import { auth } from "@clerk/nextjs/server";

import { Chapter } from "@prisma/client";
import Mux from "@mux/mux-node";
import { env } from "@/env";

const { video } = new Mux({
  tokenId: env.MUX_TOKEN_ID,
  tokenSecret: env.MUX_TOKEN_SECRET,
});

type UpdateChapter = Partial<Chapter>;

export const updateChapter = async (
  chapterId: string,
  courseId: string,
  value: UpdateChapter
) => {
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
    });

    if (!courseOwner) {
      return {
        error: ERROR_MESSAGE.UNAUTHORIZED,
      };
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: value,
    });

    if (value.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      console.log(
        `[INFO] actions/courses/chapters/updateChapter.ts: updateChapter()`,
        existingMuxData
      );

      // If there is an existing mux data, update it
      if (existingMuxData) {
        // delete the existing asset
        await video.assets.delete(existingMuxData.assetId);

        // delete the existing mux data
        console.log("Deleting existing mux data", existingMuxData.id);

        await db.muxData.delete({
          where: {
            chapterId,
            id: existingMuxData.id,
          },
        });
      }

      // Create a new asset

      const asset = await video.assets.create({
        playback_policy: ["public"],
        input: [
          {
            url: value.videoUrl,
          },
        ],
        test: false,
      });

      const muxData = await db.muxData.create({
        data: {
          assetId: asset.id,
          chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    console.log(
      `[INFO] actions/courses/chapters/updateChapter.ts: updateChapter()`,
      chapter
    );

    return chapter;
  } catch (err) {
    console.log(
      "[ERROR] actions/courses/chapters/updateChapter.ts: updateChapter()",
      err
    );
    return {
      error: "Internal Error",
    };
  }
};
