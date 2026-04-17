import type { ProviderExecutionState } from "./runtime-status";

export type ReviewDisposition = "review_ready" | "approval_required" | "rejected";

export interface ReviewPacketV1 {
  schemaVersion: "review_packet.v1";
  reviewPacketId: string;
  receiptRef: string;
  providerRunId: string;
  providerStatus: ProviderExecutionState;
  disposition: ReviewDisposition;
  summary: string;
  evidenceRefs: string[];
  rawResultRef?: string;
  normalizedOutput: Record<string, unknown>;
}
