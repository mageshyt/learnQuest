import { getDashboardCourses } from "@/actions/dashboard/get-dashboard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Summary } from "./components/summary";
import CoursesList from "@/components/courses/courses-list";
import Heading from "@/components/global/heading";
import { dateFormat } from "@/lib";
import { UserCard } from "./components/user-card";
export default async function Home() {
  const user = await currentUser();

  if (!user) return redirect("/");

  const { completedCourse, coursesInProgress } = await getDashboardCourses(
    user.id
  );

  return (
    <main className="p-4 space-y-4 h-full overflow-y-auto pb-10 container ">
      {/* ---------------------------header--------------------------- */}
      <div className="  mb-6 ">
        <Heading
          title={`Welcome back ${user.firstName?.charAt(0)?.toUpperCase()}${user.firstName?.slice(1)}!`}
          isUnderlined={false}
          description={`Take a look your learning progress for Today ${dateFormat(new Date(), "dd MMMM yyyy")}`}
        />
      </div>

      {/*  */}
      <div className="bg-secondary border rounded-3xl overflow-hidden">
        <UserCard user={user} />

        <Summary
          progressCount={coursesInProgress.length}
          completedCount={completedCourse.length}
          points={(user?.publicMetadata?.xp as number) || 0}
        />
      </div>

      <div className="bg-secondary border rounded-3xl overflow-hidden p-5">
        <CoursesList items={[...coursesInProgress, ...completedCourse]} />
      </div>
    </main>
  );
}
