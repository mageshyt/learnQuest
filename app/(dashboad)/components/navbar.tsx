import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "./navbar-routes";
import UserProfile from "@/components/global/user-profile";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 border-b h-full ">
      <MobileSidebar />
      <NavbarRoutes />
      <UserProfile />
    </div>
  );
};

export default Navbar;
