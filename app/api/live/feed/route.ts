import { NextResponse } from "next/server";
import { buildLiveFeedPayload } from "@/lib/live/feed";

export async function GET() {
  return NextResponse.json(buildLiveFeedPayload(), {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
