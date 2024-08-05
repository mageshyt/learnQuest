"use client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib";
import { useKey, useMedia } from "react-use";
import React from "react";
import { quizStatusType } from "@/types/typings";
import { CheckCircle, XCircle } from "lucide-react";

interface FooterProps {
  onCheck: () => void;
  status: quizStatusType;
  disabled?: boolean;
  quizId: string;
  showAnalytics: () => void;
}
const QuizFooter = ({
  status,
  onCheck,
  disabled,
  quizId,
  showAnalytics,
}: FooterProps) => {
  const isMobile = useMedia("(max-width: 640px)");
  useKey("Enter", onCheck, {}, [status]);
  return (
    <div
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "bg-green-100 border-transparent",
        status === "wrong" && "bg-rose-100 border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-4">
        {/* ------------------------------ correct------------------- */}
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="size-6 lg:size-10 mr-4" />
            Nicely done !
          </div>
        )}

        {/* ------------------------------ wrong------------------- */}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="size-6 lg:size-10 mr-4" />
            Try again.
          </div>
        )}

        {/* ------------------------------ completed------------------- */}
        {status === "completed" && (
          <AnimatedButton
            variant={"outline"}
            size={isMobile ? "sm" : "lg"}
            onClick={showAnalytics}
          >
            See Analytics
          </AnimatedButton>
        )}
        <AnimatedButton
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </AnimatedButton>
      </div>
    </div>
  );
};

export default QuizFooter;
