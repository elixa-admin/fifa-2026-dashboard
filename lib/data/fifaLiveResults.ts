export interface FifaLiveResult {
  homeScore: number;
  awayScore: number;
  status: "finished";
  pulledAt: string;
}

export const FIFA_LIVE_RESULTS: Record<string, FifaLiveResult> = {
  A1: { homeScore: 2, awayScore: 0, status: "finished", pulledAt: "2026-06-13T07:37:29.544Z" },
  A2: { homeScore: 2, awayScore: 1, status: "finished", pulledAt: "2026-06-13T07:37:29.544Z" },
  B1: { homeScore: 1, awayScore: 1, status: "finished", pulledAt: "2026-06-13T07:37:29.544Z" },
  D1: { homeScore: 4, awayScore: 1, status: "finished", pulledAt: "2026-06-13T07:37:29.544Z" },
};
