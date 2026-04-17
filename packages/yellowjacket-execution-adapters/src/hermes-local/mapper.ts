import type { InvocationPacketV1 } from "../contracts/invocation-packet";
import type { ProviderReceiptV1 } from "../contracts/provider-receipt";
import type { ReviewPacketV1 } from "../contracts/review-packet";
import type { HermesResultPayload } from "../interfaces/execution-adapter";

export function mapInvocationToHermesPacket(packet: InvocationPacketV1): InvocationPacketV1 {
  return packet;
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
