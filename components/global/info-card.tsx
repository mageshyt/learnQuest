import React from "react";
import { LucideIcon } from "lucide-react";
import { IconBadge } from "./icon-badge";

interface InfoCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  label: string;
}
const InfoCard = ({ title, count, icon: Icon, label }: InfoCardProps) => {
  return (
    <div className="border dark:bg-neutral-900 shadow-sm p-3 rounded-md flex items-center gap-x-4">
      <Icon />

      <div>
        <p className={`text-lg  `}>{title}</p>
        <p className="text-gray-500 text-sm">
          {count} {label}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
