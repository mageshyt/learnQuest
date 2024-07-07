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

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-4 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/dashboard">
          <Button size="sm" variant="ghost">
            <LogOut className="iconsmright" />
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
      <div className="">
        <UserButton afterSignOutUrl="/" />
      </div>
      <ModeToggle />
    </div>
  );
};

export default NavbarRoutes;
