"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PurchaseWithCourse } from "@/actions/dashboard/get-analytics";
import { formatPrice, getSaleHistory } from "@/lib";

const chartConfig = {
  course: {
    label: "Earnings",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface SaleHistoryProps {
  purchases: PurchaseWithCourse[];
}

function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 100; // To handle division by zero
  return ((current - previous) / previous) * 100;
}

export const SaleHistory = ({ purchases }: SaleHistoryProps) => {
  const chartData = getSaleHistory(purchases);

  const currentMonthIndex = new Date().getMonth();
  const previousMonthIndex =
    currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

  const currentMonthEarnings = chartData[currentMonthIndex]?.course || 0;
  const previousMonthEarnings = chartData[previousMonthIndex]?.course || 0;

  const percentageChange = calculatePercentageChange(
    currentMonthEarnings,
    previousMonthEarnings
  );
  const isTrendingUp = percentageChange >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Monthly Earnings</CardTitle>
        <CardDescription>
          Showing total earnings for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" isPrice />}
            />
            <Area
              dataKey="course"
              type="natural"
              fill="var(--color-course)"
              fillOpacity={0.4}
              stroke="var(--color-course)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {isTrendingUp ? "Trending up" : "Trending down"} by{" "}
              {Math.abs(percentageChange).toFixed(1)}% this month
              {isTrendingUp ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - December 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
