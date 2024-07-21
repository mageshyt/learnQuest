"use client";
import React from "react";

import { Course } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { getAllUserCourses } from "@/actions/courses/getAllUserCourses";
import LoadingScreen from "@/components/global/loading-screen";
// import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";

import CreateCoursePage from "./create/page";
import { DataTable } from "@/components/ui/data-table";
import CreateCourse from "./components/create-course";
import { DashboardCardWrapper } from "@/components/global/dashboard-card-wrapper";

const CoursesPage = () => {
  // Fetch courses
  const {
    data: courses,
    isError,
    isPending,
    error,
  } = useQuery<Course[] | { error: string }>({
    queryKey: ["courses"],
    queryFn: () => getAllUserCourses(),
  });

  if (isPending) return <LoadingScreen />;

  if (isError)
    return (
      <div>{error instanceof Error ? error.message : "An error occurred"}</div>
    );

  if ("error" in courses) return <div>{courses.error}</div>;

  return (
    <div className="p-6">
      {/* list of coursed */}

      <DashboardCardWrapper title="Courses">
        <DataTable
          columns={columns}
          data={courses}
          searchKey="title"
          actions={[<CreateCourse key={"create"} />]}
        />
      </DashboardCardWrapper>
    </div>
  );
};

export default CoursesPage;
