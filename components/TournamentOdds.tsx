"use client";
import { getTeam } from "@/lib/data/teams";
import TeamFlag from "./TeamFlag";

const TOP_CONTENDERS = [
  "FRA", "ARG", "ESP", "ENG", "BRA", "GER", "POR", "NED", "BEL", "URU", "COL", "KOR",
];

export default function TournamentOdds() {
  const teams = TOP_CONTENDERS.map((c) => getTeam(c)).filter(Boolean);
  const maxOdds = Math.max(...teams.map((t) => t.tournamentOdds));

  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/40 to-slate-900/60 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5">
        <h2 className="text-white font-bold text-lg">🏆 Tournament Odds</h2>
        <p className="text-slate-500 text-xs mt-0.5">Probability to win the 2026 World Cup</p>
      </div>
      <div className="p-4 space-y-3">
        {teams
          .sort((a, b) => b.tournamentOdds - a.tournamentOdds)
          .map((team, i) => (
            <div key={team.code} className="flex items-center gap-3">
              <span className="text-slate-600 text-xs w-4 text-right font-mono">{i + 1}</span>
              <TeamFlag code={team.code} size="xs" />
              <span className="text-white text-sm font-medium w-24 truncate">{team.shortName}</span>
              <div className="flex-1 relative h-5 rounded-full bg-slate-800/60 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(team.tournamentOdds / maxOdds) * 100}%`,
                    background: i === 0
                      ? "linear-gradient(90deg, #F5A623, #FFD700)"
                      : i === 1
                      ? "linear-gradient(90deg, #9ca3af, #e5e7eb)"
                      : i === 2
                      ? "linear-gradient(90deg, #92400e, #d97706)"
                      : "linear-gradient(90deg, #3b82f6aa, #60a5fa88)",
                  }}
                />
                <span className="absolute right-2 inset-y-0 flex items-center text-xs font-bold text-white">
                  {team.tournamentOdds}%
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
