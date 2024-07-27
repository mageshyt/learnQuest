import { getChapterById } from "@/actions/general/get-chapter";
import Banner from "@/components/ui/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./components/video-player";
import { CourseEnrollButton } from "./components/couse-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/global/preview";
import ListView from "@/components/global/list-view";
import { File } from "lucide-react";
import { CourseProgressButton } from "./components/course-progress-button";
import { AiQuestion } from "./components/ai-question";

interface ChapterPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}
const ChapterIdPage = async ({ params }: ChapterPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/dashboard/browse");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    purchase,
    userProgress,
    muxData,
  } = await getChapterById({
    chapterId: params.chapterId,
    courseId: params.courseId,
    userId,
  });

  if (!chapter || !course) {
    return redirect("/dashboard/browse");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  console.log("ChapterIdPage -> completeOnEnd", userProgress);
  return (
    <>
      <div className="  ">
        {userProgress?.isCompleted && (
          <Banner label="You have completed this chapter." variant="success" />
        )}

        {isLocked && (
          <Banner
            label="You need to purchase this course to watch."
            variant="warning"
          />
        )}
        <div className="flex flex-col w-full">
          <div className="p-4">
            <VideoPlayer
              playbackId={muxData?.playbackId!}
              chapterId={chapter.id}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id!}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
            />

            {/* Ai Feature */}
            <AiQuestion
              playBackId={muxData?.playbackId!}
              trackId={muxData?.trackId!}
              assetId={muxData?.assetId!}
            />
          </div>
        </div>

        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {chapter.title}
          </h2>

          {purchase ? (
            <CourseProgressButton
              chapterId={params.chapterId}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          ) : (
            <CourseEnrollButton
              price={course.price!}
              courseId={params.courseId}
            />
          )}
        </div>
        <Separator />

        {/* description preview */}
        <div>
          <Preview value={chapter.description!} />
        </div>
        {!!attachments.length && (
          <>
            <Separator />
            <div className="p-4 space-y-4">
              <ListView
                items={attachments}
                render={(attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-emerald-200 border text-emerald-500 rounded-md hover:underline "
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                )}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChapterIdPage;
