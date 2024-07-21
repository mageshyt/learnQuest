import { getAnalytics } from "@/actions/dashboard/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Summary from "./components/summary";
import { SaleHistory } from "./components/sale-history";
import { getSaleHistory } from "@/lib";
import { TopSelling } from "./components/top-selling";
import RecentOrders from "./components/recent-orders";
const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales, purchases } =
    await getAnalytics(userId);

  return (
    <div className="p-6  w-full space-y-4">
      {/* summary */}
      <Summary
        totalRevenue={totalRevenue}
        totalSales={totalSales}
        courses={data.length}
      />

      {/* recent orders */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SaleHistory purchases={purchases} />
        <TopSelling courses={data} />
      </div>

      {/* order table  */}

      <RecentOrders  />
    </div>
  );
};

export default AnalyticsPage;
