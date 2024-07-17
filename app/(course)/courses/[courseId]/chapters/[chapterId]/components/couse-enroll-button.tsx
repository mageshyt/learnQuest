"use client";
import React, { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}
export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(res.data.url);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={handlePurchase} className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};
