import { getTeam } from "@/lib/data/teams";
import { getTeamExtras } from "@/lib/data/teamExtras";
import TeamFlag from "./TeamFlag";
import FormGuide from "./FormGuide";

interface GroupAnalysisProps {
  group: string;
  teams: string[];     // team codes
  color: string;
}

const PREDICTION_COLOR: Record<string, string> = {
  "Final": "text-yellow-400",
  "Semi-finals": "text-orange-400",
  "Quarter-finals": "text-sky-400",
  "Round of 32": "text-emerald-400",
  "Group stage": "text-slate-400",
};

export default function GroupAnalysis({ group, teams, color }: GroupAnalysisProps) {
  // Filter teams upfront to avoid null returns from map (prevents hydration mismatch)
  const validTeams = teams.filter((code) => getTeamExtras(code));

  return (
    <div
      className="rounded-2xl border border-white/5 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${color}0a, #0a0f1e)` }}
    >
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black text-white"
          style={{ background: color }}
        >
          {group}
        </div>
        <h3 className="text-white font-bold">Group {group} Analysis</h3>
      </div>

      <div className="divide-y divide-white/5">
        {validTeams.map((code, idx) => {
          const team = getTeam(code);
          const extras = getTeamExtras(code)!;

          const predColor = PREDICTION_COLOR[extras.prediction] ?? "text-slate-400";

          return (
            <div key={code} className="px-5 py-3 flex items-center gap-3">
              {/* Rank badge */}
              <span className="text-slate-600 text-xs w-4 shrink-0">{idx + 1}</span>

              {/* Flag + name */}
              <TeamFlag code={code} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white text-sm font-semibold truncate">{team.shortName}</span>
                  <span className="text-slate-500 text-xs">#{team.fifaRank}</span>
                </div>
                <p className="text-slate-500 text-xs truncate">{extras.coachName}</p>
              </div>

              {/* Form */}
              <div className="hidden sm:block">
                <FormGuide form={extras.recentForm} size="sm" />
              </div>

              {/* Prediction */}
              <div className="text-right shrink-0">
                <p className={`text-xs font-semibold ${predColor}`}>{extras.prediction}</p>
                <p className="text-slate-600 text-[10px]">€{team.fifaRank}★ rank</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Group note */}
      {validTeams[0] && getTeamExtras(validTeams[0])?.groupAnalysis && (
        <div className="px-5 py-3 border-t border-white/5">
          <p className="text-slate-400 text-xs italic leading-relaxed">
            {getTeamExtras(validTeams[0])?.groupAnalysis}
          </p>
        </div>
      )}
    </div>
  );
}
