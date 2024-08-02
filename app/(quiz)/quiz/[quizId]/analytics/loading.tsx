import Loader from "@/components/global/loader";
import React from "react";

const loading = () => {
  return (
    <div className="p-6 bg-white dark:bg-neutral-950 space-y-4">
      <Loader />
    </div>
  );
};

export default loading;
