"use client";
import { useEffect, useState } from "react";
import { GROUP_FIXTURES } from "@/lib/data/fixtures";
import { useScoreStore } from "@/lib/store";

function TrophySVG() {
  return (
    <svg viewBox="0 0 120 160" className="w-24 h-32 drop-shadow-2xl" fill="none">
      {/* Glow */}
      <ellipse cx="60" cy="100" rx="40" ry="8" fill="#F5A623" opacity="0.15" />
      {/* Trophy base */}
      <rect x="42" y="130" width="36" height="6" rx="3" fill="#C9820A" />
      <rect x="36" y="120" width="48" height="12" rx="4" fill="#E8A020" />
      {/* Trophy stem */}
      <rect x="55" y="100" width="10" height="22" rx="2" fill="#E8A020" />
      {/* Trophy cup */}
      <path d="M30 40 Q28 80 50 95 Q60 100 70 95 Q92 80 90 40 Z" fill="url(#gold)" />
      {/* Handles */}
      <path d="M30 50 Q14 50 14 65 Q14 80 30 75" stroke="#C9820A" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M90 50 Q106 50 106 65 Q106 80 90 75" stroke="#C9820A" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Shine */}
      <path d="M45 55 Q55 48 58 65" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
      {/* Stars */}
      <text x="52" y="78" fontSize="18" fill="white" opacity="0.9">★</text>
      <defs>
        <linearGradient id="gold" x1="30" y1="40" x2="90" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#F5A623" />
          <stop offset="100%" stopColor="#C9820A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HeroBanner() {
  const [now, setNow] = useState(new Date());
  const [liveCount, setLiveCount] = useState(0);
  const matches = useScoreStore((s) => s.matches);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setLiveCount(matches.filter((m) => m.status === "live").length);
  }, [matches]);

  const totalMatches = GROUP_FIXTURES.length;
  const finishedMatches = matches.filter((m) => m.status === "finished").length;
  const todayMatches = matches.filter((m) => m.date === now.toISOString().slice(0, 10));

  const timeStr = now.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0A0F1E] via-[#0d1a3a] to-[#0A0F1E]">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: i % 2 === 0 ? "#F5A623" : "#3b82f6",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
            }}
          />
        ))}
      </div>

      {/* Gradient overlay arcs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10 px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Trophy */}
          <div className="flex-shrink-0 animate-[float_4s_ease-in-out_infinite]">
            <TrophySVG />
          </div>

          {/* Main text */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest border border-amber-400/30 px-3 py-1 rounded-full bg-amber-400/10">
                23rd Edition · 2026
              </span>
              {liveCount > 0 && (
                <span className="text-xs font-semibold text-red-400 uppercase tracking-widest border border-red-400/30 px-3 py-1 rounded-full bg-red-400/10 animate-pulse">
                  {liveCount} Live
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                FIFA
              </span>{" "}
              World Cup
              <br />
              <span className="text-white/90">2026</span>
            </h1>

            <p className="mt-2 text-slate-400 text-sm md:text-base">
              USA · Canada · Mexico · June 11 – July 19, 2026
            </p>

            {/* Stats row */}
            <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
              <StatChip label="Teams" value="48" color="amber" />
              <StatChip label="Groups" value="12" color="blue" />
              <StatChip label="Matches Played" value={`${finishedMatches}/${totalMatches}`} color="emerald" />
              <StatChip label="Today's Matches" value={`${todayMatches.length}`} color="purple" />
            </div>
          </div>

          {/* Live clock */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <div className="rounded-2xl bg-slate-800/60 border border-slate-700/40 px-5 py-3 text-center backdrop-blur-sm">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-semibold">SAST</p>
              <p className="text-2xl font-black text-white tabular-nums tracking-tight">{timeStr}</p>
              <p className="text-xs text-slate-500 mt-1">
                {now.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })}
              </p>
            </div>
            <p className="text-xs text-slate-600 mt-1">South African Standard Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatChip({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
    blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
  };
  return (
    <div className={`rounded-xl border bg-gradient-to-br ${colors[color]} px-4 py-2 text-center`}>
      <p className={`text-xl font-black ${colors[color].split(" ").pop()}`}>{value}</p>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
    </div>
  );
}
