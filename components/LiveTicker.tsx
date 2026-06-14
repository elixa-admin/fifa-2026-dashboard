"use client";
import { useMemo } from "react";
import { useScoreStore } from "@/lib/store";
import { getTeam } from "@/lib/data/teams";

export default function LiveTicker() {
  const matches = useScoreStore((s) => s.matches);

  const items = useMemo(() => {
    const liveOrFinished = matches.filter((m) => m.status === "live" || m.status === "finished");
    const upcoming = matches.filter((m) => m.status === "upcoming").slice(0, 6);

    return [
      ...liveOrFinished.map((m) => {
        const status = m.status === "live" ? "🔴 LIVE" : "⚡ FT";
        return `${status} | ${m.homeTeam} ${m.homeScore}–${m.awayScore} ${m.awayTeam} (Group ${m.group})`;
      }),
      ...upcoming.map((m) => {
        return `🗓 ${getTeam(m.homeTeam).shortName} vs ${getTeam(m.awayTeam).shortName} · ${m.timeSAST} · Group ${m.group}`;
      }),
      "🏆 FIFA World Cup 2026 · USA · Canada · Mexico · 48 Teams · 12 Groups",
    ];
  }, [matches]);

  if (items.length === 0) return null;

  const tickerText = items.join("     ·     ");

  return (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-amber-500/15 bg-white/[0.03] px-4 py-3 shadow-[0_18px_50px_rgba(2,6,23,0.22)]">
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-amber-300">
          Live
        </span>
        <div className="relative flex-1 overflow-hidden" aria-live="polite" role="status">
          <div className="whitespace-nowrap text-[11px] font-medium tracking-[0.12em] text-slate-300 sm:text-xs animate-[ticker_40s_linear_infinite]">
            {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
          </div>
        </div>
      </div>
    </div>
  );
}
