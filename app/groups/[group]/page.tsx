import { notFound } from "next/navigation";
import Link from "next/link";
import { getGroupFixtures, GROUPS } from "@/lib/data/fixtures";
import { getTeam } from "@/lib/data/teams";
import MatchCard from "@/components/MatchCard";
import GroupTable from "@/components/GroupTable";
import TeamFlag from "@/components/TeamFlag";

export function generateStaticParams() {
  return GROUPS.map((g) => ({ group: g }));
}

const GROUP_COLORS: Record<string, string> = {
  A: "#ef4444", B: "#f97316", C: "#eab308", D: "#22c55e",
  E: "#14b8a6", F: "#3b82f6", G: "#8b5cf6", H: "#ec4899",
  I: "#f43f5e", J: "#10b981", K: "#6366f1", L: "#06b6d4",
};

export default function GroupPage({ params }: { params: { group: string } }) {
  const group = params.group.toUpperCase();
  if (!GROUPS.includes(group)) notFound();

  const fixtures = getGroupFixtures(group);
  const color = GROUP_COLORS[group] || "#6366f1";
  const teams = [...new Set(fixtures.flatMap((m) => [m.homeTeam, m.awayTeam]))];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-slate-500 hover:text-white text-sm transition-colors flex items-center gap-1"
        >
          ← Home
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-slate-400 text-sm">Groups</span>
        <span className="text-slate-700">/</span>
        <span
          className="text-sm font-bold"
          style={{ color }}
        >
          Group {group}
        </span>
      </div>

      {/* Hero */}
      <div
        className="rounded-3xl overflow-hidden border border-white/5 p-8"
        style={{ background: `linear-gradient(135deg, ${color}18, #0a0f1e)` }}
      >
        <div className="flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${color}cc, ${color}55)` }}
          >
            {group}
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Group {group}</h1>
            <p className="text-slate-400 mt-1">
              {teams.map((t) => getTeam(t).shortName).join(" · ")}
            </p>
          </div>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {teams.map((code) => {
            const team = getTeam(code);
            return (
              <div
                key={code}
                className="rounded-xl border border-white/5 bg-slate-800/40 p-3 flex flex-col items-center gap-2 text-center"
              >
                <TeamFlag code={code} size="lg" />
                <div>
                  <p className="text-white font-bold text-sm">{team.shortName}</p>
                  <p className="text-slate-500 text-xs">#{team.fifaRank} FIFA</p>
                  <p className="text-slate-500 text-xs">{team.wcTitles > 0 ? `${team.wcTitles}× Champion` : team.wcBestResult.split(" (")[0]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standings */}
      <div className="rounded-2xl border border-white/5 bg-slate-800/30 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="text-white font-bold text-lg">Standings</h2>
        </div>
        <div className="p-4">
          <GroupTable group={group} />
        </div>
      </div>

      {/* Fixtures by matchday */}
      {[1, 2, 3].map((md) => {
        const mdMatches = fixtures.filter((m) => m.matchday === md);
        return (
          <div key={md}>
            <h2 className="text-white font-bold text-lg mb-3">Matchday {md}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mdMatches.map((m) => (
                <MatchCard key={m.id} match={m} showAdmin />
              ))}
            </div>
          </div>
        );
      })}

      {/* Group navigation */}
      <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-white/5">
        <p className="w-full text-center text-slate-500 text-sm mb-2">Other Groups</p>
        {GROUPS.filter((g) => g !== group).map((g) => (
          <Link
            key={g}
            href={`/groups/${g}`}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
            style={{ "--hover-color": GROUP_COLORS[g] } as React.CSSProperties}
          >
            {g}
          </Link>
        ))}
      </div>
    </div>
  );
}
