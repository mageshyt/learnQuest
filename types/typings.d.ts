import { LucideIcon } from "lucide-react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: LucideIcon;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideBar = {
  title: string;
  items: SideNavItem[];
};
