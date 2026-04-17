import type {
  OriginalExecutionReceiptSummary,
  ReplayDecisionV1,
  ReplayRequestV1,
  ScheduledAdmissionDecisionInput,
} from "../contracts/replay";

export function evaluateReplayRequest(
  request: ReplayRequestV1,
  scheduledDecision: ScheduledAdmissionDecisionInput,
  originalReceipt: OriginalExecutionReceiptSummary,
  evaluatedAt: string,
): ReplayDecisionV1 {
  const blockedReasonCodes: string[] = [];

  if (scheduledDecision.outcome !== "admitted") {
    blockedReasonCodes.push("schedule_not_admitted");
  }

  if (!["closed", "failed"].includes(originalReceipt.disposition)) {
    blockedReasonCodes.push("original_execution_not_terminal");
  }

  return {
    schemaVersion: "replay_decision.v1",
    replayId: request.replayId,
    outcome: blockedReasonCodes.length === 0 ? "approved" : "blocked",
    evaluatedAt,
    blockedReasonCodes,
    replayAdmissionOwnedBy: "yellowjacket",
  };
}
