import React from "react";
import Link from "next/link";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib";
import { Button } from "@/components/ui/button";
import ListView from "@/components/global/list-view";

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
      <ListView
        items={courses}
        render={(course) => (
          <div className="flex m-4 gap-4 flex-col">
            <div>
              <h2 className="text-lg font-medium">{course.title}</h2>
              <p className="text-sm text-slate-700 dark:text-muted-foreground">
                {course.description}
              </p>
            </div>
            <Link href={`/dashboard/teacher/courses/${course.id}`}>
              <Button variant={"outline"} size="sm">
                View
              </Button>
            </Link>
          </div>
        )}
      />
      <Link href="/dashboard/teacher/courses/create">
        <Button>New Course</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
