import React from "react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getChapterById } from "@/actions/courses/chapters/getChapterById";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/global/icon-badge";
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

  const requiredFields = [chapter.title, chapter.isPublished, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  //---------------------------------------messages---------------------------------------
  const completedMessage = `You have completed ${completedFields} out of ${totalFields} fields`;

  return (
    <div className="p-6">
      {/* ------------------------- Top Area------------------------------ */}
      <div>
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
  );
};

export default ChapterIdPage;
