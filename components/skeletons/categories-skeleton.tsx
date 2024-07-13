import React from "react";
import ListView from "../global/list-view";
import { Skeleton } from "../ui/skeleton";
const CategoriesSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <ListView
        items={[1, 2, 3, 4, 5, 6, 7]}
        render={() => <Skeleton className="w-72 h-10 rounded-md py-2 px-3  " />}
      />
    </div>
  );
};

export default CategoriesSkeleton;
