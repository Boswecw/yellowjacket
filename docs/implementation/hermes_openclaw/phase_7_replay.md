# Hermes + OpenClaw Phase 7 Replay

**Status:** ready_for_apply  
**Date:** 2026-04-17  
**Phase:** 7 — Replay

## Objective
Add YellowJacket-owned replay evaluation and replay packet issuance without giving replay authority to Hermes or OpenClaw.

## Added in this phase
- replay request contract
- replay decision contract
- Hermes replay invocation packet contract
- replay eligibility evaluator
- replay invocation packet builder
- executable proof script

## Guardrails preserved
- replay admission remains YellowJacket-owned
- Hermes executes only YellowJacket-issued replay packets
- OpenClaw does not issue replay execution packets

## Gate
Phase 7 is complete only when:
- the replay package exists
- `bun tests/phase_7_proof.ts` passes
- `bash tests/phase_7_gate.sh` prints `PHASE_7_GATE_PASS`
