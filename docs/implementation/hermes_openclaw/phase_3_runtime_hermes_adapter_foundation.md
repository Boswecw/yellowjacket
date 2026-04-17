# Hermes + OpenClaw Phase 3 Runtime / Hermes Adapter Foundation

**Status:** ready_for_apply  
**Date:** 2026-04-17  
**Phase:** 3 — Runtime / Hermes Adapter Foundation

## Objective
Create the first real YellowJacket-side Hermes adapter foundation after contracts are locked.

## Added in this phase
- Hermes client config
- bounded fetch abstraction
- HTTP helper functions
- protocol request/response shapes for health, submit, poll, collect, cancel
- mapping from Hermes protocol responses to governed contracts
- transport implementation wired to injected fetch

## Guardrails preserved
- YellowJacket still owns admission truth
- no OpenClaw control-plane work here
- no scheduling or replay work here
- no hardening work here

## Gate
Phase 3 is complete only when:
- Hermes adapter foundation files exist
- transport compiles against the Phase 2 contracts
- `bash tests/phase_3_gate.sh` prints `PHASE_3_GATE_PASS`
