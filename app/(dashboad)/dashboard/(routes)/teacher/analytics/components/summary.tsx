import React from "react";
import { DashboardCardWrapper } from "@/components/global/dashboard-card-wrapper";
import StatCard from "@/components/global/stat-card";
import { formatPrice } from "@/lib";

interface SummaryProps {
  totalRevenue: number;
  totalSales: number;
  courses: number;
}
const Summary = ({ totalRevenue, totalSales, courses }: SummaryProps) => {
  return (
    <DashboardCardWrapper title="Analytics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          iconSrc="/icons/revenue.png"
        />

        <StatCard
          title="Total Sales"
          value={totalSales}
          iconSrc="/icons/orders.png"
        />

        <StatCard
          title="Total Courses"
          value={courses}
          iconSrc="/icons/badge.png"
        />
      </div>
    </DashboardCardWrapper>
  );
};

export default Summary;
