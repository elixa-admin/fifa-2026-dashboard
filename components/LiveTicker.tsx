"use client";
import { useEffect, useRef, useState } from "react";
import { useScoreStore } from "@/lib/store";
import { getTeam } from "@/lib/data/teams";

export default function LiveTicker() {
  const matches = useScoreStore((s) => s.matches);
  const tickerRef = useRef<HTMLDivElement>(null);

  const liveOrFinished = matches.filter(
    (m) => m.status === "live" || m.status === "finished"
  );
  const upcoming = matches.filter((m) => m.status === "upcoming").slice(0, 6);

  const items = [
    ...liveOrFinished.map((m) => {
      const status = m.status === "live" ? "🔴 LIVE" : "⚡ FT";
      return `${status} | ${m.homeTeam} ${m.homeScore}–${m.awayScore} ${m.awayTeam} (Group ${m.group})`;
    }),
    ...upcoming.map((m) => {
      return `🗓 ${getTeam(m.homeTeam).shortName} vs ${getTeam(m.awayTeam).shortName} · ${m.timeSAST} · Group ${m.group}`;
    }),
    "🏆 FIFA World Cup 2026 · USA · Canada · Mexico · 48 Teams · 12 Groups",
  ];

  if (items.length === 0) return null;

  const tickerText = items.join("     ·     ");

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-500/20 rounded-xl py-2.5 px-4">
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
          ⚡ LIVE
        </span>
        <div className="overflow-hidden flex-1 relative" ref={tickerRef}>
          <div className="whitespace-nowrap animate-[ticker_40s_linear_infinite] text-xs text-slate-300 font-medium">
            {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
          </div>
        </div>
      </div>
    </div>
  );
}
