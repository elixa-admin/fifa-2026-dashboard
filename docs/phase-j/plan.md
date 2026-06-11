# Phase J Plan

## Goal

Turn the dashboard into a genuinely realtime, analytics-rich experience with stronger visual storytelling, clearer match intelligence, and live odds that move with the game.

## Principles

- Keep the UI calm enough to scan quickly, even as the data becomes richer.
- Make every live metric explain itself.
- Treat browser performance as part of the product.
- Prefer reusable data contracts over one-off UI logic.
- Keep mobile as the default reading experience.

## Sprint 1: Match event model

Goal: formalize the live event schema for goals, cards, substitutions, injuries, lineup changes, shots, xG, possession, and momentum.

Context: the app already has a live feed scaffold, but the analytics and visuals need a richer event vocabulary before realtime updates can feel real.

Relevant files or references:
- `lib/live/feed.ts`
- `app/api/live/feed/route.ts`
- `lib/store.ts`

Proposed approach:
- Extend the live payload with versioned event types and per-match summary fields.
- Add explicit source metadata and freshness markers.
- Keep the payload stable enough for provider swaps later.

Acceptance criteria:
- The app can represent a live match beyond just score and time.
- Existing consumers continue to work with the expanded payload.

Verify:
- Fetch `/api/live/feed` and inspect the JSON structure.
- Confirm the payload carries a stable event list and snapshot.

## Sprint 2: Transport layer

Goal: deliver live updates to the browser with push-first transport and polling fallback.

Context: the app should feel alive during a match, but it must remain functional if a realtime provider is unavailable.

Relevant files or references:
- `app/api/live/feed/route.ts`
- `lib/live/client.ts`
- `app/layout.tsx`

Proposed approach:
- Add SSE or a managed realtime channel behind the same feed contract.
- Add client-side subscription logic.
- Fall back to polling when push is not available.

Acceptance criteria:
- The UI updates without a manual refresh.
- The app remains usable when realtime transport fails.

Verify:
- Simulate a live update and confirm the browser reflects it.
- Disable push and confirm polling still updates the dashboard.

## Sprint 3: Dynamic odds engine

Goal: replace static odds with live probabilities based on team strength, current form, scoring rates, cards, injuries, and opponent quality.

Context: predictions should move as the match changes, not just as the tournament progresses.

Relevant files or references:
- `lib/data/teams.ts`
- `lib/data/teamExtras.ts`
- `lib/store.ts`

Proposed approach:
- Add a dynamic strength model.
- Blend team rating, recent form, and live match state into probabilities.
- Recompute outputs after each live event and each finished match.

Acceptance criteria:
- Win/draw/loss odds react to meaningful match events.
- The model remains lightweight enough for app use.

Verify:
- Change a match result or event state and confirm the odds move.

## Sprint 4: Tournament projection

Goal: simulate group and knockout outcomes after each result to keep qualification and title odds current.

Context: the dashboard should tell users who is likely to advance, not just who won the last match.

Relevant files or references:
- `lib/data/fixtures.ts`
- `lib/store.ts`
- `lib/live/feed.ts`

Proposed approach:
- Run Monte Carlo simulations over the remaining fixture tree.
- Recompute advancement paths and tournament odds after each update.
- Surface best-case and danger-case paths by group.

Acceptance criteria:
- Advancement odds are available and move with the tournament.
- The model can explain the path to qualification.

Verify:
- Flip a result and confirm downstream probabilities shift.

## Sprint 5: Live facts engine

Goal: generate short, interesting, fan-facing facts that change with the live match context.

Context: the dashboard needs more than numbers; it needs useful context in plain language.

Relevant files or references:
- `components/MatchCard.tsx`
- `components/HeroBanner.tsx`
- `lib/data/teamExtras.ts`

Proposed approach:
- Build a fact generator for streaks, scoring trends, discipline, upset signals, and tournament milestones.
- Keep facts concise enough for small screens.
- Tie each fact to a reason it matters right now.

Acceptance criteria:
- Match cards and feature panels can show dynamic facts.
- Facts update after live events or score changes.

Verify:
- Trigger a goal, card, or score update and confirm the facts change.

## Sprint 6: Visual intelligence

Goal: upgrade the visual language of the dashboard with clearer charts, gauges, and compact match analytics.

Context: the app needs to feel more alive without becoming cluttered.

Relevant files or references:
- `components/MatchCard.tsx`
- `components/OddsGauge.tsx`
- `components/GoalPredictor.tsx`
- `app/page.tsx`

Proposed approach:
- Add better visualizations for momentum, xG, shots, and card pressure.
- Refine the odds display into a stronger live barometer.
- Use compact, responsive chart components with tight layout rules.

Acceptance criteria:
- Visuals communicate live match change at a glance.
- The dashboard remains readable on mobile and desktop.

Verify:
- Render the app in both viewports and confirm visuals fit without overflow.

## Sprint 7: Discipline and availability

Goal: make cards, suspensions, and injuries materially affect odds and the story.

Context: real tournaments are shaped by absence and discipline, not just attacking output.

Relevant files or references:
- `lib/live/feed.ts`
- `lib/store.ts`
- `components/MatchCard.tsx`

Proposed approach:
- Model yellow and red cards as live penalties.
- Add injury weighting and suspension risk.
- Show affected players or teams in the UI.

Acceptance criteria:
- Discipline and injuries shift probability outputs.
- The UI makes those impacts visible to users.

Verify:
- Simulate a red card or injury and confirm the odds and facts change.

## Sprint 8: History and audit trail

Goal: keep snapshots of model changes so the app can explain how odds moved over time.

Context: live analytics are more trustworthy when users can see the evolution.

Relevant files or references:
- `lib/live/feed.ts`
- `lib/store.ts`
- `app/api/live/feed/route.ts`

Proposed approach:
- Store periodic snapshots.
- Add a simple change log for model updates.
- Surface freshness timestamps and source labels in every response.

Acceptance criteria:
- The latest state and prior state are both recoverable.
- The system can describe its own recency.

Verify:
- Compare two snapshots and confirm the differences are readable.

## Sprint 9: Performance polish

Goal: keep the realtime experience fast and stable while the visuals and analytics become richer.

Context: the more expressive the dashboard becomes, the more important layout discipline and rerender control become.

Relevant files or references:
- `app/globals.css`
- `app/layout.tsx`
- `components/MatchCard.tsx`

Proposed approach:
- Reduce unnecessary rerenders.
- Tighten loading, stale, and live states.
- Keep the mobile layout compact and readable.

Acceptance criteria:
- Frequent updates do not break the layout.
- Mobile rendering stays clean under load.

Verify:
- Stress the UI with repeated state updates and confirm it stays stable.

## Sprint 10: Vercel release gate

Goal: commit the final build to Vercel and verify the deployment in a browser before moving on.

Context: this is the release checkpoint and should be treated as the final audit for the phase.

Relevant files or references:
- `app/page.tsx`
- `app/api/live/feed/route.ts`
- `docs/phase-j/handoff.md` if created later

Proposed approach:
- Push the release commit to `main`.
- Let Vercel deploy the build.
- Verify the live site in desktop and mobile browsers.
- Check the live feed endpoint and the main dashboard render.

Acceptance criteria:
- Production deployment succeeds on Vercel.
- Browser verification passes on the live URL.
- Any regressions are logged before the next phase begins.

Verify:
- Open the live site in a browser.
- Confirm the dashboard loads.
- Confirm the live feed endpoint returns the expected JSON.
