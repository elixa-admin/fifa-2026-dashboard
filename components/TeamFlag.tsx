"use client";
import Image from "next/image";
import { getTeam } from "@/lib/data/teams";

interface Props {
  code: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  nameStyle?: "short" | "full" | "code";
  className?: string;
  variant?: "default" | "card" | "hero";
}

const SIZES = { xs: 20, sm: 28, md: 40, lg: 56, xl: 80 };

export default function TeamFlag({
  code,
  size = "md",
  showName = false,
  nameStyle = "short",
  className = "",
  variant = "default",
}: Props) {
  const team = getTeam(code);
  const px = SIZES[size];
  const displayName = nameStyle === "full" ? team.name : nameStyle === "code" ? team.code : team.shortName;
  const shellClass =
    variant === "hero"
      ? "rounded-2xl border border-white/15 bg-white/10 shadow-[0_18px_48px_rgba(2,6,23,0.32)]"
      : variant === "card"
      ? "rounded-xl border border-white/12 bg-white/[0.06] shadow-[0_12px_28px_rgba(2,6,23,0.28)]"
      : "rounded-lg border border-white/10 bg-white/[0.04] shadow-sm";
  const innerRadius = variant === "hero" ? "rounded-xl" : variant === "card" ? "rounded-lg" : "rounded";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative p-1.5 ${shellClass}`} style={{ minWidth: px * 1.5 + 12 }}>
        <div
          className={`relative overflow-hidden ${innerRadius}`}
          style={{ width: px * 1.5, height: px, minWidth: px * 1.5 }}
        >
          <Image
            src={`https://flagcdn.com/w${px * 2}/${team.flagCode}.png`}
            alt={team.name}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/10" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70"
          style={{ boxShadow: `inset 0 0 0 1px ${team.color}35` }}
        />
      </div>
      {showName && (
        <span className="text-white font-semibold truncate leading-tight">{displayName}</span>
      )}
    </div>
  );
}
