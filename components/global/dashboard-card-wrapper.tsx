import tw from "tailwind-styled-components";
import React, { FC } from "react";

interface DashboardCardWrapperProps {
  title: string;
  children: React.ReactNode;
}
export const DashboardCardWrapper: FC<DashboardCardWrapperProps> = ({
  children,
  title,
}) => {
  return (
    <Wrapper>
      <HeadingWrapper>
        <div className="h-6 rounded-tr-md     rounded-br-md   bg-emerald-300  w-1"></div>

        <Title>{title}</Title>
      </HeadingWrapper>

      {children}
    </Wrapper>
  );
};

const Wrapper = tw.div`rounded-md bg-white dark:bg-neutral-900`;

const Title = tw.span`text-primary ml-4 text-lg font-semibold`;

const HeadingWrapper = tw.div`pt-4  flex`;
