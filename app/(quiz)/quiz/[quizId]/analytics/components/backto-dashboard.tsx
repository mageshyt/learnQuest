"use client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Layout } from "lucide-react";
import Link from "next/link";
import React from "react";

export const BackToDashboard = () => {
  return (
    <Link href="/dashboard">
      <AnimatedButton variant={"default"}>
        <div className="flex items-center space-x-2">
          <Layout size={24} />
          <span>Back to Dashboard</span>
        </div>
      </AnimatedButton>
    </Link>
  );
};
