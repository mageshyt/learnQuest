import { PurchaseWithCourse } from "@/actions/dashboard/get-analytics";
import { Purchase } from "@prisma/client";

function getMonthName(monthNumber: number): string {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString("default", { month: "long" });
}

export function getSaleHistory(purchases: PurchaseWithCourse[]) {
  // Initialize all 12 months with earnings set to 0
  const grouped: { [month: string]: number } = {
    "01": 0,
    "02": 0,
    "03": 0,
    "04": 0,
    "05": 0,
    "06": 0,
    "07": 0,
    "08": 0,
    "09": 0,
    "10": 0,
    "11": 0,
    "12": 0,
  };

  // Sum earnings for each month
  purchases.forEach((purchase) => {
    const month = purchase.createdAt.toISOString().slice(5, 7);
    grouped[month] += purchase.course.price!;
  });

  // Transform the grouped data into the desired structure
  const chartData = Object.keys(grouped).map((month) => {
    const monthName = getMonthName(parseInt(month, 10) - 1);
    return {
      month: monthName,
      course: grouped[month],
      // TODO: add work shop revenue
      workshop: 0,
    };
  });

  return chartData;
}
