"use client";
import { useMemo } from "react";
import { computeStandings, useScoreStore } from "@/lib/store";
import TeamFlag from "./TeamFlag";

interface Props {
  group: string;
  compact?: boolean;
}

export default function GroupTable({ group, compact = false }: Props) {
  const matches = useScoreStore((s) => s.matches);
  const standings = useMemo(
    () => computeStandings(matches, group),
    [matches, group]
  );

  if (!standings.length) return null;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-slate-500 text-left border-b border-slate-700/50">
            <th className="pb-1.5 pl-2 font-semibold w-6">#</th>
            <th className="pb-1.5 font-semibold">Team</th>
            <th className="pb-1.5 text-center font-semibold w-7">P</th>
            {!compact && <>
              <th className="pb-1.5 text-center font-semibold w-7">W</th>
              <th className="pb-1.5 text-center font-semibold w-7">D</th>
              <th className="pb-1.5 text-center font-semibold w-7">L</th>
              <th className="pb-1.5 text-center font-semibold w-10">GF</th>
              <th className="pb-1.5 text-center font-semibold w-10">GA</th>
            </>}
            <th className="pb-1.5 text-center font-semibold w-10">GD</th>
            <th className="pb-1.5 text-center font-semibold w-8 pr-2">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, i) => {
            const qualified = i < 2;
            const thirdPlace = i === 2;
            return (
              <tr
                key={row.team}
                className={`border-b border-slate-800/60 last:border-0 ${qualified ? "bg-emerald-500/5" : thirdPlace ? "bg-amber-500/5" : ""}`}
              >
                <td className="py-2 pl-2">
                  {qualified ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                  ) : (
                    <span className="text-slate-500 w-5 inline-block text-center">{i + 1}</span>
                  )}
                </td>
                <td className="py-2 pr-2">
                  <TeamFlag code={row.team} size="xs" showName nameStyle="short" />
                </td>
                <td className="py-2 text-center text-slate-300">{row.played}</td>
                {!compact && <>
                  <td className="py-2 text-center text-slate-300">{row.won}</td>
                  <td className="py-2 text-center text-slate-300">{row.drawn}</td>
                  <td className="py-2 text-center text-slate-300">{row.lost}</td>
                  <td className="py-2 text-center text-slate-300">{row.gf}</td>
                  <td className="py-2 text-center text-slate-300">{row.ga}</td>
                </>}
                <td className={`py-2 text-center ${row.gd > 0 ? "text-emerald-400" : row.gd < 0 ? "text-red-400" : "text-slate-400"}`}>
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </td>
                <td className="py-2 text-center font-black pr-2">
                  <span className={`${qualified ? "text-emerald-400" : "text-white"}`}>{row.pts}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 px-2">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500/60 inline-block" /> Qualified
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500/60 inline-block" /> Potential 3rd
        </span>
      </div>
    </div>
  );
}
