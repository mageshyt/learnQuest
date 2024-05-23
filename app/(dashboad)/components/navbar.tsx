import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "./navbar-routes";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 border-b h-full shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
