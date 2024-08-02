"use server";
import { db } from "@/lib";

export async function getUserDetails(userId: string) {
  try {
    if (!userId) {
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.error("getUserDetails -> error", error);
    return null;
  }
}
