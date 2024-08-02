import Link from "next/link";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getChapterById } from "@/actions/courses/chapters/getChapterById";
import ChapterActions from "./components/chapter-actions";

import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/global/icon-badge";
import { Banner } from "@/components/ui/banner";

import ChapterTitleForm from "./components/chapter-title-form";
import ChapterDescriptionForm from "./components/chapter-description-form";
import ChapterAccessForm from "./components/chapter-access-form";
import ChapterVideoForm from "./components/chapter-video-form";

const ChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { userId } = auth();
  // Redirect if not logged in
  if (!userId) {
    return redirect("/");
  }

  const chapter = await getChapterById(params.chapterId, params.courseId);
  if (!chapter) {
    // TODO : show error page

    return redirect("/");
  }
  //   ---------------------------------------state---------------------------------------

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = requiredFields.every(Boolean);
  //---------------------------------------messages---------------------------------------
  const completedMessage = `You have completed ${completedFields} out of ${totalFields} fields`;

  return (
    <>
      <div className="p-4 h-full bg-white dark:bg-neutral-950">
        {!chapter.isPublished && (
          <Banner
            label="This chapter is not published yet. It will not be accessible to students."
            variant="warning"
          />
        )}

        {/* ------------------------- Top Area------------------------------ */}
        <div className="flex items-center justify-between">
          <div className="w-full">
            {/* ------------------------- back button----------------------- */}
            <Link
              href={`/dashboard/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm w-fit  transition mb-6 hover:opacity-70"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            {/* header */}
            <div className="flex flex-col  gap-y-2 justify-between">
              <h1 className="text-2xl font-bold">{chapter.title}</h1>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {completedMessage}
              </span>
            </div>
          </div>
          <ChapterActions
            disabled={!isCompleted}
            courseId={params.courseId}
            chapterId={params.chapterId}
            isPublished={chapter.isPublished}
          />
        </div>

        {/* ------------------------- Main Content------------------------------ */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              {/* CHapter Title */}
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} variant={"primary"} />
                <h2 className="text-xl font-semibold">Chapter Details</h2>
              </div>

              {/* chapter title form */}
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
              />

              {/* editor */}
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
              />
            </div>

            {/* ------------------------- Accessibility------------------------------ */}
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} variant={"primary"} />
                <h2 className="text-xl font-semibold">Access Setting</h2>
              </div>
              {/* editor */}
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} variant={"primary"} />
              <h2 className="text-xl font-semibold">Add a Video </h2>
            </div>
            {/* editor */}
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
