"use server";

import { db } from "@/lib";

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },

    });

    return categories;
  } catch (err) {
    return {
      error: "Internal Error",
    };
  }
};
