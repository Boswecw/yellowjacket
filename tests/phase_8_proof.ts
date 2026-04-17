import {
  assertReplayPacketInvariants,
  buildAuditEvent,
  buildIdempotencyKey,
} from "../packages/yellowjacket-hardening/src/index";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const keyA = buildIdempotencyKey(["intent-1", "replay-1"]);
const keyB = buildIdempotencyKey(["intent-1", "replay-1"]);

assert(keyA === keyB, "idempotency keys must be deterministic");

assertReplayPacketInvariants({
  replayId: "replay-1",
  sourceInvocationPacketId: "packet-1",
  sourceReceiptId: "receipt-1",
  issuedBy: "yellowjacket",
  executionMode: "replay",
  hermesMayExecute: true,
});

let invariantFailed = false;

try {
  assertReplayPacketInvariants({
    replayId: "replay-1",
    sourceInvocationPacketId: "packet-1",
    sourceReceiptId: "receipt-1",
    issuedBy: "openclaw",
    executionMode: "replay",
    hermesMayExecute: true,
  });
} catch {
  invariantFailed = true;
}

assert(invariantFailed, "non-YellowJacket issuer should fail replay invariant check");

const event = buildAuditEvent({
  eventType: "packet_issued",
  entityRef: "replay-1",
  outcome: "accepted",
  recordedAt: "2026-04-17T12:00:00.000Z",
  evidence: {
    idempotencyKey: keyA,
  },
});

assert(event.schemaVersion === "hardening_audit_event.v1", "audit event schema mismatch");
assert(event.outcome === "accepted", "audit event outcome mismatch");
assert(event.eventId.includes("packet_issued:replay-1"), "audit event id mismatch");

console.log("PHASE_8_PROOF_PASS");
