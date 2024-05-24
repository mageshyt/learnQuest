"use client";
import React, { useRef } from "react";

import { FlipWords } from "@/components/ui/flip-word";
import { Spotlight } from "@/components/ui/spotlight";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import Navbar from "./components/navbar";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { clients } from "@/lib";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP);

const LandingPage = () => {
  // -------------------------------------- state --------------------------------------
  const words = ["Best", "Greatest", "Awesome", "Amazing"];

  // -------------------------------------- hooks --------------------------------------
  const ref = useRef(null);

  useGSAP(() => {
    //  make the container to come from under the screen

    gsap
      .from(ref.current, {
        y: 100,
        autoAlpha: 0,
        duration: 2,
        opacity: 0,
      })
      .delay(1.8);
  });

  return (
    <main
      ref={ref}
      className=" bg-neutral-950 bg-grid-white/[0.02] !overflow-visible relative flex flex-col items-center  antialiased"
    >
      <section>
        <Spotlight
          className="-top-20 left-0 md:left-44 md:-top-96"
          fill="white"
        />

        <div className=" p-4 max-w-7xl mt-32  mx-auto relative z-10  w-full  md:pt-0">
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
            resources, courses, and expert insights. Take control of your
            learning journey and achieve your goals
          </p>
        </div>
      </section>

      <div className="flex flex-col h-full mt-[-300px] md:mt-[-180px]">
        <ContainerScroll
          titleComponent={
            <div className="flex items-center flex-col">
              <h1 className="text-3xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                Start Your Journey Today
              </h1>
            </div>
          }
        />
      </div>

      <InfiniteMovingCards
        className="mt-[-350px] md:mt-[2rem]"
        items={clients}
        direction="right"
        speed="slow"
      />
    </main>
  );
};

export default LandingPage;
