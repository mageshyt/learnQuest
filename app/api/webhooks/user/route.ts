import { db } from "@/lib";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();

  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  console.log("[WEB HOOK]", webhookSecret);
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, ...attributes } = evt.data;
    console.log("[WEB HOOK]", id, email_addresses);

    // await createUser(id.toString(), attributes);
    // console.log("[WEB HOOK DB] User created", db);

    // check if the user already exist
    const user = await db.user.upsert({
      where: { id: id as string },
      create: {
        id: id as string,
        attributes,
        email: email_addresses[0].email_address,
        name: `${attributes?.first_name} ${attributes?.last_name}`,
      },
      update: {
        attributes,
        email: email_addresses[0].email_address,
        name: `${attributes?.first_name} ${attributes?.last_name}`,
      },
    });

    console.log("[WEB HOOK DB] User created", user);

    return NextResponse.json(user);
    // console.log("[WEB HOOK] User created", user);
  }
}
type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | any>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
