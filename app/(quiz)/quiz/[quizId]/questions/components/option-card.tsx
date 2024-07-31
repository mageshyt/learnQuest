import { cn } from "@/lib";
import { quizStatusType } from "@/types/typings";
import React from "react";
import { useKey } from "react-use";

interface OptionCardProps {
  id: number;
  text: string;
  shortcut: string;
  selected: boolean;
  onClick: () => void;
  status: quizStatusType;
  disabled?: boolean;
}
const OptionCard = ({
  id,
  text,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
}: OptionCardProps) => {
  return (
    useKey(shortcut, () => {
      if (!disabled) onClick();
    }),
    (
      <button
        onClick={() => {
          if (!disabled) onClick();
        }}
        className={cn(
          "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 cursor-pointer active:border-b-2",
          selected && "border-sky-500 bg-sky-100 hover:bg-sky-100/20",
          selected &&
            status === "correct" &&
            "border-emerald-500 bg-emerald-100 hover:bg-emerald-100",
          selected &&
            status === "wrong" &&
            "border-rose-500 bg-rose-100 hover:bg-rose-100",
          disabled && "cursor-not-allowed hover:bg-white",

          selected &&
            status === "completed" &&
            "border-emerald-500 bg-emerald-100 hover:bg-emerald-100"
        )}
      >
        {/* ------------------------------ Option Text ------------------- */}
        <div className="flex items-center justify-between ">
          <p
            className={cn(
              "text-neutral-600 text-sm lg:text-base",
              selected && "text-sky-500 ",
              selected && status == "completed" && "text-emerald-500",
              selected && status === "correct" && "text-emerald-500",
              selected && status === "wrong" && "text-rose-500",
              disabled && ""
            )}
          >
            {text}
          </p>

          {/* ------------------------------ Option Shortcut ------------------- */}

          <div
            className={cn(
              "lg:size-[30px] size-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
              selected && "text-sky-500 border-sky-500",
              selected &&
                status === "correct" &&
                "text-emerald-500 border-emerald-500",
              selected && status === "wrong" && "text-rose-500 border-rose-500",
              selected &&
                status == "completed" &&
                "text-emerald-500 border-emerald-500",
              disabled && ""
            )}
          >
            {shortcut}
          </div>
        </div>
      </button>
    )
  );
};

export default OptionCard;
