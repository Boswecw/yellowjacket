import type { ProviderType } from "../interfaces/execution-adapter";

export type CapabilitySupport = "supported" | "unsupported" | "reserved_for_future";

export interface ProviderCapabilitiesV1 {
  schemaVersion: "provider_capabilities.v1";
  providerType: ProviderType;
  supportedRoleIds: string[];
  supportedProfiles: string[];
  memorySupport: CapabilitySupport;
  subagentSupport: CapabilitySupport;
  scheduleAwareness: "none";
  replayAwareness: "none";
  approvalAwareness: "none";
  outputModes: string[];
  maxTimeoutMs: number;
}
