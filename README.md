# YellowJacket v1.1 Initial Setup Scaffold

This zip is a **contract-first, verification-aware starter scaffold** for YellowJacket.

It is intentionally **not** a full autonomous runtime.
It gives you the initial repo shape, shared types, schema files, starter workcell registration, verification harness stubs, governed storage directories, and copied build-set docs so you can start clean without letting the runtime sprawl.

## What is inside

- `docs/build-set/`  
  The full v1.1 control-surface docs you already locked.
- `docs/setup/`  
  Setup guide, implementation checklist, and AuthorForge integration notes.
- `packages/yellowjacket-contracts/`  
  Shared enums, base types, JSON Schemas, provenance helpers.
- `packages/yellowjacket-core/`  
  Skeleton runtime, planner, lifecycle guard, trace helpers.
- `packages/yellowjacket-workcells/`  
  Workcell definition types, registry, and a first starter workcell:
  `scene-continuity-review`.
- `packages/yellowjacket-verification/`  
  Starter schema validation and baseline/drift comparison helpers.
- `packages/yellowjacket-app-bindings/`  
  Initial AuthorForge-facing binding stub.
- `fixtures/`  
  A first proving fixture set for Scene Continuity Review.
- governed storage folders: `runs/`, `replays/`, `evidence/`, `verification/`,
  `review-packets/`, and `checkpoints/`

## Quick start

### Option A — npm
```bash
cd yellowjacket-initial-setup
npm install
npm run typecheck
npm test
```

### Option B — bun
```bash
cd yellowjacket-initial-setup
bun install
bun run typecheck
bun test
```

## What this scaffold is for

Use this to begin **Phase 1 and early Phase 2** work:
- shared contracts
- shared lifecycle state
- workcell registry
- permission-envelope shaping
- checkpoint/resume shape
- first proving fixture set

Do **not** mistake this scaffold for runtime completion.
It is the clean starting line.
