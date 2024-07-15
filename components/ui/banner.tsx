import React, { FC } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { warning } from "framer-motion";
import { cn } from "@/lib";

const bannerVariants = cva(
  "border text-center p-4  text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-200/80 border-emerald-30 text-primary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle,
};

const Banner: FC<BannerProps> = ({ label, variant }) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="w-5 h-5 mr-2" />
      {label}
    </div>
  );
};

export default Banner;
