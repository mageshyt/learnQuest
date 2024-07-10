"use client";

import { deleteCourse } from "@/actions/courses/delete-course";
import { publishCourse } from "@/actions/courses/publish-course";
import { Button } from "@/components/ui/button";
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
  const router = useRouter();
  const { openModal } = useModal();

  //   ---------------------------------------functions---------------------------------------

  const handleDelete = async () => {
    try {
      const res = await deleteCourse(courseId);
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
      // publish chapter
      const res = await publishCourse(courseId, !isPublished);
      //   if ("error" in res) {
      //     toast.error(res.error);
      //   }

      toast.success("Chapter published successfully");
      router.refresh();

      // show
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        size="sm"
        disabled={disabled}
        variant={"outline"}
        onClick={handlePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button
        size="sm"
        onClick={() =>
          openModal("confirmation-model", {
            confirmText: "Course",
            handleConfirm: handleDelete,
          })
        }
      >
        <Trash />
      </Button>
    </div>
  );
};

export default CourseActions;
