"use client";

import React, { FC } from "react";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  title: string;
  href: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon: Icon, title, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  // ------------------------ handlers------------------------
  const handleClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex rounded-md items-center gap-x-2 text-slate-500  text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          " text-emerald-700 bg-emerald-300/20 hover:bg-emerald-400/20 hover:text-emerald-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-3">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-emerald-700")}
        />
        <span className="font-medium">{title}</span>
      </div>
    </button>
  );
};

export default SidebarItem;
