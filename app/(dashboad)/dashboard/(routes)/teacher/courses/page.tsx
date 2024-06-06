"use client";
import React from "react";
import Link from "next/link";

import { Course } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import ListView from "@/components/global/list-view";
import Image from "next/image";
import Loader from "@/components/global/loader";
import { getAllUserCourses } from "@/actions/courses/getAllUserCourses";
import LoadingScreen from "@/components/global/loading-screen";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
        <ListView
          items={courses}
          render={(course: Course) => (
            <div className="flex m-4 gap-4 justify-between flex-col">
              <div>
                {course.imageUrl && (
                  <div className="aspect-video relative max-w-lg ">
                    <Image
                      alt="course-image"
                      src={course.imageUrl}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <h2 className="text-sm font-medium">{course.title}</h2>
                  {/* <p className="text-xs text-slate-700 dark:text-muted-foreground">
                  </p>
                    {course.description} */}
                </div>
              </div>
              <Link href={`/dashboard/teacher/courses/${course.id}`}>
                <Button variant={"default"} size="sm" className="w-full">
                  View
                </Button>
              </Link>
            </div>
          )}
        />
      </div>

      <Link href="/dashboard/teacher/courses/create">
        <Button>New Course</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
