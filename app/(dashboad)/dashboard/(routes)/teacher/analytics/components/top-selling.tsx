"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { formatPrice } from "@/lib";

const chartConfig = {
  course: {
    label: "course",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface TopSellingProps {
  courses: {
    courseTitle: string;
    earnings: number;
  }[];
}
export const TopSelling = ({ courses }: TopSellingProps) => {
  // Get the top 5 courses
  const topSellingCourses = courses?.slice(0, 5);
  const totalEarnings =
    courses?.reduce((acc, course) => acc + course.earnings, 0) || 0;

  // Get the top-selling course
  const topCourse = topSellingCourses?.[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Courses</CardTitle>
        <CardDescription>
          {courses.length} courses, total earnings: {formatPrice(totalEarnings)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={topSellingCourses}>
            <XAxis dataKey="courseTitle" />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent isPrice indicator="line" />}
            />
            <Bar dataKey="earnings" fill="var(--color-course)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Top-selling course: {topCourse?.courseTitle} -{" "}
          {formatPrice(topCourse?.earnings || 0)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top 5 courses
        </div>
      </CardFooter>
    </Card>
  );
};
