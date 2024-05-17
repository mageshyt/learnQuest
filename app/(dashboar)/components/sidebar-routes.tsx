"use client";
import ListView from "@/components/list-view";
import { Compass, icons, Layout } from "lucide-react";
import Link from "next/link";
import React from "react";
import tw from "tailwind-styled-components";
import SidebarItem from "./sidebar-item";

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
const SidebarRoutes = () => {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full gap-y-4 p-4">
      <ListView items={routes} render={(route) => <SidebarItem {...route} />} />
    </div>
  );
};

export default SidebarRoutes;
