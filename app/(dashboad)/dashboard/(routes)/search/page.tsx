"use client";
import { getCategories } from "@/actions/get-categories";
import LoadingScreen from "@/components/global/loading-screen";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Categories from "./components/categories";
import Searchbar from "@/app/(dashboad)/components/searchbar";

const SearchPage = () => {
  // Fetch courses
  const {
    data: categories,
    isError,
    isPending,
    error,
  } = useQuery<Category[] | { error: string }>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isPending) return <LoadingScreen />;
  if (error || "error" in categories)
    return (
      <div>{error instanceof Error ? error.message : "An error occurred"}</div>
    );

  return (
    <>
      <div className="px-6 pt-6 md:mb-0 block md:hidden">
        <Searchbar />
      </div>
      <div className="p-6">
        <Categories items={categories as Category[]} />
      </div>
    </>
  );
};

export default SearchPage;
