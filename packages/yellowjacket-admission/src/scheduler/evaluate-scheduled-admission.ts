import type {
  ScheduledAdmissionDecisionV1,
  ScheduledAdmissionRequestV1,
} from "../contracts/scheduled-admission";
import { isScheduleOpen } from "./admission-window";

function buildBlockedDecision(
  request: ScheduledAdmissionRequestV1,
  evaluatedAt: string,
  reasonCodes: string[],
): ScheduledAdmissionDecisionV1 {
  return {
    schemaVersion: "scheduled_admission_decision.v1",
    decisionId: `${request.requestId}-decision`,
    requestRef: request.requestId,
    outcome: "blocked",
    evaluatedAt,
    blockedReasonCodes: reasonCodes,
    scheduleValidityOwnedBy: "yellowjacket",
    replayAdmissionOwnedBy: "yellowjacket",
  };
}

function buildAdmittedDecision(
  request: ScheduledAdmissionRequestV1,
  evaluatedAt: string,
): ScheduledAdmissionDecisionV1 {
  return {
    schemaVersion: "scheduled_admission_decision.v1",
    decisionId: `${request.requestId}-decision`,
    requestRef: request.requestId,
    outcome: "admitted",
    evaluatedAt,
    blockedReasonCodes: [],
    scheduleValidityOwnedBy: "yellowjacket",
    replayAdmissionOwnedBy: "yellowjacket",
  };
}

export function evaluateScheduledAdmission(
  request: ScheduledAdmissionRequestV1,
  evaluatedAt: string,
): ScheduledAdmissionDecisionV1 {
  const blockedReasonCodes: string[] = [];

  if (!isScheduleOpen(evaluatedAt, request.notBeforeAt, request.expiresAt)) {
    const now = Date.parse(evaluatedAt);
    const notBefore = request.notBeforeAt ? Date.parse(request.notBeforeAt) : undefined;
    const expires = request.expiresAt ? Date.parse(request.expiresAt) : undefined;

    if (notBefore !== undefined && now < notBefore) {
      blockedReasonCodes.push("schedule_not_open");
    }

    if (expires !== undefined && now > expires) {
      blockedReasonCodes.push("schedule_expired");
    }
  }

  if (request.replayId && !request.replayPermitted) {
    blockedReasonCodes.push("replay_not_permitted");
  }

  if (blockedReasonCodes.length > 0) {
    return buildBlockedDecision(request, evaluatedAt, blockedReasonCodes);
  }

  return buildAdmittedDecision(request, evaluatedAt);
}
