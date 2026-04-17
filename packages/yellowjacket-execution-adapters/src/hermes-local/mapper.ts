import type {
  HermesInvocationPacket,
  HermesResultPayload,
  NormalizedProviderResult,
  ProviderReceipt,
} from "../interfaces/execution-adapter";

export function mapInvocationToHermesPacket(
  packet: HermesInvocationPacket,
): HermesInvocationPacket {
  return packet;
}

export function mapHermesResultToNormalizedResult(
  payload: HermesResultPayload,
  providerReceiptRef: ProviderReceipt["providerReceiptId"],
  profileId: string,
): NormalizedProviderResult {
  return {
    providerReceiptRef,
    providerStatus: payload.providerStatus,
    normalizationStatus: "normalized",
    summary: `Normalized Hermes result using profile ${profileId}`,
    evidenceRefs: [],
    rawResultRef: payload.providerRunId,
  };
}
