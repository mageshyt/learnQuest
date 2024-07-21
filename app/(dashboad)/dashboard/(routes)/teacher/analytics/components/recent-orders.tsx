import { getRecentOrders } from "@/actions/dashboard/get-recent-orders";
import { DashboardCardWrapper } from "@/components/global/dashboard-card-wrapper";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns-orders";

const RecentOrders = async () => {
  const recentOrders = await getRecentOrders();
  return (
    <div>
      <DashboardCardWrapper title="Recent Orders">
        <DataTable data={recentOrders} columns={columns} />
      </DashboardCardWrapper>
    </div>
  );
};

export default RecentOrders;
