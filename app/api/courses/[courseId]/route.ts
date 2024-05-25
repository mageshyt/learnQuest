import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    const { courseId } = params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course) return new NextResponse("Not Found", { status: 404 });

    await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        title,
      },
    });

    return new NextResponse("Updated", { status: 200 });
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: PATCH()", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
