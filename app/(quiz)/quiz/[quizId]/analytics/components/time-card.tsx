import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const TimeCard = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Time</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div className="flex items-center justify-between">
            <span>Start</span>
            <span>10:00</span>
          </div>
          <div className="flex items-center justify-between">
            <span>End</span>
            <span>10:30</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Duration</span>
            <span>30 mins</span>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <span>Average Time</span>
          <span>2 mins</span>
        </div>
      </CardFooter>
    </Card>
  );
};
