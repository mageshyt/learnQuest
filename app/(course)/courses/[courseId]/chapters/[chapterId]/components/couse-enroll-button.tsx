import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib";
import React from "react";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}
export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  return (
    <Button className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
