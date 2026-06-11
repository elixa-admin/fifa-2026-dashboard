# Phase H Plan

## 1. Live data spine
Define the canonical live-match event model for goals, cards, substitutions, injuries, score changes, and source metadata.

## 2. Feed adapter
Add a normalized live feed endpoint that can serve live events now and swap to a provider-backed adapter later.

## 3. Polling fallback
Add a lightweight pull path that can refresh the match state when push updates are unavailable.

## 4. Realtime delivery
Wire a browser-friendly update channel for live match changes, with SSE or managed realtime as the transport layer.

## 5. Prediction engine
Replace static match odds with a dynamic model that combines team strength, form, scoring rates, and disciplinary state.

## 6. Tournament simulation
Simulate the remaining group and knockout paths after each update to produce live advancement odds.

## 7. Match intelligence
Expose momentum, fatigue, injury, and cards in a compact match intelligence payload that the UI can explain.

## 8. Visual surfaces
Add live event feed, score momentum, updated odds, and tournament odds surfaces to the app.

## 9. Automation and auditability
Persist snapshots, log model shifts, and add freshness checks so the system can explain and validate its own state.

## 10. Deployment audit
Deploy the phase, verify it in a browser, and run an acceptance audit before starting the next phase.
