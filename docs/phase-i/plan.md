# Phase I Plan

## Goal

Elevate the dashboard into a realtime match-intelligence experience with richer facts, stronger visual analytics, and more expressive predictions while keeping the UI fast on mobile and trustworthy on the live site.

## Principles

- Keep the live feed contract stable.
- Make the prediction layer explain itself.
- Show the most important match changes first.
- Optimize for mobile-first scanning and tap targets.
- Prefer compact, legible visuals over decorative clutter.
- Every chart or fact should answer a question a fan would actually ask.

## Sprint 1: Realtime data contract

Goal: define the canonical live match state for goals, cards, substitutions, injuries, possession, shots, xG, momentum, and source metadata.

Context: the app currently has a mock live feed scaffold, but the dashboard still needs a richer event model before realtime updates and analytics can feel credible.

Relevant files or references:
- `lib/live/feed.ts`
- `app/api/live/feed/route.ts`
- `lib/store.ts`

Proposed approach:
- Expand the live event schema with match event types and summary fields.
- Add a normalized per-match state object for score, cards, injuries, and momentum.
- Keep the payload versioned so future providers can slot in safely.

Acceptance criteria:
- The app can represent goals, cards, substitutions, injuries, and match timing in one consistent contract.
- Existing consumers still work with the feed payload.
- The feed has a clear path for provider-backed and polling-backed sources.

Verify:
- Fetch `/api/live/feed` and inspect the JSON shape.
- Confirm the payload includes a stable snapshot and event list.

## Sprint 2: Live update transport

Goal: add a realtime delivery path for browser clients with polling fallback when push is unavailable.

Context: browser-facing updates need to feel live during a match, but the platform also needs a reliable fallback when a push provider is unavailable.

Relevant files or references:
- `app/api/live/feed/route.ts`
- `lib/live/client.ts`
- `app/layout.tsx`

Proposed approach:
- Add SSE or managed realtime support behind the same payload contract.
- Introduce client-side subscription logic with graceful fallback polling.
- Debounce updates so the UI doesn’t flicker on event bursts.

Acceptance criteria:
- The page can receive live updates without a full refresh.
- If push fails, the app falls back to timed polling.
- Network failures do not break the dashboard shell.

Verify:
- Simulate a feed response update and confirm the UI reflects it.
- Disable the push channel and confirm polling still works.

## Sprint 3: Analytics engine

Goal: replace static odds with a dynamic match model driven by form, strength, goals, cards, injuries, and opponent quality.

Context: the current prediction layer is good for static previews, but live tournament odds need to move after every meaningful event and every finished match.

Relevant files or references:
- `lib/data/teams.ts`
- `lib/data/teamExtras.ts`
- `lib/store.ts`

Proposed approach:
- Add Elo-style team strength updates.
- Add Poisson or Dixon-Coles scoreline modelling for goal expectation.
- Update outputs after each match event and after each match result.

Acceptance criteria:
- Win probabilities, draw chances, and scoreline forecasts shift in response to match events.
- The model can explain why a side moved up or down.
- Predictions remain lightweight enough for serverless execution.

Verify:
- Run the model on a finished match and confirm the odds move appropriately.
- Confirm scoreline forecasts change when discipline or injuries are applied.

## Sprint 4: Tournament simulation

Goal: project group outcomes and knockout odds using repeated simulation of remaining fixtures.

Context: fans want to know who is likely to advance, not just who wins the next game.

Relevant files or references:
- `lib/data/fixtures.ts`
- `lib/store.ts`
- `lib/live/feed.ts`

Proposed approach:
- Simulate the remaining group stage after every update.
- Compute advancement, knockout, and title probabilities.
- Surface best/worst-case paths for each group.

Acceptance criteria:
- The dashboard can show live qualification odds.
- Group standings and advancement chances update after every match.
- Simulation results are stable enough to compare over time.

Verify:
- Recompute with one match result changed and confirm the downstream odds move.

## Sprint 5: Match intelligence facts

Goal: generate interesting, fan-readable facts and insights that update with the live state.

Context: the platform should feel alive with context, not just score changes.

Relevant files or references:
- `components/MatchCard.tsx`
- `components/HeroBanner.tsx`
- `lib/data/teamExtras.ts`

Proposed approach:
- Create a fact engine that can emit short, relevant callouts like streaks, discipline notes, scoring trends, and upset signals.
- Add contextual “why this matters” copy for the match and the tournament.
- Keep facts short enough for mobile and localize them into consistent tones.

Acceptance criteria:
- Each featured match can show at least three dynamic facts.
- Facts update after a score change or new event.
- Facts do not overwhelm the main score or odds display.

Verify:
- Trigger a goal, card, or score update and confirm the fact layer changes.

## Sprint 6: Visual upgrade

Goal: turn the dashboard into a more expressive realtime visual surface for stats and predictions.

Context: the current UI is strong, but Phase I needs more information density and better visual hierarchy.

Relevant files or references:
- `components/MatchCard.tsx`
- `components/OddsGauge.tsx`
- `components/GoalPredictor.tsx`
- `app/page.tsx`

Proposed approach:
- Add richer charts for momentum, shot volume, cards, and xG.
- Turn the odds display into a more legible live barometer.
- Use compact sparklines, radar-style summaries, or stacked mini-panels where they add clarity.

Acceptance criteria:
- Match cards show more than one kind of predictive signal.
- The visual layout remains readable on mobile.
- Charts and gauges reinforce the same story rather than competing for attention.

Verify:
- Render the dashboard on mobile and desktop.
- Confirm no chart or panel overflows its container.

## Sprint 7: Injury and discipline layer

Goal: make injuries, yellow cards, red cards, and suspensions matter in the model and in the UI.

Context: this is one of the most important realistic signals in a tournament and should influence both odds and storytelling.

Relevant files or references:
- `lib/live/feed.ts`
- `lib/store.ts`
- `components/MatchCard.tsx`

Proposed approach:
- Track card accumulation and suspension risk.
- Model injury impact as a weight against team strength.
- Surface discipline and availability as visible indicators.

Acceptance criteria:
- Cards and injuries reduce or shift the model output.
- The UI visibly marks teams affected by discipline or availability issues.

Verify:
- Simulate a red card or key injury and confirm the projection changes.

## Sprint 8: Automation and persistence

Goal: persist state snapshots, schedule recalculations, and keep a history of how the model moved.

Context: to trust the numbers, we need to see how they changed and why.

Relevant files or references:
- `lib/live/feed.ts`
- `lib/store.ts`
- `app/api/live/feed/route.ts`

Proposed approach:
- Save daily or match-level snapshots.
- Add a simple audit trail for model shifts.
- Include freshness timestamps and source labels in every live payload.

Acceptance criteria:
- The app can explain its latest state and its previous state.
- Model updates are traceable after deployment.

Verify:
- Compare two snapshots and confirm the delta is obvious.

## Sprint 9: Performance and polish

Goal: keep the realtime experience fast, stable, and easy to read under load.

Context: more analytics can easily become more clutter unless the app stays disciplined about layout and rendering.

Relevant files or references:
- `app/globals.css`
- `app/layout.tsx`
- `components/MatchCard.tsx`

Proposed approach:
- Reduce unnecessary rerenders.
- Keep charts and visuals compact on mobile.
- Tune the presentation of loading, stale, and live states.

Acceptance criteria:
- The page remains responsive during frequent updates.
- Mobile-first layouts stay clean at narrow widths.

Verify:
- Stress-test with rapid state updates and confirm no layout breakage.

## Sprint 10: Deployment and audit gate

Goal: deploy the final Phase I build, verify it in a browser, and run an acceptance audit before the next phase.

Context: this is the sign-off point and should be treated as a release gate.

Relevant files or references:
- `app/page.tsx`
- `app/api/live/feed/route.ts`
- `docs/phase-i/handoff.md` if created later

Proposed approach:
- Push the release branch.
- Verify desktop and mobile browser rendering on the live URL.
- Confirm the live feed endpoint and the UI both match the shipped contract.

Acceptance criteria:
- Production deploy succeeds.
- Browser audit passes on the live app.
- Any regressions are logged before the next phase starts.

Verify:
- Open the live site in a browser.
- Confirm the feed endpoint returns data.
- Confirm the dashboard renders without errors on mobile and desktop.
