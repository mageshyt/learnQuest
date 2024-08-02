import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userAnswerType } from "@/types/typings";
import { Target } from "lucide-react";

interface AccuracyCardProps {
  userAnswers: userAnswerType[];
  mistakes: number;
}

const AvgAccuracyCard = ({ userAnswers, mistakes }: AccuracyCardProps) => {
  const correctAnswers = userAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  const totalAnswers = userAnswers.length;
  const accuracy =
    totalAnswers > 0 ? ((correctAnswers / totalAnswers) * 100).toFixed(2) : "0";

  return (
    <Card className="col-span-7 md:col-span-3">
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle className="md:text-2xl text-xl font-bold text-gray-800 dark:text-gray-200">
          Average Accuracy
        </CardTitle>
        <Target className="text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <CardDescription className="space-y-2">
          <div className="flex items-center justify-between text-sm md:text-base text-gray-600 dark:text-gray-300">
            <span>Correct</span>
            <span>{correctAnswers}</span>
          </div>
          <div className="flex items-center justify-between text-sm md:text-base text-gray-600 dark:text-gray-300">
            <span>Incorrect</span>
            <span>{mistakes}</span>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-200">
        <span>Accuracy</span>
        <span>{accuracy}%</span>
      </CardFooter>
    </Card>
  );
};

export default AvgAccuracyCard;
