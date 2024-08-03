"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function registerTeacher() {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "User not found" };
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    // update the user role to teacher in clerk

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "TEACHER",
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (user.role === "TEACHER") {
      return { message: "User is already a teacher", user };
    }

    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "TEACHER",
      },
    });

    return { message: "Your updated to the Teacher", user: updatedUser };
  } catch (error) {
    console.error("registerTeacher -> error", error);
    return { error: "An error occurred while updating the user role" };
  }
}
