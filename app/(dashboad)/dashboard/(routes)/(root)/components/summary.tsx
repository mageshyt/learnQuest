import React from "react";

import { DashboardCardWrapper } from "@/components/global/dashboard-card-wrapper";
import InfoCard from "@/components/global/info-card";
import {
  CheckCheck,
  CheckCircle,
  Clock,
  Clock1,
  ClockIcon,
} from "lucide-react";

interface SummaryProps {
  progressCount: number;
  completedCount: number;
}
export const Summary = ({ progressCount, completedCount }: SummaryProps) => {
  return (
    <DashboardCardWrapper title="Summary">
      <section className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 ">
        <InfoCard title="Progress" count={progressCount} icon={ClockIcon} />

        <InfoCard
          title="Completed"
          count={completedCount}
          icon={CheckCircle}
          variant="primary"
        />

        {/* TODO:WORK shop */}

        {/* <InfoCard title="WorkShop" count={0} icon={Clock} /> */}
      </section>
    </DashboardCardWrapper>
  );
};
