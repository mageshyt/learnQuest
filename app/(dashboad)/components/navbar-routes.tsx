"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/dashboard">
          <Button size="sm" variant="ghost">
            <LogOut className="iconsmleft" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/dashboard/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher Mode
          </Button>
        </Link>
      )}

      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
};

export default NavbarRoutes;
