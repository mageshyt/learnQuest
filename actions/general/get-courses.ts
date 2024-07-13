import { db } from "@/lib";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

export type CourseWithProgressWithCategories = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategories[]> => {
  try {
    // get only published courses and include the category and chapters of the course
    // and the purchase of the user
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // get the progress of the user in each course
    const CourseWithProgress: CourseWithProgressWithCategories[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchase.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(course.id, userId);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return CourseWithProgress;
  } catch (e) {
    console.log("[ERROR] getCourses", e);
    return [];
  }
};
