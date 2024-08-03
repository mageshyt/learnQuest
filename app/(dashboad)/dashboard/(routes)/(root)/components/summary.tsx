import React from "react";

import InfoCard from "@/components/global/info-card";
import {
  CheckCircle,
  ClockIcon,
  Star,
} from "lucide-react";

interface SummaryProps {
  progressCount: number;
  completedCount: number;
  points: number;
}
export const Summary = ({
  progressCount,
  completedCount,
  points,
}: SummaryProps) => {
  return (
    <section className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-3 ">
      <InfoCard title="Progress" count={progressCount} icon={ClockIcon}
      label={"progress"}
       />

      <InfoCard title="Completed" count={completedCount} icon={CheckCircle}
      label={completedCount > 1 ? "courses" : "course"}
      />


      <InfoCard title="Points" count={points} icon={Star}
      label={"points"}
       />
    </section>
  );
};
