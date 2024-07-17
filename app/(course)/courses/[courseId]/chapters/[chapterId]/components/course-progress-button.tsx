"use client";
import { toggleChapterComplete } from "@/actions/Userprogress/toggle-chapter-complete";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  isCompleted?: boolean;
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
}
export const CourseProgressButton = ({
  isCompleted,
  chapterId,
  courseId,
  nextChapterId,
}: CourseProgressButtonProps) => {
  // ---------------------------hooks-----------------------------------
  const confetti = useConfettiStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    try {
      startTransition(async () => {
        // update progress
        const res = await toggleChapterComplete({
          chapterId,
          courseId,
          isCompleted: !isCompleted,
        });
        if ("error" in res) {
          toast.error(res.error);

          return;
        }

        // if we reach the end of the course
        if (!isCompleted && !nextChapterId) {
          confetti.showConfetti();
        }

        // if we reach the end of the course

        if (nextChapterId && !isCompleted) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
        toast.success("Progress updated");
        router.refresh();
      });
    } catch (error) {
      toast.error("Failed to update progress");
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <LoadingButton
      loading={isPending}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      disabled={isPending}
      className="w-full md:w-auto"
      onClick={handleComplete}
    >
      {isCompleted ? "Mark as incomplete" : "Mark as complete"}
      <Icon className="ml-2 h-4 w-4" />
    </LoadingButton>
  );
};
