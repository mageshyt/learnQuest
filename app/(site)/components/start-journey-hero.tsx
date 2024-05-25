import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { motion } from "framer-motion";
import React from "react";

const StartJourneyHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0.1, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.6,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="flex flex-col h-full mt-[-300px] md:mt-[-180px]"
    >
      <ContainerScroll
        titleComponent={
          <div className="flex items-center flex-col">
            <h1 className="text-3xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
              Start Your Journey Today
            </h1>
          </div>
        }
      />
    </motion.div>
  );
};

export default StartJourneyHero;
