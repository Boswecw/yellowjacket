# YellowJacket V1.1 Build Roadmap and Start Gate

**Date:** 2026-04-12  
**Timezone:** America/New_York  
**Status:** Build-start control surface  
**Purpose:** Define the order of implementation, the exact v1.1 start gate, and the phased build path that turns YellowJacket from approved architecture into a disciplined runtime.

---

## 1. Build Principle

YellowJacket should not be built as “core first, details later.”

For this system, the real build order is:
1. governance lock
2. doctrine lock
3. architecture lock
4. security lock
5. contract drafting
6. repo/module boundary lock
7. verification harness planning
8. first proving workcell implementation

This order exists because YellowJacket is a control system, not just an orchestration library.

---

## 2. Exact Start Gate

YellowJacket v1.1 should not expand implementation until the following are materially present:
- governance lock accepted
- doctrine lock accepted
- architecture lock accepted
- security lock accepted
- contract schemas drafted for all major artifacts
- provenance object defined canonically
- checkpoint and resume posture defined
- verification corpus started
- drift thresholds defined for the first proving workcell
- repo and module boundaries decided

If these are not materially present, implementation should be limited to scaffolding only.

---

## 3. Phase 0 — Structural and Governance Lock

### Goal
Prevent architecture drift before runtime code spreads.

### Deliverables
- accepted governance and doctrine docs
- accepted architecture doc
- accepted security doc
- accepted contract doc
- accepted repo/module blueprint
- agreed vocabulary list

### Exit condition
All key runtime ownership boundaries are explicit and stable enough to code against.

---

## 4. Phase 1 — Contract and Skeleton Runtime

### Goal
Build the minimal shared shape of the system without pretending the runtime is already smart.

### Build targets
- `yellowjacket-contracts` package
- shared lifecycle state types
- artifact taxonomy constants
- provenance object
- status family constants
- trust-domain enums
- core run record types
- checkpoint/resume types
- permission-envelope types
- `yellowjacket-core` skeleton with no broad autonomy

### Exit condition
A run can be represented cleanly from request through packaging using shared types.

---

## 5. Phase 2 — Workcell Registration and Planning Layer

### Goal
Make workcells explicit, bounded, and registerable.

### Build targets
- workcell registry structure
- workcell definition interface
- role definition interface
- stop-condition declarations
- branch policy declarations
- checkpoint eligibility declarations
- dependency manifest generation
- baseline comparator references

### Exit condition
A workcell can be admitted and planned with declared roles, dependencies, trust domain, and limits.

---

## 6. Phase 3 — Orchestration Engine

### Goal
Implement the finite workcell runtime.

### Build targets
- sequential execution engine
- bounded branch support
- role-to-role handoff sequencing
- run state transition enforcement
- dependency invocation through explicit seams
- degraded-state aggregation
- timeout and retry handling
- cancellation handling
- trace generation

### Constraints
- no recursive spawning
- no hidden background loops
- no undeclared dependency calls

### Exit condition
Runs are finite, inspectable, and structurally replayable.

---

## 7. Phase 4 — Security and Runtime Enforcement

### Goal
Move from declared posture to enforced posture.

### Build targets
- run-scoped permission envelope enforcement
- role-scoped capability enforcement
- trust-domain enforcement
- action-class blocking
- deterministic capability checks outside the model
- contamination guardrail seam
- redaction posture for review packets and evidence bundles

### Exit condition
The runtime can deny what the model or role should not do.

---

## 8. Phase 5 — Verification Harness and Proving Assets

### Goal
Make proving real before claiming reusable runtime value.

### Build targets
- `yellowjacket-verification` package
- schema test harness
- state machine tests
- permission tests
- replay tests
- checkpoint/resume tests
- golden corpus structure
- baseline-comparison structure
- drift regression structure

### Exit condition
The first workcell can be tested, compared, and judged through a real proving pipeline.

---

## 9. Phase 6 — First Proving Workcell

### Goal
Prove YellowJacket with one serious, low-side-effect workflow.

### First proving class
- editorial review workcells

### First proving workcell
- Scene Continuity Review

### Required outputs
- candidate findings
- evidence bundle
- review packet
- verification decision
- baseline comparison summary
- replay-supporting trace
- degraded-state disclosure

### Exit condition
The first workcell reaches proving-complete status under the v1.1 verification rules.

---

## 10. Phase 7 — Reuse Readiness

### Goal
Decide whether YellowJacket is ready for additional workcells.

### Required evidence
- repeated proving success
- stable failure characterization
- acceptable review burden
- acceptable local runtime cost
- clean contract reuse
- no security regressions
- no candidate-vs-authority slippage

### Exit condition
YellowJacket earns the right to expand, rather than being expanded by enthusiasm.

---

## 11. Immediate Build Priorities

The next practical build priorities are:
1. finalize the shared vocabulary and artifact list
2. draft the canonical schema families
3. define the workcell registry structure
4. define the run permission envelope structure
5. define checkpoint and resume contract shapes
6. start the golden corpus for Scene Continuity Review
7. define the simpler baseline comparator for that workcell

---

## 12. Final Roadmap Statement

YellowJacket v1.1 should be built as a governed runtime with contracts, enforcement, and proving assets arriving early, not late.

The runtime earns expansion only after the first workcell proves that the architecture is not just coherent on paper, but operationally disciplined in practice.

