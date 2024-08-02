import tw from "tailwind-styled-components";
import React from "react";
import Logo from "@/components/global/logo";
import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import { Settings } from "lucide-react";
import { SidebarSettings } from "./sidebar-settings";

const Sidebar = () => {
  return (
    <Wrapper>
      <div className="h-[80px]  p-6 md:border-b ">
        <Link href="/dashboard">
          <Logo height={150} width={180} />
        </Link>
      </div>

      <Routes>
        <SidebarRoutes />
      </Routes>

      {/* setting */}
      <SettingWrapper>
        <SidebarSettings />
      </SettingWrapper>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = tw.div`h-full border-r flex flex-col overflow-y-auto  shadow-sm  relative`;

const Routes = tw.div`flex flex-col w-full`;

const SettingWrapper = tw.div`absolute bottom-0 w-full p-4`;
