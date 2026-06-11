"use client";
import { getWinProbability, getTeam } from "@/lib/data/teams";
import TeamFlag from "./TeamFlag";

interface Props {
  homeCode: string;
  awayCode: string;
}

export default function OddsGauge({ homeCode, awayCode }: Props) {
  const { home, draw, away } = getWinProbability(homeCode, awayCode);
  const homeTeam = getTeam(homeCode);
  const awayTeam = getTeam(awayCode);

  // Thermometer bar
  return (
    <div className="w-full space-y-3">
      {/* Header label */}
      <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-semibold">Win Probability</p>

      {/* Bar gauge */}
      <div className="relative h-8 rounded-full overflow-hidden bg-slate-800/60 border border-slate-700/40">
        {/* Home fill */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
          style={{
            width: `${home}%`,
            background: `linear-gradient(90deg, ${homeTeam.color}cc, ${homeTeam.color})`,
          }}
        >
          {home > 14 && (
            <span className="text-white text-xs font-bold drop-shadow">{home}%</span>
          )}
        </div>
        {/* Draw zone */}
        <div
          className="absolute inset-y-0 bg-slate-600/80 flex items-center justify-center"
          style={{ left: `${home}%`, width: `${draw}%` }}
        >
          {draw > 8 && (
            <span className="text-slate-200 text-xs font-semibold">{draw}%</span>
          )}
        </div>
        {/* Away fill */}
        <div
          className="absolute inset-y-0 right-0 transition-all duration-1000 ease-out flex items-center justify-start pl-2"
          style={{
            width: `${away}%`,
            background: `linear-gradient(90deg, ${awayTeam.color}, ${awayTeam.color}cc)`,
          }}
        >
          {away > 14 && (
            <span className="text-white text-xs font-bold drop-shadow">{away}%</span>
          )}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between items-center text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <TeamFlag code={homeCode} size="xs" />
          <span className="font-medium">{homeTeam.shortName}</span>
        </div>
        <span className="text-slate-500">Draw {draw}%</span>
        <div className="flex items-center gap-1.5">
          <span className="font-medium">{awayTeam.shortName}</span>
          <TeamFlag code={awayCode} size="xs" />
        </div>
      </div>

      {/* Semicircle odometer */}
      <OdometerGauge homeCode={homeCode} awayCode={awayCode} homePercent={home} awayPercent={away} />
    </div>
  );
}

function OdometerGauge({
  homeCode,
  awayCode,
  homePercent,
  awayPercent,
}: {
  homeCode: string;
  awayCode: string;
  homePercent: number;
  awayPercent: number;
}) {
  const homeTeam = getTeam(homeCode);
  const awayTeam = getTeam(awayCode);

  const R = 70;
  const cx = 100;
  const cy = 90;
  const angle = 180 - (homePercent / 100) * 180; // degrees (180° = full away, 0° = full home)
  const rad = (angle * Math.PI) / 180;
  const nx = cx + R * Math.cos(rad);
  const ny = cy - R * Math.sin(rad);

  // Arc path helper
  function arcPath(startAngle: number, endAngle: number, r: number, color: string) {
    const s = (startAngle * Math.PI) / 180;
    const e = (endAngle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s);
    const y1 = cy - r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy - r * Math.sin(e);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return (
      <path
        d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 0 ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />
    );
  }

  return (
    <div className="flex justify-center mt-1">
      <svg viewBox="0 30 200 75" className="w-full max-w-[220px] h-auto">
        {/* Background arc */}
        {arcPath(0, 180, R, "#1e293b")}
        {/* Away arc */}
        {arcPath(0, 180 - (homePercent / 100) * 180, R, awayTeam.color + "aa")}
        {/* Home arc */}
        {arcPath(180 - (homePercent / 100) * 180, 180, R, homeTeam.color + "dd")}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="drop-shadow-lg"
          style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))" }}
        />
        {/* Pivot */}
        <circle cx={cx} cy={cy} r="5" fill="white" className="drop-shadow" />

        {/* Labels */}
        <text x="30" y="88" fill={homeTeam.color} fontSize="9" fontWeight="bold" textAnchor="middle">
          {homePercent}%
        </text>
        <text x="170" y="88" fill={awayTeam.color} fontSize="9" fontWeight="bold" textAnchor="middle">
          {awayPercent}%
        </text>
      </svg>
    </div>
  );
}
