"use client";

import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import ListView from "@/components/global/list-view";
import { SideBar, SideNavItem } from "@/types/typings";
import { cn } from "@/lib/utils";

// Sidebar component definition
const SidebarItem: FC<SideBar> = ({ title, items }) => {
  return (
    <div className="flex flex-col w-full gap-y-4 p-4">
      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-500 font-semibold ">{title}</div>
      </div>
      <ListView
        items={items}
        render={(item) => <SidebarMenuItems key={item.path} {...item} />}
      />
    </div>
  );
};

// Sidebar menu item component definition
const SidebarMenuItems: FC<SideNavItem> = ({
  title,
  path,
  icon: Icon,
  submenu,
  subMenuItems,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the submenu open state
  const toggle = () => setIsOpen(!isOpen);

  // Handle menu item click
  const handleItemClick = () => {
    if (!submenu) {
      router.push("/dashboard" + path);
    } else {
      toggle();
    }
  };

  // Determine if the menu item is active
  const isActive =
    pathname === path ||
    (pathname === "/dashboard" && path === "/") ||
    pathname === "/dashboard" + path;

  return (
    <div className="relative gap-4">
      {/* Menu item */}
      <div
        onClick={handleItemClick}
        className={cn(
          "flex items-center py-3 px-4 gap-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700/30 w-full justify-between cursor-pointer",
          isActive ? "bg-gray-100 dark:bg-neutral-800" : ""
        )}
      >
        {/* Menu title */}
        <div className="flex gap-4 w-full items-center">
          {Icon && (
            <Icon
              className={cn(
                "size-5 text-muted-foreground",
                isActive ? "text-slate-700 dark:text-slate-50" : ""
              )}
            />
          )}
          <span
            className={cn(
              "text-muted-foreground text-sm",
              isActive ? "text-slate-700 dark:text-slate-50" : ""
            )}
          >
            {title}
          </span>
        </div>
        {submenu && (
          <div>
            <ChevronRightIcon
              className={cn(
                "transition-transform text-gray-500 duration-300 h-4 w-4",
                isOpen ? "transform rotate-90" : ""
              )}
            />
          </div>
        )}
      </div>

      {/* Dropdown menu */}
      {submenu && subMenuItems && (
        <div
          className={cn(
            "transition-all duration-300 transform ml-8",
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <ListView
            items={subMenuItems}
            render={(item) => (
              <div
                key={item.path}
                className="py-2 px-4 cursor-pointer border-l-2 border-dashed border-gray-200"
                onClick={() => router.push("/dashboard" + path + item.path)}
              >
                <div className="flex items-center">
                  <div className="border-b-2 border-dashed border-gray-200 w-6 h-[1px] -ml-4 mr-1"></div>
                  <div className="text-sm  hover:opacity-65 transition  ">
                    {item.title}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
