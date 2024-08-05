import { db, HtmlToText } from "@/lib";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stipe";
import { env } from "@/env";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
        courseType:"FREE"
      },

    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Course Found", { status: 404 });
    }
    if (purchase) {
      return new NextResponse("Already Purchased ", { status: 404 });
    }

    // enroll the user in the course
    await db.purchase.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    });

    return new NextResponse("Success", { status: 200 });





  } catch (err) {
    console.log("[COURSE CHECKOUT]", err);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
