"use client";
import { getMatchInsight, getTeam } from "@/lib/data/teams";
import TeamFlag from "./TeamFlag";

interface Props {
  homeCode: string;
  awayCode: string;
}

export default function GoalPredictor({ homeCode, awayCode }: Props) {
  const insight = getMatchInsight(homeCode, awayCode);
  const homeTeam = getTeam(homeCode);
  const awayTeam = getTeam(awayCode);

  const roundedHome = Math.round(insight.homeGoals);
  const roundedAway = Math.round(insight.awayGoals);
  const scenarios = [
    {
      label: `${homeTeam.shortName} control`,
      score: `${Math.max(roundedHome, roundedAway + 1)}-${Math.max(0, roundedAway)}`,
      detail: "If the favorite lands early pressure",
    },
    {
      label: "Level game",
      score: `${roundedHome}-${roundedAway}`,
      detail: "Balanced phases and smaller margins",
    },
    {
      label: `${awayTeam.shortName} counter`,
      score: `${Math.max(0, roundedHome - 1)}-${Math.max(roundedAway, roundedHome + 1)}`,
      detail: "If transitions tilt the match late",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Goal projection</p>
          <p className="mt-1 text-sm font-semibold text-white">Expected scoreline and match temperature</p>
        </div>
        <div className="w-fit rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-200">
          {insight.totalGoals.toFixed(1)} total goals
        </div>
      </div>

      <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="flex flex-col items-start gap-2 sm:items-start">
          <TeamFlag code={homeCode} size="md" variant="card" />
          <span className="text-sm font-semibold text-white">{homeTeam.shortName}</span>
          <span className="text-xs text-slate-400">xG profile {insight.homeGoals.toFixed(1)}</span>
        </div>

        <div className="flex items-center justify-start gap-2 sm:items-end sm:justify-center">
          <span className="text-4xl font-black tabular-nums text-white sm:text-5xl" style={{ textShadow: `0 0 24px ${homeTeam.color}55` }}>
            {insight.homeGoals.toFixed(1)}
          </span>
          <span className="pb-2 text-2xl font-light text-slate-500">-</span>
          <span className="text-4xl font-black tabular-nums text-white sm:text-5xl" style={{ textShadow: `0 0 24px ${awayTeam.color}55` }}>
            {insight.awayGoals.toFixed(1)}
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 text-left sm:items-end sm:text-right">
          <TeamFlag code={awayCode} size="md" variant="card" />
          <span className="text-sm font-semibold text-white">{awayTeam.shortName}</span>
          <span className="text-xs text-slate-400">xG profile {insight.awayGoals.toFixed(1)}</span>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {scenarios.map((scenario) => (
          <div key={scenario.label} className="rounded-xl border border-white/8 bg-white/[0.04] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{scenario.label}</p>
            <p className="mt-2 text-2xl font-black text-white">{scenario.score}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">{scenario.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
