import type { LiveFeedPayload } from "./feed";

export async function fetchLiveFeed(endpoint = "/api/live/feed"): Promise<LiveFeedPayload> {
  const response = await fetch(endpoint, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Live feed request failed: ${response.status}`);
  }

  return response.json();
}
