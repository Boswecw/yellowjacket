# YellowJacket V1.1 Security and Trust Boundaries

**Date:** 2026-04-12  
**Timezone:** America/New_York  
**Status:** Security and trust-boundary lock  
**Purpose:** Define the minimum security posture, trust boundaries, permission rules, capability checks, and evidence-handling requirements for YellowJacket v1.1.

---

## 1. Security Position

YellowJacket is a candidate-producing coordination runtime and must be treated as a **high-risk privilege concentrator unless explicitly constrained**.

Why:
- it orchestrates multiple services
- it assembles evidence
- it prepares review material
- it may operate near sensitive business or creative content
- it may request downstream action through governed pathways

Therefore YellowJacket must operate under:
- least privilege
- denied-by-default capabilities
- explicit run-scoped permissions
- trust-domain assignment
- content-vs-control separation
- auditable review handoff behavior

---

## 2. Protected Asset Classes

Protected asset classes include:
- source content artifacts
- candidate artifacts
- evidence and replay artifacts
- control artifacts
- runtime state artifacts
- capability grants and intent-bound action envelopes

Each class may carry different sensitivity and retention posture.

---

## 3. Trust Boundaries

### Application boundary
Applications may request workcells and render review surfaces, but they do not gain authority to bypass shared runtime rules.

### YellowJacket runtime boundary
YellowJacket may orchestrate within declared permissions, but it may not assume execution or truth authority.

### Service dependency boundary
Cortex, NeuronForge Local, FA Local, and DF Local are separate seams.  
YellowJacket may consume declared outputs from those seams, but it does not inherit all of their powers.

### Operator review boundary
Human review remains outside the free-running workcell and is required for approval-bound action classes.

### Future cloud boundary
Cloud interaction must be treated as a separate trust boundary with separate entitlement, retention, and portability rules.

---

## 4. Threat Classes

Minimum threat classes:
- privilege drift
- prompt or context contamination
- evidence overexposure
- role or tool overreach
- silent authority creep
- degraded-state concealment
- replay sensitivity accumulation
- checkpoint misuse or stale resume state
- action-envelope or capability misuse

Threat handling must be structural, not just advisory prose.

---

## 5. Permission Model

### Default posture
All capabilities are denied by default.

### Run-scoped permission envelope
Each run must declare:
- workcell id
- trust domain
- allowed dependencies
- allowed role ids
- allowed source scopes
- allowed artifact outputs
- blocked action classes
- approval-required action classes
- retention expectations
- resume eligibility

### Role-scoped capability rules
Each role must declare:
- purpose
- allowed dependency interactions
- allowed artifact outputs
- disallowed actions
- timeout posture
- retry posture

Roles must never self-expand permissions.

---

## 6. Capability Grant and Intent Rules

For sensitive or approval-bound dependency calls and action classes, YellowJacket must use a deterministic capability check outside the model.

Where required by the workcell class, the runtime must bind the action request to:
- originating run id
- workcell id
- allowed action class
- approval posture
- expiration or one-time-use semantics

The model may suggest.  
The runtime must validate.

---

## 7. Prompt Hygiene and Input Firewall Rule

All source artifacts and user-provided content must be treated as potentially contaminating.

Required controls:
- content remains content, not control logic
- retrieved or provided text may not redefine role instructions
- external directives are labeled as content, not runtime authority
- an input guardrail or prompt-firewall seam must exist before role invocation where contamination risk applies

YellowJacket must resist source content trying to rewrite the system’s runtime law.

---

## 8. Forbidden Capability Classes

YellowJacket v1.1 must not permit:
- autonomous direct canonical writeback
- autonomous side-effect execution
- unrestricted filesystem traversal
- unrestricted network use as default behavior
- undeclared dependency invocation
- hidden persistent cross-run memory accumulation
- direct bypass of deterministic runtime checks by model output

---

## 9. Artifact Sensitivity and Retention

Minimum sensitivity classes:
- low
- internal
- sensitive
- restricted

Retention and redaction rules:
- replay and evidence artifacts must not retain unlimited raw content by default
- review packets must include the minimum evidence needed for judgment
- where sensitivity exceeds review necessity, prefer references, bounded excerpts, redacted summaries, and short evidence snippets
- sensitive and restricted artifacts must declare retention posture explicitly

---

## 10. Logging and Audit Requirements

The following must be auditable per run:
- permission envelope
- trust domain
- capability checks
- dependency calls
- state transitions
- degraded-state events
- checkpoint and resume events
- approval-bound proposal creation
- denied or blocked action attempts

Audit does not require exposing full sensitive raw content in every log entry.

---

## 11. Security Tests Required for v1.1

At minimum test:
- undeclared dependency call is blocked
- undeclared tool use is blocked
- sensitive action proposal requires approval class
- contaminated context is labeled or blocked where appropriate
- degraded-state truth reaches the review packet
- restricted evidence is redacted or bounded
- expired or mismatched capability grants are rejected
- stale checkpoint resume is detected and surfaced

---

## 12. Final Security Statement

YellowJacket v1.1 must operate as a least-privilege coordination runtime with explicit run-scoped permissions, trust-domain assignment, deterministic capability enforcement, content-vs-control separation, truthful degraded-state disclosure, and structured review handoff behavior that prevents candidate orchestration from silently becoming execution or truth authority.

