import HeroBanner from "@/components/HeroBanner";
import LiveTicker from "@/components/LiveTicker";
import GroupCard from "@/components/GroupCard";
import TournamentOdds from "@/components/TournamentOdds";
import MatchCard from "@/components/MatchCard";
import { GROUP_FIXTURES, GROUPS, getTodaysMatches } from "@/lib/data/fixtures";

export default function HomePage() {
  const todayMatches = getTodaysMatches();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
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
