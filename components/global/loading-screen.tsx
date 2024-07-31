import React from "react";
import Loader from "./loader";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  );
};

export default LoadingScreen;
