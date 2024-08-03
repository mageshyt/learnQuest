import Logo from "@/components/global/logo";
import UserProfile from "@/components/global/user-profile";
import React from "react";

export const Header = () => {
  return (
    <div className=" p-4 border-b">
      <div className="flex items-center justify-between md:mx-10">
        {/* logo */}
        <Logo height={140} width={140} />

        {/* User Profile */}

        <UserProfile />
      </div>
    </div>
  );
};
