"use client";
import Image from "next/image";
import { getTeam } from "@/lib/data/teams";

interface Props {
  code: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  nameStyle?: "short" | "full" | "code";
  className?: string;
}

const SIZES = { xs: 20, sm: 28, md: 40, lg: 56, xl: 80 };

export default function TeamFlag({ code, size = "md", showName = false, nameStyle = "short", className = "" }: Props) {
  const team = getTeam(code);
  const px = SIZES[size];

  const displayName = nameStyle === "full" ? team.name : nameStyle === "code" ? team.code : team.shortName;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="relative rounded overflow-hidden shadow-sm flex-shrink-0"
        style={{ width: px * 1.5, height: px, minWidth: px * 1.5 }}
      >
        <Image
          src={`https://flagcdn.com/w${px * 2}/${team.flagCode}.png`}
          alt={team.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      {showName && (
        <span className="text-white font-semibold truncate leading-tight">{displayName}</span>
      )}
    </div>
  );
}
