import React from "react";
import { LucideIcon } from "lucide-react";
import { IconBadge } from "./icon-badge";

interface InfoCardProps {
  title: string;
  count: number;
  variant?: "default" | "primary";

  icon: LucideIcon;
}
const InfoCard = ({
  title,
  count,
  icon: Icon,
  variant = "default",
}: InfoCardProps) => {
  return (
    <div className="border shadow-sm p-3 rounded-md flex items-center gap-x-2">
      <IconBadge size={"default"} icon={Icon} variant={variant} />

      <div>
        <p
          className={`text-lg font-semibold text-${variant === "default" ? "sky" : "emerald"}-500`}
        >
          {title}
        </p>
        <p className="text-gray-500 text-sm">
          {count} {count === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
