import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGradeImage } from "@/lib";
import { Award } from "lucide-react";
import Image from "next/image";

interface ResultCardProps {
  score: number;
}

const ResultCard = ({ score }: ResultCardProps) => {
  // calculate the grade

  return (
    <Card className="col-span-7">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
        <CardTitle className="md:text-2xl text-xl  font-bold text-gray-800 dark:text-gray-200">
          Result
        </CardTitle>

        <Award />
      </CardHeader>
      <CardContent>
        <CardDescription>{/* todo */}</CardDescription>

        {/* body */}
        <div className="flex items-center justify-center">
          <Image
            src={getGradeImage(score)}
            alt="result"
            width={140}
            height={140}
          />

          <div className="ml-4">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              {score}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Points</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
