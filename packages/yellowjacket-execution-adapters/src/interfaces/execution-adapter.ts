export type ProviderType = "hermes_local";

export type ProviderHealthState = "ready" | "degraded" | "unavailable";

export type ProviderStatus =
  | "accepted"
  | "running"
  | "completed"
  | "rejected"
  | "degraded"
  | "failed"
  | "cancelled";

export type ProviderErrorFamily =
  | "transport_error"
  | "provider_reject"
  | "provider_timeout"
  | "provider_internal_error"
  | "normalization_error"
  | "policy_mismatch"
  | "unsupported_capability";

export interface ProviderHealthSnapshot {
  providerType: ProviderType;
  providerVersion: string;
  healthState: ProviderHealthState;
  reasonCodes: string[];
  checkedAt: string;
  supportedProfiles: string[];
  unsupportedFeatures: string[];
}

export interface ProviderReceipt {
  providerReceiptId: string;
  providerType: ProviderType;
  providerRunId: string;
  providerRequestId: string;
  providerVersion: string;
  submittedAt: string;
  completedAt?: string;
  providerStatus: ProviderStatus;
  providerErrorCodes: string[];
  providerDegradedFlags: string[];
  costOrResourceSummary: Record<string, string | number | boolean | null>;
}

export interface ProviderProgressSnapshot {
  providerRunId: string;
  providerStatus: ProviderStatus;
  progressMessage?: string;
  updatedAt: string;
}

export interface NormalizedProviderResult {
  providerReceiptRef: string;
  providerStatus: ProviderStatus;
  normalizationStatus: "normalized" | "failed";
  summary: string;
  evidenceRefs: string[];
  rawResultRef?: string;
}

export interface HermesInvocationPacket {
  invocationId: string;
  providerType: ProviderType;
  executionTicketRef: string;
  roleId: string;
  allowedSkillIds: string[];
  allowedToolClasses: string[];
  timeoutMs: number;
  retryRule: string;
  memoryPosture: "none" | "reserved_for_future";
  subagentPosture: "forbidden" | "reserved_for_future";
  traceCorrelation: {
    runId: string;
    workcellId: string;
    requestOrigin: string;
  };
  inputPayload: Record<string, unknown>;
}

export interface HermesResultPayload {
  providerRunId: string;
  providerStatus: ProviderStatus;
  outputPayload: Record<string, unknown>;
  degradedFlags: string[];
}

export interface ExecutionAdapter {
  probeHealth(): Promise<ProviderHealthSnapshot>;
  submitInvocation(packet: HermesInvocationPacket): Promise<ProviderReceipt>;
  pollInvocation(providerRunId: string): Promise<ProviderProgressSnapshot>;
  collectResult(providerRunId: string): Promise<HermesResultPayload>;
  cancelInvocation(providerRunId: string, reason: string): Promise<ProviderReceipt>;
  normalizeResult(
    payload: HermesResultPayload,
    profileId: string,
  ): Promise<NormalizedProviderResult>;
}
