import type { ProviderType } from "../interfaces/execution-adapter";

export type MemoryPosture = "none" | "reserved_for_future";
export type SubagentPosture = "forbidden" | "reserved_for_future";

export interface InvocationTraceCorrelation {
  runId: string;
  workcellId: string;
  requestOrigin: string;
}

export interface ScheduleContextV1 {
  scheduleId?: string;
  replayId?: string;
  admissionDecisionRef: string;
  scheduleValidityOwnedBy: "yellowjacket";
  replayAdmissionOwnedBy: "yellowjacket";
}

export interface InvocationPacketV1 {
  schemaVersion: "invocation_packet.v1";
  packetId: string;
  invocationId: string;
  intentId: string;
  admissionId: string;
  executionTicketRef: string;
  providerType: ProviderType;
  roleId: string;
  allowedSkillIds: string[];
  allowedToolClasses: string[];
  timeoutMs: number;
  retryRule: string;
  memoryPosture: MemoryPosture;
  subagentPosture: SubagentPosture;
  traceCorrelation: InvocationTraceCorrelation;
  scheduleContext: ScheduleContextV1;
  inputPayload: Record<string, unknown>;
}
