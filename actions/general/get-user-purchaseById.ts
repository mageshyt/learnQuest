"use server";

import { db } from "@/lib";

export const getUserCoursePurchaseById = async (id: string, userId: string) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: id,
        },
      },
    });

    return purchase;
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return null;
  }
};
