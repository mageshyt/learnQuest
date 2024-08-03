import { currentUser } from "@clerk/nextjs/server";

import UserAvatar from "./user-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CreditCard, Home, Layout, LogOut, Settings } from "lucide-react";
import { truncate } from "@/lib";
import { SignOutButton } from "@clerk/nextjs";

const UserProfile = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center space-x-2">
      {/* user name */}
      <div className="text-sm font-semibold sr-only  text-neutral-900 dark:text-neutral-100">
        {truncate(user?.fullName || "", 18)}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* user image */}
          <div className="text-primary-foreground relative bg-accent p-1 border border-accent rounded-full z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-zinc-300 after:transition-transform after:duration-1000  hover:after:translate-x-[0%] hover:after:translate-y-[0%]">
            <UserAvatar
              alt="User Avatar"
              imageUrl={user?.imageUrl}
              fallback={user?.fullName?.slice(0, 1) || "T"}
              className="w-10 h-10 cursor-pointer "
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {/* user name and email */}
            <div className="text-sm  font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              {user?.fullName}
            </div>

            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={"/dashboard"} className="flex gap-x-2">
              <Home size={16} />
              Home
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={"/dashboard/settings"} className="flex gap-x-2">
              <Settings size={16} />
              settings
            </Link>
          </DropdownMenuItem>

          {/*  if teacher then have option to navigate */}
          {user?.publicMetadata?.role === "TEACHER" && (
            <DropdownMenuItem asChild>
              <Link
                href={"/dashboard/teacher/courses"}
                className="flex gap-x-2"
              >
                <Layout size={16} />
                Teacher Dashboard
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="flex gap-x-2" disabled>
            <CreditCard size={16} />
            Billings & Subscription
          </DropdownMenuItem>

          {/* logout */}
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <SignOutButton>
              <div>
                <LogOut size={16} className="mr-2" />
                Logout
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
