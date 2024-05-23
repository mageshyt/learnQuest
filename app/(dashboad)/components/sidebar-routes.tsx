"use client";
import ListView from "@/components/list-view";
import { BarChart, Compass, icons, Layout, List } from "lucide-react";
import Link from "next/link";
import React from "react";
import tw from "tailwind-styled-components";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    title: "Browse",
    href: "/dashboard/search",
  },
];

const teachersRoutes = [
  {
    icon: List,
    title: "Courses",
    href: "/dashboard/teacher/courses",
  },
  {
    icon: BarChart,
    title: "Analytics",
    href: "/dashboard/teacher/analytics",
  },
];
const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const routes = isTeacherPage ? teachersRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full gap-y-4 p-4">
      <ListView items={routes} render={(route) => <SidebarItem {...route} />} />
    </div>
  );
};

export default SidebarRoutes;
