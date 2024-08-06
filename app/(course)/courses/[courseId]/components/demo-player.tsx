"use client";

import { FC, useState } from "react";

import MuxPlayer from "@mux/mux-player-react";

import { cn } from "@/lib/utils";
import { Loader2, Lock } from "lucide-react";

interface VideoPlayerProps {
  playbackId?: string | null;
  isLocked: boolean;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ playbackId, isLocked }) => {
  // ----------------------------------states----------------------------------
  const [isRead, setIsRead] = useState(false);

  if (!playbackId) return null;
  return (
    <div className="relative aspect-video max-w-7xl  mx-auto  bg-transparent rounded-2xl overflow-hidden">
      {!isRead && !isLocked && (
        <div className="absolute rounded-2xl h-auto inset-0 flex flex-col items-center justify-center bg-slate-800">
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
          className={cn(!isRead && "hidden", "")}
          style={{ background: "white" }}
          onCanPlay={() => setIsRead(true)}
          autoPlay
        />
      )}
    </div>
  );
};
