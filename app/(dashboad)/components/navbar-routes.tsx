"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth, UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import Searchbar from "./searchbar";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/actions/user/get-user-details";
import { userInRole } from "@/lib";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname?.includes("/search");

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetails(userId!),
  });

  if (isLoading) {
    return null;
  }

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
        ) : (
          userInRole({
            user_role: user?.role || "USER",
            roles: ["ADMIN", "TEACHER"],
          }) && (
            <Link href="/dashboard/teacher/courses">
              <Button size="sm" variant="ghost">
                Teacher Mode
              </Button>
            </Link>
          )
        )}

        <div className="">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default NavbarRoutes;
