"use client";
import { useEffect, useState } from "react";
import { fetchLiveFeed } from "@/lib/live/client";
import type { LiveFeedPayload } from "@/lib/live/feed";
import { getTournamentFixtures } from "@/lib/data/fixtures";
import { useScoreStore } from "@/lib/store";
import TeamFlag from "./TeamFlag";

const FALLBACK: LiveFeedPayload = {
  source: "mock",
  generatedAt: new Date().toISOString(),
  snapshot: {
    totalMatches: 0,
    liveMatches: 0,
    finishedMatches: 0,
    upcomingMatches: 0,
    lastUpdatedAt: new Date().toISOString(),
  },
  matchStates: getTournamentFixtures(),
  events: [],
  matches: [],
  notes: [],
};

export default function LiveIntelStrip() {
  const [feed, setFeed] = useState<LiveFeedPayload>(FALLBACK);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const syncMatches = useScoreStore((state) => state.syncMatches);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const load = async () => {
      try {
        const payload = await fetchLiveFeed();
        if (!active) return;
        setFeed(payload);
        syncMatches(payload.matchStates);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load live feed");
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();
    timer = setInterval(load, 30000);

    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, []);

  const event = feed.events[0];
  const highlight = feed.matches.slice(0, 3);

  return (
    <section className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Live Intel</p>
          <h2 className="mt-1 text-xl font-black text-white">Realtime match context and model state</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
            {loading
              ? "Loading live feed..."
              : error
              ? `Fallback mode: ${error}`
              : event
              ? event.detail
              : "No active event right now. The feed is still refreshing in the background."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:min-w-[320px]">
          <Metric label="Live" value={`${feed.snapshot.liveMatches}`} tone="red" />
          <Metric label="Finished" value={`${feed.snapshot.finishedMatches}`} tone="emerald" />
          <Metric label="Upcoming" value={`${feed.snapshot.upcomingMatches}`} tone="cyan" />
          <Metric label="Source" value={feed.source} tone="amber" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {highlight.map((item) => (
          <article key={item.matchId} className="rounded-2xl border border-white/8 bg-slate-950/45 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{item.kickoffLabel}</p>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${toneClass(item.momentum)}`}>{item.momentum}</span>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <TeamFlag code={item.homeTeam} size="sm" variant="card" />
              <div className="min-w-0 flex-1 text-center">
                <p className="truncate text-sm font-semibold text-white">
                  {item.homeTeam} vs {item.awayTeam}
                </p>
                <p className="mt-1 text-lg font-black text-amber-300">{item.score}</p>
              </div>
              <TeamFlag code={item.awayTeam} size="sm" variant="card" />
            </div>

            <div className="mt-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
              <div className="flex h-2.5">
                <div className="flex items-center justify-end px-2 text-[10px] font-semibold text-white" style={{ width: `${item.homeChance}%`, background: `linear-gradient(90deg, rgba(16,185,129,0.95), rgba(16,185,129,0.55))` }}>
                  {item.homeChance}%
                </div>
                <div className="flex items-center justify-center px-2 text-[10px] font-semibold text-slate-100" style={{ width: `${item.drawChance}%`, background: `rgba(148,163,184,0.22)` }}>
                  {item.drawChance}%
                </div>
                <div className="flex items-center justify-start px-2 text-[10px] font-semibold text-white" style={{ width: `${item.awayChance}%`, background: `linear-gradient(90deg, rgba(244,63,94,0.55), rgba(244,63,94,0.95))` }}>
                  {item.awayChance}%
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-medium text-cyan-100">
                Goal line {item.goalLine}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-medium text-slate-200">
                {item.edge}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">{item.fact}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "red" | "emerald" | "cyan" | "amber" }) {
  const tones = {
    red: "border-red-400/20 bg-red-500/10 text-red-100",
    emerald: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
    cyan: "border-cyan-400/20 bg-cyan-500/10 text-cyan-100",
    amber: "border-amber-400/20 bg-amber-500/10 text-amber-100",
  };

  return (
    <div className={`rounded-2xl border px-3 py-2 ${tones[tone]}`}>
      <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}

function toneClass(motion: "home" | "balanced" | "away") {
  if (motion === "home") return "bg-emerald-400/15 text-emerald-200";
  if (motion === "away") return "bg-rose-400/15 text-rose-200";
  return "bg-amber-400/15 text-amber-200";
}
