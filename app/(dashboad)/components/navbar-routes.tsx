"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Searchbar from "./searchbar";
// import UserProfile from "@/components/global/user-profile";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname?.includes("/search");

  return (
    <>
      {isSearchPage && (
        <div className="hidden lg:block ">
          <Searchbar />
        </div>
      )}
      <div className="flex gap-4 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="iconsmright" />
              Exit
            </Button>
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default NavbarRoutes;
