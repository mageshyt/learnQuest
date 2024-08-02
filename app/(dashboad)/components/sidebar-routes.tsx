"use client";
import React from "react";

import ListView from "@/components/global/list-view";
import { TEACHER_NAV_ITEM, USER_NAV_ITEM } from "@/lib/constants/constants";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  // console.log("isAdminPage", isAdminPage);
  const routes = isTeacherPage ? TEACHER_NAV_ITEM : USER_NAV_ITEM;
  return (
    <div className="flex flex-col w-full gap-y-4 ">
      <ListView items={routes} render={(route) => <SidebarItem {...route} />} />
    </div>
  );
};

export default SidebarRoutes;
