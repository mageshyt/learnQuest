"use server";
import { db } from "@/lib";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "../general/get-progress";

type CourseWithPRogressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};
type DashboardCourse = {
  completedCourse: any[];
  coursesInProgress: any[];
  quizAttempts: number;
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourse> => {
  try {
    const purchasedCourse = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchasedCourse.map(
      (purchase) => purchase.course
    ) as CourseWithPRogressWithCategory[];

    for (let course of courses) {
      const progress = await getProgress(course.id, userId);
      course.progress = progress;
    }

    const completedCourse = courses.filter((course) => course.progress === 100);

    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    const quizAttempts = await db.quiz.count({
      where: {
        userId,
      },
    });

    return {
      completedCourse,
      coursesInProgress,
      quizAttempts,
    };
  } catch (err) {
    console.log("app dashboard getDashboardCourses error", err);

    return {
      completedCourse: [],
      coursesInProgress: [],
      quizAttempts: 0,
    };
  }
};
