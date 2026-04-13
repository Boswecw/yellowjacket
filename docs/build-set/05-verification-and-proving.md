# YellowJacket V1.1 Verification and Proving

**Date:** 2026-04-12  
**Timezone:** America/New_York  
**Status:** Verification lock  
**Purpose:** Define the proving gates, baseline-comparison rules, replay and drift requirements, and minimum test posture required before YellowJacket workcells are considered trustworthy or reusable.

---

## 1. Verification Mission

YellowJacket verification exists to answer five questions:
1. Did the workcell execute according to contract?  
2. Did it produce structurally valid outputs?  
3. Are the outputs useful and trustworthy enough for review?  
4. Does the workcell justify its orchestration cost against a simpler baseline?  
5. Does the workcell remain stable across replay, drift checks, and local interruption conditions?

If those questions cannot be answered, the workcell is not ready.

---

## 2. Verification Layers

### Layer A — Contract conformance
Checks:
- schema validity
- required fields present
- lifecycle validity
- permission envelope respect

Failure here is hard-fail.

### Layer B — Orchestration correctness
Checks:
- declared role sequence followed
- dependency rules honored
- stop conditions respected
- retry policy honored
- degraded-state recording present

Failure here is hard-fail.

### Layer C — Output validity
Checks:
- artifact consistency
- evidence references resolve
- review packet completeness
- degraded truth is surfaced

Failure here is hard-fail or pass-with-degradation depending on class.

### Layer D — Domain usefulness
Checks:
- findings are materially useful
- false positive and false negative posture is measured where feasible
- operator can act on the output without unreasonable burden

Failure here blocks proving advancement.

### Layer E — Baseline justification
Checks:
- comparison against a simpler path on usefulness
- review burden
- structural correctness
- degraded honesty
- performance cost

Failure here prevents promotion as justified runtime value.

### Layer F — Replay and drift stability
Checks:
- golden corpus replay
- checkpoint and resume replay
- semantic drift posture
- coordination-burden drift
- update gating behavior

Failure here blocks proving advancement or update promotion.

---

## 3. Golden Corpus Requirement

Every proving workcell must have a fixed, versioned golden corpus for the proving cycle.

The corpus must include:
- clearly good cases
- clearly bad cases
- borderline cases
- contamination or adversarial cases where relevant
- degraded-dependency cases
- checkpoint and resume cases where the workcell supports resume

Golden corpora are controlled proving assets, not casual examples.

---

## 4. Baseline Comparison Protocol

Every workcell must define one simpler baseline path.

Possible baselines include:
- one bounded NeuronForge contract
- deterministic rule-first review pass
- app-local simpler review flow

Comparison dimensions must include:
- usefulness
- review burden
- structural correctness
- degraded-state honesty
- performance cost

Recommended quantitative dimensions:
- semantic drift
- coordination overhead
- replay stability

A workcell is not justified just because it feels smarter.  
It must prove runtime value against a simpler alternative.

---

## 5. Required Verification Artifacts

Every proving run set must produce:
- corpus version reference
- baseline definition reference
- run traces
- verification decisions
- comparison summary
- issue log
- operator review notes where applicable
- drift summary
- checkpoint and resume outcomes where applicable

---

## 6. Required Test Classes

Minimum test classes:
- schema tests
- state machine tests
- permission tests
- degraded-state tests
- replay tests
- checkpoint and resume tests
- domain-output tests
- adversarial or contamination tests
- baseline comparison tests
- drift regression tests

---

## 7. Verification Status Vocabulary

Allowed verification statuses:
- pass
- pass_with_degradation
- fail
- inconclusive

These statuses must be used consistently across artifacts, reporting, and review surfaces.

---

## 8. Proving Gates for v1.1

A workcell may move from experimental to proving-complete only if:
- contract conformance passes on the full corpus
- orchestration correctness passes
- review packet completeness passes
- degraded-state truth is surfaced correctly
- baseline comparison is documented
- operator review burden is acceptable
- no unresolved hard-fail security or permission issues remain
- replay and drift thresholds pass

A workcell may move from proving-complete to reusable-core only if:
- proving success repeats across multiple run sets
- failure modes are characterized
- domain usefulness is stable
- documentation, contracts, and tests are aligned
- checkpoint and resume behavior is characterized where supported

---

## 9. Minimum Quantitative Posture

Each proving package must define:
- acceptable false-positive ceiling
- acceptable false-negative ceiling
- acceptable runtime ceiling on supported hardware
- acceptable operator review burden target
- acceptable degraded-run truthfulness target
- acceptable semantic drift threshold
- acceptable coordination-cost drift threshold

If thresholds are undefined, the workcell is not ready for proving claims.

---

## 10. Update-Gating Rule

Model, prompt, or workflow updates affecting a proved workcell must trigger replay on the locked golden corpus.

An update must be blocked when it exceeds the approved threshold for:
- semantic drift
- review burden increase
- coordination overhead increase
- degraded-truth regression

This prevents silent regression disguised as iteration.

---

## 11. Human Review in Verification

Human review is required where automated checks cannot fully determine domain usefulness.

Human review should assess:
- material usefulness
- evidence sufficiency without noise
- decision support quality of the review packet
- whether baseline comparison reflects real operator value

Human review must be recorded.  
It must not live only in memory or informal judgment.

---

## 12. Failure Handling in Proving

Recommended failure classes:
- contract failure
- runtime or orchestration failure
- degraded-state disclosure failure
- review packet failure
- domain usefulness failure
- baseline-justification failure
- replay failure
- drift-regression failure
- checkpoint and resume failure

This prevents vague “needs work” conclusions.

---

## 13. Final Verification Statement

YellowJacket v1.1 workcells are considered proved only when they pass contract and orchestration checks, produce structurally valid and reviewable outputs, disclose degraded behavior truthfully, remain stable under replay and approved drift thresholds, and justify their orchestration burden against a declared simpler baseline on a versioned golden corpus.

