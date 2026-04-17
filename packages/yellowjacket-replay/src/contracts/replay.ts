export interface ReplayRequestV1 {
  schemaVersion: "replay_request.v1";
  replayId: string;
  originalIntentId: string;
  originalInvocationPacketId: string;
  originalReceiptId: string;
  targetRef: string;
  requestedBy: string;
  requestedAt: string;
  reasonCode: string;
}

export interface ReplayDecisionV1 {
  schemaVersion: "replay_decision.v1";
  replayId: string;
  outcome: "approved" | "blocked";
  evaluatedAt: string;
  blockedReasonCodes: string[];
  replayAdmissionOwnedBy: "yellowjacket";
}

export interface HermesReplayInvocationPacketV1 {
  schemaVersion: "hermes_replay_invocation_packet.v1";
  replayId: string;
  targetRef: string;
  sourceInvocationPacketId: string;
  sourceReceiptId: string;
  issuedBy: "yellowjacket";
  issuedAt: string;
  executionMode: "replay";
  hermesMayExecute: true;
}

export interface OriginalExecutionReceiptSummary {
  receiptId: string;
  disposition: "closed" | "failed" | "degraded" | "verifying";
}

export interface ScheduledAdmissionDecisionInput {
  outcome: "admitted" | "blocked";
}
