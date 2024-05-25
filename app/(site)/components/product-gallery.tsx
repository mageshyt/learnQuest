import { HeroParallax } from "@/components/global/connect-parellax";
import { products } from "@/lib";
import React from "react";

const ProductGallery = () => {
  return (
    <section className="overflow-hidden ">
      <HeroParallax products={products} />;
    </section>
  );
};

export default ProductGallery;
