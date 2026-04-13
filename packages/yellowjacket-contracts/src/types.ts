import type {
  ArtifactType,
  DegradedStatusFamily,
  ResumeStatus,
  RunState,
  SensitivityClass,
  TrustDomain,
  VerificationOutcome,
  VerificationStatus
} from "./enums.js";

export interface Provenance {
  provenance_id: string;
  producer_type: "model" | "system" | "human" | "hybrid";
  producer_identity: string;
  model_family_or_system_component: string;
  produced_at: string;
  source_refs: string[];
  verification_status: VerificationStatus;
  verification_method_refs: string[];
  confidence_class: "low" | "medium" | "high" | "not_applicable";
  confidence_source: "self_reported" | "verified" | "derived" | "not_applicable";
  degraded_impact: string[];
}

export interface BaseArtifact {
  artifact_id: string;
  artifact_type: ArtifactType;
  schema_version: string;
  run_id: string;
  workcell_id: string;
  created_at: string;
  created_by_role?: string;
  created_by_system?: string;
  trace_id: string;
  parent_artifact_ids?: string[];
  source_artifact_ids?: string[];
  verification_refs?: string[];
  degraded_flags?: string[];
  trust_domain?: TrustDomain;
}

export interface BudgetLimits {
  max_role_invocations: number;
  max_retries: number;
  max_elapsed_ms: number;
  max_branch_concurrency: number;
  max_model_calls: number;
}

export interface StopConditions {
  max_role_invocations: number;
  max_retries: number;
  max_elapsed_ms: number;
  cancellation_rule: string;
  degraded_fallback_rule: string;
}

export interface BranchPolicy {
  mode: "sequential_only" | "bounded_parallel";
  max_parallel_branches: number;
  join_conditions: string[];
}

export interface PermissionEnvelope {
  permission_envelope_id: string;
  workcell_id: string;
  trust_domain: TrustDomain;
  allowed_dependencies: string[];
  allowed_role_ids: string[];
  allowed_source_scopes: string[];
  allowed_artifact_outputs: ArtifactType[];
  blocked_action_classes: string[];
  approval_required_action_classes: string[];
  retention_expectations: string[];
  resume_eligibility: boolean;
}

export interface WorkcellRequest extends BaseArtifact {
  artifact_type: "WorkcellRequest";
  request_id: string;
  requested_by: string;
  request_context: Record<string, unknown>;
  input_refs: string[];
  requested_outputs: ArtifactType[];
  review_owner_class: string;
  baseline_path_id: string;
  permission_envelope_ref: string;
}

export interface WorkcellPlan extends BaseArtifact {
  artifact_type: "WorkcellPlan";
  plan_id: string;
  role_sequence: string[];
  dependency_set: string[];
  budget_limits: BudgetLimits;
  stop_conditions: StopConditions;
  declared_output_classes: ArtifactType[];
  degraded_behavior_plan: string[];
  branch_policy: BranchPolicy;
  checkpoint_policy: {
    eligible: boolean;
    strategy: "none" | "manual" | "automatic";
  };
}

export interface DependencyManifest extends BaseArtifact {
  artifact_type: "DependencyManifest";
  manifest_id: string;
  declared_nodes: string[];
  declared_edges: Array<{ from: string; to: string }>;
  branch_groups: string[][];
  join_conditions: string[];
  dependency_requirements: string[];
  max_parallel_branches: number;
  fallback_rules: string[];
}

export interface WorkerInvocation extends BaseArtifact {
  artifact_type: "WorkerInvocation";
  invocation_id: string;
  role_id: string;
  step_index: number;
  input_artifact_ids: string[];
  allowed_tools_or_dependencies: string[];
  timeout_policy: string;
  retry_policy: string;
  capability_scope_ref: string;
}

export interface WorkerResult extends BaseArtifact {
  artifact_type: "WorkerResult";
  result_id: string;
  role_id: string;
  status: "ok" | "degraded" | "failed";
  output_artifact_ids: string[];
  structured_findings: Record<string, unknown>;
  error_refs?: string[];
  provenance: Provenance;
}

export interface VerificationDecision extends BaseArtifact {
  artifact_type: "VerificationDecision";
  verification_id: string;
  verification_scope: string;
  verification_status: VerificationOutcome;
  checks_performed: string[];
  failures: string[];
  warnings: string[];
  degraded_impact: string[];
  decision_summary: string;
  replay_refs: string[];
  drift_metrics: Record<string, number>;
}

export interface EvidenceBundle extends BaseArtifact {
  artifact_type: "EvidenceBundle";
  evidence_bundle_id: string;
  evidence_items: string[];
  evidence_summary: string;
  sensitivity_class: SensitivityClass;
  provenance: Provenance;
}

export interface ReviewPacket extends BaseArtifact {
  artifact_type: "ReviewPacket";
  review_packet_id: string;
  run_status: RunState;
  verification_status: VerificationOutcome;
  degraded_status_summary: string;
  finding_summary: string;
  candidate_outputs: string[];
  evidence_bundle_refs: string[];
  operator_actions: string[];
  baseline_comparison_summary: string;
  policy_snippet: string;
  provenance_summary: string;
}

export interface RunTrace extends BaseArtifact {
  artifact_type: "RunTrace";
  event_sequence: string[];
  state_transitions: Array<{ from: RunState | null; to: RunState; at: string }>;
  dependency_events: string[];
  error_events: string[];
  degraded_events: string[];
  checkpoint_events: string[];
  timing_summary: Record<string, number>;
}

export interface DegradedStatus extends BaseArtifact {
  artifact_type: "DegradedStatus";
  degraded_status_id: string;
  status_family: DegradedStatusFamily;
  affected_capabilities: string[];
  reason_codes: string[];
  operator_visible_summary: string;
}

export interface PromotionProposal extends BaseArtifact {
  artifact_type: "PromotionProposal";
  promotion_proposal_id: string;
  candidate_artifact_ids: string[];
  requested_action_class: string;
  requested_owner: string;
  required_approvals: string[];
  supporting_evidence_refs: string[];
  promotion_rationale: string;
  policy_snippet: string;
}

export interface CheckpointRecord extends BaseArtifact {
  artifact_type: "CheckpointRecord";
  checkpoint_id: string;
  checkpoint_state: RunState;
  resumable_from_state: boolean;
  persisted_artifact_refs: string[];
  dependency_health_snapshot: Record<string, "ready" | "degraded" | "unavailable">;
  expires_at: string;
}

export interface ResumeDecision extends BaseArtifact {
  artifact_type: "ResumeDecision";
  resume_decision_id: string;
  checkpoint_ref: string;
  resume_status: ResumeStatus;
  freshness_checks: string[];
  dependency_revalidation_result: string;
  operator_visible_summary: string;
}

export interface WorkcellDefinition {
  workcell_id: string;
  workcell_version: string;
  workcell_purpose: string;
  maturity_state: "experimental" | "proving" | "proving_complete" | "reusable_core";
  declared_role_set: string[];
  declared_dependency_set: string[];
  declared_output_classes: ArtifactType[];
  baseline_comparator_id: string;
  trust_domain_default: TrustDomain;
  checkpoint_eligibility: boolean;
  branch_policy: BranchPolicy;
  stop_conditions: StopConditions;
}
