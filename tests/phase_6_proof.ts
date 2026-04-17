import { evaluateScheduledAdmission } from "../packages/yellowjacket-admission/src/index";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const admitted = evaluateScheduledAdmission(
  {
    schemaVersion: "scheduled_admission_request.v1",
    requestId: "request-1",
    intentId: "intent-1",
    targetRef: "doc-system",
    scheduleId: "schedule-1",
    requestedAt: "2026-04-17T10:00:00.000Z",
    notBeforeAt: "2026-04-17T09:00:00.000Z",
    expiresAt: "2026-04-17T11:00:00.000Z",
    replayPermitted: false,
  },
  "2026-04-17T10:00:00.000Z",
);

assert(admitted.outcome === "admitted", "expected admitted outcome");
assert(admitted.scheduleValidityOwnedBy === "yellowjacket", "schedule validity owner mismatch");
assert(admitted.replayAdmissionOwnedBy === "yellowjacket", "replay admission owner mismatch");

const blockedFuture = evaluateScheduledAdmission(
  {
    schemaVersion: "scheduled_admission_request.v1",
    requestId: "request-2",
    intentId: "intent-2",
    targetRef: "doc-system",
    scheduleId: "schedule-2",
    requestedAt: "2026-04-17T10:00:00.000Z",
    notBeforeAt: "2026-04-17T12:00:00.000Z",
    replayPermitted: false,
  },
  "2026-04-17T10:00:00.000Z",
);

assert(blockedFuture.outcome === "blocked", "future schedule should block");
assert(blockedFuture.blockedReasonCodes.includes("schedule_not_open"), "missing schedule_not_open");

const blockedReplay = evaluateScheduledAdmission(
  {
    schemaVersion: "scheduled_admission_request.v1",
    requestId: "request-3",
    intentId: "intent-3",
    targetRef: "doc-system",
    scheduleId: "schedule-3",
    requestedAt: "2026-04-17T10:00:00.000Z",
    replayId: "replay-1",
    replayPermitted: false,
  },
  "2026-04-17T10:00:00.000Z",
);

assert(blockedReplay.outcome === "blocked", "disallowed replay should block");
assert(blockedReplay.blockedReasonCodes.includes("replay_not_permitted"), "missing replay_not_permitted");

console.log("PHASE_6_PROOF_PASS");
