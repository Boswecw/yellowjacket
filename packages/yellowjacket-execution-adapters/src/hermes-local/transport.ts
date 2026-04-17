import type {
  ExecutionAdapter,
  HermesInvocationPacket,
  HermesResultPayload,
  NormalizedProviderResult,
  ProviderHealthSnapshot,
  ProviderProgressSnapshot,
  ProviderReceipt,
} from "../interfaces/execution-adapter";
import { mapHermesResultToNormalizedResult, mapInvocationToHermesPacket } from "./mapper";

export class HermesLocalHttpClient implements ExecutionAdapter {
  constructor(private readonly baseUrl: string) {}

  async probeHealth(): Promise<ProviderHealthSnapshot> {
    return {
      providerType: "hermes_local",
      providerVersion: "phase-1-skeleton",
      healthState: "unavailable",
      reasonCodes: ["not_implemented"],
      checkedAt: new Date().toISOString(),
      supportedProfiles: [],
      unsupportedFeatures: ["live_http_transport"],
    };
  }

  async submitInvocation(packet: HermesInvocationPacket): Promise<ProviderReceipt> {
    const normalizedPacket = mapInvocationToHermesPacket(packet);

    return {
      providerReceiptId: `${normalizedPacket.invocationId}-receipt`,
      providerType: "hermes_local",
      providerRunId: `${normalizedPacket.invocationId}-run`,
      providerRequestId: normalizedPacket.invocationId,
      providerVersion: "phase-1-skeleton",
      submittedAt: new Date().toISOString(),
      providerStatus: "accepted",
      providerErrorCodes: [],
      providerDegradedFlags: ["not_implemented"],
      costOrResourceSummary: {},
    };
  }

  async pollInvocation(providerRunId: string): Promise<ProviderProgressSnapshot> {
    return {
      providerRunId,
      providerStatus: "degraded",
      progressMessage: "Phase 1 skeleton placeholder only",
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

  async cancelInvocation(providerRunId: string, _reason: string): Promise<ProviderReceipt> {
    return {
      providerReceiptId: `${providerRunId}-cancel-receipt`,
      providerType: "hermes_local",
      providerRunId,
      providerRequestId: providerRunId,
      providerVersion: "phase-1-skeleton",
      submittedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      providerStatus: "cancelled",
      providerErrorCodes: [],
      providerDegradedFlags: [],
      costOrResourceSummary: {},
    };
  }

  async normalizeResult(
    payload: HermesResultPayload,
    profileId: string,
  ): Promise<NormalizedProviderResult> {
    return mapHermesResultToNormalizedResult(payload, `${payload.providerRunId}-receipt`, profileId);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
