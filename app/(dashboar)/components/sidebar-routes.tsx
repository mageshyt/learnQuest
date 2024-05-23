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
    href: "/",
  },
  {
    icon: Compass,
    title: "Browse",
    href: "/search",
  },
];

const teachersRoutes = [
  {
    icon: List,
    title: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    title: "Analytics",
    href: "/teacher/analytics",
  },
];
const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const routes = isTeacherPage ? teachersRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full gap-y-4 p-4">
      <ListView items={routes} render={(route) => <SidebarItem {...route} />} />
    </div>
  );
};

export default SidebarRoutes;
