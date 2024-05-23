import tw from "tailwind-styled-components";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      {/* navbar */}
      <div className="h-[80px] md:pl-64 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      {/* sidebar */}
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      {/* content */}

      <main className="md:pl-64 pt-[80px] h-full">{children}</main>
    </Wrapper>
  );
};

export default DashboardLayout;

const Wrapper = tw.div`h-full`;

const SidebarWrapper = tw.div`hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50 `;
