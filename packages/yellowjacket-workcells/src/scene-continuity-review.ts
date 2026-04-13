import type { WorkcellDefinition } from "@yellowjacket/contracts";

export const sceneContinuityReviewWorkcell: WorkcellDefinition = {
  workcell_id: "scene-continuity-review",
  workcell_version: "1.1.0",
  workcell_purpose: "Review scene-level continuity and surface candidate findings for human review.",
  maturity_state: "proving",
  declared_role_set: [
    "source-prep",
    "continuity-review",
    "evidence-assembler",
    "review-packet-assembler"
  ],
  declared_dependency_set: [
    "cortex",
    "neuronforge-local"
  ],
  declared_output_classes: [
    "WorkerResult",
    "EvidenceBundle",
    "VerificationDecision",
    "ReviewPacket",
    "RunTrace",
    "DegradedStatus"
  ],
  baseline_comparator_id: "single-pass-scene-review",
  trust_domain_default: "local_sensitive_review",
  checkpoint_eligibility: true,
  branch_policy: {
    mode: "sequential_only",
    max_parallel_branches: 1,
    join_conditions: []
  },
  stop_conditions: {
    max_role_invocations: 6,
    max_retries: 1,
    max_elapsed_ms: 120000,
    cancellation_rule: "operator_cancel_or_stop_condition",
    degraded_fallback_rule: "emit_degraded_status_and_continue_to_review_packet_when_safe"
  }
};
