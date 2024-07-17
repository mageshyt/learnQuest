import { FC } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

interface StatCardProps {
  iconSrc: string;
  title: string;
  value: string | number;
}

export const StatCard: FC<StatCardProps> = ({ iconSrc, title, value }) => {
  return (
    <Card className=" rounded-md ">
      <CardContent className="flex items-center justify-between   p-4">
        {/* Icon image*/}
        <div className="rounded-xl bg-slate-200 p-2">
          <Image
            height={56}
            width={56}
            src={iconSrc}
            alt={title}
            className="h-14 w-14  object-cover"
          />
        </div>
        {/* details */}
        <div>
          <CardTitle className="text-xs font-normal text-gray-500">
            {title}
          </CardTitle>
          <CardDescription className="text-black mt-1 text-right text-lg font-semibold">
            {value}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
