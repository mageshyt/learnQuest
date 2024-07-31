import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed  disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-primary  border-2 text-primary-foreground border-slate-200  border-b-4 active:border-b-2 hover:bg-primary/90 ",
        outline:
          "bg-white  border-2 text-slate-500  border-slate-00  border-b-4 active:border-b-2 hover:bg-slate-100",
        primary:
          "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-sky-500 hover:bg-slate-100",
        secondary:
          "bg-emerald-500 text-primary-foreground hover:bg-emerald-500/90 border-emerald-600 border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-emerald-500 hover:bg-slate-100",
        danger:
          "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-500 hover:bg-rose-100",
        ghost:
          "bg-transparent text-slate-500 border-transparent hover:bg-slate-100 border-0 ",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9  px-3",
        lg: "h-12  px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, buttonVariants };
