import { getUserCoursePurchaseById } from "@/actions/general/get-user-purchaseById";
import ListView from "@/components/global/list-view";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Cousine } from "next/font/google";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import { CourseSidebarItem } from "./course-sidebar-item";

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
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6 h-20 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>

        {/* progress and purchase check */}
      </div>
      {/* chapters */}
      <div className="flex flex-col w-full">
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
