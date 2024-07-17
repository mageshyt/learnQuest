"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const progressVariants = cva("h-full w-full flex-1 bg-primary transition-all", {
  variants: {
    variants: {
      default: "bg-sky-600",
      success: "bg-emerald-700",
    },
  },
  defaultVariants: {
    variants: "default",
  },
});

export interface progressProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {}

type CombinedProgressProps = progressProps &
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>;

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CombinedProgressProps
>(({ className, value, variants, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      " relative rounded-full  w-full overflow-hidden bg-secondary h-4",

      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 bg-secondary  transition-all",    progressVariants({ variants }),)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
