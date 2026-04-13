import { createArtifactIdentity, type PermissionEnvelope, type RunTrace, type RunState, type WorkcellDefinition, type WorkcellRequest } from "@yellowjacket/contracts";
import { assertAllowedTransition } from "./state-machine.js";
import { PermissionEnvelopeError } from "./errors.js";
import { planWorkcell } from "./planner.js";

export interface RuntimeRunSummary {
  runId: string;
  workcellId: string;
  currentState: RunState;
  trace: RunTrace;
}

export class YellowJacketRuntime {
  createInitialTrace(request: WorkcellRequest): RunTrace {
    const base = createArtifactIdentity("RunTrace", request.run_id, request.workcell_id, "yellowjacket-core", request.trust_domain);
    return {
      ...base,
      artifact_type: "RunTrace",
      event_sequence: ["run_requested"],
      state_transitions: [{ from: null, to: "requested", at: new Date().toISOString() }],
      dependency_events: [],
      error_events: [],
      degraded_events: [],
      checkpoint_events: [],
      timing_summary: {}
    };
  }

  ensurePermissionEnvelope(request: WorkcellRequest, envelope: PermissionEnvelope): void {
    if (request.permission_envelope_ref !== envelope.permission_envelope_id) {
      throw new PermissionEnvelopeError("Request permission envelope ref does not match envelope id.");
    }
    if (request.workcell_id !== envelope.workcell_id) {
      throw new PermissionEnvelopeError("Request workcell id does not match permission envelope workcell id.");
    }
    if (!envelope.allowed_role_ids.length) {
      throw new PermissionEnvelopeError("Permission envelope must declare allowed roles.");
    }
  }

  bootstrapRun(
    request: WorkcellRequest,
    definition: WorkcellDefinition,
    envelope: PermissionEnvelope
  ): RuntimeRunSummary {
    this.ensurePermissionEnvelope(request, envelope);

    const trace = this.createInitialTrace(request);
    let currentState: RunState = "requested";

    for (const nextState of ["admitted", "planned"] as const) {
      assertAllowedTransition(currentState, nextState);
      trace.state_transitions.push({ from: currentState, to: nextState, at: new Date().toISOString() });
      trace.event_sequence.push(`state_${nextState}`);
      currentState = nextState;
    }

    const { dependencyManifest } = planWorkcell(request, definition, envelope);
    trace.dependency_events.push(
      `declared_dependencies:${dependencyManifest.dependency_requirements.join(",") || "none"}`
    );

    return {
      runId: request.run_id,
      workcellId: request.workcell_id,
      currentState,
      trace
    };
  }
}
