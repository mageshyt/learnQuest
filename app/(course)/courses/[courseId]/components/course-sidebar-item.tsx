"use client";
import { cn } from "@/lib";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";
import { RiFolderVideoLine } from "react-icons/ri";

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
  const isActive = pathname.includes(id);
  // if locked show lock icon else show check circle icon if completed else show play circle icon
  const Icon = isLocked
    ? Lock
    : isCompleted
      ? CheckCircle
      : isActive
        ? PlayCircle
        : RiFolderVideoLine;

  // ------------------------functions---------------------
  const handleClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 justify-start cursor-pointer  w-[calc(100%-24px)] mx-3  dark:text-slate-200 text-slate-500 font-[500]  p-2 transition-all hover:bg-slate-200/20 hover:text-slate-600 rounded-xl",
        isActive &&
          "text-slate-700 dark:text-slate-200 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && isActive && " bg-emerald-200/40 hover:bg-emerald-200/20 "
      )}
    >
      <Icon
        className={cn(
          "transition-all text-slate-500 dark:text-slate-200 size-5",
          isActive && "text-slate-700 dark:text-slate-200",
          isCompleted && "text-emerald-700"
        )}
      />

      <span
        className={cn(
          "text-sm text-break text-start w-[250px] ",
          isActive && "text-slate-700 dark:text-slate-200",
          isCompleted && "text-emerald-600 "
        )}
      >
        {label}
      </span>
    </button>
  );
};
