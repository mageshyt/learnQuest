"use client";
import React from "react";
import Link from "next/link";

import { Course } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { getAllUserCourses } from "@/actions/courses/getAllUserCourses";
import LoadingScreen from "@/components/global/loading-screen";
// import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateCoursePage from "./create/page";
import { DataTable } from "@/components/ui/data-table";

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
      <h1 className="text-2xl font-medium">Courses</h1>
      <DataTable columns={columns} data={courses} searchKey="title" />

      <Sheet>
        <SheetTrigger asChild>
          <Button>Create a Course</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create a new course</SheetTitle>
            <SheetDescription>
              Fill in the form below to create a new course. You can always edit
            </SheetDescription>
          </SheetHeader>
          <CreateCoursePage />
          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button type="submit">Create Course</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CoursesPage;
