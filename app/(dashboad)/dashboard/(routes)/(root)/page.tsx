import { getDashboardCourses } from "@/actions/dashboard/get-dashboard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Summary } from "./components/summary";
import CoursesList from "@/components/courses/courses-list";
export default async function Home() {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { completedCourse, coursesInProgress } =
    await getDashboardCourses(userId);

  return (
    <main className="p-4 space-y-4 h-full overflow-y-auto pb-10 ">
      <Summary
        completedCount={completedCourse.length}
        progressCount={coursesInProgress.length}
      />

      {/* courses */}
      <CoursesList items={[...completedCourse, ...coursesInProgress]} />
    </main>
  );
}
