"use server";

import { db } from "@/lib";

export const createUser = async (
  id: string,
  attributes: Record<string, any>
) => {
  try {
    console.log("[INFO] actions/create-user.ts: createUser()", id, attributes);

    // create the user

    const user = await db.user.upsert({
      where: { id },

      create: {
        id,
        attributes,
        // email: attributes.email_address[0].email_address,
        name: attributes?.first_name + " " + attributes?.last_name,
      },
      update: {
        attributes: attributes,
        // email: attributes.email_address[0].email_address,
        name: attributes?.first_name + " " + attributes?.last_name,
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
