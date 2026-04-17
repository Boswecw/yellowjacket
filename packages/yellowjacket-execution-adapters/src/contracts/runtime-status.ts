export const PRIMARY_RUNTIME_STATES = [
  "requested",
  "admitted",
  "planned",
  "executing",
  "verifying",
  "review_ready",
  "approval_required",
  "closed",
] as const;

export const SECONDARY_RUNTIME_STATES = [
  "degraded",
  "blocked",
  "replay_pending",
  "replay_running",
  "replay_closed",
] as const;

export type PrimaryRuntimeState = (typeof PRIMARY_RUNTIME_STATES)[number];
export type SecondaryRuntimeState = (typeof SECONDARY_RUNTIME_STATES)[number];

export type RuntimeLifecycleState = PrimaryRuntimeState | SecondaryRuntimeState;

export const PROVIDER_EXECUTION_STATES = [
  "accepted",
  "running",
  "completed",
  "rejected",
  "degraded",
  "failed",
  "cancelled",
] as const;

export type ProviderExecutionState = (typeof PROVIDER_EXECUTION_STATES)[number];
