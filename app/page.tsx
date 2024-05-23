"use client";
import React, { useRef } from "react";

import { FlipWords } from "@/components/ui/flip-word";
import { Spotlight } from "@/components/ui/spotlight";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LandingPage = () => {
  const words = ["Best", "Greatest", "Awesome", "Amazing"];

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
      .delay(1.5);
  });

  return (
    <div className="h-full w-full   bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-20 left-0 md:left-44 md:-top-56"
        fill="white"
      />

      <div
        ref={ref}
        className=" p-4 max-w-7xl mt-48  mx-auto relative z-10  w-full pt-20 md:pt-0"
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
      </div>
      {/* <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div> */}
    </div>
  );
};

export default LandingPage;
