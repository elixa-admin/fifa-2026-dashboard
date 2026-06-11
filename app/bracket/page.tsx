"use client";
import Link from "next/link";

// Bracket structure for FIFA 2026 World Cup
// Round of 32: 16 matches
// Round of 16: 8 matches
// Quarterfinals: 4 matches
// Semifinals: 2 matches
// Third place: 1 match
// Final: 1 match

const ROUND_DATES = {
  r32: "June 28 – July 4",
  r16: "July 4 – 8",
  qf: "July 11 – 12",
  sf: "July 15 – 16",
  third: "July 19",
  final: "July 19",
};

export default function BracketPage() {
  const groups = ["A","B","C","D","E","F","G","H","I","J","K","L"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">← Home</Link>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-black text-white">
          <span className="text-amber-400">2026</span> World Cup Bracket
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Knockout stage begins June 28 · Final July 19 · MetLife Stadium</p>
      </div>

      {/* Format explanation */}
      <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/40 to-slate-900/60 p-5">
        <h2 className="text-white font-bold mb-3">Tournament Format</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { round: "Group Stage", teams: "48 teams, 12 groups", date: "Jun 11 – Jun 28" },
            { round: "Round of 32", teams: "32 teams (top 2 per group + 8 best 3rd)", date: ROUND_DATES.r32 },
            { round: "Round of 16 → Final", teams: "QF: July 11–12 · SF: July 15–16", date: ROUND_DATES.final },
            { round: "🏆 Final", teams: "MetLife Stadium · East Rutherford", date: "July 19, 2026" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl bg-slate-800/40 border border-slate-700/30 p-3">
              <p className="text-amber-400 font-bold text-xs">{item.round}</p>
              <p className="text-white text-xs mt-1">{item.teams}</p>
              <p className="text-slate-500 text-xs mt-0.5">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Group qualification overview */}
      <div>
        <h2 className="text-white font-bold text-xl mb-4">Group Qualification Status</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {groups.map((g) => (
            <QualificationCard key={g} group={g} />
          ))}
        </div>
      </div>

      {/* Visual bracket placeholder */}
      <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/30 to-slate-900/60 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Knockout Bracket</h2>
            <p className="text-slate-500 text-xs mt-0.5">Bracket fills in as group stage results come in</p>
          </div>
          <span className="text-xs text-amber-400 border border-amber-400/30 px-2 py-1 rounded-full">
            Group stage in progress
          </span>
        </div>

        <div className="p-6 overflow-x-auto">
          <BracketVisualization />
        </div>
      </div>

      {/* Key dates */}
      <div>
        <h2 className="text-white font-bold text-xl mb-4">Key Dates</h2>
        <div className="space-y-2">
          {[
            { emoji: "⚽", label: "Group Stage", date: "June 11 – June 28, 2026", desc: "72 matches across 16 venues" },
            { emoji: "🥊", label: "Round of 32", date: "June 28 – July 4, 2026", desc: "16 matches — first knockout round" },
            { emoji: "⚡", label: "Round of 16", date: "July 4 – July 8, 2026", desc: "8 matches" },
            { emoji: "💥", label: "Quarter-finals", date: "July 11 – July 12, 2026", desc: "4 matches" },
            { emoji: "🔥", label: "Semi-finals", date: "July 15 – July 16, 2026", desc: "2 matches" },
            { emoji: "🥉", label: "Third Place Play-off", date: "July 19, 2026", desc: "Hard Rock Stadium, Miami" },
            { emoji: "🏆", label: "FINAL", date: "July 19, 2026", desc: "MetLife Stadium, East Rutherford, NJ" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
              <span className="text-xl w-8 text-center flex-shrink-0">{item.emoji}</span>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{item.label}</p>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
              <p className="text-amber-400 text-xs font-medium text-right">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QualificationCard({ group }: { group: string }) {
  const colors: Record<string, string> = {
    A: "#ef4444", B: "#f97316", C: "#eab308", D: "#22c55e",
    E: "#14b8a6", F: "#3b82f6", G: "#8b5cf6", H: "#ec4899",
    I: "#f43f5e", J: "#10b981", K: "#6366f1", L: "#06b6d4",
  };
  const color = colors[group];

  return (
    <Link href={`/groups/${group}`}>
      <div
        className="rounded-xl border border-white/5 p-3 hover:border-white/10 transition-all cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${color}12, #0f172a)` }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
            style={{ background: `${color}aa` }}
          >
            {group}
          </div>
          <span className="text-white font-bold text-sm">Group {group}</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-400 text-xs">1st: TBD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
            <span className="text-slate-400 text-xs">2nd: TBD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500/40" />
            <span className="text-slate-500 text-xs">3rd: Possible</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-amber-400/70 font-medium">View Group →</p>
      </div>
    </Link>
  );
}

function BracketVisualization() {
  const rounds = [
    { name: "R32", label: "Round of 32", slots: 8, date: "Jun 28 – Jul 2" },
    { name: "R16", label: "Round of 16", slots: 4, date: "Jul 4 – 8" },
    { name: "QF", label: "Quarter-finals", slots: 2, date: "Jul 11 – 12" },
    { name: "SF", label: "Semi-finals", slots: 1, date: "Jul 15 – 16" },
    { name: "F", label: "Final", slots: 1, date: "Jul 19" },
  ];

  return (
    <div className="flex gap-4 min-w-[700px]">
      {rounds.map((round) => (
        <div key={round.name} className="flex flex-col gap-3 flex-1">
          <div className="text-center">
            <p className="text-xs font-bold text-amber-400">{round.label}</p>
            <p className="text-xs text-slate-600">{round.date}</p>
          </div>
          <div className="flex flex-col justify-around flex-1 gap-2">
            {[...Array(round.slots)].map((_, si) => (
              <BracketSlot key={si} isFinal={round.name === "F"} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BracketSlot({ isFinal }: { isFinal: boolean }) {
  return (
    <div className={`rounded-xl border border-slate-700/40 bg-slate-800/30 overflow-hidden ${isFinal ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-slate-800/30" : ""}`}>
      {isFinal && (
        <div className="bg-amber-500/20 text-amber-400 text-xs font-bold text-center py-1">🏆 FINAL</div>
      )}
      <div className="p-2 border-b border-slate-700/30 flex items-center gap-2">
        <div className="w-5 h-3 rounded bg-slate-700/60" />
        <div className="h-2 flex-1 rounded bg-slate-700/40" />
      </div>
      <div className="p-2 flex items-center gap-2">
        <div className="w-5 h-3 rounded bg-slate-700/60" />
        <div className="h-2 flex-1 rounded bg-slate-700/40" />
      </div>
    </div>
  );
}
