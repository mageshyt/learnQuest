import React from "react";
import Navbar from "./components/navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      {/* navbar */}
      <Navbar />
      {children}
    </div>
  );
};

export default LandingPageLayout;
