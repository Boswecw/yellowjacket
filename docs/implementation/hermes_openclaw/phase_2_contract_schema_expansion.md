# Hermes + OpenClaw Phase 2 Contract/Schema Expansion

**Status:** ready_for_apply  
**Date:** 2026-04-17  
**Phase:** 2 — Contract and Schema Expansion

## Objective
Lock the first governed adapter contracts before runtime work begins.

## Added contract truth
- `invocation_packet.v1`
- `provider_receipt.v1`
- `provider_capabilities.v1`
- `review_packet.v1`
- runtime lifecycle and provider execution states

## Guardrails preserved
- YellowJacket owns admission truth
- schedule validity remains YellowJacket-owned
- replay admission remains YellowJacket-owned
- Hermes returns receipts and review packets, not admission decisions

## Gate
Phase 2 is complete only when:
- contract files exist
- adapter interface uses the new contracts
- Hermes-local placeholders typecheck against the contracts
- `bash tests/phase_2_gate.sh` prints `PHASE_2_GATE_PASS`
