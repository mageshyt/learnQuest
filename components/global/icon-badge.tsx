import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

const backgroundVariant = cva("rounded-full flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-sky-100",
      primary: "bg-emerald-100",
    },
    iconVariant: {
      default: "text-sky-600",
      primary: "text-emerald-500",
    },

    size: {
      default: "p-2 w-12 h-12",
      sm: "p-1 w-8 h-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    iconVariant: "default",
  },
});

const iconVariant = cva("", {
  variants: {
    variant: {
      default: "text-sky-600",
      primary: "text-emerald-500",
    },
    size: {
      default: "w-8 w-8",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariant>;
type IconVariantsProps = VariantProps<typeof iconVariant>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
  className?: string;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  icon: Icon,
  className,
  size,
  variant,
}) => {
  return (
    <div className={cn(backgroundVariant({ size, variant }), className)}>
      <Icon className={iconVariant({  variant,size })} />
    </div>
  );
};
