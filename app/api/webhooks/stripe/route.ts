import { env } from "@/env";
import { db } from "@/lib";
import { stripe } from "@/lib/stipe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (e: any) {
    return new NextResponse(`Web Hooks Error,${e.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse(`Webhook missing MetaData`, {
        status: 400,
      });
    }

    await db.purchase.create({
      data: {
        courseId,
        userId,
      },
    });
  } else {
    return new NextResponse(`WEbhook : unhandled Event Type ${event.type}`, {
      status: 200,
    });
  }

  return new NextResponse(null, { status: 200 });
}
