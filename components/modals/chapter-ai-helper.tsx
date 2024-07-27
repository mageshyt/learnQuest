"use client";
import React, { FC } from "react";
import {
  CustomModal,
  CustomModalBody,
  CustomModalContent,
  CustomModalFooter,
  CustomModalHeader,
  CustomModalTitle,
  CustomModalTrigger,
  CustomModalClose,
} from "@/components/global/custom-modal";
import { Button } from "../ui/button";
import { Sparkle } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { useChatStore } from "@/hooks/use-chat-store";

export const ChapterAiHelperModal = () => {
  const { data, isOpen, onClose, type } = useModal();
  const { getChapterHistory, getChapterDetails } = useChatStore();

  const isModelOpen = type === "chapter-ai-helper";

  const { chapterId } = data;

  // get the transcript
  const chapterDetails = getChapterDetails(chapterId!);

  return (
    <CustomModal open={isModelOpen} onOpenChange={onClose}>
      <CustomModalContent>
        <CustomModalHeader>
          <CustomModalTitle>Chapter Description Helper</CustomModalTitle>
        </CustomModalHeader>

        <CustomModalBody className="gap-4">
          {/* button */}
          <p>{chapterDetails?.transcript}</p>
        </CustomModalBody>

        <CustomModalFooter>
          <CustomModalClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </CustomModalClose>
        </CustomModalFooter>
      </CustomModalContent>
    </CustomModal>
  );
};
