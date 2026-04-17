export type HermesHealthEndpointResponse = {
  providerVersion: string;
  healthState: "ready" | "degraded" | "unavailable";
  reasonCodes: string[];
  supportedProfiles: string[];
  unsupportedFeatures: string[];
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
