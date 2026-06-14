"use client";
import { useEffect, useMemo, useState } from "react";
import { GROUP_FIXTURES, getSastDateString } from "@/lib/data/fixtures";
import { getMatchInsight, getTeam } from "@/lib/data/teams";
import { useScoreStore } from "@/lib/store";

type Pick = "home" | "draw" | "away";

const PICK_OPTIONS: Array<{ key: Pick; label: string }> = [
  { key: "home", label: "Home" },
  { key: "draw", label: "Draw" },
  { key: "away", label: "Away" },
];

export default function HeroBanner() {
  const [now, setNow] = useState<Date | null>(null);
  const matches = useScoreStore((s) => s.matches);
  const liveMatches = useMemo(() => matches.filter((m) => m.status === "live"), [matches]);
  const upcomingMatches = useMemo(() => matches.filter((m) => m.status === "upcoming"), [matches]);
  const featuredMatch = liveMatches[0] ?? upcomingMatches[0] ?? matches[0];
  const home = featuredMatch ? getTeam(featuredMatch.homeTeam) : null;
  const away = featuredMatch ? getTeam(featuredMatch.awayTeam) : null;
  const insight = featuredMatch ? getMatchInsight(featuredMatch.homeTeam, featuredMatch.awayTeam) : null;
  const [pick, setPick] = useState<Pick>("home");

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!insight) return;
    setPick(insight.edge === "draw" ? "draw" : insight.edge);
  }, [featuredMatch?.id, insight]);

  if (!featuredMatch || !home || !away || !insight) return null;

  const timeStr = now
    ? now.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "--:--";
  const todayCount = now ? matches.filter((m) => m.date === getSastDateString(now)).length : 0;
  const liveCount = liveMatches.length;
  const pickLabel = pick === "home" ? home.shortName : pick === "away" ? away.shortName : "Draw";
  const pickShare = pick === "home" ? insight.home : pick === "draw" ? insight.draw : insight.away;
  const markerLeft = pick === "home" ? "12%" : pick === "draw" ? "50%" : "88%";

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(160deg,rgba(7,12,24,0.98),rgba(11,20,36,0.96),rgba(8,14,28,0.98))] shadow-[0_28px_80px_rgba(2,6,23,0.34)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-[-6rem] h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute right-[-5rem] top-12 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-200">
              Matchday control center
            </span>
            {liveCount > 0 && (
              <span className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-red-200">
                {liveCount} live
              </span>
            )}
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
              {timeStr} SAST
            </span>
          </div>

          <div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[4.5rem]">
              FIFA World Cup 2026
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Live fixture scanning, scoreline consensus, and one-thumb controls in SAST.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <HeroStat label="Teams" value="48" tone="amber" />
            <HeroStat label="Groups" value="12" tone="blue" />
            <HeroStat label="Live now" value={String(liveCount)} tone="red" />
            <HeroStat label="Today" value={String(todayCount)} tone="cyan" />
          </div>

          <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Featured fixture
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-lg font-black text-white sm:text-xl">
                  {home.shortName} vs {away.shortName}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {featuredMatch.timeSAST} · Group {featuredMatch.group} · {featuredMatch.venue}
                </p>
              </div>
              <p className="text-sm text-slate-500">
                {todayCount} today · {featuredMatch.status === "live" ? "Live now" : "Next kickoff"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Consensus cloud
              </p>
              <h2 className="mt-1 text-lg font-black text-white">Pick the lean</h2>
            </div>
            <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-300">
              {timeStr}
            </span>
          </div>

          <div className="mt-4 rounded-[1.4rem] border border-white/8 bg-slate-950/55 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Featured fixture
                </p>
                <p className="mt-1 truncate text-base font-black text-white">
                  {home.shortName} vs {away.shortName}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {featuredMatch.timeSAST} · Group {featuredMatch.group}
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Consensus
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {insight.home}% / {insight.draw}% / {insight.away}%
                </p>
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-full border border-white/8 bg-white/[0.03]">
              <div className="flex h-3">
                <div
                  className="h-full"
                  style={{
                    width: `${insight.home}%`,
                    background: `linear-gradient(90deg, ${home.color}ee, ${home.color}90)`,
                  }}
                />
                <div className="h-full bg-white/12" style={{ width: `${insight.draw}%` }} />
                <div
                  className="h-full"
                  style={{
                    width: `${insight.away}%`,
                    background: `linear-gradient(90deg, ${away.color}85, ${away.color}ee)`,
                  }}
                />
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 h-6 w-6 rounded-full border-2 border-white bg-slate-950 shadow-[0_0_0_8px_rgba(15,23,42,0.24)]"
                style={{ left: markerLeft, transform: "translate(-50%, -50%)" }}
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {PICK_OPTIONS.map((option) => {
                const active = pick === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPick(option.key)}
                    className={`rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                      active
                        ? "border-amber-400/25 bg-amber-400 text-slate-950 shadow-[0_10px_24px_rgba(245,166,35,0.2)]"
                        : "border-white/8 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Your pick
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-200">{pickLabel}</p>
                <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                  {pickShare}%
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{insight.narrative}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "amber" | "blue" | "red" | "cyan";
}) {
  const tones: Record<string, string> = {
    amber: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    blue: "border-blue-400/20 bg-blue-400/10 text-blue-200",
    red: "border-red-400/20 bg-red-500/10 text-red-200",
    cyan: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  };

  return (
    <div className={`rounded-[1.1rem] border px-3 py-2 text-center ${tones[tone]}`}>
      <p className="text-lg font-black tracking-tight sm:text-xl">{value}</p>
      <p className="text-[11px] font-medium text-slate-400 sm:text-xs">{label}</p>
    </div>
  );
}
