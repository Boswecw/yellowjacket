export const SCHEMA_VERSION = "1.1.0" as const;

export const RUN_STATES = [
  "requested",
  "admitted",
  "planned",
  "in_progress",
  "awaiting_verification",
  "verified_pass",
  "verified_fail",
  "packaged",
  "awaiting_review",
  "approved",
  "rejected",
  "cancelled",
  "timed_out",
  "degraded",
  "failed",
  "checkpointed",
  "resumed"
] as const;

export type RunState = (typeof RUN_STATES)[number];

export const ARTIFACT_TYPES = [
  "WorkcellRequest",
  "WorkcellPlan",
  "DependencyManifest",
  "WorkerInvocation",
  "WorkerResult",
  "VerificationDecision",
  "EvidenceBundle",
  "ReviewPacket",
  "RunTrace",
  "DegradedStatus",
  "PromotionProposal",
  "CheckpointRecord",
  "ResumeDecision"
] as const;

export type ArtifactType = (typeof ARTIFACT_TYPES)[number];

export const TRUST_DOMAINS = [
  "local_internal_only",
  "local_sensitive_review",
  "local_restricted",
  "future_cloud_eligible"
] as const;

export type TrustDomain = (typeof TRUST_DOMAINS)[number];

export const DEGRADED_STATUS_FAMILIES = [
  "ready",
  "degraded",
  "unavailable",
  "blocked",
  "denied",
  "stale",
  "partial"
] as const;

export type DegradedStatusFamily = (typeof DEGRADED_STATUS_FAMILIES)[number];

export const VERIFICATION_STATUSES = [
  "unverified",
  "verified_pass",
  "verified_fail",
  "verified_inconclusive"
] as const;

export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export const VERIFICATION_OUTCOMES = [
  "pass",
  "pass_with_degradation",
  "fail",
  "inconclusive"
] as const;

export type VerificationOutcome = (typeof VERIFICATION_OUTCOMES)[number];

export const RESUME_STATUSES = [
  "resume_allowed",
  "resume_blocked",
  "resume_requires_review"
] as const;

export type ResumeStatus = (typeof RESUME_STATUSES)[number];

export const SENSITIVITY_CLASSES = [
  "low",
  "internal",
  "sensitive",
  "restricted"
] as const;

export type SensitivityClass = (typeof SENSITIVITY_CLASSES)[number];
