import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    console.log("userId", userId);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.create({
      data: {
        title,
        userId,
      },
    });

    return new NextResponse(JSON.stringify(course), { status: 201 });
  } catch (err) {
    console.log("[ERROR] app/api/courses/route.ts: POST()", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
