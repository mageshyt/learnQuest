"use client";

import { deleteCourse } from "@/actions/courses/delete-course";
import { toggleCoursePublishStatus } from "@/actions/courses/toogle-publish-course";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseActions: FC<CourseActionsProps> = ({
  disabled,
  courseId,
  isPublished,
}) => {
  // ---------------------------------------hooks---------------------------------------
  const router = useRouter();
  const { openModal } = useModal();
  const { toggleConfetti } = useConfettiStore();

  //  ---------------------------------------states---------------------------------------

  const [loading, setLoading] = React.useState(false);

  //   ---------------------------------------functions---------------------------------------

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteCourse(courseId);
      if ("error" in res) {
        toast.error(res.error);
      }
      toast.success("Chapter deleted successfully");
      router.push(`/dashboard/teacher/courses/${courseId}/`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      // publish chapter
      const res = await toggleCoursePublishStatus(courseId, !isPublished);
      if ("error" in res) {
        toast.error(res.error);
      }
      if (!isPublished) {
        toggleConfetti();
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
        size="sm"
        loading={loading}
        disabled={disabled || loading}
        variant={"outline"}
        onClick={handlePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </LoadingButton>

      <Button
        size="sm"
        onClick={() =>
          openModal("confirmation-model", {
            confirmText: "Course",
            handleConfirm: handleDelete,
          })
        }
        disabled={loading }
      >
        <Trash />
      </Button>
    </div>
  );
};

export default CourseActions;
