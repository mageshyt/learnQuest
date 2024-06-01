import tw from "tailwind-styled-components";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      {/* navbar */}
      <div className="fixed inset-y-0 z-50 h-[80px] w-full dark:bg-neutral-950 bg-white md:pl-64">
        <Navbar />
      </div>
      {/* sidebar */}
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      {/* content */}

      <main className="h-full pt-[80px] md:pl-64 ">{children}</main>
    </Wrapper>
  );
};

export default DashboardLayout;

const Wrapper = tw.div`h-full`;

const SidebarWrapper = tw.div`fixed inset-y-0 z-50 hidden h-full w-64 flex-col md:flex `;
