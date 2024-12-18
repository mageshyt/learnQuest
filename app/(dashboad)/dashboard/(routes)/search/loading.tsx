import CoursesList from "@/components/courses/courses-list";
import CategoriesSkeleton from "@/components/skeletons/categories-skeleton";
import CoursesSkeleton from "@/components/skeletons/courses-skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="p-6 bg-white dark:bg-neutral-950 space-y-4">
      <CategoriesSkeleton />
      <CoursesSkeleton />
    </div>
  );
};

export default loading;
