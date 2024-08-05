"use client";
import React, { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { formatPrice } from "@/lib";
import { LoadingButton } from "@/components/ui/loading-button";
import { useRouter } from "next/navigation";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
  isFree: boolean;
}
export const CourseEnrollButton = ({
  price,
  courseId,
  isFree,
}: CourseEnrollButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      if (isFree) {
        const res = await axios.post(`/api/courses/${courseId}/enroll-free`);
        if (res.data === "Success") {
          toast.success("Successfully Enrolled");
          router.refresh();
        }

        return;
      }

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
    <LoadingButton
      loading={isLoading}
      disabled={isLoading}
      onClick={handlePurchase}
      className="w-full md:w-auto"
    >
      Enroll for {isFree ? "Free" : formatPrice(price)}
    </LoadingButton>
  );
};
