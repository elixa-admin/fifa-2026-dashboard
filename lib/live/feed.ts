import { GROUP_FIXTURES } from "@/lib/data/fixtures";
import { getTeam } from "@/lib/data/teams";

export type LiveEventType =
  | "match_started"
  | "goal"
  | "yellow_card"
  | "red_card"
  | "substitution"
  | "injury"
  | "match_finished"
  | "heartbeat";

export interface LiveMatchEvent {
  id: string;
  type: LiveEventType;
  matchId: string;
  minute: number | null;
  teamCode?: string;
  player?: string;
  detail: string;
  createdAt: string;
  source: "mock" | "provider" | "poll";
}

export interface LiveMatchSnapshot {
  totalMatches: number;
  liveMatches: number;
  finishedMatches: number;
  upcomingMatches: number;
  lastUpdatedAt: string;
}

export interface LiveFeedPayload {
  source: "mock" | "provider" | "poll";
  generatedAt: string;
  snapshot: LiveMatchSnapshot;
  events: LiveMatchEvent[];
  notes: string[];
}

export function buildLiveSnapshot() {
  const totalMatches = GROUP_FIXTURES.length;
  const liveMatches = GROUP_FIXTURES.filter((match) => match.status === "live").length;
  const finishedMatches = GROUP_FIXTURES.filter((match) => match.status === "finished").length;
  const upcomingMatches = GROUP_FIXTURES.filter((match) => match.status === "upcoming").length;

  return {
    totalMatches,
    liveMatches,
    finishedMatches,
    upcomingMatches,
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function buildLiveFeedPayload(): LiveFeedPayload {
  const now = new Date().toISOString();
  const firstMatch = GROUP_FIXTURES[0];
  const demoEvent = firstMatch
    ? {
        id: `${firstMatch.id}-heartbeat`,
        type: "heartbeat" as const,
        matchId: firstMatch.id,
        minute: null,
        detail: `${getTeam(firstMatch.homeTeam).shortName} vs ${getTeam(firstMatch.awayTeam).shortName} is queued for live updates.`,
        createdAt: now,
        source: "mock" as const,
      }
    : null;

  return {
    source: "mock",
    generatedAt: now,
    snapshot: buildLiveSnapshot(),
    events: demoEvent ? [demoEvent] : [],
    notes: [
      "This endpoint is the contract for live push updates.",
      "Swap the mock source for a provider feed or polling adapter without changing the consumer shape.",
    ],
  };
}
