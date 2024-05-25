"use client";
import React from "react";

import LampTechStack from "./components/lamp-tech-stack";
import SponsorsMovingCards from "./components/moving-cards";
import StartJourneyHero from "./components/start-journey-hero";
import HeroSection from "./components/hero-section";
import ProductGallery from "./components/product-gallery";

const LandingPage = () => {
  return (
    <main className="bg-neutral-950   relative  antialiased ">
      {/* hero section */}
      <HeroSection />

      {/* start journey Hero */}
      <StartJourneyHero />

      {/* infinite moving card */}
      <SponsorsMovingCards />

      {/* product gallery */}
      <ProductGallery />

      {/* lamp - tech stack */}
      <LampTechStack />
    </main>
  );
};

export default LandingPage;
