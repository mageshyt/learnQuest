import React, { FC } from "react";

import { Chapter, Course, UserProgress } from "@prisma/client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseMobileSidebar: FC<CourseMobileSidebarProps> = ({
  course,
  progressCount,
}) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <div className="rounded-full bg-white  shadow p-2">
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 bg-white w-72 dark:bg-neutral-950"
      >
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};
