import tw from "tailwind-styled-components";
import { getCoursePreviewById } from "@/actions/general/get-course-preview";
import { getProgress } from "@/actions/general/get-progress";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { CourseSidebar } from "./components/course-sidebar";
import { CourseNavbar } from "./components/course-navbar";

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

  const progressCount = await getProgress(params.courseId, userId);

  return (
    <Wrapper>
      <div className="hidden md:flex h-full w-[350px] flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <div className="md:pl-[350px] pt-[20px] dark:bg-neutral-950   h-full ">
        <div className="h-[40px]  w-full z-50">
          <CourseNavbar course={course} progressCount={progressCount} />
        </div>
        {children}
      </div>
    </Wrapper>
  );
};

export default CourseLayout;

const Wrapper = tw.div`min-h-screen bg-[#f9fafb] dark:bg-neutral-950`;
