import type { InvocationPacketV1 } from "../contracts/invocation-packet";
import type { ProviderReceiptV1 } from "../contracts/provider-receipt";
import type { ReviewPacketV1 } from "../contracts/review-packet";
import type {
  ExecutionAdapter,
  HermesResultPayload,
  ProviderHealthSnapshot,
  ProviderProgressSnapshot,
} from "../interfaces/execution-adapter";
import { normalizeBaseUrl, type HermesLocalClientConfig } from "./config";
import { buildHeaders, getJson, joinUrl, postJson, type FetchLike } from "./http";
import {
  mapHermesCancelToReceipt,
  mapHermesCollectToResult,
  mapHermesHealthToSnapshot,
  mapHermesResultToReviewPacket,
  mapHermesSubmitToReceipt,
  mapHermesPollToProgress,
  mapInvocationToHermesPacket,
} from "./mapper";
import type {
  HermesCancelRequest,
  HermesCancelResponse,
  HermesCollectResponse,
  HermesHealthEndpointResponse,
  HermesInvocationSubmitRequest,
  HermesInvocationSubmitResponse,
  HermesPollResponse,
} from "./protocol";

export class HermesLocalHttpClient implements ExecutionAdapter {
  private readonly baseUrl: string;

  constructor(
    config: HermesLocalClientConfig,
    private readonly fetcher: FetchLike,
  ) {
    this.baseUrl = normalizeBaseUrl(config.baseUrl);
    this.apiKey = config.apiKey;
  }

  private readonly apiKey?: string;

  async probeHealth(): Promise<ProviderHealthSnapshot> {
    const response = await getJson<HermesHealthEndpointResponse>(
      this.fetcher,
      joinUrl(this.baseUrl, "/health"),
      buildHeaders(this.apiKey),
    );

    return mapHermesHealthToSnapshot(response, new Date().toISOString());
  }

  async submitInvocation(packet: InvocationPacketV1): Promise<ProviderReceiptV1> {
    const request: HermesInvocationSubmitRequest = {
      packet: mapInvocationToHermesPacket(packet),
    };

    const response = await postJson<HermesInvocationSubmitRequest, HermesInvocationSubmitResponse>(
      this.fetcher,
      joinUrl(this.baseUrl, "/invocations"),
      request,
      buildHeaders(this.apiKey),
    );

    return mapHermesSubmitToReceipt(packet, response, new Date().toISOString());
  }

  async pollInvocation(providerRunId: string): Promise<ProviderProgressSnapshot> {
    const response = await getJson<HermesPollResponse>(
      this.fetcher,
      joinUrl(this.baseUrl, `/invocations/${providerRunId}`),
      buildHeaders(this.apiKey),
    );

    return mapHermesPollToProgress(response, new Date().toISOString());
  }

  async collectResult(providerRunId: string): Promise<HermesResultPayload> {
    const response = await getJson<HermesCollectResponse>(
      this.fetcher,
      joinUrl(this.baseUrl, `/invocations/${providerRunId}/result`),
      buildHeaders(this.apiKey),
    );

    return mapHermesCollectToResult(response);
  }

  async cancelInvocation(providerRunId: string, reason: string): Promise<ProviderReceiptV1> {
    const request: HermesCancelRequest = {
      providerRunId,
      reason,
    };

    const response = await postJson<HermesCancelRequest, HermesCancelResponse>(
      this.fetcher,
      joinUrl(this.baseUrl, `/invocations/${providerRunId}/cancel`),
      request,
      buildHeaders(this.apiKey),
    );

    return mapHermesCancelToReceipt(providerRunId, response, new Date().toISOString());
  }

  async normalizeResult(payload: HermesResultPayload, profileId: string): Promise<ReviewPacketV1> {
    return mapHermesResultToReviewPacket(payload, `${payload.providerRunId}-receipt`, profileId);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
