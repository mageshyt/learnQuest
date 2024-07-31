import { cn } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { Nunito } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";

const font = Nunito({
  subsets: ["latin"],
  adjustFontFallback: true,
});

const QuizLayout = ({ children }: { children: React.ReactNode }) => {
  const {userId}=auth()
  if(!userId){
    return redirect('/')
  }
  return (
    <div className={cn("max-w-6xl mx-auto", font.className)}>{children}</div>
  );
};

export default QuizLayout;
