import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { timeFormat } from "@/lib";
import { Timer } from "lucide-react";

interface TimeCardProps {
  startTime: Date | null;
  endTime: Date | null;
  totalQuestions: number; // Total number of questions answered
}

export const TimeCard = ({
  startTime,
  endTime,
  totalQuestions,
}: TimeCardProps) => {
  if (!startTime || !endTime || totalQuestions === 0) return null;

  const start = startTime.getTime();
  const end = endTime.getTime();

  const duration = end - start;
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);

  // Calculate the average time per question
  const averageTimeInSeconds = totalQuestions
    ? duration / totalQuestions / 1000
    : 0;
  const avgMinutes = Math.floor(averageTimeInSeconds / 60);
  const avgSeconds = Math.floor(averageTimeInSeconds % 60);

  return (
    <Card className="md:col-span-4  col-span-7">
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle className="md:text-2xl text-xl font-bold text-gray-800 dark:text-gray-200">
          Time Analysis
        </CardTitle>
        <Timer className="text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <CardDescription className="space-y-2">
          <div className="flex items-center justify-between text-sm md:text-base text-gray-600 dark:text-gray-300">
            <span>Start</span>
            <span>{timeFormat(startTime)}</span>
          </div>
          <div className="flex items-center justify-between text-sm md:text-base text-gray-600 dark:text-gray-300">
            <span>End</span>
            <span>{timeFormat(endTime)}</span>
          </div>
          <div className="flex items-center justify-between text-sm md:text-base text-gray-600 dark:text-gray-300">
            <span>Duration</span>
            <span>
              {minutes > 0 ? `${minutes} mins` : ""}
              {seconds} secs
            </span>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200">
        <span>Average Time</span>
        <span>
          {avgMinutes > 0 ? `${avgMinutes} mins` : ""}
          {avgSeconds} secs
        </span>
      </CardFooter>
    </Card>
  );
};
