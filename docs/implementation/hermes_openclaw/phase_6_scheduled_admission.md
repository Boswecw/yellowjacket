# Hermes + OpenClaw Phase 6 Scheduled Admission

**Status:** ready_for_apply  
**Date:** 2026-04-17  
**Phase:** 6 — Scheduled Admission

## Objective
Add YellowJacket-owned schedule and replay admission checks before any replay execution work begins.

## Added in this phase
- scheduled admission request contract
- scheduled admission decision contract
- schedule window evaluator
- replay admission check
- executable proof script

## Guardrails preserved
- schedule validity is evaluated by YellowJacket
- replay admission is evaluated by YellowJacket
- Hermes does not decide schedule validity
- OpenClaw does not decide replay admission

## Gate
Phase 6 is complete only when:
- the scheduled-admission package exists
- `bun tests/phase_6_proof.ts` passes
- `bash tests/phase_6_gate.sh` prints `PHASE_6_GATE_PASS`
