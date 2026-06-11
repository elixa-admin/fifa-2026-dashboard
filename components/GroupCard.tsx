"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { getGroupFixtures } from "@/lib/data/fixtures";
import { useScoreStore } from "@/lib/store";
import TeamFlag from "./TeamFlag";
import GroupTable from "./GroupTable";

const GROUP_COLORS: Record<string, string> = {
  A: "#ef4444", B: "#f97316", C: "#eab308", D: "#22c55e",
  E: "#14b8a6", F: "#3b82f6", G: "#8b5cf6", H: "#ec4899",
  I: "#f43f5e", J: "#10b981", K: "#6366f1", L: "#06b6d4",
};

interface Props {
  group: string;
}

export default function GroupCard({ group }: Props) {
  const [expanded, setExpanded] = useState(false);
  const fixtures = getGroupFixtures(group);
  const allMatches = useScoreStore((s) => s.matches);
  const matches = useMemo(
    () => allMatches.filter((m) => m.group === group),
    [allMatches, group]
  );
  const color = GROUP_COLORS[group] || "#6366f1";
  const teams = [...new Set(fixtures.flatMap((m) => [m.homeTeam, m.awayTeam]))];
  const played = matches.filter((m) => m.status === "finished").length;
  const live = matches.some((m) => m.status === "live");

  return (
    <div
      className="relative rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] cursor-pointer"
      style={{ background: `linear-gradient(135deg, ${color}08, #0f172a)` }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Color accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      {/* Live badge */}
      {live && (
        <div className="absolute top-3 right-3 text-xs bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded-full font-semibold animate-pulse">
          LIVE
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${color}cc, ${color}66)` }}
          >
            {group}
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Group {group}</h3>
            <p className="text-slate-500 text-xs">{played}/6 played</p>
          </div>
        </div>

        {/* Team flags row */}
        <div className="flex items-center gap-1.5 mb-3">
          {teams.map((t) => (
            <div key={t} className="flex flex-col items-center gap-1">
              <TeamFlag code={t} size="sm" />
            </div>
          ))}
        </div>

        {/* Standings table */}
        <GroupTable group={group} compact />

        {/* Expand hint */}
        <div className="text-center mt-2 text-xs text-slate-600 hover:text-slate-400">
          {expanded ? "▲ Collapse" : "▼ View Matches"}
        </div>
      </div>

      {/* Expanded matches */}
      {expanded && (
        <div className="border-t border-white/5 px-4 pb-4 space-y-2" onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/groups/${group}`}
            className="block text-center text-xs text-amber-400 hover:text-amber-300 mt-2 mb-1 font-semibold"
          >
            Full Group {group} →
          </Link>
          {fixtures.slice(0, 3).map((f) => {
            const liveM = matches.find((m) => m.id === f.id) || f;
            return (
              <div key={f.id} className="flex items-center gap-2 text-xs py-1.5">
                <TeamFlag code={liveM.homeTeam} size="xs" />
                <span className="text-slate-300 flex-1 truncate">{liveM.homeTeam}</span>
                <span className="text-slate-400 font-mono px-2">
                  {liveM.status !== "upcoming" ? `${liveM.homeScore}–${liveM.awayScore}` : liveM.timeSAST.split(" ")[0]}
                </span>
                <span className="text-slate-300 flex-1 truncate text-right">{liveM.awayTeam}</span>
                <TeamFlag code={liveM.awayTeam} size="xs" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
