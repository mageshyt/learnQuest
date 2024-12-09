"use server";

import { db } from "@/lib";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "../general/get-progress";
import { auth } from "@clerk/nextjs/server";

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

export const getDashboardCourses = async (): Promise<DashboardCourse> => {


  try {

    const { userId } = auth();

    if (!userId) {
      return {
        completedCourse: [],
        coursesInProgress: [],
        quizAttempts: 0,
      };
    }


    const purchasedCourse = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          select: {
            id: true,
            imageUrl: true,
            price: true,
            title: true,
            category: true,
            chapters: {
              select: {
                id: true,
                title: true,
                isPublished: true,
              }
            }

          }
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
