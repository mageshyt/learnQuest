import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ResultCard = () => {
  return (
    <Card className="col-span-7">
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div className="flex items-center justify-between">
            <span>Score</span>
            <span>10/10</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Time</span>
            <span>10:00</span>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <span>Accuracy</span>
          <span>100%</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResultCard;
