"use client";
import { cn } from "@/lib";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}
export const CourseSidebarItem: FC<CourseSidebarItemProps> = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}) => {
  // ------------------------hooks---------------------
  const pathname = usePathname();
  const router = useRouter();

  // ------------------------state---------------------
  // if locked show lock icon else show check circle icon if completed else show play circle icon
  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname.includes(id);

  // ------------------------functions---------------------
  const handleClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 dark:text-slate-200 text-slate-500 font-[500] pl-6 transition-all hover:bg-slate-200/20 hover:text-slate-600",
        isActive &&
          "text-slate-700 dark:text-slate-200 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && isActive && "text-emerald-500 hover:text-emerald-600"
      )}
    >
      <div className="flex gap-2 py-4 items-center">
        <Icon
          size={22}
          className={cn(
            "transition-all text-slate-500 dark:text-slate-200",
            isCompleted && "text-emerald-500",
            isActive && "text-slate-700 dark:text-slate-200"
          )}
        />
        {label}
      </div>

      {/* indicator */}
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100 dark:text-slate-200",
          isCompleted && "border-emerald-500"
        )}
      ></div>
    </button>
  );
};
