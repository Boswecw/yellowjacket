export interface ReplayPacketInvariantInput {
  replayId: string;
  sourceInvocationPacketId: string;
  sourceReceiptId: string;
  issuedBy: string;
  executionMode: string;
  hermesMayExecute: boolean;
}

export function assertReplayPacketInvariants(packet: ReplayPacketInvariantInput): void {
  if (packet.replayId.trim().length === 0) {
    throw new Error("replayId is required");
  }

  if (packet.sourceInvocationPacketId.trim().length === 0) {
    throw new Error("sourceInvocationPacketId is required");
  }

  if (packet.sourceReceiptId.trim().length === 0) {
    throw new Error("sourceReceiptId is required");
  }

  if (packet.issuedBy !== "yellowjacket") {
    throw new Error("replay packets must be issued by YellowJacket");
  }

  if (packet.executionMode !== "replay") {
    throw new Error("replay packets must remain in replay execution mode");
  }

  if (packet.hermesMayExecute !== true) {
    throw new Error("Hermes execution flag must remain true for issued replay packets");
  }
}
