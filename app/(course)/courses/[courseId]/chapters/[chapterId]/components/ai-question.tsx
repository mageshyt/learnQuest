"use client";
import { getVideoTranscription } from "@/actions/general/get-video-transcription";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
import { useModal } from "@/hooks/use-modal";
import { Brain } from "lucide-react";

interface AiQuestionProps {
  playBackId: string;
  trackId: string;
  chapterId: string;
}

export const AiQuestion = ({
  playBackId,
  trackId,
  chapterId,
}: AiQuestionProps) => {
  const { getChapterDetails, createChapter, updateChapterTranscript } =
    useChatStore();

  const chapterDetails = getChapterDetails(chapterId);

  const getTranscript = async () => {
    if (!chapterDetails) {
      const transcript = await getVideoTranscription(playBackId, trackId);
      createChapter(chapterId, transcript);
    } else {
      const oneDayInMillis = 24 * 60 * 60 * 1000;
      const oneDayAgo = new Date().getTime() - oneDayInMillis;

      if (new Date(chapterDetails.createdAt).getTime() < oneDayAgo) {
        const transcript = await getVideoTranscription(playBackId, trackId);
        updateChapterTranscript(chapterId, transcript);
      }
    }

    //  open the modal
    openModal("chapter-ai-helper", {
      chapterId,
    });
  };

  const { openModal } = useModal();

  return (
    <Button variant="outline" onClick={getTranscript}>
      <Brain className="h-w w-4 mr-2" />
      AI Question
    </Button>
  );
};
