"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import MuxPlayer from "@mux/mux-player-react";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Loader2, Lock } from "lucide-react";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId: string;
  isLocked: boolean;
  title: string;

  completeOnEnd: boolean;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
}) => {
  // ----------------------------------hooks----------------------------------
  const { toggleConfetti } = useConfettiStore();
  const router = useRouter();

  // ----------------------------------states----------------------------------
  const [isRead, setIsRead] = useState(false);

  return (
    <div className="relative aspect-video ">
      {!isRead && !isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800">
          <Loader2 className="text-secondary animate-spin " size={32} />
          <p className="text-sm text-secondary">Loading Video</p>
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 gap-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This video is locked. Please purchase the course to unlock.
          </p>
        </div>
      )}

      {!isLocked && playbackId && (
        <MuxPlayer
          playbackId={playbackId}
          className={cn(!isRead && "hidden")}
          onCanPlay={() => setIsRead(true)}
          onEnded={() => {
            console.log("video ended");
            if (completeOnEnd) {
              toggleConfetti();
            }
            if (nextChapterId) {
              router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            } else {
              toast.success("You have completed the course!");
            }
          }}
          autoPlay
        />
      )}
    </div>
  );
};
