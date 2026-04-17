# Hermes + OpenClaw Phase 1 Repo Skeleton

**Status:** ready_for_apply  
**Date:** 2026-04-17  
**Phase:** 1 — Repo Skeleton

## Objective
Create the minimum YellowJacket-side package structure required for later Hermes integration without starting runtime or schema work early.

## Deliverables
- root Bun workspace scaffold
- `packages/yellowjacket-execution-adapters`
- adapter interface file
- Hermes-local placeholder module set
- package README
- test folder
- Phase 1 gate script

## Explicit non-goals
- no contract/schema expansion
- no runtime admission changes
- no OpenClaw UI
- no proving-slice logic
- no real Hermes transport behavior yet

## Gate
Phase 1 is complete only when:
- package structure exists
- `bun install` succeeds
- `bash tests/phase_1_gate.sh` prints `PHASE_1_GATE_PASS`
