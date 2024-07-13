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
    console.error(
      "🚀 ~ file: get-categories.ts ~ line 21 ~ getCategories ~ err",
      err
    );
    return [];
  }
};
