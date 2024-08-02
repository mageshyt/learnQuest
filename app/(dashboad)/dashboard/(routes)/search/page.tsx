import React, { FC } from "react";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { getCourses } from "@/actions/general/get-courses";

import Categories from "./components/categories";
import Searchbar from "@/app/(dashboad)/components/searchbar";
import CoursesList from "@/components/courses/courses-list";
import { getCategories } from "@/actions/general/get-categories";
interface SearchPageProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  };
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const categories = await getCategories();
  const courses = await getCourses({ userId, ...searchParams });

  return (
    <div className="">
      {/* search bar */}
      <div className="px-4 pt-4 md:mb-0 block md:hidden">
        <Searchbar />
      </div>
      <div className=" mt-4 rounded-md mx-4 ">
        {/* category */}
        <Categories items={categories} />
      </div>
      <div className="p-4  h-full overflow-y-auto">
        <CoursesList items={courses} />
      </div>
    </div>
  );
};

export default SearchPage;
