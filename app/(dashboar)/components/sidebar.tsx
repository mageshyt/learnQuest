import tw from "tailwind-styled-components";
import React from "react";
import Logo from "@/components/logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <Wrapper>
      <div className="p-6">
        <Logo height={150} width={180} />
      </div>

      <Routes>
        <SidebarRoutes />
      </Routes>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = tw.div`h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm `;

const Routes = tw.div`flex flex-col w-full`;
