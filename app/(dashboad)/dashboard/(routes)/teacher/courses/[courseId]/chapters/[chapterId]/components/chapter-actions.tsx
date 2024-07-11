"use client";

import { deleteChapter } from "@/actions/courses/chapters/delete-chapter";
import { publishChapter } from "@/actions/courses/chapters/publish-chapter";
import { updateChapter } from "@/actions/courses/chapters/update-chapter";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useModal } from "@/hooks/use-modal";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  disabled: boolean;
  chapterId: string;
  courseId: string;
  isPublished: boolean;
}

const ChapterActions: FC<ChapterActionsProps> = ({
  disabled,
  chapterId,
  courseId,
  isPublished,
}) => {
  const router = useRouter();
  const { openModal } = useModal();
  const [loading, setLoading] = React.useState(false);

  //   ---------------------------------------functions---------------------------------------

  const handleDelete = async () => {
    try {
      const res = await deleteChapter(courseId, chapterId);
      if ("error" in res) {
        toast.error(res.error);
      }
      toast.success("Chapter deleted successfully");
      router.push(`/dashboard/teacher/courses/${courseId}/`);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      // publish chapter
      const chapter = await publishChapter(chapterId, courseId, !isPublished);
      if ("error" in chapter) {
        toast.error(chapter.error);
      }

      toast.success("Chapter published successfully");
      router.refresh();

      // show
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <LoadingButton
        loading={loading}
        size="sm"
        disabled={disabled}
        variant={"outline"}
        onClick={handlePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </LoadingButton>

      <Button
        size="sm"
        onClick={() =>
          openModal("confirmation-model", {
            confirmText: "chapter",
            handleConfirm: handleDelete,
          })
        }
      >
        <Trash />
      </Button>
    </div>
  );
};

export default ChapterActions;
