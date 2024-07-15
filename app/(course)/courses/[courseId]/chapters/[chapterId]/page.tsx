import { getChapterById } from "@/actions/general/get-chapter";
import Banner from "@/components/ui/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./components/video-player";

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

  return (
    <>
      <div className="">
        {userProgress?.isCompleted && (
          <Banner label="You have completed this chapter." variant="success" />
        )}

        {isLocked && (
          <Banner
            label="You need to purchase this course to watch."
            variant="warning"
          />
        )}

        <div className="flex flex-col w-full pb-20">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
