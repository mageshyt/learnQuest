"use client";
import { Button } from "@/components/ui/button";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { Brain, File } from "lucide-react";
import React from "react";

interface AiQuestionProps {
  playBackId: string;
  trackId: string;
  assetId: string;
}
export const AiQuestion = ({ playBackId, trackId }: AiQuestionProps) => {
  const getTranscript = async () => {
    const response = await axios.get(
      `https://stream.mux.com/${playBackId}/text/${trackId}.txt`
    );

    console.log(response.data);
  };
  return (
    <Button onClick={getTranscript}>
      <Brain className="h-w w-4 mr-2" />
      AI Question
    </Button>
  );
};
