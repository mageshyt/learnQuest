import tw from "tailwind-styled-components";
import Sidebar from "./components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      {/* sidebar */}
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      {/* content */}

      <main className="md:pl-64 h-full">{children}</main>
    </Wrapper>
  );
};

export default DashboardLayout;

const Wrapper = tw.div`h-full`;

const SidebarWrapper = tw.div`hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50`;
