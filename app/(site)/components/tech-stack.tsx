"use client";
import { AnimatedBeam } from "@/components/global/animated-beam";
import { cn, Icons } from "@/lib";
import React, { forwardRef, useRef } from "react";

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const postgresRef = useRef<HTMLDivElement>(null);
  const prismaRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const learnQuestRef = useRef<HTMLDivElement>(null);
  const nextJsRef = useRef<HTMLDivElement>(null);
  const geminiRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const dockerRef = useRef<HTMLDivElement>(null);

  const vercelRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative  mx-auto bg-neutral-950/30 w-full max-w-[500px] overflow-hidden  p-6 max-h-96 "
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={postgresRef}>
            <Icons.postgreSql className="h-6 w-6" />
          </Circle>
          <Circle ref={dockerRef}>
            <Icons.docker className="h-6 w-6" />
          </Circle>
          <Circle ref={prismaRef}>
            <Icons.prisma className="h-6 w-6" />
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Circle ref={githubRef}>
            <Icons.gitHub className="h-6 w-6" />
          </Circle>

          <Circle ref={learnQuestRef}>
            <Icons.learnQuest className="h-6 w-6" />
          </Circle>

          <Circle ref={bunRef}>
            <Icons.bun className="h-6 w-6" />
          </Circle>
        </div>

        <div className="flex flex-row items-center justify-between">
          <Circle ref={geminiRef}>
            <Icons.gemini className="h-6 w-6" />
          </Circle>

          <Circle ref={vercelRef}>
            <Icons.vercel className="h-6 w-6" />
          </Circle>

          <Circle ref={nextJsRef}>
            <Icons.nextJs className="h-6 w-6" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={prismaRef}
        toRef={learnQuestRef}
        curvature={-75}
        endYOffset={-10}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={postgresRef}
        toRef={learnQuestRef}
        curvature={-75}
        endYOffset={-10}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={postgresRef}
        toRef={dockerRef}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dockerRef}
        toRef={prismaRef}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={postgresRef}
        toRef={githubRef}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={githubRef}
        toRef={geminiRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={prismaRef}
        toRef={nextJsRef}
        curvature={75}
        endYOffset={10}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={nextJsRef}
        toRef={learnQuestRef}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bunRef}
        toRef={nextJsRef}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={geminiRef}
        toRef={learnQuestRef}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={geminiRef}
        toRef={nextJsRef}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bunRef}
        toRef={learnQuestRef}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={githubRef}
        toRef={learnQuestRef}
      />
    </div>
  );
};

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default TechStack;
