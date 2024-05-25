import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full bg-neutral-950 ">
      {/* navbar */}
      <Navbar />
      {children}

      {/* footer */}
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
