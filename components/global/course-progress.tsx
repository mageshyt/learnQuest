import React from "react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const SizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};
export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-1" value={value} variants={variant} />
      <p
        className={cn(
          "font-medium text-sky-700 mt-2 text-sm",
          colorByVariant[variant || "default"],
          SizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)} % Complete
      </p>
    </div>
  );
};
