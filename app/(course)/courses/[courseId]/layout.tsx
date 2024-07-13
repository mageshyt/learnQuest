import { getCoursePreviewById } from "@/actions/general/get-course-preview";
import { getProgress } from "@/actions/general/get-progress";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { CourseSidebar } from "./components/course-sidebar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await getCoursePreviewById(params.courseId, userId);
  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, params.courseId);

  return (
    <div className="h-full ">
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <div className="md:pl-80 pt-[80px] h-full">{children}</div>
    </div>
  );
};

export default CourseLayout;
