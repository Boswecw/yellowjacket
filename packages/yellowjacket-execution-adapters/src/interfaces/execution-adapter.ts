import type { InvocationPacketV1 } from "../contracts/invocation-packet";
import type { ProviderCapabilitiesV1 } from "../contracts/provider-capabilities";
import type { ProviderReceiptV1 } from "../contracts/provider-receipt";
import type { ReviewPacketV1 } from "../contracts/review-packet";
import type { ProviderExecutionState, RuntimeLifecycleState } from "../contracts/runtime-status";

export type ProviderType = "hermes_local";

export type ProviderHealthState = "ready" | "degraded" | "unavailable";

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
  capabilities?: ProviderCapabilitiesV1;
}

export interface ProviderProgressSnapshot {
  providerRunId: string;
  providerStatus: ProviderExecutionState;
  lifecycleState: RuntimeLifecycleState;
  progressMessage?: string;
  updatedAt: string;
}

export interface HermesResultPayload {
  providerRunId: string;
  providerStatus: ProviderExecutionState;
  outputPayload: Record<string, unknown>;
  degradedFlags: string[];
}

export type ProviderReceipt = ProviderReceiptV1;

export interface ExecutionAdapter {
  probeHealth(): Promise<ProviderHealthSnapshot>;
  submitInvocation(packet: InvocationPacketV1): Promise<ProviderReceiptV1>;
  pollInvocation(providerRunId: string): Promise<ProviderProgressSnapshot>;
  collectResult(providerRunId: string): Promise<HermesResultPayload>;
  cancelInvocation(providerRunId: string, reason: string): Promise<ProviderReceiptV1>;
  normalizeResult(payload: HermesResultPayload, profileId: string): Promise<ReviewPacketV1>;
}
