"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const SidebarSettings = () => {
  const pathname = usePathname();

  // Handle menu item click

  // Determine if the menu item is active
  const isActive = pathname.includes("/settings");

  return (
    <Button
      asChild
      variant={"ghost"}
      size={"lg"}
      className={cn(
        "flex items-center justify-start w-full gap-x-3 px-4 py-2 text-muted-foreground text-sm rounded-xl overflow-hidden font-[500] transition-all duration-300  hover:scale-1 group",
        isActive
          ? "text-primary opacity-100 bg-accent hover:bg-primary/10 hover:text-primary"
          : ""
      )}
    >
      <Link href={"/dashboard/settings"}>
        <span
          className={cn(
            "p-[6px] rounded-[6px] transition-all duration-300",
            isActive
              ? " text-primary"
              : "bg-accent text-muted-foreground group-hover:text-foreground"
          )}
        >
          <Settings className="w-5 h-5" />
        </span>
        Settings
      </Link>
    </Button>
  );
};
