import { RUN_STATES, type RunState } from "@yellowjacket/contracts";
import { InvalidStateTransitionError } from "./errors.js";

const transitions: Record<RunState, RunState[]> = {
  requested: ["admitted", "failed", "cancelled"],
  admitted: ["planned", "cancelled", "failed"],
  planned: ["in_progress", "cancelled", "failed"],
  in_progress: ["awaiting_verification", "degraded", "timed_out", "failed", "cancelled", "checkpointed"],
  awaiting_verification: ["verified_pass", "verified_fail", "failed"],
  verified_pass: ["packaged"],
  verified_fail: ["packaged", "failed"],
  packaged: ["awaiting_review"],
  awaiting_review: ["approved", "rejected", "cancelled"],
  approved: [],
  rejected: [],
  cancelled: [],
  timed_out: [],
  degraded: ["awaiting_verification", "failed", "cancelled", "checkpointed"],
  failed: [],
  checkpointed: ["resumed", "failed", "cancelled"],
  resumed: ["in_progress", "awaiting_verification", "failed", "cancelled"]
};

export function isAllowedTransition(fromState: RunState | null, toState: RunState): boolean {
  if (fromState === null) {
    return toState === "requested";
  }
  return transitions[fromState].includes(toState);
}

export function assertAllowedTransition(fromState: RunState | null, toState: RunState): void {
  if (!isAllowedTransition(fromState, toState)) {
    throw new InvalidStateTransitionError(fromState, toState);
  }
}

export function getRunStates(): readonly RunState[] {
  return RUN_STATES;
}
