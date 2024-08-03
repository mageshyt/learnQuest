import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SettingsLoading = () => {
  return (
    <div className="bg-white dark:bg-neutral-950 h-full p-6">
      {/* deadin */}
      <div className="max-w-5xl container space-y-6">
        <div className="flex flex-col mb-6 md:gap-1 items-center sm:items-start">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-40 h-4" />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-40 h-4" />
          </div>
          <div>
            <Skeleton className="w-24 h-6" />
          </div>
        </div>

        <div className="mt-4 p-4 flex gap-4">
          <Skeleton className="size-36 " />
          <Skeleton className="size-36 " />
          <Skeleton className="size-36 " />
        </div>

        <Skeleton className="w-96 h-5 " />
        <Skeleton className="w- h-4 " />

        <Skeleton className="w-full h-14 " />
      </div>
    </div>
  );
};

export default SettingsLoading;
