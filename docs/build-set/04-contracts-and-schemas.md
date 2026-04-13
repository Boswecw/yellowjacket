# YellowJacket V1.1 Contracts and Schemas

**Date:** 2026-04-12  
**Timezone:** America/New_York  
**Status:** Contract lock  
**Purpose:** Define the canonical artifact taxonomy, lifecycle states, provenance model, schema-family expectations, and checkpoint/resume contract posture for YellowJacket v1.1.

---

## 1. Contract Design Rules

1. Every runtime boundary must use a declared schema.  
2. Every artifact must carry an ID and schema version.  
3. Every artifact must carry provenance sufficient for replay and review.  
4. Optional fields must be explicitly marked optional.  
5. Narrative fields may enrich but may not replace structured truth.  
6. Status truth must be structural.  
7. Shared contracts must be consumed, not reinterpreted ad hoc.  
8. Verification status must be represented structurally where applicable.  
9. Policy and sensitivity posture must travel with the artifact where needed.  
10. Checkpoint and resume truth must be representable structurally.

---

## 2. Canonical Lifecycle State Machine

Required run states:
- requested
- admitted
- planned
- in_progress
- awaiting_verification
- verified_pass
- verified_fail
- packaged
- awaiting_review
- approved
- rejected
- cancelled
- timed_out
- degraded
- failed
- checkpointed
- resumed

These states must be represented as first-class structured data.  
They must not be inferred from narrative summary text.

---

## 3. Artifact Taxonomy

Required artifact classes:
- WorkcellRequest
- WorkcellPlan
- DependencyManifest
- WorkerInvocation
- WorkerResult
- VerificationDecision
- EvidenceBundle
- ReviewPacket
- RunTrace
- DegradedStatus
- PromotionProposal
- CheckpointRecord
- ResumeDecision

This taxonomy defines the minimum shared runtime contract set for v1.1.

---

## 4. Shared Identity and Lineage Rules

Every artifact must include:
- artifact_id
- artifact_type
- schema_version
- run_id
- workcell_id
- created_at
- created_by_role or created_by_system
- trace_id

Where relevant, artifacts must also include:
- parent_artifact_ids
- source_artifact_ids
- verification_refs
- degraded_flags
- trust_domain

IDs may be implementation-specific, but they must be:
- stable
- unique
- machine-readable
- replay-friendly

---

## 5. Shared Provenance Object

Every major artifact must support a provenance object.

Minimum provenance fields:
- provenance_id
- producer_type
- producer_identity
- model_family_or_system_component
- produced_at
- source_refs
- verification_status
- verification_method_refs
- confidence_class
- confidence_source
- degraded_impact

Allowed verification statuses:
- unverified
- verified_pass
- verified_fail
- verified_inconclusive

Self-reported confidence may exist.  
It must never replace verification status.

---

## 6. Schema Family Expectations

### WorkcellRequest
Required fields:
- request_id
- schema_version
- workcell_id
- requested_by
- request_context
- input_refs
- requested_outputs
- review_owner_class
- baseline_path_id
- trust_domain
- permission_envelope_ref

### WorkcellPlan
Required fields:
- plan_id
- run_id
- workcell_id
- role_sequence
- dependency_set
- budget_limits
- stop_conditions
- declared_output_classes
- degraded_behavior_plan
- branch_policy
- checkpoint_policy

### DependencyManifest
Required fields:
- manifest_id
- run_id
- declared_nodes
- declared_edges
- branch_groups
- join_conditions
- dependency_requirements
- max_parallel_branches
- fallback_rules

### WorkerInvocation
Required fields:
- invocation_id
- run_id
- role_id
- step_index
- input_artifact_ids
- allowed_tools_or_dependencies
- timeout_policy
- retry_policy
- capability_scope_ref

### WorkerResult
Required fields:
- result_id
- run_id
- role_id
- status
- output_artifact_ids
- structured_findings or equivalent typed payload
- degraded_flags
- error_refs where applicable
- provenance

### VerificationDecision
Required fields:
- verification_id
- run_id
- verification_scope
- verification_status
- checks_performed
- failures
- warnings
- degraded_impact
- decision_summary
- replay_refs
- drift_metrics

Allowed statuses:
- pass
- pass_with_degradation
- fail
- inconclusive

### EvidenceBundle
Required fields:
- evidence_bundle_id
- run_id
- evidence_items
- source_refs
- evidence_summary
- sensitivity_class
- provenance

### ReviewPacket
Required fields:
- review_packet_id
- run_id
- workcell_id
- run_status
- verification_status
- degraded_status_summary
- finding_summary
- candidate_outputs
- evidence_bundle_refs
- operator_actions
- baseline_comparison_summary
- policy_snippet
- provenance_summary

### RunTrace
Required fields:
- trace_id
- run_id
- event_sequence
- state_transitions
- dependency_events
- error_events
- degraded_events
- checkpoint_events
- timing_summary

### DegradedStatus
Required fields:
- degraded_status_id
- run_id
- status_family
- affected_capabilities
- reason_codes
- operator_visible_summary

Allowed status families:
- ready
- degraded
- unavailable
- blocked
- denied
- stale
- partial

### PromotionProposal
Required fields:
- promotion_proposal_id
- run_id
- candidate_artifact_ids
- requested_action_class
- requested_owner
- required_approvals
- supporting_evidence_refs
- promotion_rationale
- policy_snippet

### CheckpointRecord
Required fields:
- checkpoint_id
- run_id
- checkpoint_state
- resumable_from_state
- persisted_artifact_refs
- dependency_health_snapshot
- created_at
- expires_at

### ResumeDecision
Required fields:
- resume_decision_id
- run_id
- checkpoint_ref
- resume_status
- freshness_checks
- dependency_revalidation_result
- operator_visible_summary

Allowed statuses:
- resume_allowed
- resume_blocked
- resume_requires_review

---

## 7. Error and Degraded Modeling

Errors and degraded conditions must be structured.

Every error-bearing artifact should support:
- error_code
- error_class
- error_summary
- recoverable
- operator_visible

Every degraded condition should support:
- affected dependency
- capability impact
- user or operator-visible summary
- whether verification confidence is reduced

---

## 8. Compatibility and Versioning Posture

Every schema family must carry a semantic version.

Rules:
- breaking changes require a major increment
- minor additions must not break required fields
- persisted artifacts must remain readable through migration or durable compatibility readers

Cross-repo reuse must consume the shared contract package.  
No app or package may quietly reinterpret canonical contracts locally.

---

## 9. Contract Acceptance for v1.1

The contract layer is acceptable only if:
- every major artifact class has a shared schema
- provenance is mandatory and structured
- verification truth is structural
- checkpoint and resume truth is structural
- degraded conditions are first-class data
- policy and sensitivity posture are carried where required

---

## 10. Final Contract Statement

YellowJacket v1.1 is contract-valid only when every run, plan, dependency manifest, handoff, result, verification decision, evidence bundle, checkpoint, degraded condition, and review packet is represented through shared versioned schemas with explicit lineage, provenance, verification truth, and policy-aware structure rather than prose-only orchestration.

