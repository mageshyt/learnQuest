import { IconBadge } from "@/components/global/icon-badge";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./components/title-form";

const CoursePage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const { userId } = auth();
  // Redirect if not logged in
  if (!userId) {
    return redirect("/");
  }
  // fetch course data
  const course = await db.course.findFirst({
    where: {
      id: params.courseId,
      userId,
    },
  });

  if (!course) {
    return redirect("/dashboard/teacher/courses");
  }

  // ---------------------------------------state---------------------------------------
  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.imageUrl,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = ` ${completedFields}/${totalFields}`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        {/* ----------------header------------------ */}
        <div className="flex flex-col gap-y-3">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700 dark:text-muted-foreground">
            complete all field
            {completionText}
          </span>
        </div>
      </div>

      {/* ------------form section------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} variant={"success"} />
            <h2 className="text-xl font-semibold">Customize Your Course</h2>
          </div>
          <TitleForm
          initialData={course}
          courseId={course.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
