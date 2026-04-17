import type { HardeningAuditEventV1 } from "../contracts/audit-event";

export interface BuildAuditEventInput {
  eventType: HardeningAuditEventV1["eventType"];
  entityRef: string;
  outcome: HardeningAuditEventV1["outcome"];
  recordedAt: string;
  evidence: Record<string, unknown>;
}

export function buildAuditEvent(input: BuildAuditEventInput): HardeningAuditEventV1 {
  return {
    schemaVersion: "hardening_audit_event.v1",
    eventId: `${input.eventType}:${input.entityRef}:${input.recordedAt}`,
    eventType: input.eventType,
    entityRef: input.entityRef,
    outcome: input.outcome,
    recordedAt: input.recordedAt,
    evidence: input.evidence,
  };
}
