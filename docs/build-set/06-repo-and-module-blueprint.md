# YellowJacket V1.1 Repo and Module Blueprint

**Date:** 2026-04-12  
**Timezone:** America/New_York  
**Status:** Structural lock  
**Purpose:** Define the logical package layout, dependency direction law, workcell registration posture, proving-asset storage model, and ownership boundaries required before YellowJacket implementation grows.

---

## 1. Structural Goal

The structural goal is to prevent YellowJacket from becoming a grab-bag runtime while also preventing contract duplication and replay or provenance sprawl.

The structure must support:
- strict contract ownership
- replay and verification discipline
- clean app bindings
- bounded domain-pack growth
- future local and cloud conceptual portability

---

## 2. Recommended Logical Package Layout

### `yellowjacket-core`
Owns:
- runtime orchestration logic
- lifecycle engine
- role sequencing
- bounded branch scheduling
- checkpoint and resume coordination
- degraded-state aggregation
- review packet assembly support

Must not own:
- app-specific workflows
- canonical truth logic
- governance doctrine docs
- schema redefinitions

### `yellowjacket-contracts`
Owns:
- shared schemas
- status vocabulary
- artifact taxonomy constants
- version markers
- compatibility helpers
- shared provenance structures

This package is the single source of truth for shared runtime contracts.

### `yellowjacket-workcells`
Owns:
- bounded workcell definitions
- workcell registration metadata
- role definitions
- stop conditions
- baseline comparator references
- trust domain declarations
- checkpoint eligibility
- branch policy declarations

### `yellowjacket-verification`
Owns:
- verification harness
- golden corpus integrations
- baseline comparison helpers
- drift comparison helpers
- proving result aggregation

### `yellowjacket-domain-packs`
Owns:
- reusable domain adaptations layered over core workcell patterns

Must not absorb app-specific UX or authority logic.

### `yellowjacket-app-bindings`
Owns:
- bounded app integration surfaces
- mapping between app requests and workcell request contracts
- adapter logic for app-facing display models where needed

Must not redefine shared contracts.

---

## 3. Shared Contract Ownership Rule

All shared runtime contracts must be owned by one contract package.

No other package or app repo may:
- fork canonical schema under a different name
- redefine core status vocabulary
- redefine artifact taxonomy independently
- silently alter required fields locally
- create local provenance struct variants as canonical truth

If a contract changes, the contract package changes first.

---

## 4. Dependency Direction Law

Allowed direction:
- app bindings depend on contracts and core runtime
- workcells depend on contracts and core runtime interfaces
- verification depends on contracts and workcell outputs
- domain packs depend on contracts and core abstractions
- core runtime depends on contracts, not app bindings

Forbidden direction:
- contracts depending on runtime code
- core runtime depending on app bindings
- contracts depending on domain packs
- workcells depending directly on app UX code
- app bindings redefining shared schema locally as canonical

This law exists to stop layer collapse early.

---

## 5. Workcell Registration Rule

Every workcell must register at minimum:
- workcell id
- workcell version
- workcell purpose
- declared role set
- declared dependency set
- declared output classes
- baseline comparator id
- maturity state
- trust domain defaults
- checkpoint eligibility
- branch policy

Workcell registration must be explicit.  
Workcells must not become active merely by existing in source.

---

## 6. Fixtures and Proving Assets

The structure must include governed homes for:
- golden corpus inputs
- expected outcomes
- baseline outputs
- replay fixtures
- degraded-state scenarios
- contamination or adversarial scenarios
- checkpoint and resume scenarios

Golden corpora and replay fixtures are controlled proving assets.  
They are not casual test scraps.

---

## 7. Artifact Storage Conventions

The structure must separate:
- `fixtures/`
- `runs/`
- `replays/`
- `evidence/`
- `verification/`
- `review-packets/`
- `checkpoints/`

Generated outputs must not be dumped into one undifferentiated folder.  
Class separation is required for replay, audit, and debugging discipline.

---

## 8. Provenance Helper Posture

Provenance helpers should live in the shared contract layer or a tightly-bound shared helper package.

No package should reinvent provenance structs locally.  
No app binding should silently enrich provenance in ways the core contract layer does not define.

---

## 9. Documentation Rule

Each structural package must maintain:
- ownership statement
- allowed dependencies
- forbidden dependencies
- exported interfaces
- artifact classes touched
- testing expectations

This documentation is required to resist structural drift.

---

## 10. Structural Acceptance for v1.1

The repo and module plan is acceptable only if:
- contract ownership is singular and explicit
- dependency law is clear and enforceable
- proving fixtures and replay assets have governed homes
- workcells are explicitly registered and versioned
- checkpoint assets and replay assets are structurally separated
- provenance handling is centralized
- app bindings remain adapters rather than substrate forks

---

## 11. Final Structural Statement

YellowJacket v1.1 should be organized as a bounded orchestration core consuming one shared contract package, explicit workcell definitions, centralized provenance-aware schemas, governed proving assets, and disciplined replay and checkpoint storage with strict dependency direction rules that prevent app logic, governance logic, and contract logic from collapsing into the same runtime layer.

