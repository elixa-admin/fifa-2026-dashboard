import HeroBanner from "@/components/HeroBanner";
import LiveTicker from "@/components/LiveTicker";
import GroupCard from "@/components/GroupCard";
import TournamentOdds from "@/components/TournamentOdds";
import MatchCard from "@/components/MatchCard";
import TeamFlag from "@/components/TeamFlag";
import FormGuide from "@/components/FormGuide";
import { GROUP_FIXTURES, GROUPS, getTodaysMatches } from "@/lib/data/fixtures";
import { TEAM_EXTRAS } from "@/lib/data/teamExtras";
import { TEAMS } from "@/lib/data/teams";
import Link from "next/link";

// Top contenders shown on home page
const TOP_CONTENDERS = ["FRA", "ESP", "ARG", "BRA", "ENG", "GER", "POR", "NED", "MAR", "BEL"];

// Players to watch: [teamCode, playerName, role, funFact]
const PLAYERS_TO_WATCH: [string, string, string, string][] = [
  ["ARG", "Lionel Messi", "Forward", "Final World Cup at 38 — the GOAT's last dance"],
  ["FRA", "Kylian Mbappé", "Forward", "Captain of FIFA #1 ranked France, plays for Real Madrid"],
  ["ESP", "Lamine Yamal", "Winger", "Born the day Spain won the 2002 WC final — now starting for them"],
  ["NOR", "Erling Haaland", "Striker", "Top qualifying scorer in Europe with 16 goals for Norway"],
  ["ENG", "Jude Bellingham", "Midfielder", "Champions League winner at 20, England's talisman"],
  ["BRA", "Vinícius Júnior", "Forward", "Ballon d'Or contender, Real Madrid's most dangerous attacker"],
  ["CRO", "Luka Modrić", "Midfielder", "40-year-old legend plays his final World Cup in 2026"],
  ["EGY", "Mohamed Salah", "Forward", "One of the world's best — 2026 is his first ever World Cup"],
  ["KOR", "Son Heung-min", "Forward", "Korea's captain plays his final WC — over 100 international goals"],
  ["POR", "Rafael Leão", "Forward", "The new face of Portugal in the post-Ronaldo era"],
  ["GER", "Jamal Musiala", "Midfielder", "Most creative young player in world football, born in England"],
  ["NED", "Cody Gakpo", "Forward", "Liverpool star who was the revelation of the 2022 World Cup"],
];

export default function HomePage() {
  const todayMatches = getTodaysMatches();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Hero */}
      <HeroBanner />

      {/* Live ticker */}
      <LiveTicker />

      {/* Today's matches */}
      {todayMatches.length > 0 && (
        <section>
          <SectionHeader
            title="Today's Matches"
            subtitle={`${todayMatches.length} match${todayMatches.length > 1 ? "es" : ""} · All times in SAST`}
            emoji="🔴"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {todayMatches.map((m) => (
              <MatchCard key={m.id} match={m} showAdmin />
            ))}
          </div>
        </section>
      )}

      {/* Opening match highlight */}
      {todayMatches.length === 0 && (
        <section>
          <SectionHeader
            title="Opening Match"
            subtitle="June 11, 2026 · 21:00 SAST · Estadio Azteca, Mexico City"
            emoji="🎉"
          />
          <div className="mt-4 max-w-lg">
            <MatchCard
              match={GROUP_FIXTURES.find((m) => m.id === "A1")!}
              expanded
              showAdmin
            />
          </div>
        </section>
      )}

      {/* Tournament Contenders */}
      <section>
        <SectionHeader
          title="Tournament Contenders"
          subtitle="Real coaches · Live form · Squad value · Win prediction"
          emoji="🏆"
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOP_CONTENDERS.map((code) => {
            const team = TEAMS[code];
            const extras = TEAM_EXTRAS[code];
            if (!team || !extras) return null;
            const predColors: Record<string, string> = {
              "Final": "text-yellow-400 bg-yellow-400/10",
              "Semi-finals": "text-orange-400 bg-orange-400/10",
              "Quarter-finals": "text-sky-400 bg-sky-400/10",
              "Round of 32": "text-emerald-400 bg-emerald-400/10",
            };
            const pc = predColors[extras.prediction] ?? "text-slate-400 bg-slate-400/10";
            return (
              <div
                key={code}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-white/5"
              >
                <TeamFlag code={code} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-bold text-sm">{team.shortName}</span>
                    <span className="text-slate-500 text-xs">#{team.fifaRank}</span>
                  </div>
                  <p className="text-slate-500 text-xs truncate">{extras.coachName}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <FormGuide form={extras.recentForm} size="sm" />
                    <span className="text-slate-600 text-xs">{extras.squadValue}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pc}`}>
                    {extras.prediction}
                  </span>
                  <p className="text-slate-600 text-[10px] mt-1">{extras.avgAge} avg age</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Players to Watch */}
      <section>
        <SectionHeader
          title="Players to Watch"
          subtitle="12 stars who could define this tournament"
          emoji="⭐"
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PLAYERS_TO_WATCH.map(([teamCode, name, role, fact]) => {
            const team = TEAMS[teamCode];
            if (!team) return null;
            return (
              <div
                key={name}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/40 border border-white/5"
              >
                <TeamFlag code={teamCode} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-tight">{name}</p>
                  <p className="text-slate-500 text-xs">{team.shortName} · {role}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{fact}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Group Stage Overview */}
      <section>
        <SectionHeader
          title="Group Stage"
          subtitle="12 groups · 48 teams · Top 2 + best 8 third-place advance"
          emoji="⚽"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {GROUPS.map((g) => (
            <GroupCard key={g} group={g} />
          ))}
        </div>
      </section>

      {/* Tournament odds + upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TournamentOdds />

        <section>
          <SectionHeader title="Upcoming Fixtures" subtitle="Next matches · SAST times" emoji="🗓" />
          <div className="space-y-3 mt-4">
            {GROUP_FIXTURES.filter((m) => m.status === "upcoming")
              .slice(0, 6)
              .map((m) => (
                <MatchCard key={m.id} match={m} showAdmin />
              ))}
          </div>
        </section>
      </div>

      {/* Qualifying top scorer note */}
      <div className="rounded-2xl border border-white/5 bg-slate-800/20 p-5">
        <SectionHeader
          title="Qualifying Highlights"
          subtitle="Key facts from the road to 2026"
          emoji="📊"
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { stat: "16 goals", desc: "Erling Haaland — UEFA qualifying top scorer (Norway)", team: "NOR" },
            { stat: "13 goals", desc: "Aymen Hussein — AFC joint top scorer (Iraq)", team: "IRQ" },
            { stat: "40 goals", desc: "Spain — most qualifying goals in UEFA group stage", team: "ESP" },
            { stat: "4 goals", desc: "Spain conceded in qualifying — tournament's best defence", team: "ESP" },
            { stat: "38 goals", desc: "Japan — most goals in AFC qualifying rounds", team: "JPN" },
            { stat: "5 goals", desc: "Japan conceded — Asia's most miserly defence", team: "JPN" },
          ].map(({ stat, desc, team }) => (
            <div key={stat + team} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40">
              <TeamFlag code={team} size="sm" />
              <div>
                <p className="text-white font-black text-lg leading-none">{stat}</p>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, emoji }: { title: string; subtitle: string; emoji: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl mt-0.5">{emoji}</span>
      <div>
        <h2 className="text-xl font-black text-white">{title}</h2>
        <p className="text-slate-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}
