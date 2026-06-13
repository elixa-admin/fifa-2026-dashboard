import HeroBanner from "@/components/HeroBanner";
import LiveIntelStrip from "@/components/LiveIntelStrip";
import LiveTicker from "@/components/LiveTicker";
import GroupCard from "@/components/GroupCard";
import TournamentOdds from "@/components/TournamentOdds";
import MatchCard from "@/components/MatchCard";
import { GROUPS, getTodaysMatches, getTournamentFixtures } from "@/lib/data/fixtures";

export default function HomePage() {
  const todayMatches = getTodaysMatches();
  const fixtures = getTournamentFixtures();

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6 md:py-8">
      {/* Hero */}
      <HeroBanner />

      {/* Live ticker */}
      <LiveTicker />

      {/* Live intel */}
      <LiveIntelStrip />

      {/* Today's matches */}
      {todayMatches.length > 0 && (
        <section>
          <SectionHeader
            title="Today's Matches"
            subtitle={`${todayMatches.length} match${todayMatches.length > 1 ? "es" : ""} · All times in SAST`}
            emoji="🔴"
          />
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="mt-5 max-w-xl">
              <MatchCard
              match={fixtures.find((m) => m.id === "A1")!}
              expanded
              showAdmin
            />
          </div>
        </section>
      )}

      {/* Group Stage Overview */}
      <section>
        <SectionHeader
          title="Group Stage"
          subtitle="12 groups · 48 teams · Top 2 + best 8 third-place advance"
          emoji="⚽"
        />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GROUPS.map((g) => (
            <GroupCard key={g} group={g} />
          ))}
        </div>
      </section>

      {/* Tournament odds + upcoming */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TournamentOdds />

        <section>
          <SectionHeader title="Upcoming Fixtures" subtitle="Next matches · SAST times" emoji="🗓" />
          <div className="mt-5 space-y-4">
            {fixtures.filter((m) => m.status === "upcoming")
              .slice(0, 6)
              .map((m) => (
                <MatchCard key={m.id} match={m} showAdmin />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, emoji }: { title: string; subtitle: string; emoji: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] text-xl">
        {emoji}
      </span>
      <div>
        <h2 className="text-2xl font-black text-white">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
