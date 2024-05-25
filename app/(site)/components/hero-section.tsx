import { FlipWords } from "@/components/ui/flip-word";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import React from "react";

const HeroSection = () => {
  const words = ["Best", "Greatest", "Awesome", "Amazing"];
  return (
    <section className=" bg-grid-white/[0.02] ">
      <Spotlight
        className=" left-0 md:left-60 -top-[40rem] md:-top-[60rem]"
        fill="white"
      />
      <motion.div
        initial={{ opacity: 0, z: 1, scale: 0.6 }}
        animate={{ opacity: 1, z: 0, scale: 1 }}
        transition={{
          delay: 1.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" p-4 max-w-7xl mt-32  mx-auto relative z-10  w-full  md:pt-0"
      >
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Learn Quest <br />
          <span className="text-2xl md:text-4xl">
            The
            <FlipWords className=" text-neutral-200 " words={words} />
            to learn
          </span>
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Join the Learn Quest community and unlock a world of educational
          resources, courses, and expert insights. Take control of your learning
          journey and achieve your goals
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
