import { IconBadge } from "@/components/global/icon-badge";
import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import {
  CheckCircleIcon,
  DollarSign,
  LayoutDashboard,
  NotebookPen,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./components/title-form";
import DescriptionForm from "./components/description-form";
import ImageForm from "./components/image-form";
import CategoryForm from "./components/category-form";
import PriceForm from "./components/price-form";
import AttachmentForm from "./components/attachment-form";
import ChaptersForm from "./components/chatpers-form";
import { getUserCourseById } from "@/actions/courses/getUserCourseById";
import { Banner } from "@/components/ui/banner";
import CourseActions from "../components/course-action";

const CoursePage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  // TODO: add react tan query
  const { userId } = auth();
  // Redirect if not logged in
  if (!userId) {
    return redirect("/");
  }
  // fetch course data
  const course = await getUserCourseById(params.courseId);

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const normalizedCategories = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  if (!course || "error" in course) {
    return redirect("/dashboard/teacher/courses");
  }

  // ---------------------------------------state---------------------------------------
  const requiredFields = [
    course.title,
    course.description,
    course.courseType,
    course.imageUrl,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished == true),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isComplete = requiredFields.every(Boolean);

  // ---------------------------------------render---------------------------------------

  const completionText = ` ${completedFields}/${totalFields}`;
  return (
    <>
      <div className="p-4 h-full bg-white dark:bg-neutral-950">
        {!course.isPublished && (
          <Banner
            label="Please complete all fields to continue"
            variant="warning"
          />
        )}

        <div className="flex items-center justify-between">
          {/* ----------------header------------------ */}
          <div className="flex flex-col gap-y-3">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-700 dark:text-muted-foreground">
              complete all field
              {completionText}
            </span>
          </div>
          {/* ----------------header------------------ */}
          <CourseActions
            disabled={!isComplete}
            courseId={course.id}
            isPublished={course.isPublished}
          />
        </div>

        {/* ------------form section------------- */}

        <div className="mt-16  grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Course Setup */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} variant={"primary"} />
              <h2 className="text-xl font-semibold">Customize Your Course</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />

            <DescriptionForm initialData={course} courseId={course.id} />

            <ImageForm initialData={course} courseId={course.id} />

            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={normalizedCategories}
            />
          </div>
          <div className="space-y-6 ">
            {/* ------------------------------------ chapters--------------------- */}
            <div className="">
              <div className="flex items-center gap-x-2  ">
                <IconBadge icon={CheckCircleIcon} variant={"primary"} />
                <h2 className="text-xl font-semibold">Course Chapter</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            {/* -------------------------------------- pricing-------------- */}
            <div>
              <div className="flex items-center gap-x-2  ">
                <IconBadge icon={DollarSign} variant={"primary"} />
                <h2 className="text-xl font-semibold">
                  Course Pricing & Options
                </h2>
              </div>

              <PriceForm initialData={course} courseId={course.id} />
            </div>

            {/*  Resources of the course*/}
            <div>
              <div className="flex items-center gap-x-2  ">
                <IconBadge icon={NotebookPen} variant={"primary"} />
                <h2 className="text-xl font-semibold">
                  Resources & Attachments
                </h2>
              </div>

              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
