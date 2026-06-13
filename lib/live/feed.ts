import { getTournamentFixtures } from "@/lib/data/fixtures";
import { getMatchInsight, getRecentForm, getTeam } from "@/lib/data/teams";
import type { Match } from "@/lib/data/fixtures";

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

export interface LiveMatchSummary {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  status: "upcoming" | "live" | "finished";
  kickoffLabel: string;
  liveMinute: number | null;
  score: string;
  edge: string;
  momentum: "home" | "balanced" | "away";
  homeChance: number;
  drawChance: number;
  awayChance: number;
  goalLine: string;
  fact: string;
}

export interface LiveFeedPayload {
  source: "mock" | "provider" | "poll";
  generatedAt: string;
  snapshot: LiveMatchSnapshot;
  matchStates: Match[];
  events: LiveMatchEvent[];
  matches: LiveMatchSummary[];
  notes: string[];
}

export function buildLiveSnapshot() {
  const fixtures = getTournamentFixtures();
  const totalMatches = fixtures.length;
  const liveMatches = fixtures.filter((match) => match.status === "live").length;
  const finishedMatches = fixtures.filter((match) => match.status === "finished").length;
  const upcomingMatches = fixtures.filter((match) => match.status === "upcoming").length;

  return {
    totalMatches,
    liveMatches,
    finishedMatches,
    upcomingMatches,
    lastUpdatedAt: new Date().toISOString(),
  };
}

function buildLiveMatchSummaries(): LiveMatchSummary[] {
  return getTournamentFixtures().slice(0, 8).map((match) => {
    const home = getTeam(match.homeTeam);
    const away = getTeam(match.awayTeam);
    const insight = getMatchInsight(home.code, away.code);
    const homeForm = getRecentForm(home.code)?.filter((value) => value === "W").length ?? 0;
    const awayForm = getRecentForm(away.code)?.filter((value) => value === "W").length ?? 0;
    const momentum = homeForm > awayForm ? "home" : awayForm > homeForm ? "away" : "balanced";
    const edge = homeForm === awayForm ? "Balanced matchup" : `${momentum === "home" ? home.shortName : away.shortName} carry the trend`;
    const score = match.homeScore !== null && match.awayScore !== null ? `${match.homeScore}–${match.awayScore}` : "0–0";

    return {
      matchId: match.id,
      homeTeam: home.code,
      awayTeam: away.code,
      status: match.status,
      kickoffLabel: match.timeSAST,
      liveMinute: match.status === "live" ? 0 : null,
      score,
      edge,
      momentum,
      homeChance: insight.home,
      drawChance: insight.draw,
      awayChance: insight.away,
      goalLine: `${insight.homeGoals.toFixed(1)}-${insight.awayGoals.toFixed(1)}`,
      fact:
        match.status === "finished"
          ? `${home.shortName} and ${away.shortName} are now reflected in the standings.`
          : `${home.shortName} vs ${away.shortName} is a high-signal matchup with a model edge on ${momentum === "balanced" ? "neither side" : momentum === "home" ? home.shortName : away.shortName}.`,
    };
  });
}

export function buildLiveFeedPayload(): LiveFeedPayload {
  const now = new Date().toISOString();
  const matchStates = getTournamentFixtures();
  const firstMatch = getTournamentFixtures()[0];
  const demoEvent = firstMatch
    ? {
        id: `${firstMatch.id}-heartbeat`,
        type: "heartbeat" as const,
        matchId: firstMatch.id,
        minute: null,
        detail: `${getTeam(firstMatch.homeTeam).shortName} vs ${getTeam(firstMatch.awayTeam).shortName} is queued for live updates.`,
        createdAt: now,
        source: "provider" as const,
      }
    : null;

  return {
    source: "provider",
    generatedAt: now,
    snapshot: buildLiveSnapshot(),
    matchStates,
    events: demoEvent ? [demoEvent] : [],
    matches: buildLiveMatchSummaries(),
    notes: [
      "This endpoint is the contract for live push updates.",
      "Swap the mock source for a provider feed or polling adapter without changing the consumer shape.",
    ],
  };
}
