"use server";
import { db } from "@/lib";

export async function getUserDetails(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log("getUserDetails -> user", user);

    return user;
  } catch (error) {
    console.error("getUserDetails -> error", error);
    return null;
  }
}
