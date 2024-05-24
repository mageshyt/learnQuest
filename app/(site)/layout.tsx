import React from "react";
import Navbar from "./components/navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full bg-neutral-950 ">
      {/* navbar */}
      <Navbar />
      {children}
    </div>
  );
};

export default LandingPageLayout;
