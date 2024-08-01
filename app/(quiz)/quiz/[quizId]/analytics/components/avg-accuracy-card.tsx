import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const AvgAccuracyCard = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Average Accuracy</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div className="flex items-center justify-between">
            <span>Correct</span>
            <span>10</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Incorrect</span>
            <span>0</span>
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
  )
}

export default AvgAccuracyCard