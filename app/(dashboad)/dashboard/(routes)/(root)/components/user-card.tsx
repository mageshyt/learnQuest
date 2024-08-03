import UserAvatar from "@/components/global/user-avatar";
import { Button } from "@/components/ui/button";
import {
  calculateProgress,
  getHundreds,
  removeHundreds,
} from "@/lib/common/user";
import { User } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import React from "react";

interface UserCardProps {
  user: User;
}
export const UserCard = ({ user }: UserCardProps) => {

  const xp = (user?.publicMetadata.xp as number) || 0;

  return (
    <div className="p-6 border-b gap-2 xl:gap-0 flex flex-col xl:flex-row">
      <div className="flex items-center flex-[2] gap-4">
        {/* <div className="size-16 lg:size-24 min-w-fit min-h-fit    sm:size-20  "> */}
        <UserAvatar
          imageUrl={""}
          alt={user?.fullName || "User"}
          className="rounded-full text-white text-3xl lg:size-24 size-16 sm:size-20"
          fallback={user?.fullName?.slice(0, 1)}
        />
        {/* </div> */}

        <div className="flex flex-col gap-4 w-full ml-2 pr-6">
          <h1 className="font-bold sm:text-xl lg:text-3xl capitalize">
            {user?.fullName}
          </h1>

          {/* progress */}
          <div className="flex flex-col gap-1">
            <div className="h-2 rounded-full w-full bg-emerald-300/25">
              <div
                className="h-2 rounded-full bg-emerald-400"
                style={{
                  width: `${calculateProgress(removeHundreds(xp), 100)}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <button>{`${xp} `}XP</button>
              <span className="text-muted-foreground">
                {getHundreds(xp) + 100} XP
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* exp card */}

      <div className="flex flex-col flex-[1] gap-4 items-center ">
        <Button
          className="w-full rounded-xl p-6 bg-transparent border-border  hover:!scale-[1.01]"
          variant={"outline"}
        >
          Earn 10 XP for watching one chapter
          <ArrowRight className="hidden sm:block ml-auto size-4" />
        </Button>
        <Button
          className="w-full rounded-xl p-6 bg-transparent border-border hover:!scale-[1.01] animate-pulse cursor-not-allowed"
          disabled
          variant={"outline"}
        >
          Earn 50 XP for solving a Quiz
          <ArrowRight className="hidden sm:block size-4 ml-auto" />
        </Button>
      </div>
    </div>
  );
};
