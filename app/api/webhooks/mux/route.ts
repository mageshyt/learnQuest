import { db } from "@/lib";
import Mux from "@mux/mux-node";
import { MuxData } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const mux = new Mux({
  webhookSecret: "cu12pcvrhfh9vgleu84t0m1dd1gh3asj",
});
async function handler(request: Request) {
  const headersList = headers();
  const body = await request.text();

  const event = mux.webhooks.unwrap(body, headersList);

  switch (event.type) {
    case "video.asset.ready":
      {
        console.log(event);
        // update the track with the mux data
        const assetId = event.object.id;

        if (!event.data?.playback_ids) {
          // return 404
          return NextResponse.json(
            {
              message: "Playback id not found",
            },
            { status: 404 }
          );
        }

        const muxData = await db.muxData.findFirst({
          where: {
            assetId,
            playbackId: event.data.playback_ids[0].id,
          },
        });

        // update the mux data
        if (muxData) {
          await db.muxData.update({
            where: {
              id: muxData.id,
              assetId,
            },
            data: {
              playbackId: event.data.playback_ids[0].id,
              trackId: event.data.tracks?.find((track) => track.type === "text")
                ?.id,
            },
          });
        }

        console.log("[WEB HOOK] Asset ready", muxData);
      }
      break;

    default:
      break;
  }

  return NextResponse.json({
    message: "success",
  });
}

type EventType = "video.asset.ready" | "*";

type Event = {
  data: Record<string, string | any>;
  object: "event";
  type: EventType;
};

export const POST = handler;
