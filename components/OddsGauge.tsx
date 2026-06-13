"use client";
import { getMatchInsight, getTeam } from "@/lib/data/teams";
import TeamFlag from "./TeamFlag";

interface Props {
  homeCode: string;
  awayCode: string;
}

export default function OddsGauge({ homeCode, awayCode }: Props) {
  const insight = getMatchInsight(homeCode, awayCode);
  const homeTeam = getTeam(homeCode);
  const awayTeam = getTeam(awayCode);
  const edgeLabel =
    insight.edge === "draw"
      ? "Too close to split"
      : insight.edge === "home"
      ? `${homeTeam.shortName} edge`
      : `${awayTeam.shortName} edge`;
  const confidenceTone =
    insight.intensity === "strong"
      ? "High-confidence call"
      : insight.intensity === "clear"
      ? "Clear analytical edge"
      : "Marginal advantage";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Win outlook</p>
          <p className="mt-1 text-sm font-semibold text-white">{edgeLabel}</p>
        </div>
        <div className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium text-cyan-200">
          {confidenceTone}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/8 bg-slate-950/60">
        <div className="relative h-11">
          <div
            className="absolute inset-y-0 left-0 flex items-center justify-start px-3"
            style={{
              width: `${insight.home}%`,
              background: `linear-gradient(90deg, ${homeTeam.color}f0, ${homeTeam.color}b8)`,
            }}
          >
            <span className="text-sm font-bold text-white">{insight.home}%</span>
          </div>
          <div
            className="absolute inset-y-0 flex items-center justify-center bg-white/10 backdrop-blur-sm"
            style={{ left: `${insight.home}%`, width: `${insight.draw}%` }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">Draw {insight.draw}%</span>
          </div>
          <div
            className="absolute inset-y-0 right-0 flex items-center justify-end px-3"
            style={{
              width: `${insight.away}%`,
              background: `linear-gradient(90deg, ${awayTeam.color}b5, ${awayTeam.color}f2)`,
            }}
          >
            <span className="text-sm font-bold text-white">{insight.away}%</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="flex items-center gap-2 min-w-0">
          <TeamFlag code={homeCode} size="xs" variant="card" />
          <span className="truncate font-medium text-slate-200">{homeTeam.shortName}</span>
        </div>
        <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500 sm:text-center">Model split</span>
        <div className="flex items-center justify-end gap-2 min-w-0">
          <span className="truncate font-medium text-slate-200">{awayTeam.shortName}</span>
          <TeamFlag code={awayCode} size="xs" variant="card" />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {insight.keyDrivers.map((driver) => (
          <div key={driver} className="rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2 text-xs leading-5 text-slate-300">
            {driver}
          </div>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {[
          insight.progressLabel,
          insight.momentumLabel,
          insight.regionalLabel,
          insight.globalLabel,
        ]
          .filter(Boolean)
          .map((label) => (
            <div key={label as string} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-xs leading-5 text-slate-300">
              {label}
            </div>
          ))}
      </div>
    </div>
  );
}
