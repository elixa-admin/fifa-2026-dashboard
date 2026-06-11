"use client";
import { useMemo, useState } from "react";
import { Match } from "@/lib/data/fixtures";
import { TEAM_EXTRAS } from "@/lib/data/teamExtras";
import { getMatchInsight, getTeam } from "@/lib/data/teams";
import { useScoreStore } from "@/lib/store";
import TeamFlag from "./TeamFlag";
import OddsGauge from "./OddsGauge";
import GoalPredictor from "./GoalPredictor";

interface Props {
  match: Match;
  expanded?: boolean;
  showAdmin?: boolean;
}

const STATUS_BADGE = {
  upcoming: { label: "Upcoming", cls: "border-white/10 bg-white/[0.06] text-slate-200" },
  live: { label: "Live", cls: "border-red-400/35 bg-red-500/12 text-red-300" },
  finished: { label: "Final", cls: "border-emerald-400/30 bg-emerald-500/12 text-emerald-300" },
};

export default function MatchCard({ match, expanded = false, showAdmin = false }: Props) {
  const [open, setOpen] = useState(expanded);
  const [adminOpen, setAdminOpen] = useState(false);
  const [hs, setHs] = useState("");
  const [as_, setAs] = useState("");
  const { updateScore } = useScoreStore();

  const liveMatch = useScoreStore((s) => s.matches.find((m) => m.id === match.id) || match);
  const home = getTeam(liveMatch.homeTeam);
  const away = getTeam(liveMatch.awayTeam);
  const insight = useMemo(() => getMatchInsight(liveMatch.homeTeam, liveMatch.awayTeam), [liveMatch.awayTeam, liveMatch.homeTeam]);
  const badge = STATUS_BADGE[liveMatch.status];
  const likelyWinner = insight.edge === "draw" ? "Level" : insight.edge === "home" ? home.shortName : away.shortName;
  const predictedScore = `${insight.homeGoals.toFixed(1)}-${insight.awayGoals.toFixed(1)}`;

  const handleUpdateScore = () => {
    const h = parseInt(hs);
    const a = parseInt(as_);
    if (!isNaN(h) && !isNaN(a) && h >= 0 && a >= 0) {
      updateScore(liveMatch.id, h, a, "finished");
      setAdminOpen(false);
      setHs("");
      setAs("");
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(160deg,rgba(15,23,42,0.94),rgba(2,6,23,0.96))] shadow-[0_22px_60px_rgba(2,6,23,0.4)] transition-all duration-300 hover:border-white/14">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: `${home.color}18` }} />
        <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full blur-3xl" style={{ background: `${away.color}18` }} />
      </div>
      {liveMatch.status === "live" && <div className="absolute inset-0 border border-red-400/25 shadow-[inset_0_0_28px_rgba(248,113,113,0.14)]" />}

      <div className="relative p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Group {liveMatch.group} • Matchday {liveMatch.matchday}
            </p>
            <p className="mt-1 text-sm text-slate-300">{liveMatch.venue}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-slate-300">
              {new Date(liveMatch.date + "T12:00:00").toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}
            </span>
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-200">
              {liveMatch.timeSAST}
            </span>
            <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${badge.cls}`}>
              {badge.label}
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] lg:items-center">
          <TeamSide code={liveMatch.homeTeam} side="home" accent={home.color} />

          <div className="mx-auto flex w-full min-w-0 flex-col items-center rounded-[1.4rem] border border-white/10 bg-slate-950/60 px-4 py-4 text-center backdrop-blur-md sm:px-5">
            {liveMatch.status !== "upcoming" ? (
              <div className="flex items-end gap-2">
                <span className={`text-4xl font-black tabular-nums sm:text-5xl ${liveMatch.status === "live" ? "text-red-300" : "text-white"}`}>
                  {liveMatch.homeScore}
                </span>
                <span className="pb-2 text-2xl font-light text-slate-500">-</span>
                <span className={`text-4xl font-black tabular-nums sm:text-5xl ${liveMatch.status === "live" ? "text-red-300" : "text-white"}`}>
                  {liveMatch.awayScore}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white sm:text-2xl">{insight.home}%</span>
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">to</span>
                <span className="text-xl font-black text-white sm:text-2xl">{insight.away}%</span>
              </div>
            )}
            <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-slate-500">
              {liveMatch.status === "upcoming" ? "Forecast edge" : "Match state"}
            </p>
            <div className="mt-3 w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
              <div className="flex h-2.5">
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
            </div>
            <p className="mt-3 max-w-full rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium text-cyan-100">
              Predicted score {predictedScore}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {insight.totalGoals.toFixed(1)} expected goals · {insight.intensity} confidence
            </p>
          </div>

          <TeamSide code={liveMatch.awayTeam} side="away" accent={away.color} />
        </div>

        <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Match pulse</p>
              <p className="mt-1 text-base font-semibold text-white">{likelyWinner === "Level" ? "Fine margins everywhere" : `${likelyWinner} lead the model`}</p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">{insight.narrative}</p>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 lg:min-w-[220px] lg:max-w-[280px]">
              <MetricPill label="Win edge" value={likelyWinner} tone="cyan" />
              <MetricPill label="Goal line" value={predictedScore} tone="amber" />
              <MetricPill label="Total goals" value={insight.totalGoals.toFixed(1)} tone="emerald" />
              <MetricPill label="Draw chance" value={`${insight.draw}%`} tone="slate" />
            </div>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="mt-4 flex w-full items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.06] sm:text-[15px]"
        >
          {open ? "Hide analytics" : "Open analytics and team detail"}
        </button>
      </div>

      {open && (
        <div className="relative border-t border-white/8 px-4 pb-5 pt-5 sm:px-5">
          <div className="grid gap-5">
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
              <OddsGauge homeCode={liveMatch.homeTeam} awayCode={liveMatch.awayTeam} />
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
              <GoalPredictor homeCode={liveMatch.homeTeam} awayCode={liveMatch.awayTeam} />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <TeamFactCard code={liveMatch.homeTeam} />
              <TeamFactCard code={liveMatch.awayTeam} />
            </div>

            {showAdmin && (
              <div className="rounded-[1.4rem] border border-white/8 bg-slate-950/50 p-4">
                {!adminOpen ? (
                  <button
                    onClick={() => setAdminOpen(true)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06]"
                  >
                    Update final score
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={hs}
                      onChange={(e) => setHs(e.target.value)}
                      placeholder={home.shortName}
                      className="min-w-[120px] flex-1 rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-center text-sm text-white outline-none"
                    />
                    <span className="text-slate-500">-</span>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={as_}
                      onChange={(e) => setAs(e.target.value)}
                      placeholder={away.shortName}
                      className="min-w-[120px] flex-1 rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-center text-sm text-white outline-none"
                    />
                    <button
                      onClick={handleUpdateScore}
                      className="rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300"
                    >
                      Save
                    </button>
                    <button onClick={() => setAdminOpen(false)} className="px-2 py-2 text-sm text-slate-400 hover:text-white">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function TeamSide({ code, side, accent }: { code: string; side: "home" | "away"; accent: string }) {
  const team = getTeam(code);
  const extras = TEAM_EXTRAS[code];
  const form = extras?.recentForm ?? [];

  return (
    <div className={`flex flex-col gap-3 ${side === "away" ? "lg:items-end lg:text-right" : ""}`}>
      <div className={`flex items-center gap-3 ${side === "away" ? "lg:flex-row-reverse" : ""}`}>
        <TeamFlag code={code} size="sm" variant="hero" />
        <div>
          <p className="max-w-[10rem] text-lg font-black leading-tight text-white sm:text-xl">{team.shortName}</p>
          <p className="text-xs text-slate-400 sm:text-sm">FIFA rank #{team.fifaRank}</p>
        </div>
      </div>

      <div className={`flex flex-wrap gap-2 ${side === "away" ? "lg:justify-end" : ""}`}>
        <MiniTag label={team.confederation} accent={accent} />
        <MiniTag label={extras?.prediction ?? "Projected run"} accent={accent} />
        <MiniTag label={team.keyPlayer} accent={accent} />
      </div>

      <div className={`flex flex-wrap items-center gap-2 ${side === "away" ? "lg:justify-end" : ""}`}>
        <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Recent form</span>
        <div className="flex gap-1">
          {form.map((result, index) => (
            <span
              key={`${code}-${result}-${index}`}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                result === "W"
                  ? "bg-emerald-500/18 text-emerald-300"
                  : result === "D"
                  ? "bg-amber-500/16 text-amber-200"
                  : "bg-rose-500/16 text-rose-200"
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniTag({ label, accent }: { label: string; accent: string }) {
  return (
    <span className="rounded-full border px-2.5 py-1 text-[10px] font-medium text-slate-200 sm:px-3 sm:text-[11px]" style={{ borderColor: `${accent}55`, background: `${accent}16` }}>
      {label}
    </span>
  );
}

function MetricPill({ label, value, tone }: { label: string; value: string; tone: "cyan" | "amber" | "emerald" | "slate" }) {
  const tones = {
    cyan: "border-cyan-400/20 bg-cyan-400/10 text-cyan-100",
    amber: "border-amber-400/20 bg-amber-400/10 text-amber-100",
    emerald: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
    slate: "border-white/10 bg-white/[0.05] text-slate-100",
  };

  return (
    <div className={`rounded-2xl border px-3 py-2 ${tones[tone]}`}>
      <p className="text-[11px] uppercase tracking-[0.2em] opacity-70">{label}</p>
      <p className="mt-1 text-[13px] font-semibold leading-5 sm:text-sm">{value}</p>
    </div>
  );
}

function TeamFactCard({ code }: { code: string }) {
  const team = getTeam(code);
  const extras = TEAM_EXTRAS[code];

  return (
    <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
      <div className="flex items-start gap-3">
        <TeamFlag code={code} size="sm" variant="card" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-white">{team.shortName}</h3>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-slate-300">
              #{team.fifaRank}
            </span>
            {extras?.squadValue && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-slate-300">
                {extras.squadValue}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{extras?.groupAnalysis ?? team.fact}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <FactStat label="Coach" value={extras?.coachName ?? team.quoteSource} />
        <FactStat label="Key player" value={team.keyPlayer} />
        <FactStat label="Projected run" value={extras?.prediction ?? "Group stage"} />
      </div>

      <div className="mt-4 rounded-2xl border border-white/8 bg-slate-950/45 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Locker-room line</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">&quot;{team.quote}&quot;</p>
        <p className="mt-2 text-xs text-slate-500">— {team.quoteSource}</p>
      </div>
    </div>
  );
}

function FactStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-[13px] font-medium leading-5 text-slate-200">{value}</p>
    </div>
  );
}
