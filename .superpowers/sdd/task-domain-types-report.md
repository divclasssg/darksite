# Darksite domain types report

## Implementation summary

- Added `src/recommendation/types.ts` as the shared recommendation domain contract.
- Exported `GeoPoint`, `DateRange`, `RecommendationRequest`, `CandidateLocation`, `MoonCondition`, `WeatherCondition`, `NightCondition`, `ScoreBreakdown`, `RecommendationResult`, `RecommendationState`, plus `LayerKey`, `DataMode`, `RecommendationStatus`, and `RecommendationTarget`.
- Updated `src/recommendation/state.ts` to import and re-export `LayerKey` from the new type module instead of defining the union locally.
- Added a contract test in `src/tests/recommendation-types.test.ts` that uses `satisfies` on representative request, location, condition, result, and state objects, then checks a few runtime expectations.
- Removed `incremental` from `tsconfig.json` so the required plain `npx tsc --noEmit` verification command can run cleanly in this workspace.
- Updated `docs/superpowers/checklists/work-tracker.md` to move the domain type task to completed and record the commit.

## RED

Command:

```bash
npx tsc --noEmit
```

Result:

- Failed with `TS2307: Cannot find module '@/recommendation/types' or its corresponding type declarations.`
- The first run also hit `TS5033` because TypeScript tried to write `tsconfig.tsbuildinfo` in this workspace before the contract file existed.

## GREEN

Focused contract test:

```bash
npx vitest run src/tests/recommendation-types.test.ts
```

Result:

- Passed: 1 test file, 1 test.

Typecheck:

```bash
npx tsc --noEmit
```

Result:

- Passed with no output.

Full test suite:

```bash
npm test
```

Result:

- Passed: 2 test files, 3 tests.

## Files changed

- `src/recommendation/types.ts`
- `src/recommendation/state.ts`
- `src/tests/recommendation-types.test.ts`
- `tsconfig.json`
- `docs/superpowers/checklists/work-tracker.md`

## Self-review

- The shared contract matches the brief and keeps the existing UI store behavior intact.
- `LayerKey` now has one source of truth, and existing consumers can still import it from `src/recommendation/state.ts` because that module re-exports the type.
- The contract test is intentionally representative rather than exhaustive, which fits the “shared type contract only” scope.

## Concerns

- `RecommendationState` is a shared domain type, not the active Zustand store shape, so it is intentionally not wired into the current UI store yet.
- The `tsconfig.json` change was made only to let the required plain typecheck command run without build-info write failures in this workspace.

