# YellowJacket Initial Setup Guide

**Date:** 2026-04-12  
**Timezone:** America/New_York

## 1. Purpose

This scaffold gives YellowJacket a clean start without skipping the build-set locks.

It is for:
- repo initialization
- shared contract drafting
- runtime skeleton setup
- first workcell registration
- first proving fixture setup

It is not for:
- free-running autonomy
- hidden writeback
- unrestricted tool expansion
- production runtime claims

## 2. Folder Roles

- `docs/build-set/` — locked control-surface documents
- `docs/setup/` — practical start guides
- `packages/yellowjacket-contracts/` — canonical shared types and JSON schemas
- `packages/yellowjacket-core/` — lifecycle, planning, runtime shell
- `packages/yellowjacket-workcells/` — explicit workcell definitions only
- `packages/yellowjacket-verification/` — proving harness starter
- `packages/yellowjacket-domain-packs/` — reusable domain logic later
- `packages/yellowjacket-app-bindings/` — bounded app adapters only

## 3. Storage Class Folders

Keep runtime artifacts separated:
- `fixtures/`
- `runs/`
- `replays/`
- `evidence/`
- `verification/`
- `review-packets/`
- `checkpoints/`

Do not collapse them into a single output dump.

## 4. First Build Pass

Run these commands from the repo root.

### npm
```bash
npm install
npm run typecheck
npm test
```

### bun
```bash
bun install
bun run typecheck
bun test
```

## 5. First Real Build Order

1. Read `docs/build-set/00-build-set-index.md`
2. Read `docs/build-set/07-build-roadmap-and-start-gate.md`
3. Lock shared vocabulary in `packages/yellowjacket-contracts/src/enums.ts`
4. Adjust schemas in `packages/yellowjacket-contracts/schemas/`
5. Finalize the Scene Continuity Review workcell in `packages/yellowjacket-workcells/src/scene-continuity-review.ts`
6. Replace stub runtime logic in `packages/yellowjacket-core/src/runtime.ts`
7. Expand validation and proving tests

## 6. First Guardrail

Do not add cloud rescue logic, background autonomy, or canonical writeback here.
Those would violate the v1.1 start posture.
