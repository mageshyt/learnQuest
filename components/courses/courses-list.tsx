import { CourseWithProgressWithCategories } from "@/actions/general/get-courses";
import React, { FC } from "react";
import ListView from "../global/list-view";
import CourseCard from "./course-card";

interface CoursesListProps {
  items: CourseWithProgressWithCategories[];
}
const CoursesList: FC<CoursesListProps> = ({ items }) => {
  return (
    <div className="w-full ">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <ListView
          items={items}
          render={(item) => (
            <CourseCard
              chaptersLength={item.chapters.length}
              id={item.id}
              imageUrl={item.imageUrl}
              price={item.price}
              progress={item.progress}
              title={item.title}
              category={item.category?.name || ""}
            />
          )}
        />
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No result found for your search
        </div>
      )}
    </div>
  );
};

export default CoursesList;
