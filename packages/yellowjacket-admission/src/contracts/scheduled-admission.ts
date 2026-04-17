export interface ScheduledAdmissionRequestV1 {
  schemaVersion: "scheduled_admission_request.v1";
  requestId: string;
  intentId: string;
  targetRef: string;
  scheduleId: string;
  requestedAt: string;
  notBeforeAt?: string;
  expiresAt?: string;
  replayId?: string;
  replayPermitted: boolean;
}

export type ScheduledAdmissionOutcome = "admitted" | "blocked";

export interface ScheduledAdmissionDecisionV1 {
  schemaVersion: "scheduled_admission_decision.v1";
  decisionId: string;
  requestRef: string;
  outcome: ScheduledAdmissionOutcome;
  evaluatedAt: string;
  blockedReasonCodes: string[];
  scheduleValidityOwnedBy: "yellowjacket";
  replayAdmissionOwnedBy: "yellowjacket";
}
