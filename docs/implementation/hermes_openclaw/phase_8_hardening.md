# Hermes + OpenClaw Phase 8 Hardening

**Status:** ready_for_apply  
**Date:** 2026-04-17  
**Phase:** 8 — Hardening

## Objective
Add final hardening controls for deterministic issuance, invariant enforcement, and auditability.

## Added in this phase
- deterministic idempotency key builder
- replay packet invariant guard
- hardening audit event contract
- audit event builder
- executable proof script

## Guardrails preserved
- replay packets must remain YellowJacket-issued
- replay packets must remain explicitly marked for replay
- Hermes executes only packets that satisfy hardening invariants
- hardening emits auditable evidence records

## Gate
Phase 8 is complete only when:
- the hardening package exists
- `bun tests/phase_8_proof.ts` passes
- `bash tests/phase_8_gate.sh` prints `PHASE_8_GATE_PASS`
