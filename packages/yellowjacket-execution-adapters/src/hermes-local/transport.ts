import type { InvocationPacketV1 } from "../contracts/invocation-packet";
import type { ProviderCapabilitiesV1 } from "../contracts/provider-capabilities";
import type { ProviderReceiptV1 } from "../contracts/provider-receipt";
import type { ReviewPacketV1 } from "../contracts/review-packet";
import type {
  ExecutionAdapter,
  HermesResultPayload,
  ProviderHealthSnapshot,
  ProviderProgressSnapshot,
} from "../interfaces/execution-adapter";
import { mapHermesResultToReviewPacket, mapInvocationToHermesPacket } from "./mapper";

export class HermesLocalHttpClient implements ExecutionAdapter {
  constructor(private readonly baseUrl: string) {}

  async probeHealth(): Promise<ProviderHealthSnapshot> {
    const capabilities: ProviderCapabilitiesV1 = {
      schemaVersion: "provider_capabilities.v1",
      providerType: "hermes_local",
      supportedRoleIds: [],
      supportedProfiles: [],
      memorySupport: "unsupported",
      subagentSupport: "unsupported",
      scheduleAwareness: "none",
      replayAwareness: "none",
      approvalAwareness: "none",
      outputModes: ["structured_receipt", "structured_review_packet"],
      maxTimeoutMs: 0,
    };

    return {
      providerType: "hermes_local",
      providerVersion: "phase-2-contracts",
      healthState: "unavailable",
      reasonCodes: ["not_implemented"],
      checkedAt: new Date().toISOString(),
      supportedProfiles: [],
      unsupportedFeatures: ["live_http_transport"],
      capabilities,
    };
  }

  async submitInvocation(packet: InvocationPacketV1): Promise<ProviderReceiptV1> {
    const normalizedPacket = mapInvocationToHermesPacket(packet);

    return {
      schemaVersion: "provider_receipt.v1",
      receiptId: `${normalizedPacket.packetId}-receipt`,
      packetRef: normalizedPacket.packetId,
      providerType: "hermes_local",
      providerRunId: `${normalizedPacket.invocationId}-run`,
      providerRequestId: normalizedPacket.invocationId,
      providerVersion: "phase-2-contracts",
      submittedAt: new Date().toISOString(),
      providerStatus: "accepted",
      lifecycleState: "admitted",
      providerErrorCodes: [],
      providerDegradedFlags: ["not_implemented"],
      costOrResourceSummary: {},
    };
  }

  async pollInvocation(providerRunId: string): Promise<ProviderProgressSnapshot> {
    return {
      providerRunId,
      providerStatus: "degraded",
      lifecycleState: "executing",
      progressMessage: "Phase 2 contract placeholder only",
      updatedAt: new Date().toISOString(),
    };
  }

  async collectResult(providerRunId: string): Promise<HermesResultPayload> {
    return {
      providerRunId,
      providerStatus: "degraded",
      outputPayload: {},
      degradedFlags: ["not_implemented"],
    };
  }

  async cancelInvocation(providerRunId: string, _reason: string): Promise<ProviderReceiptV1> {
    return {
      schemaVersion: "provider_receipt.v1",
      receiptId: `${providerRunId}-cancel-receipt`,
      packetRef: providerRunId,
      providerType: "hermes_local",
      providerRunId,
      providerRequestId: providerRunId,
      providerVersion: "phase-2-contracts",
      submittedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      providerStatus: "cancelled",
      lifecycleState: "closed",
      providerErrorCodes: [],
      providerDegradedFlags: [],
      costOrResourceSummary: {},
    };
  }

  async normalizeResult(payload: HermesResultPayload, profileId: string): Promise<ReviewPacketV1> {
    return mapHermesResultToReviewPacket(payload, `${payload.providerRunId}-receipt`, profileId);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
