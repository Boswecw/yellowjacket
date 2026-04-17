import {
  buildReplayInvocationPacket,
  evaluateReplayRequest,
} from "../packages/yellowjacket-replay/src/index";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

const admittedDecision = {
  outcome: "admitted" as const,
};

const replayRequest = {
  schemaVersion: "replay_request.v1" as const,
  replayId: "replay-1",
  originalIntentId: "intent-1",
  originalInvocationPacketId: "packet-1",
  originalReceiptId: "receipt-1",
  targetRef: "doc-system",
  requestedBy: "charlie",
  requestedAt: "2026-04-17T10:00:00.000Z",
  reasonCode: "operator_requested_replay",
};

const approved = evaluateReplayRequest(
  replayRequest,
  admittedDecision,
  {
    receiptId: "receipt-1",
    disposition: "closed",
  },
  "2026-04-17T10:05:00.000Z",
);

assert(approved.outcome === "approved", "expected approved replay");
assert(approved.replayAdmissionOwnedBy === "yellowjacket", "replay owner mismatch");

const packet = buildReplayInvocationPacket(
  replayRequest,
  approved,
  "2026-04-17T10:06:00.000Z",
);

assert(packet.issuedBy === "yellowjacket", "packet issuer mismatch");
assert(packet.executionMode === "replay", "packet execution mode mismatch");
assert(packet.hermesMayExecute === true, "Hermes execution flag mismatch");

const blockedSchedule = evaluateReplayRequest(
  replayRequest,
  {
    outcome: "blocked",
  },
  {
    receiptId: "receipt-1",
    disposition: "closed",
  },
  "2026-04-17T10:05:00.000Z",
);

assert(blockedSchedule.outcome === "blocked", "blocked schedule should block replay");
assert(blockedSchedule.blockedReasonCodes.includes("schedule_not_admitted"), "missing schedule_not_admitted");

const blockedTerminal = evaluateReplayRequest(
  replayRequest,
  admittedDecision,
  {
    receiptId: "receipt-1",
    disposition: "verifying",
  },
  "2026-04-17T10:05:00.000Z",
);

assert(blockedTerminal.outcome === "blocked", "non-terminal receipt should block replay");
assert(
  blockedTerminal.blockedReasonCodes.includes("original_execution_not_terminal"),
  "missing original_execution_not_terminal",
);

console.log("PHASE_7_PROOF_PASS");
