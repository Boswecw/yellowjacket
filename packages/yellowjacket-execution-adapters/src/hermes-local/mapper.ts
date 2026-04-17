import type { InvocationPacketV1 } from "../contracts/invocation-packet";
import type { ProviderCapabilitiesV1 } from "../contracts/provider-capabilities";
import type { ProviderReceiptV1 } from "../contracts/provider-receipt";
import type { ReviewPacketV1 } from "../contracts/review-packet";
import type { HermesResultPayload, ProviderHealthSnapshot, ProviderProgressSnapshot } from "../interfaces/execution-adapter";
import type {
  HermesCancelResponse,
  HermesCollectResponse,
  HermesHealthEndpointResponse,
  HermesInvocationSubmitResponse,
  HermesPollResponse,
} from "./protocol";

export function mapInvocationToHermesPacket(packet: InvocationPacketV1): InvocationPacketV1 {
  return packet;
}

export function mapHermesHealthToSnapshot(
  response: HermesHealthEndpointResponse,
  checkedAt: string,
): ProviderHealthSnapshot {
  const capabilities: ProviderCapabilitiesV1 = {
    schemaVersion: "provider_capabilities.v1",
    providerType: "hermes_local",
    supportedRoleIds: response.supportedRoleIds,
    supportedProfiles: response.supportedProfiles,
    memorySupport: response.memorySupport,
    subagentSupport: response.subagentSupport,
    scheduleAwareness: "none",
    replayAwareness: "none",
    approvalAwareness: "none",
    outputModes: response.outputModes,
    maxTimeoutMs: response.maxTimeoutMs,
  };

  return {
    providerType: "hermes_local",
    providerVersion: response.providerVersion,
    healthState: response.healthState,
    reasonCodes: response.reasonCodes,
    checkedAt,
    supportedProfiles: response.supportedProfiles,
    unsupportedFeatures: response.unsupportedFeatures,
    capabilities,
  };
}

export function mapHermesSubmitToReceipt(
  packet: InvocationPacketV1,
  response: HermesInvocationSubmitResponse,
  submittedAt: string,
): ProviderReceiptV1 {
  return {
    schemaVersion: "provider_receipt.v1",
    receiptId: response.providerReceiptId,
    packetRef: packet.packetId,
    providerType: "hermes_local",
    providerRunId: response.providerRunId,
    providerRequestId: response.providerRequestId,
    providerVersion: "phase-3-adapter-foundation",
    submittedAt,
    providerStatus: response.providerStatus,
    lifecycleState: "admitted",
    providerErrorCodes: [],
    providerDegradedFlags: [],
    costOrResourceSummary: {},
  };
}

export function mapHermesPollToProgress(
  response: HermesPollResponse,
  updatedAt: string,
): ProviderProgressSnapshot {
  return {
    providerRunId: response.providerRunId,
    providerStatus: response.providerStatus,
    lifecycleState: response.providerStatus === "running" ? "executing" : "verifying",
    progressMessage: response.progressMessage,
    updatedAt,
  };
}

export function mapHermesCollectToResult(response: HermesCollectResponse): HermesResultPayload {
  return {
    providerRunId: response.providerRunId,
    providerStatus: response.providerStatus,
    outputPayload: response.outputPayload,
    degradedFlags: response.degradedFlags,
  };
}

export function mapHermesCancelToReceipt(
  packetRef: string,
  response: HermesCancelResponse,
  completedAt: string,
): ProviderReceiptV1 {
  return {
    schemaVersion: "provider_receipt.v1",
    receiptId: `${response.providerRunId}-cancel-receipt`,
    packetRef,
    providerType: "hermes_local",
    providerRunId: response.providerRunId,
    providerRequestId: response.providerRunId,
    providerVersion: "phase-3-adapter-foundation",
    submittedAt: completedAt,
    completedAt,
    providerStatus: response.providerStatus,
    lifecycleState: "closed",
    providerErrorCodes: [],
    providerDegradedFlags: [],
    costOrResourceSummary: {},
  };
}

export function mapHermesResultToReviewPacket(
  payload: HermesResultPayload,
  receiptRef: ProviderReceiptV1["receiptId"],
  profileId: string,
): ReviewPacketV1 {
  return {
    schemaVersion: "review_packet.v1",
    reviewPacketId: `${payload.providerRunId}-review`,
    receiptRef,
    providerRunId: payload.providerRunId,
    providerStatus: payload.providerStatus,
    disposition: payload.providerStatus === "completed" ? "review_ready" : "approval_required",
    summary: `Normalized Hermes result using profile ${profileId}`,
    evidenceRefs: [],
    rawResultRef: payload.providerRunId,
    normalizedOutput: payload.outputPayload,
  };
}
