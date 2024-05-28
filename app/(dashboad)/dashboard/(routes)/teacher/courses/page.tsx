import React from "react";
import Link from "next/link";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib";
import { Button } from "@/components/ui/button";
import ListView from "@/components/global/list-view";
import Image from "next/image";
import { Course } from "@prisma/client";

const CoursesPage = async () => {
  const { userId } = auth();
  // Redirect if not logged in
  if (!userId) {
    return redirect("/");
  }
  // fetch course data
  const courses = await db.course.findMany({
    where: {
      userId,
    },
  });

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
                  <p className="text-xs text-slate-700 dark:text-muted-foreground">
                    {course.description}
                  </p>
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
