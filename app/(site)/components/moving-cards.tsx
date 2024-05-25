import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { clients } from "@/lib";
import React from "react";

const SponsorsMovingCards = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <InfiniteMovingCards
        className="mt-[-350px] md:mt-[2rem]"
        items={clients}
        direction="right"
        speed="slow"
      />
    </div>
  );
};

export default SponsorsMovingCards;
