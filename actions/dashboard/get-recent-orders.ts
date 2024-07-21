"use server";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { Course, Purchase, User } from "@prisma/client";
import { redirect } from "next/navigation";

export type PurchaseWithCourseAndUser = Purchase & {
  course: Course;
  user: User;
};

export const getRecentOrders = async (): Promise<
  PurchaseWithCourseAndUser[]
> => {
  try {
    const { userId } = auth();

    if (!userId) {
      redirect("/");
    }

    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return purchases;
  } catch (err) {
    console.log("app dashboard getAnalytics error", err);

    return [];
  }
};
