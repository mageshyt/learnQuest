import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const NavbarRoutes = () => {
  return (
    <div className="flex gap-x-2 ml-auto">
      <UserButton />
      <ModeToggle />
    </div>
  );
};

export default NavbarRoutes;
