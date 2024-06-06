"use server";

import { db } from "@/lib";
import { ERROR_MESSAGE } from "@/lib/error-message";
import { auth } from "@clerk/nextjs/server";
export const deleteCourseAttachment = async (
  attachmentId: string,
  courseId: string
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

    const attachment = await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId,
      },
    });
    console.log(
      "[INFO] actions/courses/deleteAttachments.ts: deleteCourseAttachment()",
      attachment
    );
    return attachment;
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return {
      error: "Internal Error",
    };
  }
};
