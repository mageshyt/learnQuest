import React from "react";
import ListView from "../global/list-view";
import { Skeleton } from "../ui/skeleton";

const CoursesSkeleton = () => {
  return (
    <div className="grid  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <ListView
        items={Array(10).fill({})}
        render={() => (
          <div className="border-gray-50">
            {/* image */}
            <Skeleton className="w-full rounded-lg h-44" />

            {/* title */}

            <Skeleton className="w-1/2 h-4 mt-2" />
            {/*  */}

            <Skeleton className="w-1/4 h-4 mt-2" />
          </div>
        )}
      />
    </div>
  );
};

export default CoursesSkeleton;
