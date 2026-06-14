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
  const featuredFixture = fixtures.find((m) => m.id === "A1") ?? fixtures[0];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-5 sm:px-5 md:gap-10 md:py-8 lg:px-6">
      <HeroBanner />

      <div className="grid gap-3 md:gap-4">
        <LiveTicker />
        <LiveIntelStrip />
      </div>

      <section>
        <SectionHeader
          eyebrow="Live"
          title="Today's matches"
          subtitle={`${todayMatches.length} match${todayMatches.length === 1 ? "" : "es"} · All times in SAST`}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {todayMatches.map((m) => (
            <MatchCard key={m.id} match={m} showAdmin />
          ))}
        </div>
      </section>

      {todayMatches.length === 0 && featuredFixture && (
        <section>
          <SectionHeader
            eyebrow="Kickoff"
            title="Opening match"
            subtitle="June 11, 2026 · 21:00 SAST · Estadio Azteca, Mexico City"
          />
          <div className="mt-4 max-w-2xl">
            <MatchCard match={featuredFixture} expanded showAdmin />
          </div>
        </section>
      )}

      <section>
        <SectionHeader
          eyebrow="Overview"
          title="Group stage"
          subtitle="12 groups · 48 teams · Top 2 + best 8 third-place advance"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GROUPS.map((g) => (
            <GroupCard key={g} group={g} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TournamentOdds />

        <section>
          <SectionHeader
            eyebrow="Next up"
            title="Upcoming fixtures"
            subtitle="Next six fixtures · SAST times"
          />
          <div className="mt-4 space-y-4">
            {fixtures
              .filter((m) => m.status === "upcoming")
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

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300/90">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-6 text-slate-500 sm:text-right">
        {subtitle}
      </p>
    </div>
  );
}
