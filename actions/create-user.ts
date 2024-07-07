"use server";

import { db } from "@/lib";

export const createUser = async (
  id: string,
  attributes: Record<string, any>
) => {
  try {
    console.log("[INFO] actions/create-user.ts: createUser()", id, attributes);

    // check if the user already exist
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    console.log(
      "[INFO] actions/create-user.ts: createUser()",
      user ? "User already exist" : "User does not exist"
    );
    if (!user) {
      // create user
      await db.user.create({
        data: {
          id: id,
          attributes,
        },
      });
    }

    // update user
    await db.user.update({
      where: {
        id,
      },
      data: {
        ...attributes,
      },
    });

    console.log("[INFO] actions/create-user.ts: createUser()", user);
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: GET()", err);
    return {
      error: "Internal Error",
    };
  }
};
