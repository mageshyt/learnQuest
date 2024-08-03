import NavbarRoutes from "@/app/(dashboad)/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React, { FC } from "react";
import { CourseMobileSidebar } from "./course-mobile-sidebar";
import UserProfile from "@/components/global/user-profile";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
export const CourseNavbar: FC<CourseNavbarProps> = ({
  course,
  progressCount,
}) => {
  return (
    <div className="h-full flex items-center px-4 w-full">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
      <UserProfile />
    </div>
  );
};
