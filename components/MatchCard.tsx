"use client";
import { useState } from "react";
import { Match } from "@/lib/data/fixtures";
import { getTeam } from "@/lib/data/teams";
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
  upcoming: { label: "Upcoming", cls: "bg-slate-700 text-slate-300" },
  live: { label: "● LIVE", cls: "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse" },
  finished: { label: "FT", cls: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" },
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
  const badge = STATUS_BADGE[liveMatch.status];

  const handleUpdateScore = () => {
    const h = parseInt(hs);
    const a = parseInt(as_);
    if (!isNaN(h) && !isNaN(a) && h >= 0 && a >= 0) {
      updateScore(liveMatch.id, h, a, "finished");
      setAdminOpen(false);
      setHs(""); setAs("");
    }
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm hover:border-white/10 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Live glow */}
      {liveMatch.status === "live" && (
        <div className="absolute inset-0 rounded-2xl border-2 border-red-500/30 animate-pulse pointer-events-none" />
      )}

      {/* Main content */}
      <div className="p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        {/* Top row: group/matchday + status badge + date/time */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-500 font-medium">
            Group {liveMatch.group} · MD{liveMatch.matchday}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badge.cls}`}>
            {badge.label}
          </span>
        </div>

        {/* Teams + Score row */}
        <div className="flex items-center gap-2">
          {/* Home team */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <TeamFlag code={liveMatch.homeTeam} size="sm" />
            <span className="text-white font-bold text-sm truncate leading-tight">{home.shortName}</span>
          </div>

          {/* Score block */}
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700/40 min-w-[90px] justify-center">
            {liveMatch.status !== "upcoming" ? (
              <>
                <span className={`text-2xl font-black tabular-nums ${liveMatch.status === "live" ? "text-red-400" : "text-white"}`}>
                  {liveMatch.homeScore}
                </span>
                <span className="text-slate-500 text-lg font-light">–</span>
                <span className={`text-2xl font-black tabular-nums ${liveMatch.status === "live" ? "text-red-400" : "text-white"}`}>
                  {liveMatch.awayScore}
                </span>
              </>
            ) : (
              <span className="text-slate-400 text-sm font-semibold">vs</span>
            )}
          </div>

          {/* Away team */}
          <div className="flex-1 flex items-center gap-2 justify-end min-w-0">
            <span className="text-white font-bold text-sm truncate text-right leading-tight">{away.shortName}</span>
            <TeamFlag code={liveMatch.awayTeam} size="sm" />
          </div>
        </div>

        {/* Date/Time + Venue */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
          <span>{new Date(liveMatch.date + "T12:00:00").toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}</span>
          <span className="text-amber-400/80 font-medium">{liveMatch.timeSAST}</span>
          <span className="truncate max-w-[120px] text-right">{liveMatch.venue}</span>
        </div>

        {/* Expand hint */}
        <div className="flex justify-center mt-2">
          <span className="text-slate-600 text-xs group-hover:text-slate-400 transition-colors">
            {open ? "▲ Hide details" : "▼ Odds & Predictions"}
          </span>
        </div>
      </div>

      {/* Expanded section */}
      {open && (
        <div className="border-t border-white/5 px-4 pb-4 pt-3 space-y-5">
          <OddsGauge homeCode={liveMatch.homeTeam} awayCode={liveMatch.awayTeam} />
          <div className="border-t border-white/5 pt-4">
            <GoalPredictor homeCode={liveMatch.homeTeam} awayCode={liveMatch.awayTeam} />
          </div>

          {/* Team facts */}
          <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
            <TeamFactCard code={liveMatch.homeTeam} />
            <TeamFactCard code={liveMatch.awayTeam} />
          </div>

          {/* Admin score update */}
          {showAdmin && (
            <div className="border-t border-white/5 pt-3">
              {!adminOpen ? (
                <button
                  onClick={() => setAdminOpen(true)}
                  className="w-full text-xs text-slate-500 hover:text-slate-300 py-1.5 rounded-lg border border-slate-700/40 hover:border-slate-600/60 transition-colors"
                >
                  ✎ Update Score
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="number" min="0" max="20" value={hs} onChange={(e) => setHs(e.target.value)}
                    placeholder={home.shortName}
                    className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm text-center"
                  />
                  <span className="text-slate-500">–</span>
                  <input
                    type="number" min="0" max="20" value={as_} onChange={(e) => setAs(e.target.value)}
                    placeholder={away.shortName}
                    className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm text-center"
                  />
                  <button onClick={handleUpdateScore}
                    className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-2 rounded-lg text-sm transition-colors">
                    ✓
                  </button>
                  <button onClick={() => setAdminOpen(false)}
                    className="text-slate-500 hover:text-slate-300 px-2 py-2 text-sm">✕</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TeamFactCard({ code }: { code: string }) {
  const team = getTeam(code);
  return (
    <div className="rounded-xl bg-slate-800/40 border border-slate-700/30 p-3 space-y-2">
      <div className="flex items-center gap-2">
        <TeamFlag code={code} size="xs" />
        <span className="text-white text-xs font-bold">{team.shortName}</span>
        <span className="ml-auto text-xs text-amber-400 font-semibold">#{team.fifaRank}</span>
      </div>
      <p className="text-xs text-slate-400 leading-snug">{team.fact}</p>
      <div className="border-t border-slate-700/30 pt-2">
        <p className="text-xs text-slate-300 italic">"{team.quote}"</p>
        <p className="text-xs text-slate-500 mt-1">— {team.quoteSource}</p>
      </div>
      <div className="text-xs text-slate-500">
        <span className="text-slate-400 font-medium">Key Player: </span>
        <span className="text-amber-400">{team.keyPlayer}</span>
      </div>
    </div>
  );
}
