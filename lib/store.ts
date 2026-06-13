"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Match, getTournamentFixtures } from "./data/fixtures";

interface GroupStanding {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;   // goals for
  ga: number;   // goals against
  gd: number;   // goal difference
  pts: number;
}

interface ScoreStore {
  matches: Match[];
  updateScore: (matchId: string, homeScore: number, awayScore: number, status?: Match["status"]) => void;
  resetMatch: (matchId: string) => void;
  getGroupStandings: (group: string) => GroupStanding[];
  getMatch: (matchId: string) => Match | undefined;
}

export function computeStandings(matches: Match[], group: string): GroupStanding[] {
  const groupMatches = matches.filter((m) => m.group === group && m.status === "finished");
  const teams = [...new Set(matches.filter((m) => m.group === group).flatMap((m) => [m.homeTeam, m.awayTeam]))];

  const standings: Record<string, GroupStanding> = {};
  for (const t of teams) {
    standings[t] = { team: t, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
  }

  for (const m of groupMatches) {
    if (m.homeScore === null || m.awayScore === null) continue;
    const h = standings[m.homeTeam];
    const a = standings[m.awayTeam];

    h.played++; a.played++;
    h.gf += m.homeScore; h.ga += m.awayScore;
    a.gf += m.awayScore; a.ga += m.homeScore;
    h.gd = h.gf - h.ga; a.gd = a.gf - a.ga;

    if (m.homeScore > m.awayScore) {
      h.won++; h.pts += 3; a.lost++;
    } else if (m.homeScore === m.awayScore) {
      h.drawn++; h.pts += 1; a.drawn++; a.pts += 1;
    } else {
      a.won++; a.pts += 3; h.lost++;
    }
  }

  return Object.values(standings).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
}

export const useScoreStore = create<ScoreStore>()(
  persist(
    (set, get) => ({
      matches: getTournamentFixtures(),

      updateScore: (matchId, homeScore, awayScore, status = "finished") =>
        set((state) => ({
          matches: state.matches.map((m) =>
            m.id === matchId ? { ...m, homeScore, awayScore, status } : m
          ),
        })),

      resetMatch: (matchId) =>
        set((state) => ({
          matches: state.matches.map((m) =>
            m.id === matchId ? { ...m, homeScore: null, awayScore: null, status: "upcoming" } : m
          ),
        })),

      getGroupStandings: (group) => computeStandings(get().matches, group),

      getMatch: (matchId) => get().matches.find((m) => m.id === matchId),
    }),
    { name: "wc2026-scores" }
  )
);
