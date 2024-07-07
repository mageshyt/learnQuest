"use client";
import React, { FC } from "react";

import * as z from "zod";

import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Pencil, PlusCircle, VideoIcon } from "lucide-react";

import { Chapter, Course, MuxData } from "@prisma/client";

import { chapterVideoForm, imageUploadSchema } from "@/schema";
import { Button } from "@/components/ui/button";

import { FileUpload } from "@/components/global/file-upload";
import { updateChapter } from "@/actions/courses/chapters/update-chapter";

interface ChapterVideoFormProps {
  initialData: Chapter & {
    muxData?: MuxData | null;
  };
  chapterId: string;
  courseId: string;
}
const ChapterVideoForm: FC<ChapterVideoFormProps> = ({
  initialData,
  courseId,
  chapterId,
}) => {
  // ---------------------------------------hooks---------------------------------------
  const router = useRouter();

  // ---------------------------------------state---------------------------------------
  const [isEditing, setIsEditing] = React.useState(false);

  //   ---------------------------------------handlers---------------------------------------

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = async (data: z.infer<typeof chapterVideoForm>) => {
    try {
      await updateChapter(chapterId, courseId, data);

      router.refresh();
      toggleEdit();
      toast.success("Chapter updated");
    } catch (err) {
      // Handle error
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6   bg-slate-100 dark:bg-neutral-800 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="iconsmright" />
              Add a Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="iconsmright" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60">
            <VideoIcon className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData.muxData?.playbackId || ""} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChanges={(url) => {
              if (url) {
                handleSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video. Supported formats: MP4, MOV, AVI,
            and
          </div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <span className="text-xs text-muted-foreground mt-4">
          Video can take a few minutes to process, please be patient.
        </span>
      )}
    </div>
  );
};

export default ChapterVideoForm;
