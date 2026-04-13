import type { WorkcellDefinition } from "@yellowjacket/contracts";
import { sceneContinuityReviewWorkcell } from "./scene-continuity-review.js";

const registry = new Map<string, WorkcellDefinition>([
  [sceneContinuityReviewWorkcell.workcell_id, sceneContinuityReviewWorkcell]
]);

export function listWorkcells(): WorkcellDefinition[] {
  return [...registry.values()];
}

export function getWorkcellDefinition(workcellId: string): WorkcellDefinition {
  const definition = registry.get(workcellId);
  if (!definition) {
    throw new Error(`Unknown workcell: ${workcellId}`);
  }
  return definition;
}
