export interface HardeningAuditEventV1 {
  schemaVersion: "hardening_audit_event.v1";
  eventId: string;
  eventType: "admission_checked" | "replay_checked" | "packet_issued";
  entityRef: string;
  outcome: "accepted" | "blocked";
  recordedAt: string;
  evidence: Record<string, unknown>;
}
