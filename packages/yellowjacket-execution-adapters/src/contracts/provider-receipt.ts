import type { ProviderType } from "../interfaces/execution-adapter";
import type { ProviderExecutionState, RuntimeLifecycleState } from "./runtime-status";

export interface ProviderReceiptV1 {
  schemaVersion: "provider_receipt.v1";
  receiptId: string;
  packetRef: string;
  providerType: ProviderType;
  providerRunId: string;
  providerRequestId: string;
  providerVersion: string;
  submittedAt: string;
  completedAt?: string;
  providerStatus: ProviderExecutionState;
  lifecycleState: RuntimeLifecycleState;
  providerErrorCodes: string[];
  providerDegradedFlags: string[];
  costOrResourceSummary: Record<string, string | number | boolean | null>;
}
