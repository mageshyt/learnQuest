"use server";
import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

export type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const title = purchase.course.title;

    // if the course title is not in the grouped object, add it with a value of 1
    if (!grouped[title]) {
      grouped[title] = 0;
    }

    grouped[title] += purchase.course.price!;
  });

  return grouped;
};
export const getAnalytics = async (userId: string) => {
  try {


    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(purchases);

    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, earnings]) => ({
        courseTitle,
        earnings,
      })
    );

    const totalRevenue = data.reduce((acc, { earnings }) => acc + earnings, 0);
    const totalSales = purchases.length;
    console.log("👉🏻   ~ getAnalytics ~ totalSales:", {
      totalSales,
      totalRevenue,
      data,

    });

    return {
      data,
      totalRevenue,
      totalSales,
      purchases,
    };
  } catch (err) {
    console.log("app dashboard getAnalytics error", err);

    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
      purchases: [],
    };
  }
};
