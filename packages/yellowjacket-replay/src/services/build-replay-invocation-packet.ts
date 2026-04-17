import type {
  HermesReplayInvocationPacketV1,
  ReplayDecisionV1,
  ReplayRequestV1,
} from "../contracts/replay";

export function buildReplayInvocationPacket(
  request: ReplayRequestV1,
  decision: ReplayDecisionV1,
  issuedAt: string,
): HermesReplayInvocationPacketV1 {
  if (decision.outcome !== "approved") {
    throw new Error("cannot build replay invocation packet for blocked replay");
  }

  return {
    schemaVersion: "hermes_replay_invocation_packet.v1",
    replayId: request.replayId,
    targetRef: request.targetRef,
    sourceInvocationPacketId: request.originalInvocationPacketId,
    sourceReceiptId: request.originalReceiptId,
    issuedBy: "yellowjacket",
    issuedAt,
    executionMode: "replay",
    hermesMayExecute: true,
  };
}
