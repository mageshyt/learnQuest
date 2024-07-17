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
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,

        price_data: {
          currency: "USD",

          product_data: {
            name: course.title,
            description: HtmlToText(course.description!),
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    console.log("LINE ITEM");
    // get the stripe customer id

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    // ! if the user is not a stripe customer, create a new stripe customer

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          stripeCustomerId: customer.id,
          userId: user.id,
        },
      });
    }

    console.log("STRIPE CUROSMSER", stripeCustomer);
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=true`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=true`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });

    console.log("SESSIION", session);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.log("[COURSE CHECKOUT]", err);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
