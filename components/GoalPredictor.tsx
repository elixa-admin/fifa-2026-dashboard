"use client";
import { getGoalPrediction, getWinProbability, getTeam } from "@/lib/data/teams";
import TeamFlag from "./TeamFlag";

interface Props {
  homeCode: string;
  awayCode: string;
}

const OUTCOMES = [
  { label: "Home Win", color: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-500/30", text: "text-emerald-400" },
  { label: "Draw", color: "from-amber-500/20 to-amber-600/10", border: "border-amber-500/30", text: "text-amber-400" },
  { label: "Away Win", color: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/30", text: "text-blue-400" },
];

export default function GoalPredictor({ homeCode, awayCode }: Props) {
  const pred = getGoalPrediction(homeCode, awayCode);
  const { home: homeWin, draw, away: awayWin } = getWinProbability(homeCode, awayCode);
  const homeTeam = getTeam(homeCode);
  const awayTeam = getTeam(awayCode);

  const homeGoals = Math.round(pred.home);
  const awayGoals = Math.round(pred.away);

  const scenarios = [
    { ...OUTCOMES[0], prob: homeWin, score: `${homeGoals + 1}–${Math.max(0, awayGoals - 1)}` },
    { ...OUTCOMES[1], prob: draw, score: `${homeGoals}–${homeGoals}` },
    { ...OUTCOMES[2], prob: awayWin, score: `${Math.max(0, homeGoals - 1)}–${awayGoals + 1}` },
  ];

  return (
    <div className="space-y-3">
      <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-semibold">
        Predicted Score
      </p>

      {/* Main prediction */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <TeamFlag code={homeCode} size="md" />
          <span className="text-white text-xs font-medium">{homeTeam.shortName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-black text-white tabular-nums tracking-tight"
            style={{ textShadow: `0 0 20px ${homeTeam.color}99` }}>
            {pred.home.toFixed(1)}
          </span>
          <span className="text-slate-500 text-2xl font-light">–</span>
          <span className="text-4xl font-black text-white tabular-nums tracking-tight"
            style={{ textShadow: `0 0 20px ${awayTeam.color}99` }}>
            {pred.away.toFixed(1)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <TeamFlag code={awayCode} size="md" />
          <span className="text-white text-xs font-medium">{awayTeam.shortName}</span>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">Expected goals (xG model)</p>

      {/* Outcome scenarios */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {scenarios.map((s) => (
          <div
            key={s.label}
            className={`rounded-lg border ${s.border} bg-gradient-to-br ${s.color} p-2 text-center`}
          >
            <div className={`text-xs font-bold ${s.text} mb-1`}>{s.label}</div>
            <div className="text-white font-black text-lg tracking-tight">{s.score}</div>
            <div className="text-slate-400 text-xs mt-0.5">{s.prob}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
