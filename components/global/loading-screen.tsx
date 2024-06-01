import React from "react";
import Loader from "./loader";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader />
    </div>
  );
};

export default LoadingScreen;
