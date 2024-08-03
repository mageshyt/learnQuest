import React from "react";
import tw from "tailwind-styled-components";
import { Header } from "./components/header";

const QuizAnalyticsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <div className="fixed inset-y-0 z-50 h-[80px] w-full dark:bg-neutral-950 bg-white ">
        <Header />
      </div>
      <main className="h-full pt-[80px]  overflow-y-auto">{children}</main>
      {/* footer */}
    </Wrapper>
  );
};

export default QuizAnalyticsLayout;
const Wrapper = tw.div` h-full bg-white dark:bg-neutral-950`;
