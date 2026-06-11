"use client";
import { useState } from "react";
import Link from "next/link";
import { useScoreStore } from "@/lib/store";
import { GROUPS, getGroupFixtures } from "@/lib/data/fixtures";
import { getTeam } from "@/lib/data/teams";
import TeamFlag from "@/components/TeamFlag";
import GroupTable from "@/components/GroupTable";

export default function AdminPage() {
  const [selectedGroup, setSelectedGroup] = useState("A");
  const { matches, updateScore, resetMatch } = useScoreStore();
  const fixtures = getGroupFixtures(selectedGroup);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-slate-500 hover:text-white text-sm">← Home</Link>
      </div>

      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-slate-900/60 p-6">
        <h1 className="text-2xl font-black text-white">⚙️ Score Administration</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Update match scores, set match status, and manage live fixtures.
          All changes are saved to your browser locally.
        </p>
      </div>

      {/* Group selector */}
      <div className="flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGroup(g)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              selectedGroup === g
                ? "bg-amber-500 text-black"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
            }`}
          >
            Group {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match score editor */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-white font-bold">Group {selectedGroup} Matches</h2>
          {fixtures.map((f) => {
            const liveMatch = matches.find((m) => m.id === f.id) || f;
            return (
              <ScoreEditor
                key={f.id}
                matchId={f.id}
                homeCode={liveMatch.homeTeam}
                awayCode={liveMatch.awayTeam}
                homeScore={liveMatch.homeScore}
                awayScore={liveMatch.awayScore}
                status={liveMatch.status}
                date={liveMatch.date}
                timeSAST={liveMatch.timeSAST}
                onUpdate={updateScore}
                onReset={resetMatch}
              />
            );
          })}
        </div>

        {/* Live standings preview */}
        <div>
          <h2 className="text-white font-bold mb-3">Live Standings</h2>
          <div className="rounded-2xl border border-white/5 bg-slate-800/30 p-4">
            <GroupTable group={selectedGroup} />
          </div>
        </div>
      </div>

      {/* Bulk actions */}
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-sm">Reset All Scores</p>
          <p className="text-slate-500 text-xs">Clears all match results across all groups</p>
        </div>
        <button
          onClick={() => {
            if (confirm("Reset ALL scores? This cannot be undone.")) {
              matches.forEach((m) => {
                if (m.status !== "upcoming") resetMatch(m.id);
              });
            }
          }}
          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-semibold hover:bg-red-500/30 transition-colors"
        >
          Reset All
        </button>
      </div>
    </div>
  );
}

interface ScoreEditorProps {
  matchId: string;
  homeCode: string;
  awayCode: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "upcoming" | "live" | "finished";
  date: string;
  timeSAST: string;
  onUpdate: (id: string, hs: number, as_: number, status?: "upcoming" | "live" | "finished") => void;
  onReset: (id: string) => void;
}

function ScoreEditor({ matchId, homeCode, awayCode, homeScore, awayScore, status, date, timeSAST, onUpdate, onReset }: ScoreEditorProps) {
  const [hs, setHs] = useState(homeScore?.toString() ?? "");
  const [as_, setAs] = useState(awayScore?.toString() ?? "");
  const [liveStatus, setLiveStatus] = useState<"upcoming" | "live" | "finished">(status);
  const home = getTeam(homeCode);
  const away = getTeam(awayCode);

  const handleSave = () => {
    const h = parseInt(hs);
    const a = parseInt(as_);
    if (!isNaN(h) && !isNaN(a) && h >= 0 && a >= 0) {
      onUpdate(matchId, h, a, liveStatus);
    }
  };

  const statusColor = status === "live" ? "border-red-500/40 bg-red-500/5" : status === "finished" ? "border-emerald-500/30 bg-emerald-500/5" : "border-slate-700/40";

  return (
    <div className={`rounded-xl border ${statusColor} p-4 space-y-3`}>
      {/* Match header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TeamFlag code={homeCode} size="xs" />
          <span className="text-white font-bold text-sm">{home.shortName}</span>
          <span className="text-slate-500 text-sm">vs</span>
          <span className="text-white font-bold text-sm">{away.shortName}</span>
          <TeamFlag code={awayCode} size="xs" />
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">{date}</p>
          <p className="text-xs text-amber-400">{timeSAST}</p>
        </div>
      </div>

      {/* Score input */}
      <div className="flex items-center gap-3">
        <input
          type="number" min="0" max="20" value={hs}
          onChange={(e) => setHs(e.target.value)}
          placeholder="0"
          className="w-16 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-center font-black text-lg"
        />
        <span className="text-slate-500 font-bold text-lg">–</span>
        <input
          type="number" min="0" max="20" value={as_}
          onChange={(e) => setAs(e.target.value)}
          placeholder="0"
          className="w-16 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-center font-black text-lg"
        />

        <select
          value={liveStatus}
          onChange={(e) => setLiveStatus(e.target.value as typeof liveStatus)}
          className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 text-sm"
        >
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="finished">Full Time</option>
        </select>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors"
        >
          Save
        </button>

        {status !== "upcoming" && (
          <button
            onClick={() => { onReset(matchId); setHs(""); setAs(""); setLiveStatus("upcoming"); }}
            className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {homeScore !== null && awayScore !== null && (
        <p className="text-xs text-slate-500">
          Current: {home.shortName} {homeScore}–{awayScore} {away.shortName} ({status.toUpperCase()})
        </p>
      )}
    </div>
  );
}
