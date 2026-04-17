import type { InvocationPacketV1 } from "../contracts/invocation-packet";
import type { ProviderExecutionState } from "../contracts/runtime-status";

export type HermesHealthEndpointResponse = {
  providerVersion: string;
  healthState: "ready" | "degraded" | "unavailable";
  reasonCodes: string[];
  supportedProfiles: string[];
  unsupportedFeatures: string[];
  supportedRoleIds: string[];
  memorySupport: "supported" | "unsupported" | "reserved_for_future";
  subagentSupport: "supported" | "unsupported" | "reserved_for_future";
  outputModes: string[];
  maxTimeoutMs: number;
};

export type HermesInvocationSubmitRequest = {
  packet: InvocationPacketV1;
};

export type HermesInvocationSubmitResponse = {
  providerReceiptId: string;
  providerRunId: string;
  providerRequestId: string;
  providerStatus: "accepted" | "rejected";
};

export type HermesPollResponse = {
  providerRunId: string;
  providerStatus: "running" | "completed" | "degraded" | "failed" | "cancelled";
  progressMessage?: string;
};

export type HermesCollectResponse = {
  providerRunId: string;
  providerStatus: "completed" | "degraded" | "failed";
  outputPayload: Record<string, unknown>;
  degradedFlags: string[];
};

export type HermesCancelRequest = {
  providerRunId: string;
  reason: string;
};

export type HermesCancelResponse = {
  providerRunId: string;
  providerStatus: Extract<ProviderExecutionState, "cancelled">;
};
