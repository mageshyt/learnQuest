import { getUserCoursePurchaseById } from "@/actions/general/get-user-purchaseById";
import ListView from "@/components/global/list-view";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/global/course-progress";
import { cn } from "@/lib";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar: FC<CourseSidebarProps> = async ({
  course,
  progressCount,
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const purchase = await getUserCoursePurchaseById(course.id, userId);
  return (
    <div className="h-full bg-white dark:bg-neutral-950 m-4 md:rounded-3xl md:border flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6  flex flex-col">
        <h1
          className={cn(
            "font-semibold",
            course.title.length <= 30 && "!text-lg",
            course.title.length <= 20 && "text-xl"
          )}
        >
          {course.title}
        </h1>

        {/* progress and purchase check */}
        {purchase && (
          <div className="mt-4">
            <CourseProgress
              value={progressCount}
              variant={progressCount === 100 ? "success" : "default"}
            />
          </div>
        )}
      </div>
      {/* chapters */}
      <div className="flex flex-col w-full pb-6 gap-2">
        <ListView
          items={course.chapters}
          render={(chapter) => (
            <CourseSidebarItem
              id={chapter.id}
              label={chapter.title}
              courseId={course.id}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              isLocked={!chapter.isFree && !purchase}
            />
          )}
        />
      </div>
    </div>
  );
};
