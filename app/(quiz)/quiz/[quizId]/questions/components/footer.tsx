"use client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { cn } from "@/lib";
import { useKey,useMedia } from "react-use";
import React from "react";

interface FooterProps {
  onCheck: () => void;
  status: "none" | "completed" | "success" | "error";
  disabled?: boolean;
  quizId: string;
}
const Footer = ({ status, onCheck, disabled, quizId }: FooterProps) => {
  const isMobile = useMedia("(max-width: 640px)");
  useKey("Enter", onCheck);
  return (
    <div
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "completed" && "bg-green-100 border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-4">
        <AnimatedButton
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "completed" ? "primary" : "secondary"}
        >
          {status === "completed" ? "Continue" : "Check"}
        </AnimatedButton>
      </div>
    </div>
  );
};

export default Footer;
